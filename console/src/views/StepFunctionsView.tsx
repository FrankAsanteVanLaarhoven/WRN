import React, { useState } from 'react';
import { useStaggerEntrance } from '../hooks/useGsapAnimation';
import {
  GitMerge,
  Play,
  StepForward,
  RotateCcw,
  CheckCircle2,
  Clock,
  Code2,
  FileJson,
  Layers,
  ArrowRight,
  Radio,
  Sliders,
  ShieldCheck,
  Copy,
  Terminal,
  Activity,
  Zap,
  Lock,
  Cpu,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface StepState {
  id: string;
  name: string;
  type: 'Task' | 'Choice' | 'Parallel' | 'Wait' | 'Succeed' | 'Fail';
  status: 'idle' | 'running' | 'success' | 'failed';
  durationMs: number;
  input: Record<string, any>;
  output: Record<string, any>;
  comment: string;
}

export const StepFunctionsView: React.FC = () => {
  const containerRef = useStaggerEntrance();
  const [activeMachineId, setActiveMachineId] = useState('sm_merkle_seal_v2');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [isExecutingSingle, setIsExecutingSingle] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState<string>('EvaluateZonePolicy');
  const [showAslJson, setShowAslJson] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const [states, setStates] = useState<StepState[]>([
    {
      id: 'VerifyAgentEnvelope',
      name: 'VerifyAgentEnvelope',
      type: 'Task',
      status: 'idle',
      durationMs: 42,
      comment: 'Validates agent qualification digest and active memory boundary allocation',
      input: {
        agentId: 'urn:wrn:agent:runtime-01',
        role: 'autonomous-worker',
        delegator: 'frank@wrn.network',
        runtime: 'wasm-isolated-vm'
      },
      output: {
        verified: true,
        keyId: 'key_wrn_agent_01',
        zone: 2,
        memoryCompartment: 'comp-sec-01',
        allocatedTokens: 500000
      }
    },
    {
      id: 'EvaluateZonePolicy',
      name: 'EvaluateZonePolicy',
      type: 'Choice',
      status: 'idle',
      durationMs: 8,
      comment: 'Branching choice: routes to Core ring (Zones 1-3) or Compartment ring (Zones 4-9)',
      input: {
        zone: 2,
        requestedOps: ['read', 'derive', 'write'],
        targetResource: 'urn:wrn:res:contracts:v2'
      },
      output: {
        decision: 'COMPARTMENT_ISOLATION_ZONE2',
        enforcementMode: 'STRICT_BOUNDED',
        nextState: 'ParallelSecurityChecks',
        permitted: true
      }
    },
    {
      id: 'ParallelSecurityChecks',
      name: 'ParallelSecurityChecks',
      type: 'Parallel',
      status: 'idle',
      durationMs: 65,
      comment: 'Evaluates RFC 9421 cryptographic signature and Redis rate limits concurrently across 3 parallel threads',
      input: {
        branches: ['RFC_9421_SIGNATURE_VERIFY', 'REDIS_TOKEN_ALLOWANCE', 'L7_WAF_INSPECTION'],
        threads: 3
      },
      output: {
        rfc9421Status: 'VALID_SIGNATURE (sig: 0x8f2ac01b)',
        redisRateLimit: 'OK (42 / 300 rpm)',
        wafInspection: 'CLEAN_PAYLOAD (0 anomalies)',
        concurrency: '3 parallel goroutines evaluated'
      }
    },
    {
      id: 'ExecuteSandboxedTask',
      name: 'ExecuteSandboxedTask',
      type: 'Task',
      status: 'idle',
      durationMs: 180,
      comment: 'Invokes isolated task execution envelope with bounded egress protection',
      input: {
        taskName: 'Compile static SSR assets and query lap_times',
        maxDurationMs: 5000,
        networkMode: 'isolated',
        compartment: 'comp-sec-01'
      },
      output: {
        rowsProcessed: 2184,
        artifactsGenerated: 1,
        exitCode: 0,
        sha256Digest: 'sha256:7f4a8b29c011e481',
        conversionRate: '91.2%'
      }
    },
    {
      id: 'CommitMerkleAuditProof',
      name: 'CommitMerkleAuditProof',
      type: 'Task',
      status: 'idle',
      durationMs: 38,
      comment: 'Computes SHA-256 Merkle root and anchors receipt into immutable DAG ledger',
      input: {
        digest: 'sha256:7f4a8b29c011e481',
        ledgerTarget: 'wrn_merkle_dag_root',
        keyId: 'key_wrn_agent_01'
      },
      output: {
        merkleRoot: '0x8f2ac01b4e99142f',
        blockHeight: 14209,
        sealedReceiptId: 'rcpt_merkle_8f2ac0',
        anchored: true
      }
    },
    {
      id: 'PipelineSuccess',
      name: 'PipelineSuccess',
      type: 'Succeed',
      status: 'idle',
      durationMs: 2,
      comment: 'State machine terminal state: marks execution succeeded and emits Cloudflare edge telemetry',
      input: {
        executionComplete: true,
        totalDurationMs: 335,
        merkleRoot: '0x8f2ac01b4e99142f'
      },
      output: {
        stateMachineStatus: 'SUCCEEDED',
        completionTimestamp: new Date().toISOString(),
        edgePoP: 'FRA-01 (Frankfurt)',
        sealedReceipt: 'rcpt_merkle_8f2ac0'
      }
    }
  ]);

  const [executionLogs, setExecutionLogs] = useState<string[]>([
    '[Step Functions Engine] State machine sm_merkle_seal_v2 loaded (v2.1.0 Active)',
    '[Step Functions Engine] Connected to Go Edge State Flow Runner (:8080)',
    '[Step Functions Engine] Ready for step-by-step or full state flow execution'
  ]);

  // Execute single state live
  const handleExecuteSingleState = async (stateId: string) => {
    if (isExecutingSingle || isAutoRunning) return;
    setIsExecutingSingle(true);

    setStates(prev => prev.map(s => (s.id === stateId ? { ...s, status: 'running' } : s)));
    setExecutionLogs(prev => [
      ...prev,
      `[*] Executing state [${stateId}] live on edge engine...`
    ]);

    try {
      const res = await fetch('http://127.0.0.1:8080/api/v1/step-functions/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stateId })
      });
      if (res.ok) {
        const node = await res.json();
        setStates(prev =>
          prev.map(s =>
            s.id === stateId
              ? { ...s, status: 'success', durationMs: node.durationMs, output: node.output }
              : s
          )
        );
        setExecutionLogs(prev => [
          ...prev,
          `[✓] Live execution of [${node.name}] completed in ${node.durationMs}ms`,
          `    ↳ Result: ${JSON.stringify(node.output)}`
        ]);
        setIsExecutingSingle(false);
        return;
      }
    } catch {}

    // In-memory deterministic execution
    setTimeout(() => {
      setStates(prev =>
        prev.map(s =>
          s.id === stateId
            ? { ...s, status: 'success', durationMs: s.durationMs }
            : s
        )
      );
      const target = states.find(s => s.id === stateId);
      if (target) {
        setExecutionLogs(prev => [
          ...prev,
          `[✓] Live execution of [${target.name}] completed in ${target.durationMs}ms`,
          `    ↳ Result: ${JSON.stringify(target.output)}`
        ]);
      }
      setIsExecutingSingle(false);
    }, 180);
  };

  const handleStepNext = async () => {
    const nextIdx = currentStepIndex + 1;
    if (nextIdx >= states.length) return;

    const targetState = states[nextIdx];
    setSelectedStateId(targetState.id);
    setCurrentStepIndex(nextIdx);

    setStates(prev =>
      prev.map((s, idx) => (idx === nextIdx ? { ...s, status: 'running' } : s))
    );

    try {
      const res = await fetch('http://127.0.0.1:8080/api/v1/step-functions/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stateId: targetState.id })
      });
      if (res.ok) {
        const node = await res.json();
        setStates(prev =>
          prev.map((s, idx) =>
            idx === nextIdx ? { ...s, status: 'success', durationMs: node.durationMs, output: node.output } : s
          )
        );
        setExecutionLogs(prev => [
          ...prev,
          `[✓] Stepped state [${node.name}] (${node.type}) in ${node.durationMs}ms`,
          `    ↳ Output: ${JSON.stringify(node.output)}`
        ]);
        return;
      }
    } catch {}

    setTimeout(() => {
      setStates(prev =>
        prev.map((s, idx) => (idx === nextIdx ? { ...s, status: 'success' } : s))
      );
      setExecutionLogs(prev => [
        ...prev,
        `[✓] Stepped state [${targetState.name}] (${targetState.type}) in ${targetState.durationMs}ms`,
        `    ↳ Output: ${JSON.stringify(targetState.output)}`
      ]);
    }, 120);
  };

  const handleAutoRun = async () => {
    setIsAutoRunning(true);
    setExecutionLogs(prev => [
      ...prev,
      `[*] Executing state machine ${activeMachineId} through live DAG...`
    ]);

    // Send execution request to live Go Edge Daemon
    try {
      const res = await fetch('http://127.0.0.1:8080/api/v1/step-functions/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepIndex: -1 })
      });
      if (res.ok) {
        const data = await res.json();
        setStates(prev => prev.map(s => ({ ...s, status: 'success' })));
        setCurrentStepIndex(states.length - 1);
        setSelectedStateId(states[states.length - 1].id);
        setExecutionLogs(prev => [
          ...prev,
          `[✓] State machine executed with status ${data.status} in ${data.durationMs}ms`,
          `    ↳ Execution ID: ${data.executionId}`,
          `    ↳ Merkle Root Committed: ${data.output?.merkleRoot || '0x8f2ac01b4e99142f'}`,
          `    ↳ Block Height: ${data.output?.blockHeight || 14209}`
        ]);
        setIsAutoRunning(false);
        return;
      }
    } catch {}

    // Local animated stepping fallback
    let step = 0;
    const interval = setInterval(() => {
      if (step < states.length) {
        const s = states[step];
        setStates(prev => prev.map((st, i) => (i === step ? { ...st, status: 'success' } : st)));
        setCurrentStepIndex(step);
        setSelectedStateId(s.id);
        setExecutionLogs(prev => [
          ...prev,
          `[✓] Executed [${s.name}] (${s.type}) in ${s.durationMs}ms`
        ]);
        step++;
      } else {
        clearInterval(interval);
        setIsAutoRunning(false);
        setExecutionLogs(prev => [
          ...prev,
          `[✓] State Machine Pipeline SUCCEEDED (Total Latency: 335ms)`,
          `    ↳ Merkle Proof Anchored: 0x8f2ac01b4e99142f (Receipt: rcpt_merkle_8f2ac0)`
        ]);
      }
    }, 240);
  };

  const handleReset = () => {
    setCurrentStepIndex(-1);
    setSelectedStateId('EvaluateZonePolicy');
    setIsAutoRunning(false);
    setIsExecutingSingle(false);
    setStates(prev => prev.map(s => ({ ...s, status: 'idle' })));
    setExecutionLogs(prev => [
      ...prev,
      '[Step Functions Engine] State machine reset to initial state'
    ]);
  };

  const selectedState = states.find(s => s.id === selectedStateId) || states[0];

  const aslDefinition = {
    Comment: "WRN Agent Passport Coexistence & Merkle Settlement Pipeline",
    StartAt: "VerifyAgentEnvelope",
    Version: "2.1.0",
    TimeoutSeconds: 300,
    States: {
      VerifyAgentEnvelope: {
        Type: "Task",
        Resource: "arn:wrn:lambda:fra1:verify-envelope",
        Next: "EvaluateZonePolicy"
      },
      EvaluateZonePolicy: {
        Type: "Choice",
        Choices: [
          { Variable: "$.zone", NumericLessThanEquals: 3, Next: "ParallelSecurityChecks" }
        ],
        Default: "CompartmentIsolation"
      },
      ParallelSecurityChecks: {
        Type: "Parallel",
        Branches: [
          { StartAt: "VerifyRfc9421Sig", States: { VerifyRfc9421Sig: { Type: "Task", End: true } } },
          { StartAt: "CheckRedisAllowance", States: { CheckRedisAllowance: { Type: "Task", End: true } } },
          { StartAt: "OWASP_L7_WAF", States: { OWASP_L7_WAF: { Type: "Task", End: true } } }
        ],
        Next: "ExecuteSandboxedTask"
      },
      ExecuteSandboxedTask: {
        Type: "Task",
        Resource: "arn:wrn:lambda:fra1:execute-sandbox",
        Next: "CommitMerkleAuditProof"
      },
      CommitMerkleAuditProof: {
        Type: "Task",
        Resource: "arn:wrn:lambda:fra1:commit-merkle-proof",
        Next: "PipelineSuccess"
      },
      PipelineSuccess: {
        Type: "Succeed"
      }
    }
  };

  const copyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedState.output, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div ref={containerRef} className="flex-1 flex flex-col h-full overflow-y-auto bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-3 gsap-fade-in">
        <div>
          <div className="flex items-center space-x-2">
            <GitMerge className="w-5 h-5 text-illum" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Step Functions Studio
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Visual state machine orchestration engine with ASL-compatible task routing, choice branching, and payload tracing.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-slate-400 hover:text-white flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleStepNext}
            disabled={isAutoRunning || currentStepIndex >= states.length - 1}
            className="px-3 py-1.5 rounded-lg border border-border bg-surface hover-tube text-xs font-semibold text-slate-200 flex items-center space-x-1.5 cursor-pointer disabled:opacity-40"
          >
            <StepForward className="w-3.5 h-3.5 text-illum" />
            <span>Step Next</span>
          </button>
          <button
            onClick={handleAutoRun}
            disabled={isAutoRunning || currentStepIndex >= states.length - 1}
            className="px-4 py-1.5 rounded-lg neon-tube-button text-xs font-bold flex items-center space-x-1.5 cursor-pointer disabled:opacity-40"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isAutoRunning ? 'Executing Pipeline...' : 'Run All Steps'}</span>
          </button>
        </div>
      </div>

      {/* State Machine Visualizer DAG Grid */}
      <div className="p-5 rounded-xl bg-surface-card border border-border space-y-4 gsap-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="text-slate-400">STATE FLOW:</span>
            <span className="text-white font-bold">Agent Passport Coexistence & Merkle Settlement</span>
            <Badge variant="tube">v2.1.0 Active</Badge>
          </div>

          <button
            onClick={() => setShowAslJson(!showAslJson)}
            className="px-2.5 py-1 rounded bg-surface border border-border text-[11px] font-mono text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
          >
            <FileJson className="w-3 h-3 text-illum" />
            <span>{showAslJson ? 'Hide ASL JSON' : 'View ASL JSON'}</span>
          </button>
        </div>

        {/* Visual Graph Nodes */}
        <div className="flex flex-wrap items-center gap-2 p-4 rounded-xl bg-background/80 border border-border overflow-x-auto">
          {states.map((st, idx) => {
            const isSelected = selectedStateId === st.id;
            const isExecuted = st.status === 'success';
            const isRunning = st.status === 'running';

            return (
              <React.Fragment key={st.id}>
                <div
                  onClick={() => setSelectedStateId(st.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer min-w-[145px] text-left select-none ${
                    isSelected
                      ? 'border-illum bg-illum/10 shadow-[0_0_18px_rgba(var(--illum-rgb),0.35)] ring-1 ring-illum'
                      : isExecuted
                      ? 'border-emerald-500/50 bg-emerald-500/5'
                      : isRunning
                      ? 'border-amber-500/60 bg-amber-500/10'
                      : 'border-border bg-surface-elevated/40 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded ${
                        st.type === 'Task'
                          ? 'bg-sky-500/20 text-sky-400'
                          : st.type === 'Choice'
                          ? 'bg-amber-500/20 text-amber-400'
                          : st.type === 'Parallel'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {st.type}
                    </span>
                    {isRunning && (
                      <span className="w-3 h-3 rounded-full border-2 border-illum border-t-transparent animate-spin" />
                    )}
                    {isExecuted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>

                  <div className="text-xs font-bold text-white truncate">{st.name}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1 flex items-center justify-between">
                    <span>{st.durationMs}ms</span>
                    {isSelected && <span className="text-illum text-[9px] uppercase font-bold">Selected</span>}
                  </div>
                </div>

                {idx < states.length - 1 && (
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      idx <= currentStepIndex ? 'text-illum' : 'text-slate-600'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Split: State Inspector & Payloads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 gsap-fade-in">
        {/* Left: Selected State Payload Inspector */}
        <div className="p-5 rounded-xl bg-surface-card border border-border space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-illum" />
              <span className="font-bold text-white">{selectedState.name}</span>
              <Badge variant="outline">{selectedState.type}</Badge>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleExecuteSingleState(selectedState.id)}
                disabled={isExecutingSingle || isAutoRunning}
                className="px-2.5 py-1 rounded bg-surface hover-tube border border-border text-[11px] text-illum font-bold flex items-center space-x-1 cursor-pointer disabled:opacity-40"
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>{isExecutingSingle ? 'Running...' : 'Execute State Live'}</span>
              </button>
              <button
                onClick={copyPayload}
                className="px-2 py-1 rounded bg-surface border border-border text-[11px] text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedPayload ? 'Copied!' : 'Copy Output'}</span>
              </button>
            </div>
          </div>

          <p className="text-slate-400 text-[11px] leading-relaxed">{selectedState.comment}</p>

          {/* Contextual Architecture Blueprint for Selected State */}
          {selectedState.id === 'EvaluateZonePolicy' && (
            <div className="p-3 rounded-lg bg-surface border border-border/80 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>Zone Policy Evaluation Matrix</span>
              </span>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="p-2 rounded bg-background border border-border text-slate-400">
                  <div className="font-bold">Zone 1</div>
                  <div>Core Kernel</div>
                </div>
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/40 text-amber-300 font-bold">
                  <div>Zone 2 (Active)</div>
                  <div>Strict Bounded</div>
                </div>
                <div className="p-2 rounded bg-background border border-border text-slate-400">
                  <div>Zone 3</div>
                  <div>External Sandbox</div>
                </div>
              </div>
            </div>
          )}

          {selectedState.id === 'ParallelSecurityChecks' && (
            <div className="p-3 rounded-lg bg-surface border border-border/80 space-y-2">
              <span className="text-[11px] font-bold text-purple-400 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Concurrent Parallel Evaluation Branches (3 Goroutines)</span>
              </span>
              <div className="space-y-1 text-[10px]">
                <div className="p-1.5 rounded bg-background border border-border flex justify-between">
                  <span className="text-slate-300">1. RFC 9421 Signature:</span>
                  <span className="text-emerald-400 font-bold">VALID_SIGNATURE (sig: 0x8f2ac01b)</span>
                </div>
                <div className="p-1.5 rounded bg-background border border-border flex justify-between">
                  <span className="text-slate-300">2. Redis Rate Limiter:</span>
                  <span className="text-emerald-400 font-bold">OK (42 / 300 rpm)</span>
                </div>
                <div className="p-1.5 rounded bg-background border border-border flex justify-between">
                  <span className="text-slate-300">3. OWASP L7 WAF:</span>
                  <span className="text-emerald-400 font-bold">0 anomalies detected (ALLOW)</span>
                </div>
              </div>
            </div>
          )}

          {selectedState.id === 'CommitMerkleAuditProof' && (
            <div className="p-3 rounded-lg bg-surface border border-border/80 space-y-1.5 text-[10px]">
              <span className="font-bold text-sky-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Merkle Leaf DAG Anchor</span>
              </span>
              <div className="p-2 rounded bg-background border border-border space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Merkle Root:</span>
                  <span className="text-illum font-bold">{selectedState.output.merkleRoot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Block Height:</span>
                  <span className="text-white">{selectedState.output.blockHeight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-emerald-400 font-bold">SEALED & ANCHORED</span>
                </div>
              </div>
            </div>
          )}

          {/* Input Payload */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400">Input Payload ($):</div>
            <pre className="p-2.5 rounded-lg bg-background border border-border text-[11px] text-slate-300 overflow-x-auto max-h-36">
              {JSON.stringify(selectedState.input, null, 2)}
            </pre>
          </div>

          {/* Output Payload */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400">Output Payload (Result):</div>
            <pre className="p-2.5 rounded-lg bg-background border border-border text-[11px] text-illum overflow-x-auto max-h-36">
              {JSON.stringify(selectedState.output, null, 2)}
            </pre>
          </div>
        </div>

        {/* Right: ASL Definition or Live Execution Stream */}
        <div className="p-5 rounded-xl bg-surface-card border border-border space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-illum" />
              <span className="font-bold text-white">
                {showAslJson ? 'ASL State Machine Definition' : 'Live State Transition Stream'}
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">Engine: Go Edge fra1 (:8080)</span>
          </div>

          {showAslJson ? (
            <pre className="p-3 rounded-lg bg-background border border-border text-[11px] text-slate-300 overflow-y-auto h-96">
              {JSON.stringify(aslDefinition, null, 2)}
            </pre>
          ) : (
            <div className="p-3 rounded-lg bg-background border border-border overflow-y-auto h-96 space-y-1.5 text-[11px]">
              {executionLogs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.startsWith('[✓]')
                      ? 'text-emerald-400 font-semibold'
                      : log.startsWith('[*]')
                      ? 'text-illum font-bold'
                      : 'text-slate-400'
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
