import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  Boxes,
  Search,
  Plus,
  Terminal,
  Bot,
  ExternalLink,
  Shield,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers
} from 'lucide-react';

export const AgentMarketplaceView: React.FC = () => {
  const { marketplaceTools, setProjectServiceTab, setTopNavTab } = useConsole();
  const [activeCategory, setActiveCategory] = useState<string>('Explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [installedMap, setInstalledMap] = useState<Record<string, boolean>>({
    'wrn-cli': true,
    'mcp-client-sdk': true,
    'vscode-extension': true
  });

  const categories = [
    { name: 'Explore', count: 10 },
    { name: 'Authentication', count: 0 },
    { name: 'Storage', count: 0 },
    { name: 'Analytics', count: 0 },
    { name: 'Payments', count: 0 },
    { name: 'Agent protocols', count: 2 },
    { name: 'Automation', count: 1 },
    { name: 'Developer tools', count: 7 }
  ];

  const toggleInstall = (id: string) => {
    setInstalledMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = marketplaceTools.filter(tool => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return tool.name.toLowerCase().includes(q) || tool.desc.toLowerCase().includes(q);
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Boxes className="w-5 h-5 text-illum" />
            <h1 className="text-lg font-bold text-white tracking-tight">Agent & Protocol Marketplace</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Discover official developer tools, CLI utilities, and Model Context Protocol (MCP) integrations.
          </p>
        </div>

        <button
          onClick={() => {
            setTopNavTab('projects');
            setProjectServiceTab('agents');
          }}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg neon-tube-button text-xs font-bold transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Launch Agent Harness</span>
        </button>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Category Sidebar */}
        <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border p-4 overflow-y-auto bg-surface/50 space-y-5 text-xs font-mono">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-surface-elevated border border-border rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-illum font-mono transition-colors"
            />
          </div>

          <div className="space-y-1">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider pb-1">Discover</div>
            <button
              onClick={() => setActiveCategory('Explore')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all ${
                activeCategory === 'Explore'
                  ? 'active-tube-pill font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Explore</span>
              <span className="text-[10px] opacity-70">15</span>
            </button>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider pb-1">Categories</div>
            {categories.slice(1).map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all ${
                  activeCategory === cat.name
                    ? 'active-tube-pill font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70">{cat.count}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-border space-y-2">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Your Apps</div>
            <button className="w-full py-1.5 px-2.5 rounded-md border border-border/80 text-slate-300 hover:text-white flex items-center justify-center space-x-1">
              <Plus className="w-3.5 h-3.5" />
              <span>Create App</span>
            </button>
          </div>
        </div>

        {/* Right Content Grid */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-background">
          <div>
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Explore Official Integrations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Browse official apps, MCP servers, and developer IDEs.
            </p>
          </div>

          {/* 15 Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filtered.map(tool => {
              const isInstalled = installedMap[tool.id];
              return (
                <div
                  key={tool.id}
                  className="p-4 rounded-xl bg-surface-card border border-border/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between neon-tube-card"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-illum font-bold font-mono">
                        {tool.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface border border-border text-slate-400">
                        ★ {tool.stars}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-white tracking-tight">{tool.name}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-border flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">
                      {tool.installs} installs
                    </span>
                    <button
                      onClick={() => toggleInstall(tool.id)}
                      className={`px-3 py-1 rounded-md text-[11px] font-mono font-semibold transition-all ${
                        isInstalled
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'neon-tube-button'
                      }`}
                    >
                      {isInstalled ? 'Connected ✓' : 'Connect'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Browse by category banner */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
              Browse by category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Authentication', apps: '2 apps' },
                { name: 'Databases & MCP', apps: '6 apps' },
                { name: 'Agent Harnesses', apps: '4 apps' },
                { name: 'Dev Tools', apps: '15 apps' }
              ].map(c => (
                <div key={c.name} className="p-3.5 rounded-xl neon-tube-card text-xs cursor-pointer">
                  <div className="font-semibold text-white">{c.name}</div>
                  <div className="text-[11px] text-illum font-mono mt-0.5">{c.apps}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

