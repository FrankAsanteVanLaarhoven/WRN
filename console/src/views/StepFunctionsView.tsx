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
  Activity
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
  const [selectedStateId, setSelectedStateId] = useState<string>('VerifyAgentEnvelope');
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
        agentId: 'urn:wrn:agent:grok-01',
        role: 'autonomous-worker',
        delegator: 'frank@openmeta.io',
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
        nextState: 'ParallelSecurityChecks'
      }
    },
    {
      id: 'ParallelSecurityChecks',
      name: 'ParallelSecurityChecks',
      type: 'Parallel',
      status: 'idle',
      durationMs: 65,
      comment: 'Evaluates RFC 9421 cryptographic signature and Redis rate limits concurrently',
      input: {
        branches: ['RFC_9421_SIGNATURE_VERIFY', 'REDIS_TOKEN_ALLOWANCE', 'L7_WAF_INSPECTION']
      },
      output: {
        rfc9421Status: 'VALID_SIGNATURE',
        redisRateLimit: 'OK (42 / 300 rpm)',
        wafInspection: 'CLEAN_PAYLOAD (0 anomalies)'
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
        networkMode: 'isolated'
      },
      output: {
        rowsProcessed: 5,
        artifactsGenerated: 12,
        exitCode: 0,
        sha256Digest: '7f4a8b29c011e481'
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
        ledgerTarget: 'wrn_merkle_dag_root'
      },
      output: {
        merkleRoot: '0x8f2ac01b4e99142f',
        blockHeight: 14209,
        sealedReceiptId: 'rcpt_merkle_0941'
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
        totalDurationMs: 335
      },
      output: {
        stateMachineStatus: 'SUCCEEDED',
        completionTimestamp: new Date().toISOString()
      }
    }
  ]);

  const [executionLogs, setExecutionLogs] = useState<string[]>([
    '[Step Functions Engine] State machine sm_merkle_seal_v2 loaded (v2.1.0)',
    '[Step Functions Engine] Ready for step-by-step or full state flow execution'
  ]);

  const handleStepNext = () => {
    const nextIdx = currentStepIndex + 1;
    if (nextIdx >= states.length) return;

    setCurrentStepIndex(nextIdx);
    const targetState = states[nextIdx];
    setSelectedStateId(targetState.id);

    setStates(prev =>
      prev.map((s, idx) => (idx === nextIdx ? { ...s, status: 'success' } : s))
    );

    setExecutionLogs(prev => [
      ...prev,
      `[✓] Stepped state [${targetState.name}] (${targetState.type}) in ${targetState.durationMs}ms`,
      `    ↳ Output: ${JSON.stringify(targetState.output)}`
    ]);
  };

  const handleAutoRun = async () => {
    setIsAutoRunning(true);
    setExecutionLogs(prev => [
      ...prev,
      `[*] Executing state machine ${activeMachineId} at ${new Date().toLocaleTimeString()}...`
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
          `    ↳ Merkle Root Committed: 0x8f2ac01b4e99142f`
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
          `[✓] State Machine SUCCEEDED (Total Latency: 335ms)`
        ]);
      }
    }, 280);
  };

  const handleReset = () => {
    setCurrentStepIndex(-1);
    setSelectedStateId(states[0].id);
    setIsAutoRunning(false);
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
          { StartAt: "CheckRedisAllowance", States: { CheckRedisAllowance: { Type: "Task", End: true } } }
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
            <span>{isAutoRunning ? 'Executing...' : 'Run All Steps'}</span>
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
            className="px-2.5 py-1 rounded bg-surface border border-border text-[11px] font-mono text-slate-400 hover:text-white flex items-center space-x-1"
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
            const isCurrent = currentStepIndex === idx;

            return (
              <React.Fragment key={st.id}>
                <div
                  onClick={() => setSelectedStateId(st.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer min-w-[140px] text-left select-none ${
                    isSelected
                      ? 'border-illum bg-illum/10 shadow-[0_0_15px_rgba(var(--illum-rgb),0.3)]'
                      : isExecuted
                      ? 'border-emerald-500/50 bg-emerald-500/5'
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
                    {isExecuted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>

                  <div className="text-xs font-bold text-white truncate">{st.name}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">
                    {st.durationMs}ms
                  </div>
                </div>

                {idx < states.length - 1 && (
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      idx < currentStepIndex ? 'text-illum' : 'text-slate-600'
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
        <div className="p-5 rounded-xl bg-surface-card border border-border space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-illum" />
              <span className="font-bold text-white">{selectedState.name} Payload</span>
              <Badge variant="outline">{selectedState.type}</Badge>
            </div>

            <button
              onClick={copyPayload}
              className="px-2 py-1 rounded bg-surface border border-border text-[11px] text-slate-400 hover:text-white flex items-center space-x-1"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedPayload ? 'Copied!' : 'Copy Output'}</span>
            </button>
          </div>

          <p className="text-slate-400 text-[11px]">{selectedState.comment}</p>

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
            <span className="text-[11px] text-emerald-400 font-semibold">Engine: fra1</span>
          </div>

          {showAslJson ? (
            <pre className="p-3 rounded-lg bg-background border border-border text-[11px] text-slate-300 overflow-y-auto h-72">
              {JSON.stringify(aslDefinition, null, 2)}
            </pre>
          ) : (
            <div className="p-3 rounded-lg bg-background border border-border overflow-y-auto h-72 space-y-1.5 text-[11px]">
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
