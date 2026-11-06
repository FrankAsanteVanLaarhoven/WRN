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

export const DevinConsoleView: React.FC = () => {
  const { instances, activityLogs, runAgentTaskStep, grants } = useConsole();
  const primaryAgent = instances[0];

  const agentGrant = grants.find(g => g.granteeId === primaryAgent?.instanceId);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Top Console Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-surface-elevated border border-foundry-cyan/40 flex items-center justify-center shadow-glow-cyan">
            <Bot className="w-5 h-5 text-foundry-cyan" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-semibold text-white tracking-tight">
                Devin Agent Operations Console
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SANDBOX SECURE</span>
              </span>
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
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-glow-primary transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Step Execution</span>
          </button>
        </div>
      </div>

      {/* Main Console Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Real-time Devin Stream */}
        <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-border overflow-hidden bg-surface/30">
          <div className="p-3 border-b border-border bg-surface flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span>LIVE REASONING & CRYPTOGRAPHIC TOOL TRACE</span>
            </span>
            <span>Deterministic RFC 9421 Binding</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
            {activityLogs.map(log => {
              const isThought = log.type === 'thought';
              const isTool = log.type === 'tool_call';
              const isMemory = log.type === 'memory_write';
              const isSecurity = log.type === 'security_check';
              const isSeal = log.type === 'seal_submission';

              return (
                <div
                  key={log.stepId}
                  className={`p-3.5 rounded-lg border transition-all ${
                    isSecurity
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                      : isMemory
                      ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-300'
                      : isTool
                      ? 'bg-indigo-950/20 border-indigo-500/30 text-indigo-300'
                      : 'bg-surface-elevated border-border text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
                    <span className="flex items-center space-x-1.5 uppercase font-semibold">
                      {isThought && <Sparkles className="w-3 h-3 text-amber-400" />}
                      {isTool && <Cpu className="w-3 h-3 text-indigo-400" />}
                      {isMemory && <Database className="w-3 h-3 text-cyan-400" />}
                      {isSecurity && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
                      <span>{log.type.replace('_', ' ')}</span>
                    </span>
                    <span className="font-mono text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>

                  <p className="text-xs leading-relaxed">{log.content}</p>

                  {log.metadata && (
                    <div className="mt-2 pt-2 border-t border-border/50 text-[11px] text-slate-400 space-y-1">
                      {Object.entries(log.metadata).map(([k, v]) => (
                        <div key={k} className="flex items-center space-x-1">
                          <span className="text-slate-500">{k}:</span>
                          <span className="text-slate-300 font-mono truncate">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sandbox Metrics & Memory Compartment */}
        <div className="w-full lg:w-80 p-5 bg-surface overflow-y-auto space-y-5">
          <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
            Agent Isolation Envelope
          </div>

          {/* Metrics Card */}
          <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-3">
            <div className="text-xs font-semibold text-slate-300">Execution Telemetry</div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-surface border border-border">
                <div className="text-slate-500 text-[10px]">Tasks Completed</div>
                <div className="text-base font-bold text-white mt-0.5">
                  {primaryAgent?.executionMetrics.tasksCompleted || 0}
                </div>
              </div>
              <div className="p-2.5 rounded bg-surface border border-border">
                <div className="text-slate-500 text-[10px]">Tokens Consumed</div>
                <div className="text-base font-bold text-foundry-cyan mt-0.5">
                  {((primaryAgent?.executionMetrics.tokensConsumed || 0) / 1000).toFixed(1)}k
                </div>
              </div>
            </div>
          </div>

          {/* Active Bounded Grant Card */}
          <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">Active Task Grant</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                VALID
              </span>
            </div>
            <div className="font-mono text-xs text-indigo-400 break-all">
              {agentGrant?.grantId || 'No active grant'}
            </div>
            <div className="text-[11px] text-slate-400">
              Operations: <strong className="text-slate-200">{agentGrant?.permittedOperations.join(', ')}</strong>
            </div>
            <div className="text-[11px] text-slate-400">
              Selector: <span className="font-mono text-slate-300">{agentGrant?.resourceSelector}</span>
            </div>
          </div>

          {/* Isolated Memory Container */}
          <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-200">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Isolated Memory Status</span>
            </div>
            <div className="p-2.5 rounded bg-background border border-border font-mono text-[11px] text-cyan-300 break-all">
              {primaryAgent?.memoryCompartmentId}
            </div>
            <div className="text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center space-x-1 text-emerald-400 font-mono">
                <CheckCircle2 className="w-3 h-3" />
                <span>Zero personal vault cross-read</span>
              </div>
              <div className="flex items-center space-x-1 text-emerald-400 font-mono">
                <CheckCircle2 className="w-3 h-3" />
                <span>Encrypted at rest with separate key</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

