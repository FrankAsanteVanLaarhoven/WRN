/**
 * Core type definitions for WRN-PASSPORT-COEXISTENCE-0.2 Platform
 */

export type PrincipalType = 'human' | 'organization' | 'agent' | 'service';

export interface WRNPassport {
  id: string; // urn:wrn:passport:...
  type: PrincipalType;
  displayName: string;
  avatar?: string;
  status: 'active' | 'suspended' | 'revoked';
  publicKey: {
    id: string;
    type: 'Ed25519VerificationKey2020' | 'JsonWebKey2020';
    controller: string;
    publicKeyMultibase?: string;
    jwk?: Record<string, string>;
  };
  recoveryDelegates: string[];
  issuedAt: string;
  contentDigest: string;
}

export interface CommissionedInstance {
  instanceId: string; // urn:wrn:passport:agent:inst-...
  name: string;
  relationshipId: string;
  publisher: {
    id: string;
    name: string;
    verifiedSignature: string;
  };
  operator: {
    id: string;
    name: string;
  };
  acquisitionType: 'purchase' | 'subscription' | 'licence' | 'lease' | 'invitation';
  memoryCompartmentId: string; // Isolated memory
  egressAllowlist: string[];
  allocatedKeyId: string;
  commissionedAt: string;
  status: 'active' | 'quarantined' | 'retired';
  executionMetrics: {
    tasksCompleted: number;
    tokensConsumed: number;
    sandboxViolations: number;
  };
}

export type OperationType =
  | 'discover'
  | 'read'
  | 'write'
  | 'derive'
  | 'share'
  | 'export'
  | 'decrypt'
  | 'execute'
  | 'advance_head'
  | 'approve'
  | 'dispose';

export interface AccessGrant {
  grantId: string; // urn:wrn:grant:...
  termsDigest: string; // sha256:...
  issuerId: string; // owner
  granteeId: string; // actor/agent
  accountableDelegator: string; // human delegator
  resourceSelector: string; // urn:wrn:res:... or branch/path
  permittedOperations: OperationType[];
  validFrom: string;
  validUntil: string;
  parentGrantId?: string;
  status: 'active' | 'revoked' | 'expired';
  revocationReason?: string;
  revokedAt?: string;
  targetZone:
    | 'owner_control'
    | 'personal_vault'
    | 'project_workspace'
    | 'agent_task'
    | 'review_quarantine'
    | 'accepted_release'
    | 'shared_exchange'
    | 'audit_log'
    | 'recovery_archive';
}

export interface SealedSubmission {
  sealId: string;
  branch: string;
  title: string;
  authorId: string; // actor
  delegatorId?: string;
  submittedAt: string;
  contentDigest: string; // sha256:...
  expectedHeadDigest?: string; // compare-and-swap
  parentSealId?: string;
  status: 'quarantined' | 'under_review' | 'accepted' | 'rejected';
  sizeBytes: number;
  payloadSummary: string;
  witnessReceipts: Array<{
    witnessId: string;
    timestamp: string;
    signature: string;
    checkpointRoot: string;
  }>;
  codeChanges?: Array<{
    filename: string;
    additions: number;
    deletions: number;
    diffSnippet: string;
  }>;
}

export interface SecurityFixtureResult {
  fixtureId: string;
  name: string;
  status: 'pass' | 'fail' | 'not_run';
  expectedOutcome: string;
  actualOutcome: string;
  durationMs: number;
  enforcementLayers: string[];
  logEntries: string[];
  testedAt?: string;
}

export interface AgentActivityStep {
  stepId: string;
  timestamp: string;
  instanceId: string;
  type: 'thought' | 'tool_call' | 'memory_write' | 'seal_submission' | 'security_check';
  content: string;
  metadata?: Record<string, unknown>;
  verified: boolean;
}

