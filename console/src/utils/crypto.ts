/**
 * Cryptographic utilities supporting WRN-PASSPORT-COEXISTENCE-0.2
 * Qualified digests: sha256:<64 hex> or sha512:<128 hex>
 * Canonical JSON: RFC 8785 (JCS)
 */

export async function sha256Hex(data: string | Uint8Array): Promise<string> {
  const encoder = new TextEncoder();
  const bytes = typeof data === 'string' ? encoder.encode(data) : data;
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes as unknown as BufferSource);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function sha512Hex(data: string | Uint8Array): Promise<string> {
  const encoder = new TextEncoder();
  const bytes = typeof data === 'string' ? encoder.encode(data) : data;
  const hashBuffer = await crypto.subtle.digest('SHA-512', bytes as unknown as BufferSource);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function computeQualifiedDigest(data: string | object, algo: 'sha256' | 'sha512' = 'sha256'): Promise<string> {
  const payload = typeof data === 'string' ? data : canonicalizeJson(data);
  const hex = algo === 'sha256' ? await sha256Hex(payload) : await sha512Hex(payload);
  return `${algo}:${hex}`;
}

/**
 * RFC 8785 JSON Canonicalization Scheme (JCS)
 * Sorts object keys deterministically, handles arrays and primitives.
 */
export function canonicalizeJson(obj: unknown): string {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }
  if (Array.isArray(obj)) {
    return '[' + obj.map(item => canonicalizeJson(item)).join(',') + ']';
  }
  const keys = Object.keys(obj as Record<string, unknown>).sort();
  const entries = keys.map(k => {
    const val = (obj as Record<string, unknown>)[k];
    return JSON.stringify(k) + ':' + canonicalizeJson(val);
  });
  return '{' + entries.join(',') + '}';
}

/**
 * Computes the immutable terms digest of an access grant according to schema:
 * Terms digest must exclude detached signatures to prevent circular references.
 */
export async function computeGrantTermsDigest(grantContent: Record<string, unknown>): Promise<string> {
  // Extract strictly the grant terms content
  const canonicalTerms = canonicalizeJson(grantContent);
  return computeQualifiedDigest(canonicalTerms, 'sha256');
}

/**
 * Generates an RFC 9449 DPoP thumbprint (JWK SHA-256 thumbprint)
 */
export async function computeJwkThumbprint(jwk: { kty: string; crv?: string; x?: string; y?: string; e?: string; n?: string }): Promise<string> {
  let canonicalJwk: Record<string, string>;
  if (jwk.kty === 'OKP' || jwk.kty === 'EC') {
    canonicalJwk = { crv: jwk.crv || '', kty: jwk.kty, x: jwk.x || '' };
    if (jwk.y) canonicalJwk.y = jwk.y;
  } else {
    canonicalJwk = { e: jwk.e || '', kty: jwk.kty, n: jwk.n || '' };
  }
  const canonical = canonicalizeJson(canonicalJwk);
  const hex = await sha256Hex(canonical);
  // Base64url encoding
  return btoa(String.fromCharCode(...new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
