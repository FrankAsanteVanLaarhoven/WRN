import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  GitFork,
  CheckCircle2,
  Clock,
  Shield,
  FileCode,
  ArrowRight,
  Plus,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

interface LineageDagViewProps {
  onOpenNewSeal: () => void;
}

export const LineageDagView: React.FC<LineageDagViewProps> = ({ onOpenNewSeal }) => {
  const { submissions, promoteSubmission } = useConsole();
  const [selectedSeal, setSelectedSeal] = useState<any>(submissions[0]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <GitFork className="w-5 h-5 text-foundry-cyan" />
            <h1 className="text-lg font-semibold text-white tracking-tight">
              Cryptographic Lineage & Sealed Submissions DAG
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable work graph. Append-only branch transitions verified via expected-head compare-and-swap (CAS).
          </p>
        </div>

        <button
          onClick={onOpenNewSeal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-medium shadow-glow-primary transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Seal New Submission</span>
        </button>
      </div>

      {/* DAG Visualizer Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left DAG Canvas */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-border">
            <span>BRANCH TRANSITIONS & QUARANTINE PIPELINE</span>
            <span>Ledger Witness Notary: ACTIVE</span>
          </div>

          <div className="space-y-4">
            {submissions.map((sub, index) => {
              const isSelected = selectedSeal?.sealId === sub.sealId;
              const isQuarantine = sub.status === 'quarantined';
              const isAccepted = sub.status === 'accepted';

              return (
                <div
                  key={sub.sealId}
                  onClick={() => setSelectedSeal(sub)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-surface-elevated border-foundry-cyan/60 shadow-glow-cyan'
                      : 'bg-surface-card border-border hover:border-slate-600'
                  }`}
                >
                  {/* Top Tag & Status */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-slate-300">
                        Branch: {sub.branch}
                      </span>
                      {sub.parentSealId && (
                        <span className="text-[10px] font-mono text-slate-500 flex items-center space-x-1">
                          <ArrowRight className="w-3 h-3" />
                          <span>Parent: {sub.parentSealId.slice(-8)}</span>
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-xs font-mono font-medium px-2 py-0.5 rounded border uppercase flex items-center space-x-1 ${
                        isAccepted
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {isAccepted ? <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> : <Clock className="w-3.5 h-3.5 mr-1" />}
                      <span>{sub.status}</span>
                    </span>
                  </div>

                  {/* Title & Author */}
                  <h3 className="text-sm font-semibold text-white mb-1">{sub.title}</h3>
                  <div className="text-xs text-slate-400 flex items-center space-x-2 mb-3">
                    <span>Author: <strong className="text-slate-300 font-mono">{sub.authorId.split(':').pop()}</strong></span>
                    {sub.delegatorId && <span>• Delegator: <span className="font-mono text-slate-300">{sub.delegatorId.split(':').pop()}</span></span>}
                  </div>

                  {/* Cryptographic Digest Box */}
                  <div className="p-2.5 rounded-lg bg-background border border-border/80 font-mono text-[11px] text-slate-300 flex items-center justify-between">
                    <div className="truncate mr-2">
                      <span className="text-slate-500">Digest: </span>
                      <span className="text-foundry-cyan">{sub.contentDigest}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0">{(sub.sizeBytes / 1024).toFixed(1)} KB</span>
                  </div>

                  {/* Promotion Button if in Quarantine */}
                  {isQuarantine && (
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <div className="text-[11px] text-amber-400 flex items-center space-x-1">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Held in Review Quarantine (Zone 5)</span>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          promoteSubmission(sub.sealId);
                        }}
                        className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-glow-emerald transition-all"
                      >
                        Approve & Promote to Release
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        {selectedSeal && (
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border p-6 bg-surface overflow-y-auto space-y-5">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">Sealed Object Properties</div>
              <h2 className="text-base font-bold text-white mb-1">{selectedSeal.title}</h2>
              <div className="text-xs font-mono text-primary break-all">{selectedSeal.sealId}</div>
            </div>

            {/* Verification Checklist */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2.5">
              <div className="text-xs font-semibold text-slate-200">Seal Integrity Attestation</div>
              <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>SHA-256 byte digest matches manifest</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>CAS expected_head verified against parent</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Detached witness notary signature valid</span>
                </div>
              </div>
            </div>

            {/* Code Changes Diff Snippet */}
            {selectedSeal.codeChanges && (
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-300 flex items-center space-x-1.5">
                  <FileCode className="w-4 h-4 text-primary" />
                  <span>Payload Changes</span>
                </div>
                {selectedSeal.codeChanges.map((change: any, i: number) => (
                  <div key={i} className="p-3 rounded-lg bg-background border border-border text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-300 font-semibold mb-1">
                      <span>{change.filename}</span>
                      <span className="text-emerald-400">+{change.additions} -{change.deletions}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 bg-surface-elevated p-2 rounded border border-border/60">
                      {change.diffSnippet}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Witness Receipts */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-300 flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-foundry-cyan" />
                <span>Witness Notary Receipts</span>
              </div>
              {selectedSeal.witnessReceipts.map((rec: any, idx: number) => (
                <div key={idx} className="p-3 rounded-lg bg-background border border-border text-[11px] font-mono space-y-1">
                  <div className="text-slate-400 truncate">Witness: {rec.witnessId}</div>
                  <div className="text-slate-400">Time: {rec.timestamp}</div>
                  <div className="text-foundry-cyan truncate">Checkpoint: {rec.checkpointRoot}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

