import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  WRNPassport,
  CommissionedInstance,
  AccessGrant,
  SealedSubmission,
  SecurityFixtureResult,
  AgentActivityStep,
  OperationType
} from '../types/wrn';
import {
  INITIAL_PASSPORTS,
  INITIAL_INSTANCES,
  INITIAL_GRANTS,
  INITIAL_SUBMISSIONS,
  INITIAL_SECURITY_FIXTURES,
  INITIAL_ACTIVITY_LOGS,
  branchPolicy,
  evaluationPlan,
  requestProfile,
  sourceRegister
} from '../data/mockDb';
import { computeQualifiedDigest, computeGrantTermsDigest } from '../utils/crypto';
import {
  TopNavTab,
  ProjectServiceTab,
  DomainItem,
  ComputePlan,
  AgentInstance,
  AgentExecutionTier,
  GrokAgentInstance,
  IlluminationColor,
  ILLUMINATION_OPTIONS
} from '../types/console';
import {
  INITIAL_DOMAINS,
  COMPUTE_PLANS,
  INITIAL_LAP_TIMES,
  INITIAL_POSTGRES_USERS,
  MARKETPLACE_TOOLS,
  AI_ARENA_BENCHMARK
} from '../data/consoleMockData';

export type ActiveTab =
  | 'ontology'
  | 'lineage'
  | 'agent-trace'
  | 'grants'
  | 'request-verifier'
  | 'schemas'
  | 'security-harness'
  | 'policy-matrix'
  | 'evaluation'
  | 'sources';

interface ClientUser {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Developer' | 'Security Officer' | 'Viewer';
  avatarInitials: string;
  organization: string;
}

interface ConsoleContextType {
  // Client Authentication
  clientUser: ClientUser | null;
  loginClient: (email: string, name?: string, role?: ClientUser['role']) => void;
  logoutClient: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Illumination & Accent
  illuminationColor: IlluminationColor;
  setIlluminationColor: (color: IlluminationColor) => void;

  // Console Top Navigation
  topNavTab: TopNavTab;
  setTopNavTab: (tab: TopNavTab) => void;
  projectServiceTab: ProjectServiceTab;
  setProjectServiceTab: (tab: ProjectServiceTab) => void;

  // Domains & Routing
  domains: DomainItem[];
  addDomain: (domain: string) => Promise<void>;
  verifyDomainDns: (id: string) => Promise<void>;

  // Compute & Cost Analysis
  computePlans: ComputePlan[];

  // Agent Harness & MCP Runtime
  grokAgents: AgentInstance[];
  executeGrokTask: (prompt: string, model?: AgentExecutionTier) => Promise<void>;

  // Database Queries & Tables
  lapTimes: any[];
  postgresUsers: any[];
  marketplaceTools: any[];
  aiArenaBenchmarks: any[];

  // Telemetry metrics
  telemetry: {
    bandwidth: string;
    requests: string;
    storage: string;
    executions: string;
    compute: string;
  };

  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeBranch: string;
  setActiveBranch: (b: string) => void;
  isCmdKOpen: boolean;
  setIsCmdKOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  passports: WRNPassport[];
  instances: CommissionedInstance[];
  grants: AccessGrant[];
  submissions: SealedSubmission[];
  securityResults: SecurityFixtureResult[];
  activityLogs: AgentActivityStep[];

  // Statistics
  kpis: any[];
  sources: any[];
  zones: any[];

  // Actions
  commissionAgent: (data: { name: string; publisher: string; acquisitionType: any; egress: string[] }) => Promise<void>;
  issueGrant: (data: { granteeId: string; resourceSelector: string; operations: OperationType[]; targetZone: any; durationHours: number }) => Promise<void>;
  revokeGrant: (grantId: string, reason: string) => Promise<void>;
  sealSubmission: (data: { branch: string; title: string; authorId: string; content: string; delegatorId?: string }) => Promise<void>;
  promoteSubmission: (sealId: string) => Promise<void>;
  runSecurityFixture: (fixtureId: string) => Promise<void>;
  runAllSecurityFixtures: () => Promise<void>;
  runAgentTaskStep: () => Promise<void>;

  // Online revocation telemetry
  revocationStats: {
    lastRevocationLatencyMs: number;
    targetLatencySec: number;
    activeCachePurged: boolean;
    revocationCount: number;
  };
}

const ConsoleContext = createContext<ConsoleContextType | null>(null);

export const ConsoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clientUser, setClientUser] = useState<ClientUser | null>(() => {
    const saved = localStorage.getItem('wrn_client_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    // Default logged in client profile
    return {
      id: 'usr_client_01',
      name: 'Frank Van Laarhoven',
      email: 'frank@openmeta.io',
      role: 'Owner',
      avatarInitials: 'FL',
      organization: 'Personal projects'
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const loginClient = (email: string, name?: string, role: ClientUser['role'] = 'Developer') => {
    const displayName = name || email.split('@')[0];
    const initials = displayName
      .split(' ')
      .map(p => p[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || displayName.slice(0, 2).toUpperCase();

    const user: ClientUser = {
      id: `usr_${Date.now()}`,
      name: displayName,
      email,
      role,
      avatarInitials: initials,
      organization: 'Personal projects'
    };
    setClientUser(user);
    localStorage.setItem('wrn_client_user', JSON.stringify(user));
  };

  const logoutClient = () => {
    setClientUser(null);
    localStorage.removeItem('wrn_client_user');
  };

  const [illuminationColor, setIlluminationColorState] = useState<IlluminationColor>(() => {
    const saved = localStorage.getItem('wrn_illumination_color');
    if (saved && ['cyan', 'white', 'green', 'purple', 'amber', 'rose'].includes(saved)) {
      return saved as IlluminationColor;
    }
    return 'cyan';
  });

  const setIlluminationColor = (color: IlluminationColor) => {
    setIlluminationColorState(color);
    localStorage.setItem('wrn_illumination_color', color);
  };

  useEffect(() => {
    const opt = ILLUMINATION_OPTIONS.find(o => o.id === illuminationColor) || ILLUMINATION_OPTIONS[0];
    document.documentElement.style.setProperty('--illum-color', opt.hex);
    document.documentElement.style.setProperty('--illum-rgb', opt.rgb);
    document.documentElement.style.setProperty('--illum-glow', `rgba(${opt.rgb}, 0.35)`);
  }, [illuminationColor]);

  const [topNavTab, setTopNavTab] = useState<TopNavTab>('projects');
  const [projectServiceTab, setProjectServiceTab] = useState<ProjectServiceTab>('overview');
  const [domains, setDomains] = useState<DomainItem[]>(INITIAL_DOMAINS);
  const [computePlans] = useState<ComputePlan[]>(COMPUTE_PLANS);
  const [lapTimes, setLapTimes] = useState(INITIAL_LAP_TIMES);
  const [postgresUsers] = useState(INITIAL_POSTGRES_USERS);
  const [marketplaceTools] = useState(MARKETPLACE_TOOLS);
  const [aiArenaBenchmarks] = useState(AI_ARENA_BENCHMARK);
  const [telemetry, setTelemetry] = useState({
    bandwidth: '48.2 MB',
    requests: '198.4k',
    storage: '3.1 GB',
    executions: '1,420',
    compute: '0.84 GBH'
  });

  const [grokAgents, setGrokAgents] = useState<AgentInstance[]>([
    {
      id: 'agent-inst-01',
      name: 'Autonomous Agent',
      model: 'Edge-Reasoning',
      status: 'idle',
      taskPrompt: "Query Postgres for Friday's new users and verify email conversion rate.",
      mcpServers: ['mcp.wrn.io', 'postgres.mcp', 'edge.proxy.mcp'],
      tokensPerSec: 184,
      costEstimate: 0.04,
      steps: [
        { id: 's1', type: 'reasoning', text: "Connecting to WRN Postgres MCP using skill 'wrn-postgres'...", timestamp: '03:15:02', status: 'success' },
        { id: 's2', type: 'db_query', text: "SELECT * FROM users WHERE created_at >= '2026-08-21'", timestamp: '03:15:04', status: 'success' },
        { id: 's3', type: 'security_gate', text: "Verified 2,184 new rows. Email verification rate at 91.2%. Output bounded to tenant.", timestamp: '03:15:05', status: 'success' }
      ]
    }
  ]);

  const addDomain = async (domainName: string) => {
    const clean = domainName.trim().toLowerCase();
    const newDom: DomainItem = {
      id: `dom-${Date.now().toString(36)}`,
      domain: clean,
      status: 'verified',
      sslStatus: 'active',
      registrar: 'WRN Edge Registrar (Real-time Verified)',
      pricePerYear: 12.00,
      dnsRecords: [
        { type: 'A', host: '@', value: '185.199.108.153', status: 'valid' },
        { type: 'CNAME', host: 'www', value: `${clean}.edge.wrn.network`, status: 'valid' },
        { type: 'TXT', host: '_wrn-challenge', value: `wrn-verification=${Math.random().toString(36).substring(2, 12)}`, status: 'valid' }
      ],
      nginxConfig: `server {
    listen 443 ssl http2;
    server_name ${clean} www.${clean};

    ssl_certificate /etc/letsencrypt/live/${clean}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${clean}/privkey.pem;

    # Edge Reverse Proxy & Route Rules
    location / {
        proxy_pass http://upstream_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto https;
    }
}`
    };
    setDomains(prev => [newDom, ...prev]);
  };

  const verifyDomainDns = async (id: string) => {
    setDomains(prev => prev.map(d => d.id === id ? { ...d, status: 'verified', sslStatus: 'active' } : d));
  };

  const executeGrokTask = async (prompt: string, model: AgentExecutionTier = 'Edge-Reasoning') => {
    const newAgent: AgentInstance = {
      id: `agent-${Date.now().toString(36)}`,
      name: `Autonomous Agent`,
      model,
      status: 'running',
      taskPrompt: prompt,
      mcpServers: ['mcp.wrn.io', 'postgres.mcp', 'edge.proxy.mcp'],
      tokensPerSec: 210,
      costEstimate: 0.02,
      steps: [
        { id: '1', type: 'reasoning', text: `Analyzing task with execution tier [${model}]: "${prompt}"`, timestamp: new Date().toLocaleTimeString(), status: 'success' },
        { id: '2', type: 'tool_call', text: 'Executing MCP tool wrn.database.queryTables via Model Context Protocol...', timestamp: new Date().toLocaleTimeString(), status: 'success' },
        { id: '3', type: 'security_gate', text: 'Enforcing WRN-COEXISTENCE-0.2 memory compartment boundaries and RFC 9421 Merkle seal.', timestamp: new Date().toLocaleTimeString(), status: 'success' }
      ]
    };
    setGrokAgents(prev => [newAgent, ...prev]);
  };

  const [activeTab, setActiveTab] = useState<ActiveTab>('ontology');
  const [activeBranch, setActiveBranch] = useState<string>('candidate/v0.2');
  const [isCmdKOpen, setIsCmdKOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [passports, setPassports] = useState<WRNPassport[]>(INITIAL_PASSPORTS);
  const [instances, setInstances] = useState<CommissionedInstance[]>(INITIAL_INSTANCES);
  const [grants, setGrants] = useState<AccessGrant[]>(INITIAL_GRANTS);
  const [submissions, setSubmissions] = useState<SealedSubmission[]>(INITIAL_SUBMISSIONS);
  const [securityResults, setSecurityResults] = useState<SecurityFixtureResult[]>(INITIAL_SECURITY_FIXTURES);
  const [activityLogs, setActivityLogs] = useState<AgentActivityStep[]>(INITIAL_ACTIVITY_LOGS);

  const [revocationStats, setRevocationStats] = useState({
    lastRevocationLatencyMs: 840,
    targetLatencySec: 60,
    activeCachePurged: true,
    revocationCount: 1
  });

  // Global hotkey: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdKOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commissionAgent = async ({
    name,
    publisher,
    acquisitionType,
    egress
  }: {
    name: string;
    publisher: string;
    acquisitionType: any;
    egress: string[];
  }) => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const instanceId = `urn:wrn:passport:agent:inst-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${randomSuffix}`;
    const keyId = `urn:wrn:key:${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${randomSuffix}`;
    const memoryId = `mem_comp_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${randomSuffix}_isolated`;

    const passportDigest = await computeQualifiedDigest(JSON.stringify({ instanceId, name, publisher, memoryId }));

    const newPassport: WRNPassport = {
      id: instanceId,
      type: 'agent',
      displayName: `${name} (Instance #${randomSuffix})`,
      status: 'active',
      publicKey: {
        id: keyId,
        type: 'Ed25519VerificationKey2020',
        controller: instanceId,
        publicKeyMultibase: `z6Mk${Math.random().toString(36).substring(2, 10).toUpperCase()}rF7G7rN9N8Z1bV6VvT8M4K1P9L`
      },
      recoveryDelegates: ['urn:wrn:passport:human:frank-vl-01'],
      issuedAt: new Date().toISOString(),
      contentDigest: passportDigest
    };

    const newInstance: CommissionedInstance = {
      instanceId,
      name,
      relationshipId: `urn:wrn:rel:${acquisitionType}:${publisher.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${randomSuffix}`,
      publisher: {
        id: `urn:wrn:org:${publisher.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: publisher,
        verifiedSignature: 'sig:ed25519:valid_publisher_proof'
      },
      operator: {
        id: 'urn:wrn:passport:human:frank-vl-01',
        name: 'Frank Van Laarhoven (Personal Workspace)'
      },
      acquisitionType,
      memoryCompartmentId: memoryId,
      egressAllowlist: egress.length > 0 ? egress : ['https://api.wrn.internal/*'],
      allocatedKeyId: keyId,
      commissionedAt: new Date().toISOString(),
      status: 'active',
      executionMetrics: {
        tasksCompleted: 0,
        tokensConsumed: 0,
        sandboxViolations: 0
      }
    };

    setPassports(prev => [newPassport, ...prev]);
    setInstances(prev => [newInstance, ...prev]);

    // Append Agent audit step
    setActivityLogs(prev => [
      {
        stepId: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        instanceId,
        type: 'thought',
        content: `Commissioned fresh agent instance ${name} (#${randomSuffix}). Dedicated memory compartment ${memoryId} isolated.`,
        verified: true
      },
      ...prev
    ]);
  };

  const issueGrant = async ({
    granteeId,
    resourceSelector,
    operations,
    targetZone,
    durationHours
  }: {
    granteeId: string;
    resourceSelector: string;
    operations: OperationType[];
    targetZone: any;
    durationHours: number;
  }) => {
    const grantId = `urn:wrn:grant:scoped-${Date.now().toString(36)}`;
    const now = new Date();
    const expiry = new Date(now.getTime() + durationHours * 3600 * 1000);

    const grantContent = {
      grantId,
      issuerId: 'urn:wrn:passport:human:frank-vl-01',
      granteeId,
      accountableDelegator: 'urn:wrn:passport:human:frank-vl-01',
      resourceSelector,
      permittedOperations: operations,
      validFrom: now.toISOString(),
      validUntil: expiry.toISOString(),
      targetZone
    };

    const termsDigest = await computeGrantTermsDigest(grantContent);

    const newGrant: AccessGrant = {
      ...grantContent,
      termsDigest,
      status: 'active'
    };

    setGrants(prev => [newGrant, ...prev]);

    setActivityLogs(prev => [
      {
        stepId: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        instanceId: granteeId,
        type: 'security_check',
        content: `Owner issued scoped access grant ${grantId} targeting ${targetZone} [${operations.join(', ')}]. Terms digest: ${termsDigest.slice(0, 20)}...`,
        verified: true
      },
      ...prev
    ]);
  };

  const revokeGrant = async (grantId: string, reason: string) => {
    const startTime = performance.now();
    const revokedAt = new Date().toISOString();

    setGrants(prev =>
      prev.map(g => (g.grantId === grantId ? { ...g, status: 'revoked', revocationReason: reason, revokedAt } : g))
    );

    const latencyMs = Math.round((performance.now() - startTime) + Math.random() * 20 + 15);

    setRevocationStats(prev => ({
      ...prev,
      lastRevocationLatencyMs: latencyMs,
      activeCachePurged: true,
      revocationCount: prev.revocationCount + 1
    }));

    setActivityLogs(prev => [
      {
        stepId: `act-${Date.now()}`,
        timestamp: revokedAt,
        instanceId: 'urn:wrn:passport:human:frank-vl-01',
        type: 'security_check',
        content: `ONLINE REVOCATION EXECUTED: Grant ${grantId} terminated. Status propagated to all enforcement kernels in ${latencyMs}ms (P95 target <= 60,000ms). Reason: ${reason}`,
        verified: true
      },
      ...prev
    ]);
  };

  const sealSubmission = async ({
    branch,
    title,
    authorId,
    content,
    delegatorId
  }: {
    branch: string;
    title: string;
    authorId: string;
    content: string;
    delegatorId?: string;
  }) => {
    const sealId = `urn:wrn:seal:${Date.now().toString(36)}`;
    const digest = await computeQualifiedDigest(content);
    const parent = submissions.find(s => s.branch === branch) || submissions[0];

    const newSeal: SealedSubmission = {
      sealId,
      branch,
      title,
      authorId,
      delegatorId: delegatorId || 'urn:wrn:passport:human:frank-vl-01',
      submittedAt: new Date().toISOString(),
      contentDigest: digest,
      expectedHeadDigest: parent ? parent.contentDigest : undefined,
      parentSealId: parent ? parent.sealId : undefined,
      status: 'quarantined',
      sizeBytes: new TextEncoder().encode(content).length,
      payloadSummary: title,
      witnessReceipts: [
        {
          witnessId: 'urn:wrn:passport:service:notary-witness-01',
          timestamp: new Date().toISOString(),
          signature: `sig:witness:${Math.random().toString(36).substring(2, 14)}`,
          checkpointRoot: await computeQualifiedDigest(`root-${Date.now()}`)
        }
      ],
      codeChanges: [
        {
          filename: 'sealed_manifest.json',
          additions: 45,
          deletions: 0,
          diffSnippet: content.slice(0, 160) + '...'
        }
      ]
    };

    setSubmissions(prev => [newSeal, ...prev]);

    setActivityLogs(prev => [
      {
        stepId: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        instanceId: authorId,
        type: 'seal_submission',
        content: `Created immutable sealed submission ${sealId} on branch ${branch}. Bound SHA-256: ${digest}. Held in quarantine for independent review.`,
        verified: true
      },
      ...prev
    ]);
  };

  const promoteSubmission = async (sealId: string) => {
    setSubmissions(prev =>
      prev.map(s => (s.sealId === sealId ? { ...s, status: 'accepted', branch: 'main' } : s))
    );

    setActivityLogs(prev => [
      {
        stepId: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        instanceId: 'urn:wrn:passport:human:aris-thorne-02',
        type: 'security_check',
        content: `Independent reviewer approved and promoted seal ${sealId} from quarantine to main [accepted_release]. Expected-head CAS verified.`,
        verified: true
      },
      ...prev
    ]);
  };

  const runSecurityFixture = async (fixtureId: string) => {
    const startTime = performance.now();
    // Simulate real enforcement across all 5 contract layers: schema, ingestion, signature_verifier, policy_kernel, storage
    await new Promise(r => setTimeout(r, 120));
    const duration = Math.round(performance.now() - startTime);

    setSecurityResults(prev =>
      prev.map(item => {
        if (item.fixtureId !== fixtureId) return item;

        let actualOutcome = 'Boundary enforced: Operation verified and logged according to contract.';
        let logs = [...item.logEntries];

        if (fixtureId === 'SEC-01') {
          actualOutcome = 'PASS: Admitted byte-bound seal and permitted authorized read; zero implicit authority granted.';
          logs.push(`Layer [schema]: Draft 2020-12 valid.`);
          logs.push(`Layer [signature_verifier]: RFC 9421 proof valid.`);
          logs.push(`Layer [policy_kernel]: Grant terms and parent chain verified.`);
        } else if (fixtureId === 'SEC-02') {
          actualOutcome = 'PASS: Ingestion rejected mutable/altered bytes. SHA-256 checksum mismatch (400 Bad Digest).';
          logs.push(`Layer [storage]: Wire digest differs from manifest commitment.`);
          logs.push(`Layer [ingestion]: Tamper attempt blocked before admission.`);
        } else if (fixtureId === 'SEC-03') {
          actualOutcome = 'PASS: Replayed nonce and mismatched body rejected with 401 Replay Detected.';
          logs.push(`Layer [signature_verifier]: DPoP jti nonce already present in freshness window.`);
          logs.push(`Layer [policy_kernel]: Operation reservation denied.`);
        } else if (fixtureId === 'SEC-04') {
          actualOutcome = 'PASS: Stale cached token rejected. Kernel verified online revocation status in <1ms.';
          logs.push(`Layer [policy_kernel]: Grant status list reports REVOKED.`);
          logs.push(`Layer [storage]: Enforcement point denied access to resource.`);
        } else if (fixtureId === 'SEC-05') {
          actualOutcome = 'PASS: CAS advance_head rejected due to mismatched expected_head pointer.';
          logs.push(`Layer [policy_kernel]: Current branch head differs from expectedHead.`);
        } else if (fixtureId === 'SEC-06') {
          actualOutcome = 'PASS: Cross-branch reference prohibited. Boundary isolation retained.';
          logs.push(`Layer [policy_kernel]: Branch access matrix denies cross-branch transversal.`);
        } else {
          actualOutcome = `PASS: ${item.expectedOutcome}. Verified against pinned policy kernel.`;
          logs.push(`Enforcement layers [${item.enforcementLayers.join(', ')}] certified contract.`);
        }

        return {
          ...item,
          status: 'pass',
          actualOutcome,
          durationMs: duration,
          logEntries: logs,
          testedAt: new Date().toISOString()
        };
      })
    );
  };

  const runAllSecurityFixtures = async () => {
    for (const fix of securityResults) {
      await runSecurityFixture(fix.fixtureId);
    }
  };

  const runAgentTaskStep = async () => {
    const instance = instances[0];
    const steps = [
      {
        type: 'thought' as const,
        content: `Validating task boundaries against grant ${grants[1]?.grantId || 'default'}. Scope: candidate/v0.2/contracts/*`
      },
      {
        type: 'tool_call' as const,
        content: `tools.generate_rfc9421_signature(uri="/contracts/eval", method="POST")`,
        metadata: { dpop: 'DPoP jti: ' + Math.random().toString(36).substring(2, 10) }
      },
      {
        type: 'memory_write' as const,
        content: `Flushing ephemeral token count (1,420 tokens) into isolated container ${instance.memoryCompartmentId}.`
      },
      {
        type: 'security_check' as const,
        content: `Kernel verified non-leakage to personal_vault. Egress restricted to ${instance.egressAllowlist.join(', ')}.`
      }
    ];

    const chosen = steps[Math.floor(Math.random() * steps.length)];
    setActivityLogs(prev => [
      {
        stepId: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        instanceId: instance.instanceId,
        type: chosen.type,
        content: chosen.content,
        metadata: chosen.metadata,
        verified: true
      },
      ...prev
    ]);

    setInstances(prev =>
      prev.map(i =>
        i.instanceId === instance.instanceId
          ? {
              ...i,
              executionMetrics: {
                ...i.executionMetrics,
                tasksCompleted: i.executionMetrics.tasksCompleted + 1,
                tokensConsumed: i.executionMetrics.tokensConsumed + 1250
              }
            }
          : i
      )
    );
  };

  return (
    <ConsoleContext.Provider
      value={{
        clientUser,
        loginClient,
        logoutClient,
        isAuthModalOpen,
        setIsAuthModalOpen,
        illuminationColor,
        setIlluminationColor,
        topNavTab,
        setTopNavTab,
        projectServiceTab,
        setProjectServiceTab,
        domains,
        addDomain,
        verifyDomainDns,
        computePlans,
        grokAgents,
        executeGrokTask,
        lapTimes,
        postgresUsers,
        marketplaceTools,
        aiArenaBenchmarks,
        telemetry,
        activeTab,
        setActiveTab,
        activeBranch,
        setActiveBranch,
        isCmdKOpen,
        setIsCmdKOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        passports,
        instances,
        grants,
        submissions,
        securityResults,
        activityLogs,
        kpis: evaluationPlan.kpis || [],
        sources: sourceRegister.sources || [],
        zones: branchPolicy.branch_access_matrix || [],
        commissionAgent,
        issueGrant,
        revokeGrant,
        sealSubmission,
        promoteSubmission,
        runSecurityFixture,
        runAllSecurityFixtures,
        runAgentTaskStep,
        revocationStats
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};

export const useConsole = () => {
  const ctx = useContext(ConsoleContext);
  if (!ctx) throw new Error('useConsole must be used within ConsoleProvider');
  return ctx;
};
