import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Sparkles, Shield, Zap } from 'lucide-react';

export function Default() {
  return (
    <div className="w-full min-h-[400px] p-6 flex flex-wrap items-center justify-center gap-8 bg-background">
      <GlowCard glowColor="blue" size="md">
        <div className="flex flex-col justify-between h-full p-2">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Zap className="w-5 h-5" />
            <h3 className="text-sm font-bold font-mono tracking-wider uppercase text-white">Edge Compute</h3>
          </div>
          <p className="text-xs text-slate-300">
            Sub-millisecond cold starts with Rust WASM micro-VMs and zero quiescent power drain.
          </p>
          <div className="text-[10px] font-mono text-cyan-400">Status: Active • 310 PoPs</div>
        </div>
      </GlowCard>

      <GlowCard glowColor="purple" size="md">
        <div className="flex flex-col justify-between h-full p-2">
          <div className="flex items-center space-x-2 text-purple-400">
            <Shield className="w-5 h-5" />
            <h3 className="text-sm font-bold font-mono tracking-wider uppercase text-white">Passport Security</h3>
          </div>
          <p className="text-xs text-slate-300">
            Constant-time RFC 9421 signature verification and isolated memory compartments.
          </p>
          <div className="text-[10px] font-mono text-purple-400">Zone 1 Core • 14/14 SEC Pass</div>
        </div>
      </GlowCard>

      <GlowCard glowColor="green" size="md">
        <div className="flex flex-col justify-between h-full p-2">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-sm font-bold font-mono tracking-wider uppercase text-white">Green Grid</h3>
          </div>
          <p className="text-xs text-slate-300">
            Follow-the-Sun workload routing prioritizing regions with renewable curtailment.
          </p>
          <div className="text-[10px] font-mono text-emerald-400">Intensity: 84 gCO2e/kWh</div>
        </div>
      </GlowCard>
    </div>
  );
}

export default Default;
