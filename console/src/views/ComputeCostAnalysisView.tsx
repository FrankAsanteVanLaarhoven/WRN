import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  Cpu,
  TrendingDown,
  DollarSign,
  Server,
  Zap,
  CheckCircle2,
  BarChart2,
  HardDrive
} from 'lucide-react';

export const ComputeCostAnalysisView: React.FC = () => {
  const { computePlans } = useConsole();
  const [vCpuCount, setVCpuCount] = useState<number>(4);
  const [ramCount, setRamCount] = useState<number>(8);
  const [storageGb, setStorageGb] = useState<number>(160);

  // Dynamic cost calculation
  const ourMonthlyCost = Math.round((vCpuCount * 4 + ramCount * 1.5 + storageGb * 0.05) * 100) / 100;
  const digitalOceanCost = Math.round((vCpuCount * 6 + ramCount * 3 + storageGb * 0.10) * 100) / 100;
  const awsCost = Math.round((vCpuCount * 7.5 + ramCount * 3.8 + storageGb * 0.12) * 100) / 100;
  const savingsMonthly = Math.round((digitalOceanCost - ourMonthlyCost) * 100) / 100;
  const savingsPercent = Math.round(((digitalOceanCost - ourMonthlyCost) / digitalOceanCost) * 100);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-illum" />
            <h1 className="text-lg font-bold text-white tracking-tight">
              Server & Compute Architecture • Real Cost Analysis
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Micro-billed serverless & dedicated agent compute surpassing DigitalOcean and AWS EC2 on price, IOPS, and latency.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40">
            Average 41.7% Savings vs DigitalOcean
          </span>
        </div>
      </div>

      {/* Interactive Cost Comparison Calculator */}
      <div className="p-6 rounded-xl neon-tube-card space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-illum" />
              <span>Interactive Compute Sizing & Cost Benchmark</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Adjust resource sliders to simulate your agent cluster workloads.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface border border-border text-center font-mono">
            <div className="text-[10px] text-slate-400 uppercase">Your Monthly Bill</div>
            <div className="text-2xl font-bold text-illum">${ourMonthlyCost.toFixed(2)}</div>
            <div className="text-[11px] text-emerald-400 font-semibold">
              Save ${savingsMonthly.toFixed(2)}/mo ({savingsPercent}%) vs DO
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-mono text-xs">
          <div className="space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Dedicated vCPUs:</span>
              <strong className="text-illum">{vCpuCount} Cores</strong>
            </div>
            <input
              type="range"
              min="1"
              max="32"
              value={vCpuCount}
              onChange={e => setVCpuCount(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>RAM Allocation:</span>
              <strong className="text-illum">{ramCount} GB</strong>
            </div>
            <input
              type="range"
              min="1"
              max="64"
              value={ramCount}
              onChange={e => setRamCount(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>High-IOPS NVMe:</span>
              <strong className="text-illum">{storageGb} GB</strong>
            </div>
            <input
              type="range"
              min="25"
              max="1000"
              step="25"
              value={storageGb}
              onChange={e => setStorageGb(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Direct Provider Comparison Bar */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/80 text-center font-mono text-xs">
          <div className="p-3 rounded-lg bg-surface border border-border">
            <div className="text-slate-400 text-[11px]">WRN × Appwrite OS</div>
            <div className="text-lg font-bold text-illum mt-0.5">${ourMonthlyCost.toFixed(2)}</div>
            <div className="text-[10px] text-emerald-400">Included Agent Mesh</div>
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border">
            <div className="text-slate-400 text-[11px]">DigitalOcean Droplet</div>
            <div className="text-lg font-bold text-slate-300 mt-0.5">${digitalOceanCost.toFixed(2)}</div>
            <div className="text-[10px] text-rose-400">+${savingsMonthly.toFixed(2)} more expensive</div>
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border">
            <div className="text-slate-400 text-[11px]">AWS EC2 (t4g/c7g)</div>
            <div className="text-lg font-bold text-slate-300 mt-0.5">${awsCost.toFixed(2)}</div>
            <div className="text-[10px] text-rose-400">+Egress charges extra</div>
          </div>
        </div>
      </div>

      {/* Pre-configured Tiers */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
          Production Compute Tiers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {computePlans.map(plan => (
            <div
              key={plan.id}
              className="p-4 rounded-xl bg-surface-card border border-border/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between neon-tube-card space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white tracking-tight">{plan.name}</h4>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    -{plan.savingsVsDOPercent}%
                  </span>
                </div>

                <div className="flex items-baseline space-x-1 font-mono">
                  <span className="text-2xl font-bold text-white">${plan.ourPriceMonthly.toFixed(2)}</span>
                  <span className="text-xs text-slate-400">/mo</span>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1 font-mono pt-1">
                  <div>• {plan.vCPU} vCPU Dedicated Cores</div>
                  <div>• {plan.ramGB} GB High-Speed RAM</div>
                  <div>• {plan.nvmeGB} GB Gen4 NVMe Disk</div>
                  <div>• {plan.bandwidthTB} TB Edge Bandwidth</div>
                </div>
              </div>

              <div className="pt-3 border-t border-border space-y-2">
                <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                  <span>DigitalOcean:</span>
                  <span className="line-through text-slate-500">${plan.digitalOceanPriceMonthly.toFixed(2)}/mo</span>
                </div>
                <button className="w-full py-1.5 rounded-lg neon-tube-button text-slate-950 font-bold text-xs flex items-center justify-center space-x-1 transition-all">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Provision Node</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

