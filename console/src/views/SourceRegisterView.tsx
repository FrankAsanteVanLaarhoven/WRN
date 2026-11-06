import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  BookOpen,
  Search,
  ExternalLink,
  Shield,
  FileText,
  Bookmark,
  CheckCircle2
} from 'lucide-react';

export const SourceRegisterView: React.FC = () => {
  const { sources } = useConsole();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<any>(sources[0]);

  const filteredSources = sources.filter((s: any) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.id?.toLowerCase().includes(q) ||
      s.title?.toLowerCase().includes(q) ||
      s.authors?.toLowerCase().includes(q) ||
      s.relevance?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg font-semibold text-white tracking-tight">
              Primary Source Register (24 Verified Standards)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified primary standards, documentation and research sources underpinning profile WRN-PASSPORT-COEXISTENCE-0.2.
          </p>
        </div>

        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            id="standards-search-input"
            name="standardsSearch"
            type="text"
            placeholder="Search standards (RFC, NIST, W3C)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-surface-elevated border border-border rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary font-mono"
          />
        </div>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Sources List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1 border-b border-border">
            <span>SHOWING {filteredSources.length} OF {sources.length} PRIMARY STANDARDS</span>
            <span>Access Date: 5 November 2026</span>
          </div>

          <div className="space-y-2.5">
            {filteredSources.map((source: any) => {
              const isSelected = selectedSource?.id === source.id;

              return (
                <div
                  key={source.id}
                  onClick={() => setSelectedSource(source)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-surface-elevated border-indigo-500/60 shadow-glow-primary'
                      : 'bg-surface-card border-border hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-indigo-400">
                      [{source.id}]
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {source.year || '2026'}
                    </span>
                  </div>

                  <h3 className="text-xs font-semibold text-white mb-1">
                    {source.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 font-mono line-clamp-1">
                    {source.authors || source.organization || 'Standard Organization'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        {selectedSource && (
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border p-6 bg-surface overflow-y-auto space-y-5">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">
                Standard Reference Specification
              </div>
              <h2 className="text-base font-bold text-white mb-1">
                [{selectedSource.id}] {selectedSource.title}
              </h2>
              <div className="text-xs text-slate-400">
                Authors: <span className="font-medium text-slate-200">{selectedSource.authors || 'Standard Committee'}</span>
              </div>
            </div>

            {/* Relevance to Blueprint */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-indigo-500/30 space-y-2 text-xs">
              <div className="font-semibold text-indigo-400 flex items-center space-x-1.5">
                <Shield className="w-4 h-4" />
                <span>Relevance to WRN Coexistence</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                {selectedSource.relevance || 'Provides foundational trust, cryptographic signing, or authorization model.'}
              </p>
            </div>

            {/* Verified Limits */}
            {selectedSource.limits && (
              <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2 text-xs">
                <div className="font-semibold text-slate-300">Verified Claim Boundaries</div>
                <p className="text-slate-400 font-mono text-[11px] leading-relaxed">
                  {selectedSource.limits}
                </p>
              </div>
            )}

            {/* DOI & URL */}
            <div className="p-3.5 rounded-lg bg-surface-elevated border border-border space-y-2 text-xs">
              <div className="text-slate-400 font-medium">Standard Locator / DOI</div>
              {selectedSource.doi && (
                <div className="font-mono text-[11px] text-slate-300">
                  DOI: {selectedSource.doi}
                </div>
              )}
              {selectedSource.url && (
                <a
                  href={selectedSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-primary hover:underline font-mono"
                >
                  <span className="truncate">{selectedSource.url}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
