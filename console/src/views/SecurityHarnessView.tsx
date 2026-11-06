import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  ShieldCheck,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ChevronRight,
  RefreshCw,
  Terminal,
  Activity
} from 'lucide-react';

export const SecurityHarnessView: React.FC = () => {
  const { securityResults, runSecurityFixture, runAllSecurityFixtures } = useConsole();
  const [selectedFixture, setSelectedFixture] = useState<any>(securityResults[0]);
  const [isRunningAll, setIsRunningAll] = useState(false);

  const passedCount = securityResults.filter(s => s.status === 'pass').length;
  const totalCount = securityResults.length;

  const handleRunAll = async () => {
    setIsRunningAll(true);
    await runAllSecurityFixtures();
    setIsRunningAll(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* View Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-foundry-emerald" />
            <h1 className="text-lg font-semibold text-white tracking-tight">
              Deterministic Security Test Harness (14 Fixtures)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Independent verification harness for profile WRN-PASSPORT-COEXISTENCE-0.2. Validates positive and negative security boundaries.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-surface-elevated border border-border flex items-center space-x-2">
            <span className="text-slate-400">Status:</span>
            <span className={`font-semibold ${passedCount === totalCount ? 'text-emerald-400' : 'text-amber-400'}`}>
              {passedCount} / {totalCount} Passed
            </span>
          </div>

          <button
            onClick={handleRunAll}
            disabled={isRunningAll}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-glow-emerald transition-all cursor-pointer"
          >
            {isRunningAll ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isRunningAll ? 'Executing 14 Fixtures...' : 'Run All 14 Fixtures'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Fixtures List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1 border-b border-border">
            <span>DETERMINISTIC FIXTURES (security_tests.yaml)</span>
            <span>Enforcement: Multi-Layer Kernel</span>
          </div>

          {securityResults.map(fix => {
            const isSelected = selectedFixture?.fixtureId === fix.fixtureId;
            const isPassed = fix.status === 'pass';
            const isNotRun = fix.status === 'not_run';

            return (
              <div
                key={fix.fixtureId}
                onClick={() => setSelectedFixture(fix)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-surface-elevated border-foundry-emerald/60 shadow-glow-emerald'
                    : 'bg-surface-card border-border hover:border-slate-600'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-mono text-xs font-bold text-slate-200">
                      [{fix.fixtureId}]
                    </span>
                    <h3 className="text-xs font-semibold text-white truncate">
                      {fix.name}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {fix.expectedOutcome}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {fix.enforcementLayers.map((layer: string) => (
                      <span
                        key={layer}
                        className="px-2 py-0.5 rounded bg-surface border border-border font-mono text-[10px] text-slate-400"
                      >
                        {layer}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span
                    className={`text-xs font-mono font-medium px-2 py-1 rounded border uppercase flex items-center space-x-1 ${
                      isPassed
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : isNotRun
                        ? 'bg-slate-800 text-slate-400 border-border'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    <span>{fix.status}</span>
                  </span>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      runSecurityFixture(fix.fixtureId);
                    }}
                    className="p-1.5 rounded-lg bg-surface hover:bg-surface-elevated border border-border text-slate-300 hover:text-white transition-colors"
                    title={`Run ${fix.fixtureId}`}
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        {selectedFixture && (
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border p-6 bg-surface overflow-y-auto space-y-5">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">
                Security Contract Fixture Details
              </div>
              <h2 className="text-base font-bold text-white mb-1">
                [{selectedFixture.fixtureId}] {selectedFixture.name}
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                Duration: {selectedFixture.durationMs}ms
              </div>
            </div>

            {/* Expected vs Actual Outcome */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-surface-elevated border border-border space-y-1.5 text-xs">
                <div className="font-semibold text-slate-300">Contract Expected Assertion</div>
                <div className="text-slate-400 font-mono text-[11px] leading-relaxed">
                  {selectedFixture.expectedOutcome}
                </div>
              </div>

              <div className={`p-3.5 rounded-lg border space-y-1.5 text-xs ${
                selectedFixture.status === 'pass'
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                  : 'bg-surface-elevated border-border text-slate-400'
              }`}>
                <div className="font-semibold flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Actual Verification Result</span>
                </div>
                <div className="font-mono text-[11px] leading-relaxed">
                  {selectedFixture.actualOutcome}
                </div>
              </div>
            </div>

            {/* Multi-Layer Enforcement Trace Logs */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <Terminal className="w-4 h-4 text-primary" />
                <span>Multi-Layer Verification Logs</span>
              </div>
              <div className="p-3 rounded-lg bg-background border border-border font-mono text-[11px] text-slate-300 space-y-1.5 max-h-60 overflow-y-auto">
                {selectedFixture.logEntries.map((log: string, idx: number) => (
                  <div key={idx} className="text-slate-400">
                    <span className="text-slate-600 mr-1.5">&gt;</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Single Run Action */}
            <button
              onClick={() => runSecurityFixture(selectedFixture.fixtureId)}
              className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-glow-emerald cursor-pointer"
            >
              Re-Verify [{selectedFixture.fixtureId}]
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

