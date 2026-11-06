import React, { useState } from 'react';
import { useStaggerEntrance } from '../hooks/useGsapAnimation';
import {
  Globe,
  GitBranch,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Plus,
  Terminal,
  Clock,
  Sliders,
  MousePointer,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { GlowCard } from '../components/ui/spotlight-card';

interface Deployment {
  id: string;
  commitHash: string;
  message: string;
  branch: string;
  status: 'ready' | 'building' | 'queued';
  domain: string;
  timeAgo: string;
}

export const SitesView: React.FC = () => {
  const containerRef = useStaggerEntrance();
  const [isDeploying, setIsDeploying] = useState(false);
  const [flexDirection, setFlexDirection] = useState<'row' | 'column' | 'row-reverse' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<'space-between' | 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-evenly'>('space-between');
  const [alignItems, setAlignItems] = useState<'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'>('center');
  const [gapPx, setGapPx] = useState<number>(16);
  const [flexWrap, setFlexWrap] = useState<boolean>(true);
  const [brandCursor, setBrandCursor] = useState<boolean>(false);

  // 3D Tilt state for Card #2
  const [card2Tilt, setCard2Tilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleCard2MouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setCard2Tilt({ x, y });
  };

  const handleCard2MouseLeave = () => {
    setCard2Tilt({ x: 0, y: 0 });
  };

  const [deployments, setDeployments] = useState<Deployment[]>([
    { id: 'dep_01', commitHash: '2ab96c0', message: 'fix: remove developer tech stack text and badges from navigation', branch: 'main', status: 'ready', domain: 'preview.cloud.wrn.network', timeAgo: '2 mins ago' },
    { id: 'dep_02', commitHash: 'fdbcd91', message: 'feat: military-grade Rust kernel, Go edge gateway, unified Makefiles', branch: 'main', status: 'ready', domain: 'fdbcd91.preview.wrn.network', timeAgo: '12 mins ago' },
    { id: 'dep_03', commitHash: '3f74ada', message: 'feat: AI dynamic experience studio, interactive flexbox playground', branch: 'main', status: 'ready', domain: '3f74ada.preview.wrn.network', timeAgo: '1 hour ago' }
  ]);

  const handleTriggerDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      const newDep: Deployment = {
        id: `dep_${String(deployments.length + 1).padStart(2, '0')}`,
        commitHash: '7a84e2f',
        message: 'chore: live automated edge deployment via Git trigger',
        branch: 'main',
        status: 'ready',
        domain: '7a84e2f.preview.wrn.network',
        timeAgo: 'Just now'
      };
      setDeployments([newDep, ...deployments]);
      setIsDeploying(false);
    }, 1200);
  };

  return (
    <div ref={containerRef} className="flex-1 flex flex-col h-full overflow-y-auto bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-3 gsap-fade-in">
        <div>
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-illum" />
            <h1 className="text-xl font-bold text-white tracking-tight">Sites & Edge Hosting</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Deploy static, SSR, and CSR frontends directly from Git with instant preview domains and Cloudflare Edge CDN.
          </p>
        </div>

        <button
          onClick={handleTriggerDeploy}
          disabled={isDeploying}
          className="px-3.5 py-1.5 rounded-lg neon-tube-button text-xs font-semibold flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
        >
          {isDeploying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
          <span>{isDeploying ? 'Building...' : '+ Deploy from Git'}</span>
        </button>
      </div>

      {/* Production Domain Card */}
      <div className="p-5 rounded-xl neon-tube-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 gsap-fade-in">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Badge variant="success">Production Domain</Badge>
            <span className="text-xs font-mono text-slate-400">Cloudflare Enterprise SSL</span>
          </div>
          <div className="text-lg font-bold text-white font-mono flex items-center space-x-2">
            <span>https://cloud.wrn.network</span>
            <ExternalLink className="w-4 h-4 text-illum" />
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Connected to Git: <strong className="text-slate-200">FrankAsanteVanLaarhoven/WRN (main)</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <Badge variant="tube">TLS 1.3 0-RTT</Badge>
          <Badge variant="outline">HTTP/3 Quic Active</Badge>
        </div>
      </div>

      {/* Interactive Flexbox & Layout Playground */}
      <div className="p-5 rounded-xl border border-border/80 bg-surface/90 space-y-5 gsap-fade-in shadow-xl relative overflow-hidden">
        {/* Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 gap-3">
          <div>
            <div className="flex items-center space-x-2 text-rose-400">
              <Sliders className="w-4 h-4" />
              <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-white">
                INTERACTIVE FLEXBOX & LAYOUT PLAYGROUND
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Modify flexbox orientation, alignment, and gaps live to preview fluid AI-generated component reflow.
            </p>
          </div>

          <button
            onClick={() => setBrandCursor(!brandCursor)}
            className={`px-3 py-1 rounded-md text-[11px] font-mono flex items-center space-x-1.5 transition-all border ${
              brandCursor
                ? 'border-illum text-illum bg-illum/10 shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                : 'border-border text-slate-400 hover:text-white bg-surface-elevated/40'
            }`}
          >
            <MousePointer className="w-3 h-3" />
            <span>Brand Cursor: {brandCursor ? 'On' : 'Off'}</span>
          </button>
        </div>

        {/* Controls Toolbar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono bg-surface-elevated/50 p-3 rounded-lg border border-border/50">
          {/* Flex Direction */}
          <div className="space-y-1">
            <label htmlFor="flex-direction-select" className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">FLEX DIRECTION</label>
            <select
              id="flex-direction-select"
              name="flexDirection"
              aria-label="Flex Direction"
              value={flexDirection}
              onChange={(e) => setFlexDirection(e.target.value as any)}
              className="w-full bg-surface border border-border rounded px-2 py-1 text-slate-200 text-xs focus:outline-hidden focus:border-illum"
            >
              <option value="row">row</option>
              <option value="column">column</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          {/* Justify Content */}
          <div className="space-y-1">
            <label htmlFor="justify-content-select" className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">JUSTIFY CONTENT</label>
            <select
              id="justify-content-select"
              name="justifyContent"
              aria-label="Justify Content"
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value as any)}
              className="w-full bg-surface border border-border rounded px-2 py-1 text-slate-200 text-xs focus:outline-hidden focus:border-illum"
            >
              <option value="space-between">space-between</option>
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>

          {/* Align Items */}
          <div className="space-y-1">
            <label htmlFor="align-items-select" className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">ALIGN ITEMS</label>
            <select
              id="align-items-select"
              name="alignItems"
              aria-label="Align Items"
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value as any)}
              className="w-full bg-surface border border-border rounded px-2 py-1 text-slate-200 text-xs focus:outline-hidden focus:border-illum"
            >
              <option value="center">center</option>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="stretch">stretch</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          {/* Gap Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              <label htmlFor="gap-range-slider">GAP: {gapPx}PX</label>
            </div>
            <input
              id="gap-range-slider"
              name="gapPx"
              aria-label={`Gap: ${gapPx} pixels`}
              type="range"
              min="4"
              max="48"
              step="4"
              value={gapPx}
              onChange={(e) => setGapPx(Number(e.target.value))}
              className="w-full accent-illum cursor-pointer mt-1"
            />
          </div>

          {/* Flex Wrap */}
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">FLEX WRAP</label>
            <button
              onClick={() => setFlexWrap(!flexWrap)}
              className="w-full bg-surface border border-border rounded px-2 py-1 text-slate-200 text-xs hover:border-border-active transition-colors text-left"
            >
              {flexWrap ? 'wrap (enabled)' : 'nowrap'}
            </button>
          </div>
        </div>

        {/* Live Interactive Playground Canvas */}
        <div
          className="p-4 rounded-xl border border-dashed border-border/80 bg-background/60 min-h-[170px] transition-all"
          style={{
            display: 'flex',
            flexDirection,
            justifyContent,
            alignItems,
            gap: `${gapPx}px`,
            flexWrap: flexWrap ? 'wrap' : 'nowrap'
          }}
        >
          {/* Card #1: Micro-Animation */}
          <div className="w-56 p-4 rounded-xl border border-border/70 bg-surface/80 hover:border-rose-500/50 hover:shadow-[0_0_15px_rgba(244,63,94,0.15)] transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                  Micro-Animation
                </span>
                <span className="text-[11px] font-mono text-slate-500">#1</span>
              </div>
              <h3 className="text-xs font-bold text-white mt-2 group-hover:text-rose-400 transition-colors">
                AI Fluid Motion
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Subtle physics-driven spring easing with hover glow.
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-border/40 group-hover:text-rose-400">
              <span>Interact: Hover</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card #2: Hover Parallax (Interactive 3D Tilt) */}
          <div
            onMouseMove={handleCard2MouseMove}
            onMouseLeave={handleCard2MouseLeave}
            style={{
              transform: `perspective(600px) rotateX(${card2Tilt.y}deg) rotateY(${card2Tilt.x}deg)`
            }}
            className="w-56 p-4 rounded-xl border border-border/70 bg-surface/80 hover:border-illum/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-transform duration-100 ease-out group cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                  Hover Parallax
                </span>
                <span className="text-[11px] font-mono text-slate-500">#2</span>
              </div>
              <h3 className="text-xs font-bold text-white mt-2 group-hover:text-illum transition-colors">
                3D Image Tilt
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Perspective 3D tilt tracking pointer coordinates dynamically.
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-border/40 group-hover:text-illum">
              <span>Interact: Hover</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card #3: Theme Swatch (Spotlight GlowCard) */}
          <GlowCard
            customSize
            glowColor="purple"
            className="w-56 p-4 border border-border/70 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                  Theme Swatch
                </span>
                <span className="text-[11px] font-mono text-slate-500">#3</span>
              </div>
              <h3 className="text-xs font-bold text-white mt-2 group-hover:text-purple-400 transition-colors">
                Brand Luminescence
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Real-time CSS variable illumination matching brand palette.
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-border/40 group-hover:text-purple-400">
              <span>Interact: Hover</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </GlowCard>

          {/* Card #4: Cloudflare CDN / Edge */}
          <div className="w-56 p-4 rounded-xl border border-border/70 bg-surface/80 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                  Cloudflare CDN
                </span>
                <span className="text-[11px] font-mono text-slate-500">#4</span>
              </div>
              <h3 className="text-xs font-bold text-white mt-2 group-hover:text-emerald-400 transition-colors">
                Zero-Latency Edge
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Sub-millisecond static delivery across 310 global PoPs.
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-border/40 group-hover:text-emerald-400">
              <span>Interact: Hover</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Deployments History */}
      <div className="space-y-3 gsap-fade-in">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="text-white font-semibold">Deployment History ({deployments.length})</span>
          <span>Auto-deploy on every push</span>
        </div>

        <div className="rounded-xl border border-border bg-surface-card overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-surface text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-4 font-semibold">Commit</th>
                <th className="py-2.5 px-4 font-semibold">Branch</th>
                <th className="py-2.5 px-4 font-semibold">Message</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold">Preview URL</th>
                <th className="py-2.5 px-4 font-semibold text-right">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-mono">
              {deployments.map(d => (
                <tr key={d.id} className="hover:bg-surface-elevated/40 transition-colors">
                  <td className="py-3 px-4 text-illum font-bold">{d.commitHash}</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center space-x-1 text-slate-300">
                      <GitBranch className="w-3 h-3 text-slate-500" />
                      <span>{d.branch}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-white font-medium truncate max-w-xs">{d.message}</td>
                  <td className="py-3 px-4">
                    <Badge variant="success">Ready</Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <a
                      href={`https://${d.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-illum hover:underline flex items-center space-x-1"
                    >
                      <span className="truncate max-w-[180px]">{d.domain}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400">{d.timeAgo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

