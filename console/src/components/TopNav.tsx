import React from 'react';
import { useConsole } from '../store/consoleStore';
import {
  GitBranch,
  Search,
  Zap,
  Lock,
  Layers,
  Menu,
  X
} from 'lucide-react';

export const TopNav: React.FC = () => {
  const {
    activeBranch,
    setActiveBranch,
    setIsCmdKOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    revocationStats,
    instances,
    grants
  } = useConsole();

  const activeGrantsCount = grants.filter(g => g.status === 'active').length;
  const activeAgentsCount = instances.filter(i => i.status === 'active').length;

  return (
    <header className="h-14 border-b border-border bg-surface px-4 flex items-center justify-between select-none z-30 sticky top-0">
      {/* Left: Brand & Workspace */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1.5 rounded-md bg-surface-elevated text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-primary/40 flex items-center justify-center shadow-glow-primary">
            <svg viewBox="0 0 64 64" className="w-5 h-5" fill="none">
              <path d="M32 6L10 16V30C10 44 19 54 32 58C45 54 54 44 54 30V16L32 6Z" fill="#161926" stroke="#6366F1" strokeWidth="3"/>
              <circle cx="32" cy="24" r="5" stroke="#06B6D4" strokeWidth="2" fill="#090A0F"/>
              <path d="M32 30V42M25 36H39" stroke="#10B981" strokeWidth="2"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-sm tracking-tight text-white">WRN PASSPORT</span>
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                FOUNDRY 0.2
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Profile WRN-COEXISTENCE-0.2</span>
          </div>
        </div>

        <div className="h-4 w-px bg-border/60 mx-1" />

        {/* Workspace Selector */}
        <div className="hidden md:flex items-center space-x-2 px-2.5 py-1 rounded-md bg-surface-elevated border border-border/80 text-xs text-slate-300">
          <Layers className="w-3.5 h-3.5 text-primary" />
          <span className="font-medium text-slate-200">Frank Van Laarhoven</span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400">Owner Vault</span>
        </div>

        {/* Branch Selector */}
        <div className="flex items-center space-x-1.5 px-2 py-1 rounded-md bg-surface-elevated border border-border text-xs">
          <GitBranch className="w-3.5 h-3.5 text-foundry-cyan" />
          <select
            id="branch-selector"
            name="branch"
            value={activeBranch}
            onChange={e => setActiveBranch(e.target.value)}
            className="bg-transparent text-xs text-slate-200 font-mono outline-none cursor-pointer pr-1"
          >
            <option value="main" className="bg-surface text-slate-200">main (release)</option>
            <option value="candidate/v0.2" className="bg-surface text-slate-200">candidate/v0.2</option>
            <option value="quarantine/review" className="bg-surface text-slate-200">quarantine/review</option>
            <option value="personal/vault" className="bg-surface text-slate-200">personal/vault</option>
          </select>
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <button
        onClick={() => setIsCmdKOpen(true)}
        className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-surface-elevated/70 border border-border hover:border-slate-600 text-xs text-slate-400 hover:text-slate-200 transition-colors w-72"
      >
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <span className="flex-1 text-left font-sans">Search objects, grants, fixtures...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono text-slate-400">
          ⌘K
        </kbd>
      </button>

      {/* Right: Security & SLA Telemetry */}
      <div className="flex items-center space-x-3">
        {/* Revocation SLA Widget */}
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <div className="flex items-center space-x-1 font-mono text-[11px]">
            <span className="text-slate-400">Revocation SLA:</span>
            <span className="text-emerald-400 font-medium">{revocationStats.lastRevocationLatencyMs}ms</span>
            <span className="text-slate-500 text-[10px]">(P95 ≤ {revocationStats.targetLatencySec}s)</span>
          </div>
        </div>

        {/* Live Active Counts */}
        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-400">
          <span className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>{activeAgentsCount} Agents</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center space-x-1">
            <Lock className="w-3 h-3 text-indigo-400" />
            <span>{activeGrantsCount} Grants</span>
          </span>
        </div>
      </div>
    </header>
  );
};
