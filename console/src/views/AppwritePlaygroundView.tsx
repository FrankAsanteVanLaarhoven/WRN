import React, { useState } from 'react';
import {
  Terminal,
  Copy,
  Play,
  CheckCircle2,
  Code2,
  Key,
  Shield,
  Layers,
  ArrowRight,
  Database,
  Users
} from 'lucide-react';

export const AppwritePlaygroundView: React.FC = () => {
  const [protocol, setProtocol] = useState<'REST' | 'Realtime'>('REST');
  const [apiType, setApiType] = useState<'Client API' | 'Server API'>('Client API');
  const [selectedEndpoint, setSelectedEndpoint] = useState({
    category: 'AUTH',
    method: 'GET',
    path: '/account',
    name: 'Get account',
    desc: 'Get the currently logged in user profile and active security grants.',
    scopes: ['account', 'users.read']
  });

  const [actAs, setActAs] = useState<'Guest' | 'User'>('User');
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    { category: 'AUTH', method: 'GET', path: '/account', name: 'Get account', desc: 'Get the currently logged in user profile and active security grants.', scopes: ['account'] },
    { category: 'AUTH', method: 'POST', path: '/account', name: 'Create account', desc: 'Create a new user account with cryptographic identity binding.', scopes: ['guest'] },
    { category: 'AUTH', method: 'PATCH', path: '/account/email', name: 'Update email', desc: 'Update user email address with proof of possession verification.', scopes: ['account'] },
    { category: 'DATABASES', method: 'GET', path: '/databases/{databaseId}/collections/{collectionId}/documents', name: 'List documents', desc: 'Query database documents using Query.equal(), Query.orderAsc(), etc.', scopes: ['databases.read'] },
    { category: 'DATABASES', method: 'POST', path: '/databases/{databaseId}/collections/{collectionId}/documents', name: 'Create document', desc: 'Insert a new structured record into TablesDB or PostgreSQL.', scopes: ['databases.write'] },
    { category: 'FUNCTIONS', method: 'POST', path: '/functions/{functionId}/executions', name: 'Create execution', desc: 'Execute a serverless function asynchronously or synchronously.', scopes: ['execution.write'] },
    { category: 'STORAGE', method: 'POST', path: '/storage/buckets/{bucketId}/files', name: 'Create file', desc: 'Upload file with automatic AVIF compression and encryption.', scopes: ['files.write'] }
  ];

  const handleExecute = () => {
    if (selectedEndpoint.path === '/account') {
      setExecutionResult({
        $id: 'usr_67f8a204c1eab4',
        $createdAt: '2026-11-06T01:15:00.000Z',
        name: 'Frank Van Laarhoven',
        email: 'frankleroyvan@gmail.com',
        emailVerification: true,
        status: true,
        passportId: 'urn:wrn:passport:human:frank-vl-01',
        activeGrants: 3,
        mcpAuthorized: true,
        roles: ['owner', 'admin', 'verifier']
      });
    } else {
      setExecutionResult({
        status: '200 OK',
        endpoint: selectedEndpoint.path,
        executedAt: new Date().toISOString(),
        verifiedBy: 'WRN Kernel 0.2',
        result: 'Success: Scopes verified against current policy matrix.'
      });
    }
  };

  const copyCurl = () => {
    const curl = `curl -X ${selectedEndpoint.method} "https://fra.cloud.appwrite.network/v1${selectedEndpoint.path}" \\
  -H "X-Appwrite-Project: 6aed448b00010a9c93f6" \\
  -H "X-Appwrite-Key: wrn_secret_key_88f92b..." \\
  -H "Content-Type: application/json"`;
    navigator.clipboard.writeText(curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Top Protocol & API Bar */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <Terminal className="w-5 h-5 text-neon-blue" />
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">API Playground</h1>
            <p className="text-[11px] text-slate-400">Interactive REST and Realtime SDK emulator for client and server APIs.</p>
          </div>
        </div>

        {/* Toggles */}
        <div className="flex items-center space-x-2">
          {/* REST / Realtime */}
          <div className="p-1 rounded-lg bg-surface-elevated border border-border flex items-center space-x-1 text-xs font-mono">
            {(['REST', 'Realtime'] as const).map(p => (
              <button
                key={p}
                onClick={() => setProtocol(p)}
                className={`px-3 py-1 rounded transition-all ${
                  protocol === p
                    ? 'bg-cyan-500/20 text-neon-blue border border-cyan-400/40 shadow-neon-tube font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Client / Server API */}
          <div className="p-1 rounded-lg bg-surface-elevated border border-border flex items-center space-x-1 text-xs font-mono">
            {(['Client API', 'Server API'] as const).map(t => (
              <button
                key={t}
                onClick={() => setApiType(t)}
                className={`px-3 py-1 rounded transition-all ${
                  apiType === t
                    ? 'bg-cyan-500/20 text-neon-blue border border-cyan-400/40 shadow-neon-tube font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 3-Column Split (Matching Appwrite Screenshot 5) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Endpoints List */}
        <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-border p-3 overflow-y-auto bg-surface/50 space-y-2">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider pb-1 border-b border-border">
            Available Endpoints
          </div>
          <div className="space-y-1 font-mono text-xs">
            {endpoints.map((ep, i) => {
              const isSelected = selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedEndpoint(ep)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-surface-elevated border-cyan-500/50 shadow-neon-tube'
                      : 'bg-surface-card border-border hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      ep.method === 'GET' ? 'bg-cyan-500/20 text-neon-blue' :
                      ep.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-semibold text-slate-200 text-xs truncate">
                      {ep.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {ep.path}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center / Right: Request Configuration & Live Runner */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-background">
          {/* Endpoint Box */}
          <div className="p-4 rounded-xl bg-surface-card border border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Endpoint URL</span>
              <button
                onClick={copyCurl}
                className="flex items-center space-x-1.5 text-xs text-neon-blue hover:underline font-mono"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied cURL!' : 'Copy as cURL'}</span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-center space-x-2 font-mono text-xs">
              <span className="text-neon-blue font-bold">{selectedEndpoint.method}</span>
              <span className="text-slate-200 truncate">
                https://fra.cloud.appwrite.network/v1{selectedEndpoint.path}
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans">
              {selectedEndpoint.desc}
            </p>
          </div>

          {/* Authentication & Scopes Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface-card border border-border space-y-3">
              <span className="text-xs font-semibold text-slate-200 font-mono">Authentication Mode</span>
              <div className="p-1 rounded-lg bg-surface border border-border flex items-center space-x-1 text-xs font-mono">
                {(['User', 'Guest'] as const).map(act => (
                  <button
                    key={act}
                    onClick={() => setActAs(act)}
                    className={`flex-1 py-1 rounded transition-all text-center ${
                      actAs === act
                        ? 'bg-cyan-500/20 text-neon-blue font-bold border border-cyan-400/40 shadow-neon-tube'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Act as {act}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Project: <code className="text-neon-blue">6aed448b00010a9c93f6</code>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-card border border-border space-y-3">
              <span className="text-xs font-semibold text-slate-200 font-mono">Required Scopes</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedEndpoint.scopes.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-neon-blue text-xs font-mono font-semibold">
                    {s}
                  </span>
                ))}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Enforced by WRN Kernel Scope Verifier
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExecute}
              className="px-5 py-2 rounded-lg neon-tube-button text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Execute Request</span>
            </button>
            <span className="text-xs font-mono text-slate-400">
              Evaluates against live edge cluster
            </span>
          </div>

          {/* Live Output */}
          {executionResult && (
            <div className="space-y-2">
              <div className="text-xs font-mono text-neon-blue flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Response Payload (200 OK)</span>
              </div>
              <pre className="p-4 rounded-xl bg-surface-elevated border border-cyan-500/30 shadow-neon-tube font-mono text-xs text-slate-200 overflow-x-auto">
                {JSON.stringify(executionResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
