import React from 'react';
import { useConsole } from '../store/consoleStore';
import {
  Search,
  BookOpen,
  Plus,
  Headphones,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { TopNavTab } from '../types/appwrite';

export const TopNav: React.FC = () => {
  const {
    topNavTab,
    setTopNavTab,
    setIsCmdKOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useConsole();

  const navLinks: { id: TopNavTab; label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'domains', label: 'Domains & NGINX' },
    { id: 'compute', label: 'Compute & Costs' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <header className="h-14 border-b border-border/80 bg-surface px-4 flex items-center justify-between select-none z-30 sticky top-0">
      {/* Left: Brand & Appwrite Project Switcher */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1.5 rounded-md bg-surface-elevated text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Logo with Neon Blue Tube Halo (Replaces Pink) */}
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-surface border border-cyan-400/60 flex items-center justify-center shadow-neon-tube relative group">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-neon-blue border-t-transparent animate-spin" />
            <div className="absolute inset-0 rounded-lg bg-neon-blue/10 pointer-events-none" />
          </div>

          {/* Project Switcher */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-surface-elevated border border-border text-xs">
            <span className="w-5 h-5 rounded bg-cyan-950/80 text-neon-blue font-bold flex items-center justify-center text-[10px] font-mono border border-cyan-500/40">
              PP
            </span>
            <span className="font-semibold text-slate-200">Personal projects</span>
            <span className="text-slate-500">/</span>
            <span className="text-neon-blue font-bold font-mono">DAC</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-surface border border-border text-slate-400">
              Free
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        {/* Subnav Tabs (Matching Appwrite Screenshots) */}
        <nav className="hidden lg:flex items-center space-x-1 ml-4 pl-3 border-l border-border/60">
          {navLinks.map(link => {
            const isActive = topNavTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setTopNavTab(link.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  isActive
                    ? 'text-white border-b-2 border-neon-blue bg-cyan-500/10 shadow-[0_4px_12px_rgba(0,229,255,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-surface-elevated/40'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: Search, Icons, Neon Blue Upgrade Button, Profile */}
      <div className="flex items-center space-x-3">
        {/* Search */}
        <button
          onClick={() => setIsCmdKOpen(true)}
          className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-surface-elevated border border-border hover:border-cyan-500/40 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-xs">Search...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono text-slate-500">
            ⌘K
          </kbd>
        </button>

        {/* Top Icons */}
        <div className="hidden md:flex items-center space-x-1 text-slate-400">
          <button className="p-1.5 rounded-md hover:bg-surface-elevated hover:text-white" title="Documentation">
            <BookOpen className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-surface-elevated hover:text-white" title="Create">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-surface-elevated hover:text-white" title="Support">
            <Headphones className="w-4 h-4" />
          </button>
        </div>

        {/* Neon Blue Tube Halo Upgrade Button (Replaces Pink) */}
        <button
          className="px-3 py-1.5 rounded-lg neon-tube-button text-slate-950 text-xs font-bold flex items-center space-x-1 shadow-neon-tube transition-all hover:scale-105 cursor-pointer"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>Upgrade</span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center space-x-2 pl-1">
          <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-400/60 flex items-center justify-center text-xs font-bold text-neon-blue shadow-neon-tube">
            f
          </div>
          <span className="hidden xl:inline text-xs font-mono text-slate-400">openmeta</span>
        </div>
      </div>
    </header>
  );
};
