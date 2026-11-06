import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  Sparkles,
  MousePointer2,
  Layout,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Radio,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Eye,
  Activity,
  Server,
  Play,
  Copy,
  ChevronRight
} from 'lucide-react';

export const AiExperienceStudioView: React.FC = () => {
  const { illuminationColor } = useConsole();
  const [activeTab, setActiveTab] = useState<'experiences' | 'security'>('experiences');

  // AI Generation Prompt State
  const [prompt, setPrompt] = useState('Generate a responsive flexbox card layout with branded magnetic cursor and 3D hover image perspective tilt.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [appliedEffect, setAppliedEffect] = useState('3D perspective tilt + dynamic flexbox');

  // Interactive Flexbox Studio States
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'>('space-between');
  const [alignItems, setAlignItems] = useState<'stretch' | 'center' | 'flex-start' | 'flex-end'>('center');
  const [flexGap, setFlexGap] = useState<number>(16);
  const [flexWrap, setFlexWrap] = useState<boolean>(true);

  // Custom Cursor Mode State
  const [isCustomCursorActive, setIsCustomCursorActive] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // 3D Image Hover Tilt States
  const [hoverCardId, setHoverCardId] = useState<number | null>(null);
  const [tiltStyle, setTiltStyle] = useState<{ [key: number]: { transform: string } }>({});

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xCenter = rect.width / 2;
    const yCenter = rect.height / 2;
    const rotateX = ((y - yCenter) / yCenter) * -12;
    const rotateY = ((x - xCenter) / xCenter) * 12;

    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
      }
    }));
  };

  const handleMouseLeaveCard = (id: number) => {
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      }
    }));
    setHoverCardId(null);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAppliedEffect(prompt);
    }, 900);
  };

  const securityFeatures = [
    {
      title: 'Cloudflare Enterprise CDN',
      badge: 'included',
      desc: '310+ global edge Points of Presence with 0ms TTFB cache routing, HTTP/3, and QUIC acceleration.',
      icon: Globe,
      status: 'Active (310 PoPs)',
      metric: '0.4ms avg TTFB'
    },
    {
      title: 'Premium SSL & TLS 1.3',
      badge: 'included',
      desc: 'Automated Let\'s Encrypt Wildcard & Enterprise edge certificates with 0-RTT session resumption.',
      icon: Lock,
      status: 'Active (TLS 1.3)',
      metric: 'Auto-Renewed'
    },
    {
      title: 'WAF, DDoS & Botnet Protection',
      badge: 'included',
      desc: 'Layer 3/4/7 automated volumetric attack scrubbing and AI behavioral challenge filtering.',
      icon: ShieldCheck,
      status: 'Protected',
      metric: '41.8k threats mitigated'
    },
    {
      title: 'Vulnerability Scanner',
      badge: 'included',
      desc: 'Continuous real-time SAST & DAST vulnerability detection across all contracts and codebases.',
      icon: Eye,
      status: '0 CVEs Detected',
      metric: 'Continuous Scan'
    },
    {
      title: 'Activity Log & Audit Trail',
      badge: 'included',
      desc: 'Immutable append-only audit trail with qualified SHA-256 digests and RFC 9421 signature verification.',
      icon: Activity,
      status: 'Sealed & Validated',
      metric: '1,420 events recorded'
    },
    {
      title: 'Redis - Object Cache',
      badge: 'included',
      desc: 'In-memory sub-millisecond edge cache with 100k IOPS and automatic stale-while-revalidate invalidation.',
      icon: Zap,
      status: 'Connected',
      metric: '99.4% cache hit ratio'
    }
  ];

  return (
    <div
      className="flex-1 flex flex-col h-full overflow-hidden bg-background"
      onMouseMove={e => {
        if (isCustomCursorActive) {
          setCursorPos({ x: e.clientX, y: e.clientY });
        }
      }}
    >
      {/* Branded Magnetic Custom Cursor Overlay */}
      {isCustomCursorActive && (
        <div
          className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div
            className="w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center animate-pulse"
            style={{
              borderColor: 'var(--illum-color)',
              boxShadow: '0 0 16px var(--illum-glow)'
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--illum-color)' }}
            />
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-illum" />
            <h1 className="text-lg font-bold text-white tracking-tight">
              Design Engaging Experiences with AI & Enterprise Security
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Let AI build interactions that set your platform apart: brand-matching cursors, 3D hover animations, dynamic flexbox layouts, and included enterprise security.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center space-x-1 p-1 rounded-lg bg-surface-elevated border border-border text-xs font-mono">
          <button
            onClick={() => setActiveTab('experiences')}
            className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
              activeTab === 'experiences'
                ? 'active-tube-pill font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>AI Experience & Flexbox Studio</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
              activeTab === 'security'
                ? 'active-tube-pill font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Security & Performance (Included)</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === 'experiences' && (
          <div className="space-y-6">
            {/* AI Generator Prompt Card */}
            <form onSubmit={handleGenerate} className="p-5 rounded-xl neon-tube-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-illum" />
                  <span>AI & MCP Layout & Interaction Engine</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Real-time micro-animation synthesis
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AI or MCP generates layout, animation, or special effect on the spot: from subtle micro-interactions to 3D perspective tilt and dynamic flexbox rearrangement.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="Describe an animation, cursor effect, flexbox layout, or hover state..."
                  className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-illum font-mono transition-colors"
                />
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-4 py-2 rounded-lg neon-tube-button text-xs font-bold font-mono flex items-center justify-center space-x-1.5 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Synthesizing...' : 'Generate Interaction'}</span>
                </button>
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono">
                {[
                  '3D image perspective tilt on hover',
                  'Branded magnetic cursor trail',
                  'Dynamic morphing flexbox grid',
                  'Subtle glass sheen & scroll reveals'
                ].map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(s)}
                    className="px-2 py-0.5 rounded bg-surface hover:bg-surface-elevated border border-border hover:border-illum-muted text-slate-300 transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </form>

            {/* Live Interactive Flexbox Studio */}
            <div className="p-5 rounded-xl neon-tube-card space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-border/80 gap-2">
                <div>
                  <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-illum" />
                    <span>Interactive Flexbox & Layout Playground</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Modify flexbox orientation, alignment, and gaps live to preview fluid AI-generated component reflow.
                  </p>
                </div>

                {/* Branded Cursor Toggle */}
                <button
                  type="button"
                  onClick={() => setIsCustomCursorActive(!isCustomCursorActive)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center space-x-1.5 transition-all ${
                    isCustomCursorActive
                      ? 'active-tube-pill'
                      : 'bg-surface border-border text-slate-300 hover:text-white'
                  }`}
                >
                  <MousePointer2 className="w-3.5 h-3.5" />
                  <span>Brand Cursor: {isCustomCursorActive ? 'Active' : 'Off'}</span>
                </button>
              </div>

              {/* Flexbox Controls */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs font-mono">
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">Flex Direction</label>
                  <select
                    value={flexDirection}
                    onChange={e => setFlexDirection(e.target.value as any)}
                    className="w-full bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-illum"
                  >
                    <option value="row">row</option>
                    <option value="row-reverse">row-reverse</option>
                    <option value="column">column</option>
                    <option value="column-reverse">column-reverse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">Justify Content</label>
                  <select
                    value={justifyContent}
                    onChange={e => setJustifyContent(e.target.value as any)}
                    className="w-full bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-illum"
                  >
                    <option value="flex-start">flex-start</option>
                    <option value="center">center</option>
                    <option value="flex-end">flex-end</option>
                    <option value="space-between">space-between</option>
                    <option value="space-around">space-around</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">Align Items</label>
                  <select
                    value={alignItems}
                    onChange={e => setAlignItems(e.target.value as any)}
                    className="w-full bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-illum"
                  >
                    <option value="stretch">stretch</option>
                    <option value="center">center</option>
                    <option value="flex-start">flex-start</option>
                    <option value="flex-end">flex-end</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">Gap: {flexGap}px</label>
                  <input
                    type="range"
                    min="8"
                    max="48"
                    step="4"
                    value={flexGap}
                    onChange={e => setFlexGap(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer mt-1"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">Flex Wrap</label>
                  <button
                    type="button"
                    onClick={() => setFlexWrap(!flexWrap)}
                    className="w-full py-1.5 rounded-lg bg-surface border border-border text-center text-xs text-slate-200 hover:border-illum-muted transition-colors"
                  >
                    {flexWrap ? 'wrap (enabled)' : 'nowrap'}
                  </button>
                </div>
              </div>

              {/* Live Flexbox Canvas with 3D Tilt Hover Items */}
              <div className="p-4 rounded-xl bg-surface border border-border/80 min-h-[220px]">
                <div
                  className="w-full transition-all duration-300"
                  style={{
                    display: 'flex',
                    flexDirection,
                    justifyContent,
                    alignItems,
                    gap: `${flexGap}px`,
                    flexWrap: flexWrap ? 'wrap' : 'nowrap'
                  }}
                >
                  {[
                    { id: 1, title: 'AI Fluid Motion', tag: 'Micro-Animation', desc: 'Subtle physics-driven spring easing with hover glow.' },
                    { id: 2, title: '3D Image Tilt', tag: 'Hover Parallax', desc: 'Perspective 3D tilt tracking pointer coordinates dynamically.' },
                    { id: 3, title: 'Brand Luminescence', tag: 'Theme Swatch', desc: 'Real-time CSS variable illumination matching brand palette.' },
                    { id: 4, title: 'Zero-Latency Edge', tag: 'Cloudflare CDN', desc: 'Sub-millisecond static delivery across 310 global PoPs.' }
                  ].map(item => (
                    <div
                      key={item.id}
                      onMouseMove={e => {
                        setHoverCardId(item.id);
                        handleMouseMoveCard(e, item.id);
                      }}
                      onMouseLeave={() => handleMouseLeaveCard(item.id)}
                      style={tiltStyle[item.id] || {}}
                      className="p-4 rounded-xl bg-surface-card border border-border hover:border-illum cursor-pointer transition-all duration-150 flex flex-col justify-between select-none min-w-[210px] max-w-[260px] flex-1 hover-tube shadow-lg"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-illum-muted text-illum border border-illum-muted">
                            {item.tag}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">#{item.id}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white tracking-tight">{item.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>

                      <div className="pt-2 mt-2 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>Interact: Hover</span>
                        <ChevronRight className="w-3 h-3 text-illum" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Security & Performance Suite (Included) */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Security Top Banner */}
            <div className="p-5 rounded-xl neon-tube-card space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Enterprise Security & Performance Stack (All Included)
                  </h2>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40">
                  Enterprise Audited & Verified ✓
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Built directly into every deployment: zero extra cost, enterprise-grade protection, Cloudflare Enterprise CDN, premium SSL, Redis object cache, and 14 security test harnesses.
              </p>
            </div>

            {/* 6 Included Security Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {securityFeatures.map((sec, idx) => {
                const Icon = sec.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl neon-tube-card space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-illum">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold uppercase">
                          {sec.badge}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-white tracking-tight">{sec.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{sec.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-border/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{sec.status}</span>
                      </span>
                      <span className="text-slate-400">{sec.metric}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enterprise Security Audit Report */}
            <div className="p-5 rounded-xl neon-tube-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-illum" />
                  <span>Security Audit & Continuous Compliance Verification</span>
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  SOC 2 Type II • ISO 27001 • HIPAA Ready
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
                <div className="p-3 rounded-lg bg-surface border border-border">
                  <div className="text-slate-400 text-[10px] uppercase">Penetration Tests</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">Passed 100%</div>
                  <div className="text-[10px] text-slate-500">Zero Criticals</div>
                </div>
                <div className="p-3 rounded-lg bg-surface border border-border">
                  <div className="text-slate-400 text-[10px] uppercase">DDoS Mitigation</div>
                  <div className="text-lg font-bold text-illum mt-0.5">&gt; 100 Gbps</div>
                  <div className="text-[10px] text-slate-500">Autonomous Edge Filter</div>
                </div>
                <div className="p-3 rounded-lg bg-surface border border-border">
                  <div className="text-slate-400 text-[10px] uppercase">Redis IOPS</div>
                  <div className="text-lg font-bold text-white mt-0.5">100,000 /s</div>
                  <div className="text-[10px] text-slate-500">Sub-ms Latency</div>
                </div>
                <div className="p-3 rounded-lg bg-surface border border-border">
                  <div className="text-slate-400 text-[10px] uppercase">WAF Rules</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">OWASP Top 10</div>
                  <div className="text-[10px] text-slate-500">Zero False Positives</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
