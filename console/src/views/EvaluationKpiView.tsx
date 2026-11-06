import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  BarChart3,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Target,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { evaluationPlan } from '../data/mockDb';

export const EvaluationKpiView: React.FC = () => {
  const { kpis, revocationStats } = useConsole();
  const [selectedKpi, setSelectedKpi] = useState<any>(kpis[0]);

  const pilotStudy = evaluationPlan.human_study?.pilot || {};
  const relativePlan = [
    { period: 'Week 1', milestone: 'Threat Model & Corpus Freeze', focus: evaluationPlan.six_week_relative_plan?.week_1 || 'Freeze threat model, actor definitions, synthetic corpus' },
    { period: 'Weeks 2–3', milestone: 'Enforcement Boundary & Lineage', focus: evaluationPlan.six_week_relative_plan?.weeks_2_3 || 'Build minimal reader, enforcement boundary, and memory lineage' },
    { period: 'Week 4', milestone: 'Recovery & Authority Conformance', focus: evaluationPlan.six_week_relative_plan?.week_4 || 'Execute conformance and compromised-key recovery' },
    { period: 'Weeks 5–6', milestone: 'Bounded Pilot & Reporting', focus: evaluationPlan.six_week_relative_plan?.weeks_5_6 || 'Run bounded pilot (72 episodes) and report all KPIs' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-semibold text-white tracking-tight">
              6-Week Evaluation Plan & KPI Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Empirical evaluation programme: 7 Core KPIs, 72 task episodes, and online revocation benchmarks.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-slate-300">
            Pilot: <strong className="text-purple-400">72 Episodes</strong> (12 participants × 6 tasks)
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: KPIs & Pilot Progress */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Top Pilot Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-surface-card border border-border">
              <div className="text-[11px] text-slate-400 font-mono flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>HUMAN STUDY PILOT</span>
              </div>
              <div className="text-xl font-bold text-white mt-1">
                12 × 6 = 72
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Matched tasks across 2 conditions
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-card border border-border">
              <div className="text-[11px] text-slate-400 font-mono flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>ONLINE REVOCATION</span>
              </div>
              <div className="text-xl font-bold text-emerald-400 mt-1">
                {revocationStats.lastRevocationLatencyMs}ms
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                P95 Target ≤ 60s (SLA Met)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-card border border-border">
              <div className="text-[11px] text-slate-400 font-mono flex items-center space-x-1.5">
                <Target className="w-3.5 h-3.5 text-foundry-cyan" />
                <span>FALSE DENIAL TARGET</span>
              </div>
              <div className="text-xl font-bold text-foundry-cyan mt-1">
                0.00%
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Authorized attempts denied: 0
              </div>
            </div>
          </div>

          {/* 7 KPIs List */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-400 pb-1 border-b border-border">
              THE 7 EVALUATION KPIS (evaluation_plan.yaml)
            </div>

            {kpis.map((kpi: any) => {
              const isSelected = selectedKpi?.id === kpi.id;

              return (
                <div
                  key={kpi.id}
                  onClick={() => setSelectedKpi(kpi)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-surface-elevated border-purple-500/60 shadow-glow-primary'
                      : 'bg-surface-card border-border hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-purple-400">
                        [{kpi.id}]
                      </span>
                      <h3 className="text-xs font-semibold text-white">
                        {kpi.name}
                      </h3>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-slate-300">
                      Target: {kpi.gate?.slice(0, 30) || 'Deterministic Pass'}...
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 space-y-1">
                    {kpi.measures?.map((m: string, i: number) => (
                      <div key={i} className="flex items-center space-x-1.5 font-mono text-[11px]">
                        <span className="text-purple-400">•</span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 6-Week Bounded Relative Plan */}
          <div className="p-4 rounded-xl bg-surface-card border border-border space-y-3">
            <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>6-Week Bounded Roadmap</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {relativePlan.map((step: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-lg bg-surface border border-border/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400 font-mono">
                    <span className="font-bold text-white text-xs">{step.period}</span>
                    <span className="text-[10px] text-purple-400 font-semibold">{step.milestone}</span>
                  </div>
                  <div className="text-slate-300 text-[11px] leading-relaxed">{step.focus}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Detail Pane */}
        {selectedKpi && (
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border p-6 bg-surface overflow-y-auto space-y-5">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">
                KPI Acceptance Gate Specification
              </div>
              <h2 className="text-base font-bold text-white mb-1">
                [{selectedKpi.id}] {selectedKpi.name}
              </h2>
            </div>

            {/* Tracking Protocol */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2 text-xs">
              <div className="font-semibold text-slate-300">Measurement & Tracking Protocol</div>
              <p className="text-slate-400 font-mono text-[11px] leading-relaxed">
                {selectedKpi.tracking}
              </p>
            </div>

            {/* Gate Criteria */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-purple-500/30 space-y-2 text-xs">
              <div className="font-semibold text-purple-400 flex items-center space-x-1.5">
                <Target className="w-4 h-4" />
                <span>Falsifiable Gate Target</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                {selectedKpi.gate}
              </p>
            </div>

            {/* Metrics List */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2 text-xs">
              <div className="font-semibold text-slate-300">Required Metrics Captured</div>
              <div className="space-y-1.5">
                {selectedKpi.measures?.map((m: string, idx: number) => (
                  <div key={idx} className="p-2 rounded bg-background border border-border font-mono text-[11px] text-slate-300">
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
