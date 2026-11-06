import { WRNPassport, CommissionedInstance, AccessGrant, SealedSubmission, SecurityFixtureResult, AgentActivityStep } from '../types/wrn';
import { securityTests, evaluationPlan, branchPolicy, sourceRegister, requestProfile } from './contractsData';

export const INITIAL_PASSPORTS: WRNPassport[] = [
  {
    id: 'urn:wrn:passport:human:frank-vl-01',
    type: 'human',
    displayName: 'Frank Van Laarhoven (Owner)',
    status: 'active',
    publicKey: {
      id: 'urn:wrn:key:frank-ed25519-01',
      type: 'Ed25519VerificationKey2020',
      controller: 'urn:wrn:passport:human:frank-vl-01',
      publicKeyMultibase: 'z6Mku7XQW9rF7G7rN9N8Z1bV6VvT8M4K1P9L'
    },
    recoveryDelegates: ['urn:wrn:passport:human:aris-thorne-02', 'urn:wrn:vault:recovery-quorum-01'],
    issuedAt: '2026-11-05T00:00:00Z',
    contentDigest: 'sha256:d8e8fca2dc6781297e682613cfb4b1a45ae78a87313333da4c26477e77a28e7e'
  },
  {
    id: 'urn:wrn:passport:human:aris-thorne-02',
    type: 'human',
    displayName: 'Dr. Aris Thorne (Collaborator)',
    status: 'active',
    publicKey: {
      id: 'urn:wrn:key:aris-ed25519-01',
      type: 'Ed25519VerificationKey2020',
      controller: 'urn:wrn:passport:human:aris-thorne-02',
      publicKeyMultibase: 'z6Mkq4J8V9rF7G7rN9N8Z1bV6VvT8M4K1P9L'
    },
    recoveryDelegates: ['urn:wrn:passport:human:frank-vl-01'],
    issuedAt: '2026-11-05T01:15:00Z',
    contentDigest: 'sha256:4a38f37a5441d8e132049d5a15a81289cf0ff21297f6c6d299446d1dc49de2ea'
  },
  {
    id: 'urn:wrn:passport:agent:inst-nova-882',
    type: 'agent',
    displayName: 'Nova-CodeAssist-v2 (Instance #882)',
    status: 'active',
    publicKey: {
      id: 'urn:wrn:key:nova-instance-882',
      type: 'Ed25519VerificationKey2020',
      controller: 'urn:wrn:passport:agent:inst-nova-882',
      publicKeyMultibase: 'z6Mkt1L9P4rF7G7rN9N8Z1bV6VvT8M4K1P9L'
    },
    recoveryDelegates: ['urn:wrn:passport:human:frank-vl-01'],
    issuedAt: '2026-11-05T02:00:00Z',
    contentDigest: 'sha256:c18b76c8c94622b781e058e515d9a9b232c1401309d43513a96860362bc6e704'
  },
  {
    id: 'urn:wrn:passport:agent:inst-sentinel-419',
    type: 'agent',
    displayName: 'Sentinel-Audit-v1 (Instance #419)',
    status: 'active',
    publicKey: {
      id: 'urn:wrn:key:sentinel-instance-419',
      type: 'Ed25519VerificationKey2020',
      controller: 'urn:wrn:passport:agent:inst-sentinel-419',
      publicKeyMultibase: 'z6Mkr9P2W8rF7G7rN9N8Z1bV6VvT8M4K1P9L'
    },
    recoveryDelegates: ['urn:wrn:passport:human:frank-vl-01'],
    issuedAt: '2026-11-05T02:30:00Z',
    contentDigest: 'sha256:7e98a3b2c1d0f5e4a8b9c7d6e5f4a3b2c1d0f5e4a8b9c7d6e5f4a3b2c1d0f5e4'
  },
  {
    id: 'urn:wrn:passport:service:notary-witness-01',
    type: 'service',
    displayName: 'WRN Ledger Checkpoint Notary Service',
    status: 'active',
    publicKey: {
      id: 'urn:wrn:key:notary-witness-01',
      type: 'JsonWebKey2020',
      controller: 'urn:wrn:passport:service:notary-witness-01',
      jwk: { kty: 'OKP', crv: 'Ed25519', x: '11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo' }
    },
    recoveryDelegates: [],
    issuedAt: '2026-11-01T00:00:00Z',
    contentDigest: 'sha256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'
  }
];

export const INITIAL_INSTANCES: CommissionedInstance[] = [
  {
    instanceId: 'urn:wrn:passport:agent:inst-nova-882',
    name: 'Nova-CodeAssist-v2',
    relationshipId: 'urn:wrn:rel:sub:anthropic-nova-882',
    publisher: {
      id: 'urn:wrn:org:anthropic-synthetics',
      name: 'Anthropic Synthetics Corp',
      verifiedSignature: 'sig:ed25519:f9a8b7c6d5e4f3a2b1...'
    },
    operator: {
      id: 'urn:wrn:passport:human:frank-vl-01',
      name: 'Frank Van Laarhoven (Personal Workspace)'
    },
    acquisitionType: 'subscription',
    memoryCompartmentId: 'mem_comp_nova_882_isolated',
    egressAllowlist: ['api.github.com/repos/wrn/*', 'raw.githubusercontent.com/wrn/*'],
    allocatedKeyId: 'urn:wrn:key:nova-instance-882',
    commissionedAt: '2026-11-05T02:00:00Z',
    status: 'active',
    executionMetrics: {
      tasksCompleted: 14,
      tokensConsumed: 184500,
      sandboxViolations: 0
    }
  },
  {
    instanceId: 'urn:wrn:passport:agent:inst-sentinel-419',
    name: 'Sentinel-Audit-v1',
    relationshipId: 'urn:wrn:rel:lic:veritas-sentinel-419',
    publisher: {
      id: 'urn:wrn:org:veritas-formal-systems',
      name: 'Veritas Formal Systems Ltd',
      verifiedSignature: 'sig:ed25519:3b2a1c0f9e8d7c6b...'
    },
    operator: {
      id: 'urn:wrn:passport:human:frank-vl-01',
      name: 'Frank Van Laarhoven (Personal Workspace)'
    },
    acquisitionType: 'licence',
    memoryCompartmentId: 'mem_comp_sentinel_419_isolated',
    egressAllowlist: ['internal://verification-kernel'],
    allocatedKeyId: 'urn:wrn:key:sentinel-instance-419',
    commissionedAt: '2026-11-05T02:30:00Z',
    status: 'active',
    executionMetrics: {
      tasksCompleted: 8,
      tokensConsumed: 62100,
      sandboxViolations: 0
    }
  }
];

export const INITIAL_GRANTS: AccessGrant[] = [
  {
    grantId: 'urn:wrn:grant:owner-root-vault',
    termsDigest: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    issuerId: 'urn:wrn:passport:human:frank-vl-01',
    granteeId: 'urn:wrn:passport:human:frank-vl-01',
    accountableDelegator: 'urn:wrn:passport:human:frank-vl-01',
    resourceSelector: 'urn:wrn:vault:frank/*',
    permittedOperations: ['discover', 'read', 'write', 'derive', 'decrypt', 'approve'],
    validFrom: '2026-11-01T00:00:00Z',
    validUntil: '2027-11-01T00:00:00Z',
    status: 'active',
    targetZone: 'owner_control'
  },
  {
    grantId: 'urn:wrn:grant:nova-candidate-workspace',
    termsDigest: 'sha256:71c5040f7d54b857758c5a2c2627cb9b6a386121852c08ff9fa4f52601c36bd9',
    issuerId: 'urn:wrn:passport:human:frank-vl-01',
    granteeId: 'urn:wrn:passport:agent:inst-nova-882',
    accountableDelegator: 'urn:wrn:passport:human:frank-vl-01',
    resourceSelector: 'urn:wrn:branch:candidate/v0.2/contracts/*',
    permittedOperations: ['discover', 'read', 'write', 'derive', 'execute'],
    validFrom: '2026-11-05T02:00:00Z',
    validUntil: '2026-11-05T08:00:00Z',
    parentGrantId: 'urn:wrn:grant:owner-root-vault',
    status: 'active',
    targetZone: 'agent_task'
  },
  {
    grantId: 'urn:wrn:grant:aris-quarantine-review',
    termsDigest: 'sha256:8f4c2b9a7d3e1f0c5a8b9c7d6e5f4a3b2c1d0f5e4a8b9c7d6e5f4a3b2c1d0f5e',
    issuerId: 'urn:wrn:passport:human:frank-vl-01',
    granteeId: 'urn:wrn:passport:human:aris-thorne-02',
    accountableDelegator: 'urn:wrn:passport:human:frank-vl-01',
    resourceSelector: 'urn:wrn:branch:quarantine/review/*',
    permittedOperations: ['discover', 'read', 'approve'],
    validFrom: '2026-11-05T02:30:00Z',
    validUntil: '2026-11-05T18:00:00Z',
    parentGrantId: 'urn:wrn:grant:owner-root-vault',
    status: 'active',
    targetZone: 'review_quarantine'
  },
  {
    grantId: 'urn:wrn:grant:revoked-stale-access',
    termsDigest: 'sha256:5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    issuerId: 'urn:wrn:passport:human:frank-vl-01',
    granteeId: 'urn:wrn:passport:agent:inst-nova-882',
    accountableDelegator: 'urn:wrn:passport:human:frank-vl-01',
    resourceSelector: 'urn:wrn:vault:frank/sensitive-keys/*',
    permittedOperations: ['read'],
    validFrom: '2026-11-04T00:00:00Z',
    validUntil: '2026-11-06T00:00:00Z',
    parentGrantId: 'urn:wrn:grant:owner-root-vault',
    status: 'revoked',
    revocationReason: 'Emergency Revocation: Attempted read outside bounded task compartment',
    revokedAt: '2026-11-05T03:10:00Z',
    targetZone: 'personal_vault'
  }
];

export const INITIAL_SUBMISSIONS: SealedSubmission[] = [
  {
    sealId: 'urn:wrn:seal:init-blueprint-v0.1',
    branch: 'main',
    title: 'WRN Baseline Blueprint and Provenance Manifest',
    authorId: 'urn:wrn:passport:human:frank-vl-01',
    submittedAt: '2026-11-04T12:00:00Z',
    contentDigest: 'sha256:a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0f9e8d7c6b5',
    status: 'accepted',
    sizeBytes: 61730,
    payloadSummary: 'WRN_Passport_Coexistence_Blueprint.docx + Foundation Data Models',
    witnessReceipts: [
      {
        witnessId: 'urn:wrn:passport:service:notary-witness-01',
        timestamp: '2026-11-04T12:05:00Z',
        signature: 'sig:witness:a98b7c6d5e4f3a2b...',
        checkpointRoot: 'sha256:9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e'
      }
    ],
    codeChanges: [
      {
        filename: 'WRN_Passport_Coexistence_Blueprint.docx',
        additions: 473,
        deletions: 0,
        diffSnippet: 'Initial proposal 0.2: Human and agent coexistence architecture'
      }
    ]
  },
  {
    sealId: 'urn:wrn:seal:agent-patch-candidate-v0.2',
    branch: 'candidate/v0.2',
    title: 'Formalization of Branch Policy & Request Integrity Profile',
    authorId: 'urn:wrn:passport:agent:inst-nova-882',
    delegatorId: 'urn:wrn:passport:human:frank-vl-01',
    submittedAt: '2026-11-05T03:15:20Z',
    contentDigest: 'sha256:3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
    expectedHeadDigest: 'sha256:a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0f9e8d7c6b5',
    parentSealId: 'urn:wrn:seal:init-blueprint-v0.1',
    status: 'quarantined',
    sizeBytes: 32294,
    payloadSummary: 'branch_policy.yaml + request_profile.yaml + RFC 9421 Signature Spec',
    witnessReceipts: [
      {
        witnessId: 'urn:wrn:passport:service:notary-witness-01',
        timestamp: '2026-11-05T03:15:45Z',
        signature: 'sig:witness:3b2a1c0f9e8d...',
        checkpointRoot: 'sha256:8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0f5e4a8b'
      }
    ],
    codeChanges: [
      {
        filename: 'branch_policy.yaml',
        additions: 185,
        deletions: 12,
        diffSnippet: '+ 9-zone Branch Access Matrix and CAS advance_head verification'
      },
      {
        filename: 'request_profile.yaml',
        additions: 210,
        deletions: 0,
        diffSnippet: '+ 9-step Verification Pipeline: wire Content-Digest, DPoP, signatures'
      }
    ]
  }
];

export const INITIAL_SECURITY_FIXTURES: SecurityFixtureResult[] = (securityTests.fixtures || []).map((f: any, idx: number) => ({
  fixtureId: f.id || `SEC-${String(idx + 1).padStart(2, '0')}`,
  name: f.name || 'Security Fixture',
  status: 'not_run' as const,
  expectedOutcome: f.expected || 'Enforce verification boundaries',
  actualOutcome: 'Not executed yet (baseline state)',
  durationMs: 0,
  enforcementLayers: f.enforce || ['policy_kernel', 'storage'],
  logEntries: [
    `Contract requirement: ${f.arrange || ''}`,
    `Stimulus: ${f.stimulus || ''}`
  ]
}));

export const INITIAL_ACTIVITY_LOGS: AgentActivityStep[] = [
  {
    stepId: 'act-001',
    timestamp: '2026-11-05T03:10:00Z',
    instanceId: 'urn:wrn:passport:agent:inst-nova-882',
    type: 'thought',
    content: 'Reviewing bounded grant urn:wrn:grant:nova-candidate-workspace. Selector matches candidate/v0.2/contracts/*',
    verified: true
  },
  {
    stepId: 'act-002',
    timestamp: '2026-11-05T03:12:15Z',
    instanceId: 'urn:wrn:passport:agent:inst-nova-882',
    type: 'tool_call',
    content: 'tools.read_branch_policy(path="contracts/branch_policy.yaml")',
    metadata: { wireDigest: 'sha256:7b8a9c...validated' },
    verified: true
  },
  {
    stepId: 'act-003',
    timestamp: '2026-11-05T03:14:00Z',
    instanceId: 'urn:wrn:passport:agent:inst-nova-882',
    type: 'memory_write',
    content: 'Writing checkpoint state to isolated container mem_comp_nova_882_isolated. Zero cross-compartment leakage.',
    verified: true
  },
  {
    stepId: 'act-004',
    timestamp: '2026-11-05T03:15:20Z',
    instanceId: 'urn:wrn:passport:agent:inst-nova-882',
    type: 'seal_submission',
    content: 'Constructed sealed submission urn:wrn:seal:agent-patch-candidate-v0.2. Computed SHA-256 digest.',
    metadata: {
      contentDigest: 'sha256:3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
      status: 'routed_to_quarantine'
    },
    verified: true
  }
];

export { evaluationPlan, branchPolicy, requestProfile, sourceRegister, securityTests };
