import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  LayoutGrid,
  Shield,
  Layers,
  Lock,
  Unlock,
  AlertCircle,
  FileCheck2,
  CheckCircle2,
  Info
} from 'lucide-react';
import { branchPolicy } from '../data/mockDb';

export const PolicyMatrixView: React.FC = () => {
  const { zones } = useConsole();
  const [selectedZone, setSelectedZone] = useState<any>(zones[0]);

  const operations = branchPolicy.operations || {};
  const grantDefaults = branchPolicy.grant_defaults || {};

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <LayoutGrid className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg font-semibold text-white tracking-tight">
              9-Zone Branch Access Matrix & Policy Kernel
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Boundary enforcement from branch_policy.yaml. Each operation requires explicit, non-equivalent permissions.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-slate-300">
          Default: History & Transitive Access <strong className="text-rose-400">DENIED</strong>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Zones Grid */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="text-xs font-mono text-slate-400 pb-1 border-b border-border">
            SECURITY ZONES & CONFIDENTIALITY BOUNDARIES ({zones.length})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {zones.map((zone: any) => {
              const isSelected = selectedZone?.zone === zone.zone;

              return (
                <div
                  key={zone.zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-surface-elevated border-indigo-500/60 shadow-glow-primary'
                      : 'bg-surface-card border-border hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-slate-200 uppercase">
                        {zone.zone.replace('_', ' ')}
                      </span>
                      <Shield className="w-3.5 h-3.5 text-indigo-400" />
                    </div>

                    <div className="text-xs text-slate-400 space-y-1 mb-3">
                      <div><strong className="text-slate-300">Readers:</strong> {zone.readers}</div>
                      <div><strong className="text-slate-300">Writers:</strong> {zone.writers}</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {zone.permitted.map((op: string) => (
                        <span
                          key={op}
                          className="px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 font-mono text-[10px] text-indigo-300"
                        >
                          {op}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Granular Operations Glossary */}
          <div className="p-4 rounded-xl bg-surface-card border border-border space-y-3">
            <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              11 Explicit Operations (Non-Equivalence Principle)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {Object.entries(operations).filter(([k]) => k !== 'non_equivalence').map(([op, desc]) => (
                <div key={op} className="p-2.5 rounded-lg bg-surface border border-border/80">
                  <div className="font-mono font-semibold text-primary mb-0.5">{op}</div>
                  <div className="text-slate-400 text-[11px]">{String(desc).replace(/_/g, ' ')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Detail Pane */}
        {selectedZone && (
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border p-6 bg-surface overflow-y-auto space-y-5">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">
                Zone Perimeter Specification
              </div>
              <h2 className="text-base font-bold text-white mb-1 font-mono uppercase">
                {selectedZone.zone}
              </h2>
              <div className="text-xs text-slate-400">
                Readers: <strong className="text-slate-200">{selectedZone.readers}</strong>
              </div>
            </div>

            {/* Boundary Enforcement Rule */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-amber-500/30 space-y-2 text-xs">
              <div className="font-semibold text-amber-400 flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Zone Boundary Rule</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                {selectedZone.boundary}
              </p>
            </div>

            {/* Permitted Operations */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2">
              <div className="text-xs font-semibold text-slate-300">Permitted In This Zone</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedZone.permitted.map((op: string) => (
                  <span
                    key={op}
                    className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 font-mono text-xs text-indigo-300 font-semibold"
                  >
                    {op}
                  </span>
                ))}
              </div>
            </div>

            {/* Grant Defaults Checklist */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2.5 text-xs">
              <div className="text-xs font-semibold text-slate-300">Universal Grant Defaults</div>
              <div className="space-y-1.5 font-mono text-[11px] text-slate-400">
                <div className="flex items-center space-x-2 text-slate-300">
                  <span className="text-rose-400 font-bold">✗</span>
                  <span>History access: false</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <span className="text-rose-400 font-bold">✗</span>
                  <span>Future versions: false</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <span className="text-rose-400 font-bold">✗</span>
                  <span>Cross-branch access: false</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <span className="text-rose-400 font-bold">✗</span>
                  <span>Marketplace publisher access: false</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

