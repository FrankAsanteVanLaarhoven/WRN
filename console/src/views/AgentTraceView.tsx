import React from 'react';
import { useConsole } from '../store/consoleStore';
import {
  Terminal,
  Play,
  Cpu,
  Database,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Bot,
  Zap,
  Activity
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const AgentTraceView: React.FC = () => {
  const { instances, activityLogs, runAgentTaskStep, grants } = useConsole();
  const primaryAgent = instances[0];

  const agentGrant = grants.find(g => g.granteeId === primaryAgent?.instanceId);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Top Console Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-surface-elevated border border-border flex items-center justify-center">
            <Bot className="w-5 h-5 text-illum" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-semibold text-white tracking-tight">
                Autonomous Agent Operations Console
              </h1>
              <Badge variant="success">SANDBOX SECURE</Badge>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Active Instance: {primaryAgent?.name} • Isolated Memory: {primaryAgent?.memoryCompartmentId}
            </p>
          </div>
        </div>

        {/* Step Trigger */}
        <div className="flex items-center space-x-2">
          <button
            onClick={runAgentTaskStep}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg neon-tube-button text-xs font-semibold cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Step Execution Sandbox</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Live Terminal Stream + Agent Identity & Bounded Compartment */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden">
        {/* Left: Real-time Agent Stream */}
        <div className="lg:col-span-2 border-r border-border flex flex-col h-full bg-[#08090E] overflow-hidden">
          <div className="h-8 border-b border-border/80 px-4 flex items-center justify-between text-xs font-mono text-slate-400 bg-surface/40">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-illum" />
              <span>STDOUT • REASONING & TOOL EXECUTION</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">Stream Online</span>
          </div>

          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2">
            {activityLogs.map(log => (
              <div
                key={log.stepId}
                className="p-2.5 rounded border border-border/60 bg-surface/30 hover:border-illum/40 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="text-illum font-bold">[{log.type.toUpperCase()}]</span>
                  <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-slate-200">
                  <span className="text-illum font-bold mr-2">&gt;</span>
                  {log.content}
                </div>
                {log.verified && (
                  <div className="mt-1 text-[11px] text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded inline-block font-mono">
                    RFC 9421 Signature: Verified
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Security Passport & Grant Envelope */}
        <div className="p-4 bg-surface/30 overflow-y-auto space-y-4">
          <div className="p-4 rounded-xl border border-border bg-surface-card space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">PASSPORT ENVELOPE</span>
              <span className="text-emerald-400 font-bold">BOUNDED</span>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="text-slate-400">Instance: <span className="text-white font-bold">{primaryAgent?.name}</span></div>
              <div className="text-slate-400">Status: <span className="text-emerald-400 font-bold">{primaryAgent?.status}</span></div>
              <div className="text-slate-400">Key ID: <span className="text-slate-200">{primaryAgent?.allocatedKeyId}</span></div>
              <div className="text-slate-400">Tasks Completed: <span className="text-white">{primaryAgent?.executionMetrics.tasksCompleted || 0}</span></div>
              <div className="text-slate-400">Tokens Consumed: <span className="text-white">{(primaryAgent?.executionMetrics.tokensConsumed || 0).toLocaleString()}</span></div>
            </div>
          </div>

          {agentGrant && (
            <div className="p-4 rounded-xl border border-illum/30 bg-illum/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-illum font-bold">ACTIVE GRANT ATTACHED</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-[11px] font-mono text-slate-300">
                Grant ID: {agentGrant.grantId}
              </div>
              <div className="text-[11px] font-mono text-slate-400 truncate">
                Resource: {agentGrant.resourceSelector}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-1">
                Egress Policy: Strict Bounded (Zero Exfiltration)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
