import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  Database,
  Globe,
  Cpu,
  HardDrive,
  Users,
  Send,
  Plus,
  ArrowRight,
  ShieldCheck,
  Activity,
  Code2,
  Key,
  Layers,
  Sparkles,
  Bot
} from 'lucide-react';

export const ConsoleOverviewView: React.FC = () => {
  const { telemetry, setProjectServiceTab, setActiveTab } = useConsole();
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-background p-6 space-y-6">
      {/* Top Project Bar with Neon Tube Accent */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-white tracking-tight">DAC</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-illum-muted text-illum border border-illum-muted">
              6aed448b00010a9c93f6
            </span>
            <span className="text-xs text-slate-400 font-mono">fra.cloud.wrn.network</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Agent-first & MCP-enabled infrastructure running with WRN bounded coexistence kernel.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center space-x-1 p-1 rounded-lg bg-surface-elevated border border-border text-xs font-mono">
          {['1m', '15m', '1h', '1d', '24h'].map(t => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-2.5 py-1 rounded transition-all ${
                timeRange === t
                  ? 'active-tube-pill font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t === '24h' ? 'Last 24 hours' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Top 5 Metrics Strip with Neon Tube Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Bandwidth', value: telemetry.bandwidth, sub: '0% limit' },
          { label: 'Requests', value: telemetry.requests, sub: 'All routes' },
          { label: 'Storage', value: telemetry.storage, sub: 'Encrypted AVIF' },
          { label: 'Executions', value: telemetry.executions, sub: 'Zero-drop' },
          { label: 'Compute', value: telemetry.compute, sub: 'Micro-billed' }
        ].map((m, idx) => (
          <div key={idx} className="p-3.5 rounded-xl neon-tube-card cursor-pointer">
            <div className="text-[11px] font-mono text-slate-400">{m.label}</div>
            <div className="text-lg font-bold text-white mt-0.5">{m.value}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-1 flex items-center justify-between">
              <span>{m.sub}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-illum animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Bandwidth Chart Box */}
      <div className="p-4 rounded-xl bg-surface-card border border-border/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="text-slate-200 font-semibold flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-illum" />
            <span>Bandwidth & Requests Over Time</span>
          </span>
          <span className="text-illum">Edge CDN: Active</span>
        </div>
        <div className="h-28 w-full bg-background/60 rounded-lg p-2 border border-border/60 flex items-end justify-between gap-1 overflow-hidden">
          {[12, 18, 25, 14, 30, 45, 60, 52, 48, 65, 80, 95, 70, 88, 110, 90, 75, 85, 120, 105, 95, 130, 140, 125].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
              <div
                style={{
                  height: `${h}%`,
                  backgroundColor: 'var(--illum-color)',
                  opacity: 0.75 + (h / 300)
                }}
                className="w-full rounded-t transition-all group-hover:opacity-100 group-hover:brightness-125"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Your Resources Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-200 uppercase font-mono tracking-wider">
          Your Resources
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Databases */}
          <div className="p-4 rounded-xl neon-tube-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <Database className="w-4 h-4 text-illum" />
                <span>Databases</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Store, query, and scale with TablesDB, PostgreSQL, MySQL or VectorsDB.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                TablesDB
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-illum font-semibold">
                PostgreSQL
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                MySQL
              </div>
            </div>
            <button
              onClick={() => setProjectServiceTab('databases')}
              className="w-full py-1.5 rounded-lg neon-tube-button text-xs font-medium flex items-center justify-center space-x-1 transition-all"
            >
              <span>Explore Databases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sites / Deployment */}
          <div className="p-4 rounded-xl bg-surface-card border border-border hover:border-cyan-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Sites & Hosting</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Deploy static, SSR, and CSR frontends from Git with instant preview domains.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Store
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Blog
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Portfolio
              </div>
            </div>
            <button
              onClick={() => setProjectServiceTab('sites')}
              className="w-full py-1.5 rounded-lg bg-surface-elevated hover:bg-cyan-500/10 border border-border hover:border-cyan-500/40 text-xs text-cyan-300 font-medium flex items-center justify-center space-x-1 transition-all"
            >
              <span>+ Create Site</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Serverless Functions */}
          <div className="p-4 rounded-xl bg-surface-card border border-border hover:border-cyan-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Functions</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Run backend code on HTTP requests, database events, or automated cron schedules.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Node.js
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Python
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Go
              </div>
            </div>
            <button
              onClick={() => setProjectServiceTab('functions')}
              className="w-full py-1.5 rounded-lg bg-surface-elevated hover:bg-cyan-500/10 border border-border hover:border-cyan-500/40 text-xs text-sky-300 font-medium flex items-center justify-center space-x-1 transition-all"
            >
              <span>+ Create Function</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Storage */}
          <div className="p-4 rounded-xl bg-surface-card border border-border hover:border-cyan-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <HardDrive className="w-4 h-4 text-emerald-400" />
                <span>Storage</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Upload and serve files with permissions, AVIF compression, and image transformations.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Encryption
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Compression
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                File Tokens
              </div>
            </div>
            <button
              onClick={() => setProjectServiceTab('storage')}
              className="w-full py-1.5 rounded-lg bg-surface-elevated hover:bg-cyan-500/10 border border-border hover:border-cyan-500/40 text-xs text-emerald-300 font-medium flex items-center justify-center space-x-1 transition-all"
            >
              <span>+ Create Bucket</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Auth */}
          <div className="p-4 rounded-xl bg-surface-card border border-border hover:border-cyan-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Auth & Users</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Sign users in with email, OAuth providers, phone SMS, or WebAuthn passkeys.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                OAuth 2.0
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Passkeys
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Magic Link
              </div>
            </div>
            <button
              onClick={() => setProjectServiceTab('auth')}
              className="w-full py-1.5 rounded-lg bg-surface-elevated hover:bg-cyan-500/10 border border-border hover:border-cyan-500/40 text-xs text-indigo-300 font-medium flex items-center justify-center space-x-1 transition-all"
            >
              <span>+ Create User</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messaging */}
          <div className="p-4 rounded-xl bg-surface-card border border-border hover:border-cyan-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <Send className="w-4 h-4 text-amber-400" />
                <span>Messaging</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Send unified email, SMS, and push notification campaigns from a single API.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Email
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                SMS
              </div>
              <div className="p-2 rounded bg-surface border border-border text-center text-[10px] font-mono text-slate-300">
                Push
              </div>
            </div>
            <button
              onClick={() => setProjectServiceTab('messaging')}
              className="w-full py-1.5 rounded-lg bg-surface-elevated hover:bg-cyan-500/10 border border-border hover:border-cyan-500/40 text-xs text-amber-300 font-medium flex items-center justify-center space-x-1 transition-all"
            >
              <span>+ Add Provider</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Connect Apps & API Keys */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Apps */}
        <div className="p-5 rounded-xl neon-tube-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-illum" />
              <span>Connect Client Apps</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">Web • Mobile • Desktop</span>
          </div>
          <p className="text-xs text-slate-400">
            Add each client app that communicates with this project. Supports automatic agent generation.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {['Web (React/Vue)', 'React Native', 'Flutter', 'Apple iOS', 'Android', 'Build with Agent'].map(a => (
              <span key={a} className="px-2.5 py-1 rounded bg-surface border border-border text-slate-300">
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* API Keys */}
        <div className="p-5 rounded-xl bg-surface-card border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white flex items-center space-x-2">
              <Key className="w-4 h-4 text-indigo-400" />
              <span>Server API Keys & Scopes</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">Scoped Access</span>
          </div>
          <p className="text-xs text-slate-400">
            Give backend microservices, Grok agents, and CI/CD pipelines scoped authority under WRN grants.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {['Node.js', 'Python', 'Go', 'Rust', 'Deno', 'Bun', 'PHP'].map(lang => (
              <span key={lang} className="px-2.5 py-1 rounded bg-surface border border-border text-slate-300">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

