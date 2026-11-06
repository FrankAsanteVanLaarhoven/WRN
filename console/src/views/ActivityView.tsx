import React, { useState, useEffect } from 'react';
import { useStaggerEntrance } from '../hooks/useGsapAnimation';
import {
  Activity,
  Radio,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Terminal,
  RefreshCw
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface LogItem {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  service: string;
  action: string;
  ip: string;
  details: string;
  status: number;
}

export const ActivityView: React.FC = () => {
  const containerRef = useStaggerEntrance();
  const [filterLevel, setFilterLevel] = useState<'ALL' | 'INFO' | 'WARN'>('ALL');
  const [search, setSearch] = useState('');

  const [logs, setLogs] = useState<LogItem[]>([
    { id: 'act_01', timestamp: '10s ago', level: 'INFO', service: 'edge_proxy', action: 'request.allowed', ip: '194.26.29.110', details: 'GET /api/v1/projects (200 OK - 0.4ms TTFB)', status: 200 },
    { id: 'act_02', timestamp: '30s ago', level: 'WARN', service: 'waf_firewall', action: 'threat.neutralized', ip: '185.220.101.5', details: "Payload blocked: SQLi pattern detected (' OR 1=1 --)", status: 403 },
    { id: 'act_03', timestamp: '1m ago', level: 'INFO', service: 'rust_kernel', action: 'grant.verified', ip: '127.0.0.1', details: 'RFC 9421 Signature key_wrn_agent_01 verified (3µs)', status: 200 },
    { id: 'act_04', timestamp: '2m ago', level: 'INFO', service: 'redis_cache', action: 'cache.hit', ip: 'internal', details: 'Key telemetry:cdn:ttfb hit ratio 99.4%', status: 200 },
    { id: 'act_05', timestamp: '5m ago', level: 'INFO', service: 'workflows', action: 'workflow.completed', ip: 'worker-fra1', details: 'CI/CD Deploy & Edge Invalidation completed in 840ms', status: 200 },
    { id: 'act_06', timestamp: '12m ago', level: 'INFO', service: 'auth', action: 'user.login', ip: '82.165.197.1', details: 'Frank Van Laarhoven authenticated via WebAuthn Passkey', status: 200 }
  ]);

  const filteredLogs = logs.filter(l => {
    if (filterLevel !== 'ALL' && l.level !== filterLevel) return false;
    if (search && !l.details.toLowerCase().includes(search.toLowerCase()) && !l.action.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div ref={containerRef} className="flex-1 flex flex-col h-full overflow-y-auto bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-3 gsap-fade-in">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-illum" />
            <h1 className="text-xl font-bold text-white tracking-tight">Activity Logs & Audit Stream</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable streaming audit ledger tracking security events, API keys, agent executions, and deployments.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="success">Audit Ledger: Sealed</Badge>
          <Badge variant="tube">Realtime Stream Active</Badge>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-3 gsap-fade-in">
        <div className="flex items-center space-x-1 p-1 rounded-lg bg-surface-elevated border border-border text-xs font-mono">
          {(['ALL', 'INFO', 'WARN'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1 rounded transition-all ${
                filterLevel === lvl ? 'active-tube-pill font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter activity stream..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-illum max-w-xs"
        />
      </div>

      {/* Logs Table */}
      <div className="rounded-xl border border-border bg-surface-card overflow-hidden gsap-fade-in">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-border bg-surface text-slate-400 font-mono text-[11px]">
              <th className="py-2.5 px-4 font-semibold">Timestamp</th>
              <th className="py-2.5 px-4 font-semibold">Level</th>
              <th className="py-2.5 px-4 font-semibold">Service</th>
              <th className="py-2.5 px-4 font-semibold">Action</th>
              <th className="py-2.5 px-4 font-semibold">Details</th>
              <th className="py-2.5 px-4 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 font-mono">
            {filteredLogs.map(l => (
              <tr key={l.id} className="hover:bg-surface-elevated/40 transition-colors">
                <td className="py-3 px-4 text-slate-400">{l.timestamp}</td>
                <td className="py-3 px-4">
                  <Badge variant={l.level === 'WARN' ? 'warning' : 'success'}>{l.level}</Badge>
                </td>
                <td className="py-3 px-4 text-illum font-bold">{l.service}</td>
                <td className="py-3 px-4 text-slate-200">{l.action}</td>
                <td className="py-3 px-4 text-slate-300 truncate max-w-md">{l.details}</td>
                <td className="py-3 px-4 text-right">
                  <span className={l.status === 200 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

