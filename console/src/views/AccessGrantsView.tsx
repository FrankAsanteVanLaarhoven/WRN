import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  KeyRound,
  ShieldAlert,
  Plus,
  Lock,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Copy
} from 'lucide-react';

interface AccessGrantsViewProps {
  onOpenNewGrant: () => void;
}

export const AccessGrantsView: React.FC<AccessGrantsViewProps> = ({ onOpenNewGrant }) => {
  const { grants, revokeGrant, revocationStats } = useConsole();
  const [selectedGrant, setSelectedGrant] = useState<any>(grants[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <KeyRound className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg font-semibold text-white tracking-tight">
              Access Grants & Delegation Studio
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable grant terms with deterministic pre-consent digests. Semantic narrowing verified at runtime.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenNewGrant}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-medium shadow-glow-primary transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Issue Scoped Grant</span>
          </button>
        </div>
      </div>

      {/* Main Studio View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Grants Table / Cards */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1 border-b border-border">
            <span>REGISTERED ACCESS GRANTS ({grants.length})</span>
            <span>Online Revocation Target: P95 ≤ 60s</span>
          </div>

          <div className="space-y-3">
            {grants.map(grant => {
              const isSelected = selectedGrant?.grantId === grant.grantId;
              const isActive = grant.status === 'active';
              const isRevoked = grant.status === 'revoked';

              return (
                <div
                  key={grant.grantId}
                  onClick={() => setSelectedGrant(grant)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-surface-elevated border-indigo-500/60 shadow-glow-primary'
                      : 'bg-surface-card border-border hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-semibold text-slate-200">
                        {grant.grantId}
                      </span>
                      {grant.parentGrantId && (
                        <span className="text-[10px] font-mono text-slate-500 flex items-center space-x-0.5">
                          <ArrowRight className="w-3 h-3" />
                          <span>Narrowed from Parent</span>
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-xs font-mono font-medium px-2 py-0.5 rounded border uppercase flex items-center space-x-1 ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : isRevoked
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : 'bg-slate-800 text-slate-400 border-border'
                      }`}
                    >
                      {isActive && <CheckCircle2 className="w-3 h-3" />}
                      {isRevoked && <AlertTriangle className="w-3 h-3" />}
                      <span>{grant.status}</span>
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    <div>
                      <span className="text-slate-500">Grantee:</span>{' '}
                      <span className="font-mono text-slate-300">{grant.granteeId.split(':').pop()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Target Zone:</span>{' '}
                      <span className="font-mono text-indigo-400 font-semibold">{grant.targetZone}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {grant.permittedOperations.map(op => (
                      <span
                        key={op}
                        className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 font-mono text-[11px] text-indigo-300 font-medium"
                      >
                        {op}
                      </span>
                    ))}
                  </div>

                  <div className="p-2 rounded bg-background border border-border/70 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                    <span className="truncate mr-2">Terms Digest: <strong className="text-primary">{grant.termsDigest}</strong></span>
                    <span className="shrink-0 text-slate-500">Pre-consent SHA-256</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Grant Inspector */}
        {selectedGrant && (
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border p-6 bg-surface overflow-y-auto space-y-5">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">Grant Authority Terms</div>
              <h2 className="text-base font-bold text-white mb-1 font-mono break-all">{selectedGrant.grantId}</h2>
              <div className="text-xs text-slate-400">Issuer: <span className="font-mono text-slate-200">{selectedGrant.issuerId}</span></div>
            </div>

            {/* Online Revocation Action */}
            {selectedGrant.status === 'active' ? (
              <div className="p-4 rounded-xl bg-surface-elevated border border-rose-500/30 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-semibold text-rose-400">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Online Revocation Control</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Immediately update the authoritative status list. All downstream enforcement points will reject any further signed requests.
                </p>
                <button
                  onClick={() => revokeGrant(selectedGrant.grantId, 'Revoked by owner via Console')}
                  className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-all shadow-lg shadow-rose-950/50"
                >
                  Revoke Grant Immediately
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2 text-xs">
                <div className="font-semibold text-rose-400 flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Grant Revoked</span>
                </div>
                <div className="text-slate-300 font-mono text-[11px]">{selectedGrant.revocationReason}</div>
                <div className="text-slate-500 text-[10px]">Revoked at: {selectedGrant.revokedAt}</div>
              </div>
            )}

            {/* Resource Scope */}
            <div className="p-3.5 rounded-lg bg-surface-elevated border border-border space-y-2 text-xs">
              <div className="text-slate-400 font-medium">Resource Scope</div>
              <div className="p-2 rounded bg-background font-mono text-slate-200 text-[11px] break-all border border-border">
                {selectedGrant.resourceSelector}
              </div>
            </div>

            {/* Validity Interval */}
            <div className="p-3.5 rounded-lg bg-surface-elevated border border-border space-y-1.5 text-xs">
              <div className="text-slate-400 font-medium">Validity Bounded Interval</div>
              <div className="font-mono text-[11px] text-slate-300">
                From: {selectedGrant.validFrom}
              </div>
              <div className="font-mono text-[11px] text-slate-300">
                Until: {selectedGrant.validUntil}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

