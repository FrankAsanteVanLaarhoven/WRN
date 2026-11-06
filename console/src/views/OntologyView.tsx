import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  Boxes,
  User,
  Bot,
  Key,
  FileCheck,
  ExternalLink,
  ShieldAlert,
  Search,
  CheckCircle,
  Copy,
  ChevronRight,
  Database,
  Network,
  List
} from 'lucide-react';
import { OntologyGraphCanvas } from './OntologyGraphCanvas';

export const OntologyView: React.FC = () => {
  const { passports, instances, grants, submissions, revokeGrant } = useConsole();
  const [selectedEntity, setSelectedEntity] = useState<any>(passports[0]);
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Compile combined ontology objects
  const allObjects: any[] = [
    ...passports.map(p => ({ ...p, entityCategory: 'passport' })),
    ...instances.map(i => ({ ...i, entityCategory: 'instance' })),
    ...grants.map(g => ({ ...g, entityCategory: 'grant' })),
    ...submissions.map(s => ({ ...s, entityCategory: 'submission' }))
  ];

  const filteredObjects = allObjects.filter(obj => {
    if (filterType !== 'all' && obj.entityCategory !== filterType) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const id = (obj.id || obj.instanceId || obj.grantId || obj.sealId || '').toLowerCase();
    const name = (obj.displayName || obj.name || obj.title || obj.grantId || '').toLowerCase();
    return id.includes(q) || name.includes(q);
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* View Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Boxes className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-semibold text-white tracking-tight">Foundry Ontology Explorer</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Formal object model linking human principals, commissioned agents, memory compartments, and bounded grants.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-surface-elevated p-1 rounded-lg border border-border text-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'list' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('graph')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'graph' ? 'bg-foundry-cyan text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Foundry Graph</span>
            </button>
          </div>

          {/* Filter Pills */}
          {viewMode === 'list' && (
            <div className="flex items-center space-x-1.5 bg-surface-elevated p-1 rounded-lg border border-border text-xs">
              {(['all', 'passport', 'instance', 'grant', 'submission'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors ${
                    filterType === type
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type === 'all' ? 'All Objects' : `${type}s`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace Split: Left Explorer / Canvas, Right Deep Object Detail */}
      <div className="flex-1 flex overflow-hidden">
        {viewMode === 'graph' ? (
          <div className="flex-1 relative overflow-hidden border-r border-border">
            <OntologyGraphCanvas onSelectEntity={setSelectedEntity} />
          </div>
        ) : (
          /* Left List */
          <div className="w-full md:w-5/12 lg:w-4/12 border-r border-border flex flex-col overflow-hidden bg-surface/50">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  id="ontology-search-input"
                  name="ontologySearch"
                  type="text"
                  placeholder="Search URNs, instance IDs, keys..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-elevated border border-border rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary font-mono"
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400 font-mono">
                <span>Showing {filteredObjects.length} entities</span>
                <span>Profile WRN 0.2</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-border/60">
              {filteredObjects.map(obj => {
                const id = obj.id || obj.instanceId || obj.grantId || obj.sealId;
                const isSelected = (selectedEntity?.id || selectedEntity?.instanceId || selectedEntity?.grantId || selectedEntity?.sealId) === id;
                const isAgent = obj.entityCategory === 'instance' || obj.type === 'agent';
                const isGrant = obj.entityCategory === 'grant';
                const isSubmission = obj.entityCategory === 'submission';

                return (
                  <button
                    key={id}
                    onClick={() => setSelectedEntity(obj)}
                    className={`w-full text-left p-3 transition-colors flex items-start justify-between ${
                      isSelected
                        ? 'bg-surface-elevated border-l-2 border-l-primary'
                        : 'hover:bg-surface-elevated/40'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center space-x-1.5 mb-1">
                        {isAgent ? (
                          <Bot className="w-3.5 h-3.5 text-foundry-cyan shrink-0" />
                        ) : isGrant ? (
                          <Key className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        ) : isSubmission ? (
                          <FileCheck className="w-3.5 h-3.5 text-foundry-emerald shrink-0" />
                        ) : (
                          <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        )}
                        <span className="text-xs font-semibold text-slate-200 truncate">
                          {obj.displayName || obj.name || obj.title || obj.grantId}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 truncate">
                        {id}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 ${
                        obj.status === 'active' || obj.status === 'accepted'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : obj.status === 'quarantined'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {obj.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Right Object Inspector */}
        <div className="hidden md:flex flex-1 flex-col overflow-y-auto p-6 bg-background">
          {selectedEntity ? (
            <div className="space-y-6 max-w-3xl">
              {/* Header Box */}
              <div className="p-4 rounded-xl bg-surface-card border border-border shadow-foundry-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface border border-border text-slate-300">
                      {selectedEntity.entityCategory || selectedEntity.type}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      RFC 8785 Canonical Representation
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedEntity.id || selectedEntity.instanceId || selectedEntity.grantId || selectedEntity.sealId)}
                    className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedId ? 'Copied' : 'Copy URN'}</span>
                  </button>
                </div>

                <h2 className="text-lg font-bold text-white mb-1">
                  {selectedEntity.displayName || selectedEntity.name || selectedEntity.title || selectedEntity.grantId}
                </h2>
                <p className="text-xs font-mono text-primary break-all">
                  {selectedEntity.id || selectedEntity.instanceId || selectedEntity.grantId || selectedEntity.sealId}
                </p>
              </div>

              {/* Specific Metadata Attributes */}
              {selectedEntity.entityCategory === 'instance' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-surface border border-border">
                      <div className="text-[11px] text-slate-400">Publisher Organization</div>
                      <div className="text-sm font-semibold text-white mt-0.5">{selectedEntity.publisher.name}</div>
                      <div className="text-[10px] font-mono text-emerald-400 mt-1">Verified Signature ✓</div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface border border-border">
                      <div className="text-[11px] text-slate-400">Acquisition Relationship</div>
                      <div className="text-sm font-semibold text-white capitalize mt-0.5">{selectedEntity.acquisitionType}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1">Tenant isolated</div>
                    </div>
                  </div>

                  {/* Isolated Memory Compartment */}
                  <div className="p-4 rounded-lg bg-surface border border-border space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-medium text-slate-200">
                      <Database className="w-4 h-4 text-cyan-400" />
                      <span>Dedicated Memory Compartment (Blueprint §10)</span>
                    </div>
                    <div className="p-2.5 rounded bg-background border border-border font-mono text-xs text-cyan-300">
                      {selectedEntity.memoryCompartmentId}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Separately encrypted memory space. No cross-tenant leakage or historical grant resurrection permitted.
                    </p>
                  </div>

                  {/* Egress Allowlist */}
                  <div className="p-4 rounded-lg bg-surface border border-border space-y-2">
                    <div className="text-xs font-medium text-slate-200">Egress Boundary Allowlist</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEntity.egressAllowlist.map((rule: string) => (
                        <span key={rule} className="px-2 py-0.5 rounded bg-surface-elevated border border-border font-mono text-xs text-slate-300">
                          {rule}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedEntity.entityCategory === 'grant' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-surface border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Permitted Operations</span>
                      <span className="text-xs font-mono text-indigo-400">Target Zone: {selectedEntity.targetZone}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEntity.permittedOperations.map((op: string) => (
                        <span key={op} className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 font-mono text-xs text-indigo-300 font-semibold">
                          {op}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-border pt-3">
                      <div className="text-[11px] text-slate-400">Resource Selector</div>
                      <div className="font-mono text-xs text-slate-200 mt-0.5">{selectedEntity.resourceSelector}</div>
                    </div>

                    <div className="border-t border-border pt-3">
                      <div className="text-[11px] text-slate-400">Terms Digest (Pre-Consent Hash)</div>
                      <div className="font-mono text-xs text-primary break-all mt-0.5">{selectedEntity.termsDigest}</div>
                    </div>
                  </div>

                  {selectedEntity.status === 'active' && (
                    <button
                      onClick={() => revokeGrant(selectedEntity.grantId, 'Owner initiated instant revocation via Foundry Console')}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-medium transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>Execute Online Revocation (P95 ≤ 60s Target)</span>
                    </button>
                  )}
                </div>
              )}

              {/* Raw Canonical JSON Preview */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400">Raw JSON Representation</div>
                <pre className="p-3.5 rounded-lg bg-surface-elevated border border-border font-mono text-[11px] text-slate-300 overflow-x-auto max-h-72">
                  {JSON.stringify(selectedEntity, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 text-xs">
              Select an entity to inspect its ontological links and verification state.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
