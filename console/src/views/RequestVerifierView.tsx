import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  FileCheck2,
  Play,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Code2,
  Terminal,
  Lock,
  RefreshCw
} from 'lucide-react';
import { requestProfile } from '../data/mockDb';

interface VerificationStep {
  id: string;
  rule: string;
  status: 'idle' | 'running' | 'pass' | 'fail';
  detail: string;
  latencyMs: number;
}

export const RequestVerifierView: React.FC = () => {
  const stepsOrder = requestProfile.verification_order || [];

  const [activePreset, setActivePreset] = useState<'valid' | 'tampered' | 'replayed' | 'revoked' | 'unauthorized'>('valid');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);

  const [stepResults, setStepResults] = useState<VerificationStep[]>(
    stepsOrder.map((s: any) => ({
      id: s.id,
      rule: s.rule,
      status: 'idle',
      detail: 'Pending execution',
      latencyMs: 0
    }))
  );

  const sampleHeaders = {
    valid: {
      ':method': 'POST',
      ':path': '/api/v1/submissions/candidate',
      'Content-Type': 'application/json',
      'Content-Digest': 'sha-256=:3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f=:',
      'DPoP': 'eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0Ii... (fresh nonce jti: nova-req-8849)',
      'Authorization': 'DPoP eyJhbGciOiJFUzI1NiIsImtpZCI6InVybjp3cm46a2V5Om5vdmEtODgy... (bound to grant)',
      'Signature-Input': 'sig1=("@method" "@path" "content-digest");keyid="urn:wrn:key:nova-instance-882"',
      'Signature': 'sig1=:c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8=:'
    },
    tampered: {
      ':method': 'POST',
      ':path': '/api/v1/submissions/candidate',
      'Content-Type': 'application/json',
      'Content-Digest': 'sha-256=:0000000000000000000000000000000000000000000000000000000000000000=:', // Tampered!
      'DPoP': 'eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0Ii... (fresh nonce)',
      'Authorization': 'DPoP eyJhbGciOiJFUzI1NiIsImtpZCI6InVybjp3cm46a2V5Om5vdmEtODgy...',
      'Signature-Input': 'sig1=("@method" "@path" "content-digest");keyid="urn:wrn:key:nova-instance-882"',
      'Signature': 'sig1=:c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8=:'
    },
    replayed: {
      ':method': 'POST',
      ':path': '/api/v1/submissions/candidate',
      'Content-Type': 'application/json',
      'Content-Digest': 'sha-256=:3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f=:',
      'DPoP': 'eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0Ii... (REPLAYED jti: nova-req-stale-001)',
      'Authorization': 'DPoP eyJhbGciOiJFUzI1NiIsImtpZCI6InVybjp3cm46a2V5Om5vdmEtODgy...',
      'Signature-Input': 'sig1=("@method" "@path" "content-digest");keyid="urn:wrn:key:nova-instance-882"',
      'Signature': 'sig1=:c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8=:'
    },
    revoked: {
      ':method': 'POST',
      ':path': '/api/v1/vault/frank/records',
      'Content-Type': 'application/json',
      'Content-Digest': 'sha-256=:5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8=:',
      'DPoP': 'eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0Ii... (fresh nonce)',
      'Authorization': 'DPoP grant=urn:wrn:grant:revoked-stale-access',
      'Signature-Input': 'sig1=("@method" "@path" "content-digest");keyid="urn:wrn:key:nova-instance-882"',
      'Signature': 'sig1=:valid_sig_on_revoked_grant=:'
    },
    unauthorized: {
      ':method': 'POST',
      ':path': '/api/v1/vault/frank/private-keys',
      'Content-Type': 'application/json',
      'Content-Digest': 'sha-256=:1111222233334444555566667777888899990000aaaabbbbccccddddeeeeffff=:',
      'DPoP': 'eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0Ii...',
      'Authorization': 'DPoP grant=urn:wrn:grant:nova-candidate-workspace',
      'Signature-Input': 'sig1=("@method" "@path" "content-digest");keyid="urn:wrn:key:nova-instance-882"',
      'Signature': 'sig1=:signature_attempting_vault_access=:'
    }
  };

  const runVerification = async (preset = activePreset) => {
    setIsRunning(true);
    const newResults: VerificationStep[] = stepsOrder.map((s: any) => ({
      id: s.id,
      rule: s.rule,
      status: 'idle',
      detail: 'Waiting...',
      latencyMs: 0
    }));

    setStepResults(newResults);

    for (let i = 0; i < stepsOrder.length; i++) {
      setCurrentStepIndex(i);
      newResults[i].status = 'running';
      setStepResults([...newResults]);

      await new Promise(r => setTimeout(r, 100));

      const stepId = stepsOrder[i].id;
      let shouldFail = false;
      let failReason = '';

      if (preset === 'tampered' && stepId === 'reconstruct') {
        shouldFail = true;
        failReason = '400 Bad Digest: Recomputed wire Content-Digest does not match header commitment.';
      } else if (preset === 'replayed' && stepId === 'reserve_operation') {
        shouldFail = true;
        failReason = '401 Replay Detected: DPoP proof nonce (jti) was already reserved in anti-replay cache.';
      } else if (preset === 'revoked' && stepId === 'validate_grant') {
        shouldFail = true;
        failReason = '403 Forbidden: Grant status list indicates REVOKED. Online revocation check halted execution.';
      } else if (preset === 'unauthorized' && stepId === 'bind_context') {
        shouldFail = true;
        failReason = '403 Forbidden: Resource /vault/frank/private-keys outside grant selector candidate/v0.2/contracts/*.';
      }

      if (shouldFail) {
        newResults[i].status = 'fail';
        newResults[i].detail = failReason;
        newResults[i].latencyMs = 12;
        setStepResults([...newResults]);
        setIsRunning(false);
        setCurrentStepIndex(-1);
        return;
      } else {
        newResults[i].status = 'pass';
        newResults[i].latencyMs = Math.round(5 + Math.random() * 8);

        if (stepId === 'authenticate') newResults[i].detail = 'Valid DPoP proof & TLS transport certified.';
        else if (stepId === 'reconstruct') newResults[i].detail = 'SHA-256 wire digest matches body bytes perfectly.';
        else if (stepId === 'validate_grant') newResults[i].detail = 'Grant terms digest & owner signature verified.';
        else if (stepId === 'validate_lineage') newResults[i].detail = 'Grant lineage cycle-free; valid parent authority.';
        else if (stepId === 'bind_context') newResults[i].detail = 'Actor, delegator, and target branch matched.';
        else if (stepId === 'check_freshness') newResults[i].detail = 'Online revocation status check: ACTIVE (0ms latency).';
        else if (stepId === 'reserve_operation') newResults[i].detail = 'Atomic nonce reservation acquired in memory cache.';
        else if (stepId === 'enforce_and_execute') newResults[i].detail = 'Enforced memory compartment isolation & egress boundaries.';
        else if (stepId === 'record_result') newResults[i].detail = 'Appended audit receipt with notary signature.';

        setStepResults([...newResults]);
      }
    }

    setIsRunning(false);
    setCurrentStepIndex(-1);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-foundry-cyan" />
            <h1 className="text-lg font-semibold text-white tracking-tight">
              RFC 9421 / RFC 9449 Request Verification Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict 9-step pipeline from request_profile.yaml. Verifies wire digests, DPoP key possession, and online authority.
          </p>
        </div>

        <button
          onClick={() => runVerification(activePreset)}
          disabled={isRunning}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-foundry-cyan hover:bg-cyan-500 disabled:opacity-50 text-slate-950 text-xs font-semibold shadow-glow-cyan transition-all cursor-pointer"
        >
          {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isRunning ? 'Verifying 9 Gates...' : 'Run Pipeline Check'}</span>
        </button>
      </div>

      {/* Preset Selector */}
      <div className="p-3 border-b border-border bg-surface-card flex items-center justify-between flex-wrap gap-2 text-xs">
        <span className="text-slate-400 font-mono text-[11px]">ATTACK SCENARIOS & TEST VECTORS:</span>
        <div className="flex items-center space-x-1.5 font-mono text-xs">
          {[
            { id: 'valid', label: '1. Legitimate Request (Pass)', color: 'text-emerald-400' },
            { id: 'tampered', label: '2. Tampered Digest (Fail @ Step 2)', color: 'text-amber-400' },
            { id: 'replayed', label: '3. Replayed Nonce (Fail @ Step 7)', color: 'text-rose-400' },
            { id: 'revoked', label: '4. Revoked Grant (Fail @ Step 3)', color: 'text-rose-400' },
            { id: 'unauthorized', label: '5. Out-of-Bounds Selector (Fail @ Step 5)', color: 'text-amber-400' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => {
                setActivePreset(p.id as any);
                runVerification(p.id as any);
              }}
              className={`px-2.5 py-1 rounded-md border transition-all ${
                activePreset === p.id
                  ? 'bg-surface-elevated border-foundry-cyan text-white shadow-sm'
                  : 'bg-surface border-border text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={p.color}>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: 9 Steps Pipeline */}
        <div className="flex-1 p-6 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1 border-b border-border">
            <span>THE 9 VERIFICATION GATES (ORDER STRICT)</span>
            <span>Policy: request_profile.yaml</span>
          </div>

          <div className="space-y-2.5">
            {stepResults.map((step, idx) => {
              const isPass = step.status === 'pass';
              const isFail = step.status === 'fail';
              const isCurrent = currentStepIndex === idx;

              return (
                <div
                  key={step.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-start justify-between ${
                    isPass
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : isFail
                      ? 'bg-rose-950/20 border-rose-500/50 shadow-lg shadow-rose-950/40'
                      : isCurrent
                      ? 'bg-surface-elevated border-foundry-cyan animate-pulse'
                      : 'bg-surface-card border-border'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        0{idx + 1}.
                      </span>
                      <h3 className="text-xs font-semibold text-white capitalize font-mono">
                        {step.id.replace('_', ' ')}
                      </h3>
                      {step.latencyMs > 0 && (
                        <span className="text-[10px] font-mono text-slate-500">
                          {step.latencyMs}ms
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 font-mono mb-1">
                      {step.rule}
                    </p>

                    <div className={`text-[11px] font-mono ${
                      isPass ? 'text-emerald-400' : isFail ? 'text-rose-400 font-semibold' : 'text-slate-500'
                    }`}>
                      {step.detail}
                    </div>
                  </div>

                  <div className="shrink-0 pt-0.5">
                    {isPass && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {isFail && <XCircle className="w-4 h-4 text-rose-400" />}
                    {isCurrent && <RefreshCw className="w-4 h-4 text-foundry-cyan animate-spin" />}
                    {step.status === 'idle' && <Clock className="w-4 h-4 text-slate-600" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Wire HTTP Signatures Inspector */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border p-6 bg-surface overflow-y-auto space-y-4 font-mono text-xs">
          <div>
            <div className="text-[10px] uppercase text-slate-500 mb-1">Incoming Wire Envelope</div>
            <h2 className="text-sm font-bold text-white mb-0.5">HTTP Message Signatures (RFC 9421)</h2>
            <div className="text-[11px] text-slate-400">DPoP Proof of Possession (RFC 9449)</div>
          </div>

          <div className="space-y-2">
            <div className="text-slate-300 font-semibold flex items-center space-x-1.5">
              <Code2 className="w-3.5 h-3.5 text-foundry-cyan" />
              <span>Simulated Headers</span>
            </div>
            <pre className="p-3 rounded-lg bg-background border border-border text-[11px] text-slate-300 overflow-x-auto space-y-1">
              {Object.entries(sampleHeaders[activePreset]).map(([k, v]) => (
                <div key={k} className="leading-relaxed">
                  <span className="text-foundry-cyan">{k}</span>:{' '}
                  <span className={k.includes('Digest') && activePreset === 'tampered' ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                    {v}
                  </span>
                </div>
              ))}
            </pre>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-elevated border border-border space-y-2 text-[11px]">
            <div className="text-slate-300 font-semibold">Integrity Guarantees</div>
            <p className="text-slate-400 leading-relaxed font-sans">
              Unlike bearer tokens, the client possesses the private Ed25519 key bound to both the OAuth DPoP token and the HTTP signature. Intercepting the request provides zero authority because the signature binds method, path, and wire Content-Digest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

