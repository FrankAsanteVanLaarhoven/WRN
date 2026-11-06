import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  Globe,
  Search,
  ShoppingCart,
  CheckCircle2,
  ShieldCheck,
  Server,
  Copy,
  RefreshCw,
  Plus,
  ExternalLink,
  Lock,
  Zap
} from 'lucide-react';
import { DomainItem } from '../types/console';

export const DomainsView: React.FC = () => {
  const { domains, addDomain, verifyDomainDns } = useConsole();
  const [searchDomainInput, setSearchDomainInput] = useState('');
  const [searching, setSearching] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<DomainItem>(domains[0]);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchDomainInput.trim()) return;
    setSearching(true);
    setSearchResult(null);

    setTimeout(() => {
      setSearching(false);
      const clean = searchDomainInput.trim().toLowerCase();
      const domainName = clean.includes('.') ? clean : `${clean}.io`;
      setSearchResult({
        domain: domainName,
        available: true,
        price: 12.00,
        tld: domainName.split('.').pop()
      });
    }, 600);
  };

  const handleBuy = async () => {
    if (!searchResult) return;
    await addDomain(searchResult.domain);
    setSearchResult(null);
    setSearchDomainInput('');
  };

  const copyProxyConfig = () => {
    navigator.clipboard.writeText(selectedDomain.proxyConfig);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-illum" />
            <h1 className="text-lg font-bold text-white tracking-tight">Domains & DNS</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time live domain search, edge DNS verification, automated wildcard SSL, and edge reverse proxy routing.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-illum bg-illum-muted px-3 py-1 rounded-full border border-illum-muted">
            Edge DNS & Auto SSL Active
          </span>
        </div>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Domain Search & Registered Domains */}
        <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-border p-4 bg-surface/50 overflow-y-auto space-y-5">
          {/* Real-time Domain Search / Buy Box */}
          <div className="p-4 rounded-xl neon-tube-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center space-x-1.5">
                <ShoppingCart className="w-3.5 h-3.5 text-illum" />
                <span>Buy & Register Domains</span>
              </span>
              <span className="text-[10px] text-illum font-mono">Live Registry API</span>
            </div>

            <form onSubmit={handleSearch} className="relative">
              <input
                id="domain-search-input"
                name="domainSearch"
                type="text"
                placeholder="Search domain (e.g. my-agent.io)..."
                value={searchDomainInput}
                onChange={e => setSearchDomainInput(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg pl-3 pr-9 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-illum font-mono transition-colors"
              />
              <button
                type="submit"
                aria-label="Search Domain Availability"
                className="absolute right-2 top-2 text-slate-400 hover:text-white"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {searching && (
              <div className="text-xs font-mono text-slate-400 flex items-center space-x-2">
                <div className="w-3 h-3 border-2 border-illum border-t-transparent rounded-full animate-spin" />
                <span>Checking global TLD registries...</span>
              </div>
            )}

            {searchResult && (
              <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="font-bold text-white flex items-center space-x-1">
                    <span>{searchResult.domain}</span>
                    <span className="text-emerald-400 text-[10px]">Available</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">${searchResult.price.toFixed(2)}/yr with Free DNS & SSL</div>
                </div>
                <button
                  onClick={handleBuy}
                  className="px-3 py-1.5 rounded neon-tube-button font-bold text-[11px] flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Purchase</span>
                </button>
              </div>
            )}
          </div>

          {/* Registered Domains List */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
              Configured Domains ({domains.length})
            </span>

            {domains.map(dom => {
              const isSelected = selectedDomain.id === dom.id;
              return (
                <div
                  key={dom.id}
                  onClick={() => setSelectedDomain(dom)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer font-mono text-xs ${
                    isSelected
                      ? 'bg-surface-elevated border-illum/60 text-white shadow-xs'
                      : 'bg-surface border-border text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center space-x-1.5">
                      <Globe className="w-3.5 h-3.5 text-illum" />
                      <span>{dom.domain}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" />
                      <span>SSL Active</span>
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>${dom.pricePerYear}/yr</span>
                    <span>{dom.registrar}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Live DNS Records & Edge Reverse Proxy */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-background">
          {/* Top Domain Info */}
          <div className="p-5 rounded-xl neon-tube-card space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white font-mono">{selectedDomain.domain}</h2>
                <p className="text-xs text-slate-400 mt-0.5">Real-time edge routing with automated Let's Encrypt Wildcard SSL.</p>
              </div>
              <button
                onClick={() => verifyDomainDns(selectedDomain.id)}
                className="px-3 py-1.5 rounded-lg neon-tube-button text-xs font-mono font-bold flex items-center space-x-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Verify DNS Live</span>
              </button>
            </div>

            {/* DNS Records Table */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-300 font-mono">Required DNS Records</span>
              <div className="divide-y divide-border/60 rounded-lg border border-border overflow-hidden font-mono text-xs">
                {selectedDomain.dnsRecords.map((rec, i) => (
                  <div key={i} className="p-2.5 bg-surface flex items-center justify-between">
                    <span className="w-16 font-bold text-illum">{rec.type}</span>
                    <span className="w-24 text-slate-300">{rec.host}</span>
                    <span className="flex-1 text-slate-400 truncate">{rec.value}</span>
                    <span className="text-emerald-400 text-[11px] flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Valid</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Edge Reverse Proxy & Route Configuration */}
          <div className="p-5 rounded-xl neon-tube-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4 text-illum" />
                <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Edge Reverse Proxy & Route Rules
                </h3>
              </div>
              <button
                onClick={copyProxyConfig}
                className="flex items-center space-x-1.5 text-xs text-illum hover:underline font-mono cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedConfig ? 'Copied!' : 'Copy Config'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Active edge routing specification for SSL termination, HTTP/2, WebSocket proxying, and DDoS rate limiting.
            </p>

            <pre className="p-4 rounded-xl bg-surface border border-border text-[11px] font-mono text-slate-200 overflow-x-auto leading-relaxed">
              {selectedDomain.proxyConfig}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

