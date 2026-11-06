import React from 'react';
import { useConsole } from '../store/consoleStore';
import {
  LayoutDashboard,
  Smartphone,
  Key,
  Terminal,
  Users,
  Database,
  HardDrive,
  Cpu,
  Send,
  Globe,
  Activity,
  BarChart2,
  ShieldAlert,
  Bot,
  Boxes,
  Sparkles,
  GitFork,
  Radio
} from 'lucide-react';
import { ProjectServiceTab } from '../types/console';

interface SidebarProps {
  onOpenCommission: () => void;
  onOpenNewGrant: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenCommission, onOpenNewGrant }) => {
  const {
    topNavTab,
    projectServiceTab,
    setProjectServiceTab,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    securityResults
  } = useConsole();

  if (topNavTab !== 'projects') {
    return null; // When in AI Experience, Marketplace, Domains, Compute, or Settings, full width views are used
  }

  const passedTests = securityResults.filter(s => s.status === 'pass').length;

  const navGroups: {
    title?: string;
    items: {
      id: ProjectServiceTab;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: string | number;
    }[];
  }[] = [
    {
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard }
      ]
    },
    {
      title: 'CONNECT',
      items: [
        { id: 'apps', label: 'Apps', icon: Smartphone },
        { id: 'api-keys', label: 'API Keys', icon: Key },
        { id: 'playground', label: 'Playground', icon: Terminal, badge: 'REST/Realtime' }
      ]
    },
    {
      title: 'BUILD',
      items: [
        { id: 'ai-experience', label: 'AI Experience Studio', icon: Sparkles, badge: 'AI & Flex' },
        { id: 'auth', label: 'Auth', icon: Users },
        { id: 'databases', label: 'Databases', icon: Database, badge: 'Postgres/MySQL' },
        { id: 'storage', label: 'Storage', icon: HardDrive },
        { id: 'functions', label: 'Functions', icon: Cpu },
        { id: 'messaging', label: 'Messaging', icon: Send }
      ]
    },
    {
      title: 'DEPLOY',
      items: [
        { id: 'sites', label: 'Sites', icon: Globe }
      ]
    },
    {
      title: 'OBSERVE',
      items: [
        { id: 'activity', label: 'Activity', icon: Activity },
        { id: 'usage', label: 'Usage', icon: BarChart2 }
      ]
    },
    {
      title: 'PROTECT',
      items: [
        { id: 'firewall', label: 'Firewall', icon: ShieldAlert, badge: 'Edge Rules' }
      ]
    },
    {
      title: 'AGENTS & MCP',
      items: [
        { id: 'grok-agents', label: 'AI Agents', icon: Bot, badge: 'Harness' },
        { id: 'passport-foundry', label: 'WRN Passport', icon: GitFork, badge: `${passedTests}/14 Pass` }
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
        } w-60 border-r border-border/80 bg-surface flex-col justify-between shrink-0 select-none transition-all duration-200`}
      >
        <div className="p-3 space-y-4 overflow-y-auto">
          {/* Get Started Progress */}
          <div className="p-3 rounded-xl bg-surface-card border border-border/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-slate-200">Get started</span>
              <span className="text-illum font-bold">4 / 16</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface border border-border overflow-hidden">
              <div className="w-1/4 h-full bg-illum rounded-full transition-all" />
            </div>
          </div>

          {/* Nav Groups */}
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {group.title && (
                <div className="px-2 text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase">
                  {group.title}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = projectServiceTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setProjectServiceTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'active-tube-pill font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-surface-elevated/40'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-illum' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                          isActive ? 'bg-illum-muted text-illum border-illum-muted' : 'bg-surface text-slate-500 border-border'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border/80 bg-surface-card">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span className="flex items-center space-x-1">
              <Radio className="w-3 h-3 text-illum animate-pulse" />
              <span className="text-slate-200">WRN OS 2.0</span>
            </span>
            <span className="text-illum font-semibold">ONLINE</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono truncate">
            Edge Proxy • Realtime Sync • MCP
          </div>
        </div>
      </aside>
    </>
  );
};
