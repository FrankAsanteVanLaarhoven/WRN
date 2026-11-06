import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  Bot,
  Play,
  Terminal,
  Database,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Shield,
  Layers,
  Code2,
  Cpu,
  Lock,
  Activity
} from 'lucide-react';
import { AI_ARENA_BENCHMARK } from '../data/consoleMockData';
import { AgentExecutionTier } from '../types/console';

export const AgentHarnessView: React.FC = () => {
  const { grokAgents, executeGrokTask, lapTimes, postgresUsers } = useConsole();
  const [taskPrompt, setTaskPrompt] = useState("Query Postgres for Friday's new users and compute email conversion rate.");
  const [selectedTier, setSelectedTier] = useState<AgentExecutionTier>('Edge-Reasoning');
  const [activeTab, setActiveTab] = useState<'harness' | 'database' | 'telemetry'>('harness');
  const [activeDbView, setActiveDbView] = useState<'lap_times' | 'postgres_users'>('lap_times');
  const [isExecuting, setIsExecuting] = useState(false);

  const activeAgent = grokAgents[0];

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskPrompt.trim() || isExecuting) return;
    setIsExecuting(true);
    await executeGrokTask(taskPrompt.trim(), selectedTier);
    setIsExecuting(false);
  };

  const executionTiers: { id: AgentExecutionTier; label: string; desc: string }[] = [
    { id: 'Edge-Reasoning', label: 'Edge-Reasoning', desc: 'Sub-5ms deterministic reasoning' },
    { id: 'High-Throughput', label: 'High-Throughput', desc: 'Massive parallel state processing' },
    { id: 'Deep-Verification', label: 'Deep-Verification', desc: 'Formal cryptographic proof validation' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-surface-elevated border border-border flex items-center justify-center hover-tube">
            <Cpu className="w-5 h-5 text-illum" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-white tracking-tight">Autonomous Agent Harness</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-illum-muted text-illum border border-illum-muted">
                MCP Client v2.4 Active
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Autonomous execution harness with Model Context Protocol (MCP) tool integration, sandboxed runtime, and RFC 9421 cryptographic execution sealing.
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center space-x-1 p-1 rounded-lg bg-surface-elevated border border-border text-xs font-mono">
          {[
            { id: 'harness', label: 'Agent Workspace' },
            { id: 'database', label: 'Live Data' },
            { id: 'telemetry', label: 'Runtime Telemetry' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1 rounded transition-all ${
                activeTab === t.id
                  ? 'active-tube-pill font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === 'harness' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Task Prompt & Live Execution Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Prompt Execution Card */}
              <form onSubmit={handleLaunch} className="p-5 rounded-xl neon-tube-card space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-illum" />
                    <span>Create & Launch Agent Work</span>
                  </span>
                  <div className="flex items-center space-x-1 text-xs font-mono">
                    {executionTiers.map(tier => (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        className={`px-2.5 py-0.5 rounded transition-all ${
                          selectedTier === tier.id
                            ? 'active-tube-pill font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title={tier.desc}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={taskPrompt}
                  onChange={e => setTaskPrompt(e.target.value)}
                  placeholder="Describe the task for the autonomous agent harness..."
                  className="w-full bg-surface border border-border rounded-lg p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-illum font-mono transition-colors"
                />

                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-2">
                    <span className="text-illum">MCP: mcp.wrn.io</span>
                    <span>•</span>
                    <span>Skill: wrn-postgres</span>
                    <span>•</span>
                    <span className="text-emerald-400">Sandbox: Memory Compartment #01</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isExecuting}
                    className="px-4 py-2 rounded-lg neon-tube-button font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isExecuting ? 'Executing Agent Harness...' : 'Execute Task'}</span>
                  </button>
                </div>
              </form>

              {/* Live Agent Execution Trace */}
              {activeAgent && (
                <div className="p-5 rounded-xl bg-surface-card border border-border/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-4 h-4 text-illum" />
                      <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                        AUTONOMOUS AGENT • EXECUTION TRACE
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-slate-400">
                        Profile: <span className="text-white font-bold">{activeAgent.model}</span>
                      </span>
                      <span className="text-[10px] font-mono text-illum bg-illum-muted px-2 py-0.5 rounded border border-illum-muted">
                        Throughput: {activeAgent.tokensPerSec} t/s
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    {activeAgent.steps.map((st: any, i: number) => (
                      <div key={i} className="p-3 rounded-lg bg-surface border border-border/80 flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                            <span className="uppercase text-slate-400 font-semibold">{st.type}</span>
                            <span>{st.timestamp}</span>
                          </div>
                          <p className="text-slate-200 text-[11px] leading-relaxed">{st.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: MCP Connected Status & Sandbox Boundaries */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl neon-tube-card space-y-3">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Model Context Protocol (MCP) Hub
                </span>
                <div className="p-3 rounded-lg bg-surface border border-border space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">mcp.wrn.io</span>
                    <span className="text-emerald-400 font-bold">Connected ✓</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Protocol: OAuth 2.0 with DPoP Key Binding
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1 font-mono">
                  <div className="text-slate-300 font-semibold mb-1">Active MCP Tools:</div>
                  <div>• postgresql.createExecution</div>
                  <div>• tablesdb.queryRows</div>
                  <div>• storage.createFile</div>
                  <div>• edge.reloadProxyRules</div>
                  <div>• crypto.merkleSeal</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-card border border-border/80 space-y-2 text-xs">
                <div className="flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-illum" />
                  <span className="font-bold text-white font-mono uppercase tracking-wider">
                    Bounded Execution Isolation
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Every agent execution inherits strict WRN-PASSPORT-0.2 authority limits. Memory compartments, RPC grants, and cryptographic keys are strictly bounded to declared tenant scopes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-card border border-border/80 space-y-2 text-xs font-mono">
                <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                  State Proof Envelope
                </span>
                <div className="p-2.5 rounded bg-surface border border-border/70 text-[10px] text-slate-300 space-y-1">
                  <div>Envelope: urn:wrn:seal:agent-01</div>
                  <div>Merkle Root: 0x8f2ac01b4e99142f</div>
                  <div className="text-emerald-400 font-bold">Proof Status: SECURE_AND_VERIFIED</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Database View (Lap Times + PostgreSQL Users) */}
        {activeTab === 'database' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveDbView('lap_times')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeDbView === 'lap_times'
                      ? 'active-tube-pill'
                      : 'bg-surface border border-border text-slate-400 hover:text-white'
                  }`}
                >
                  TablesDB: monaco_gp / lap_times (847 rows)
                </button>
                <button
                  onClick={() => setActiveDbView('postgres_users')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeDbView === 'postgres_users'
                      ? 'active-tube-pill'
                      : 'bg-surface border border-border text-slate-400 hover:text-white'
                  }`}
                >
                  PostgreSQL: users (2,184 rows since Friday)
                </button>
              </div>

              <span className="text-xs font-mono text-illum">
                Query: {activeDbView === 'lap_times' ? 'Query.equal("session_id", "Q3_MON")' : 'SELECT * FROM users WHERE created_at >= "2026-08-21"'}
              </span>
            </div>

            {/* TablesDB Monaco GP View */}
            {activeDbView === 'lap_times' && (
              <div className="rounded-xl border border-border overflow-hidden bg-surface-card">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-surface text-slate-400 border-b border-border text-[11px]">
                    <tr>
                      <th className="p-3">$id</th>
                      <th className="p-3">driver</th>
                      <th className="p-3">code</th>
                      <th className="p-3">team</th>
                      <th className="p-3">pos</th>
                      <th className="p-3">lap_ms</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {lapTimes.map(row => (
                      <tr key={row.$id} className="hover:bg-surface-elevated/40 text-slate-200">
                        <td className="p-3 text-illum">{row.$id}</td>
                        <td className="p-3 font-bold text-white">{row.driver}</td>
                        <td className="p-3 text-slate-400">{row.code}</td>
                        <td className="p-3 capitalize">{row.team}</td>
                        <td className="p-3 font-bold">{row.pos}</td>
                        <td className="p-3 text-emerald-400 font-bold">{row.lap_ms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PostgreSQL Users View */}
            {activeDbView === 'postgres_users' && (
              <div className="rounded-xl border border-border overflow-hidden bg-surface-card">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-surface text-slate-400 border-b border-border text-[11px]">
                    <tr>
                      <th className="p-3">User ID</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email Address</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {postgresUsers.map(u => (
                      <tr key={u.id} className="hover:bg-surface-elevated/40 text-slate-200">
                        <td className="p-3 text-illum">{u.id}</td>
                        <td className="p-3 font-bold text-white">{u.name}</td>
                        <td className="p-3 text-slate-300">{u.email}</td>
                        <td className="p-3">{u.role}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.status === 'Verified'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Runtime Telemetry Table */}
        {activeTab === 'telemetry' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Agent Runtime Telemetry & Capability Benchmark
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time execution performance across edge execution profiles and memory sandboxes.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Sandboxed Execution Engine: Healthy
              </span>
            </div>

            <div className="rounded-xl border border-border overflow-hidden bg-surface-card font-mono text-xs">
              <table className="w-full text-left">
                <thead className="bg-surface text-slate-400 border-b border-border text-[11px]">
                  <tr>
                    <th className="p-3">Execution Profile</th>
                    <th className="p-3">Cost/1M</th>
                    <th className="p-3">Overall</th>
                    <th className="p-3">Auth</th>
                    <th className="p-3">TablesDB</th>
                    <th className="p-3">Functions</th>
                    <th className="p-3">Storage</th>
                    <th className="p-3">Sites</th>
                    <th className="p-3">Messaging</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {AI_ARENA_BENCHMARK.map(b => (
                    <tr key={b.model} className="hover:bg-surface-elevated/40 text-slate-200">
                      <td className="p-3 font-bold text-white flex items-center space-x-1.5">
                        <span className="text-illum">{b.model}</span>
                      </td>
                      <td className="p-3 text-emerald-400 font-bold">{b.costPer1M}</td>
                      <td className="p-3 font-bold text-white">{b.overall}</td>
                      <td className="p-3 text-slate-300">{b.auth}</td>
                      <td className="p-3 text-slate-300">{b.tablesDb}</td>
                      <td className="p-3 text-slate-300">{b.functions}</td>
                      <td className="p-3 text-slate-300">{b.storage}</td>
                      <td className="p-3 text-slate-300">{b.sites}</td>
                      <td className="p-3 text-slate-300">{b.messaging}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
