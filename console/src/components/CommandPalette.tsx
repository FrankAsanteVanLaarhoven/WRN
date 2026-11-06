import React, { useState, useEffect } from 'react';
import { useConsole, ActiveTab } from '../store/consoleStore';
import {
  Search,
  Boxes,
  GitFork,
  Terminal,
  KeyRound,
  ShieldCheck,
  LayoutGrid,
  BarChart3,
  BookOpen,
  Plus,
  Play,
  X,
  FileCheck2,
  FileJson
} from 'lucide-react';

interface CommandPaletteProps {
  onOpenCommission: () => void;
  onOpenNewGrant: () => void;
  onOpenNewSeal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  onOpenCommission,
  onOpenNewGrant,
  onOpenNewSeal
}) => {
  const {
    isCmdKOpen,
    setIsCmdKOpen,
    setActiveTab,
    runAllSecurityFixtures,
    runAgentTaskStep
  } = useConsole();
  const [query, setQuery] = useState('');

  if (!isCmdKOpen) return null;

  const actions = [
    {
      label: 'Switch to Foundry Ontology Explorer',
      category: 'Navigation',
      icon: Boxes,
      action: () => {
        setActiveTab('ontology');
        setIsCmdKOpen(false);
      }
    },
    {
      label: 'Switch to Cryptographic Lineage & DAG',
      category: 'Navigation',
      icon: GitFork,
      action: () => {
        setActiveTab('lineage');
        setIsCmdKOpen(false);
      }
    },
    {
      label: 'Switch to Agent Operations Console',
      category: 'Navigation',
      icon: Terminal,
      action: () => {
        setActiveTab('agent-trace');
        setIsCmdKOpen(false);
      }
    },
    {
      label: 'Switch to Access Grants Studio',
      category: 'Navigation',
      icon: KeyRound,
      action: () => {
        setActiveTab('grants');
        setIsCmdKOpen(false);
      }
    },
    {
      label: 'Switch to RFC 9421 Request Verifier',
      category: 'Navigation',
      icon: FileCheck2,
      action: () => {
        setActiveTab('request-verifier');
        setIsCmdKOpen(false);
      }
    },
    {
      label: 'Switch to Contract Schemas Studio',
      category: 'Navigation',
      icon: FileJson,
      action: () => {
        setActiveTab('schemas');
        setIsCmdKOpen(false);
      }
    },
    {
      label: 'Switch to Security Fixtures Harness (14)',
      category: 'Navigation',
      icon: ShieldCheck,
      action: () => {
        setActiveTab('security-harness');
        setIsCmdKOpen(false);
      }
    },
    {
      label: 'Switch to 9-Zone Policy Matrix',
      category: 'Navigation',
      icon: LayoutGrid,
      action: () => {
        setActiveTab('policy-matrix');
        setIsCmdKOpen(false);
      }
    },
    {
      label: 'Switch to 6-Week Evaluation Dashboard',
      category: 'Navigation',
      icon: BarChart3,
      action: () => {
        setActiveTab('evaluation');
        setIsCmdKOpen(false);
      }
    },
    {
      label: 'Switch to Primary Source Register',
      category: 'Navigation',
      icon: BookOpen,
      action: () => {
        setActiveTab('sources');
        setIsCmdKOpen(false);
      }
    },
    {
      label: 'Commission Fresh Agent Instance',
      category: 'Action',
      icon: Plus,
      action: () => {
        setIsCmdKOpen(false);
        onOpenCommission();
      }
    },
    {
      label: 'Issue Scoped Access Grant',
      category: 'Action',
      icon: KeyRound,
      action: () => {
        setIsCmdKOpen(false);
        onOpenNewGrant();
      }
    },
    {
      label: 'Seal New Immutable Submission',
      category: 'Action',
      icon: GitFork,
      action: () => {
        setIsCmdKOpen(false);
        onOpenNewSeal();
      }
    },
    {
      label: 'Run All 14 Deterministic Security Fixtures',
      category: 'Security',
      icon: Play,
      action: () => {
        setIsCmdKOpen(false);
        setActiveTab('security-harness');
        runAllSecurityFixtures();
      }
    },
    {
      label: 'Step Agent Sandbox Execution',
      category: 'Runtime',
      icon: Terminal,
      action: () => {
        setIsCmdKOpen(false);
        setActiveTab('agent-trace');
        runAgentTaskStep();
      }
    }
  ];

  const filtered = actions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-xl bg-surface-elevated border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="p-3 border-b border-border flex items-center space-x-2.5">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or jump to view..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none font-sans"
          />
          <button
            onClick={() => setIsCmdKOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-border/40 font-sans">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="w-full text-left p-2.5 rounded-lg hover:bg-surface flex items-center justify-between text-xs text-slate-200 transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase px-1.5 py-0.5 rounded bg-surface border border-border">
                  {item.category}
                </span>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="p-4 text-center text-xs text-slate-500">
              No matching commands or resources found.
            </div>
          )}
        </div>

        <div className="p-2 border-t border-border bg-surface flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Profile WRN-PASSPORT-0.2</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};

