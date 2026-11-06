import React from 'react';
import { useConsole, ActiveTab } from '../store/consoleStore';
import {
  Boxes,
  GitFork,
  Terminal,
  KeyRound,
  ShieldCheck,
  LayoutGrid,
  BarChart3,
  BookOpen,
  Plus,
  Radio,
  FileCheck2,
  FileJson
} from 'lucide-react';

interface SidebarProps {
  onOpenCommission: () => void;
  onOpenNewGrant: () => void;
  onOpenNewSeal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenCommission,
  onOpenNewGrant
}) => {
  const { activeTab, setActiveTab, securityResults, submissions, grants, isMobileMenuOpen, setIsMobileMenuOpen } = useConsole();

  const passedTests = securityResults.filter(s => s.status === 'pass').length;
  const quarantinedSeals = submissions.filter(s => s.status === 'quarantined').length;
  const activeGrants = grants.filter(g => g.status === 'active').length;

  const navGroups: {
    title: string;
    items: {
      id: ActiveTab;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: string | number;
      badgeColor?: string;
    }[];
  }[] = [
    {
      title: 'FOUNDRY ONTOLOGY',
      items: [
        { id: 'ontology', label: 'Object Explorer', icon: Boxes },
        { id: 'lineage', label: 'Cryptographic DAG', icon: GitFork, badge: quarantinedSeals > 0 ? `${quarantinedSeals} Quarantine` : undefined, badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
        { id: 'grants', label: 'Delegation & Grants', icon: KeyRound, badge: activeGrants, badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
      ]
    },
    {
      title: 'DEVIN RUNTIME',
      items: [
        { id: 'devin-console', label: 'Agent Operations', icon: Terminal, badge: 'Live Stream', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' }
      ]
    },
    {
      title: 'SECURITY & POLICIES',
      items: [
        { id: 'request-verifier', label: 'RFC 9421 Verifier', icon: FileCheck2, badge: '9 Gates', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
        { id: 'security-harness', label: 'Security Fixtures (14)', icon: ShieldCheck, badge: `${passedTests}/14 Pass`, badgeColor: passedTests === 14 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-300 border-border' },
        { id: 'policy-matrix', label: '9-Zone Branch Matrix', icon: LayoutGrid },
        { id: 'schemas', label: 'Contract Schemas', icon: FileJson }
      ]
    },
    {
      title: 'STANDARDS & RESEARCH',
      items: [
        { id: 'evaluation', label: '6-Week Evaluation Plan', icon: BarChart3, badge: '7 KPIs', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
        { id: 'sources', label: 'Primary Source Register', icon: BookOpen, badge: '24 Docs', badgeColor: 'bg-slate-800 text-slate-400 border-border' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`${
          isMobileMenuOpen ? 'fixed left-0 top-14 bottom-0 z-40 flex' : 'hidden md:flex'
        } w-64 border-r border-border bg-surface flex-col justify-between shrink-0 select-none transition-all duration-200`}
      >
      <div className="p-3 space-y-6 overflow-y-auto">
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            onClick={onOpenCommission}
            className="flex items-center justify-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-primary hover:bg-primary/90 text-white text-xs font-medium transition-all shadow-glow-primary"
            title="Commission a new distinct agent instance"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Commission</span>
          </button>
          <button
            onClick={onOpenNewGrant}
            className="flex items-center justify-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-surface-elevated hover:bg-surface-elevated/80 border border-border text-slate-200 text-xs font-medium transition-colors"
            title="Issue bounded delegation grant"
          >
            <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
            <span>New Grant</span>
          </button>
        </div>

        {/* Navigation Sections */}
        {navGroups.map(group => (
          <div key={group.title} className="space-y-1">
            <h2 className="px-2 text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase">
              {group.title}
            </h2>
            <nav className="space-y-0.5">
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-surface-elevated text-white border border-primary/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-surface-elevated/40'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${item.badgeColor || 'bg-slate-800 text-slate-400 border-border'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer Status */}
      <div className="p-3 border-t border-border bg-surface-card">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span className="flex items-center space-x-1">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="text-slate-300">Enforcement Kernel</span>
          </span>
          <span className="text-emerald-400 font-semibold">ONLINE</span>
        </div>
        <div className="text-[10px] text-slate-500 truncate font-mono">
          Strict CAS • RFC 9421 • JCS Canonical
        </div>
      </div>
    </aside>
  </>
  );
};
