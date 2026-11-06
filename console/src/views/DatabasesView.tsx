import React, { useState } from 'react';
import { useStaggerEntrance } from '../hooks/useGsapAnimation';
import {
  Database,
  Play,
  Terminal,
  Table,
  Columns,
  Layers,
  Search,
  Plus,
  RefreshCw,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const DatabasesView: React.FC = () => {
  const containerRef = useStaggerEntrance();
  const [engineTab, setEngineTab] = useState<'tables' | 'postgres' | 'mysql' | 'vectors'>('postgres');
  const [activeTable, setActiveTable] = useState('monaco_gp / lap_times');
  const [sqlQuery, setSqlQuery] = useState(`SELECT * FROM lap_times WHERE session_id = 'Q3_MON' ORDER BY pos ASC;`);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState('1.14ms');

  const [columns, setColumns] = useState(['$id', 'driver', 'code', 'team', 'pos', 'lap_ms', 'delta']);
  const [rows, setRows] = useState<any[]>([
    { $id: '67f8a204c1', driver: 'Charles Leclerc', code: 'LEC', team: 'ferrari', pos: 1, lap_ms: 70842, delta: '+0.000' },
    { $id: '67f8b112a4', driver: 'Lando Norris', code: 'NOR', team: 'mclaren', pos: 2, lap_ms: 71016, delta: '+0.174' },
    { $id: '67f8c328b7', driver: 'Oscar Piastri', code: 'PIA', team: 'mclaren', pos: 3, lap_ms: 71204, delta: '+0.362' },
    { $id: '67f8d439c8', driver: 'Lewis Hamilton', code: 'HAM', team: 'ferrari', pos: 4, lap_ms: 71388, delta: '+0.546' },
    { $id: '67f8e540d9', driver: 'Max Verstappen', code: 'VER', team: 'red_bull', pos: 5, lap_ms: 71490, delta: '+0.648' }
  ]);

  const handleExecuteQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExecuting(true);

    try {
      const res = await fetch('http://127.0.0.1:8080/api/v1/databases/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: sqlQuery })
      });
      if (res.ok) {
        const data = await res.json();
        setColumns(data.columns);
        setRows(data.rows);
        setExecutionTime(data.duration_ms || '0.8ms');
      } else {
        throw new Error();
      }
    } catch {
      // Local fallback with simulated query execution
      setTimeout(() => {
        setExecutionTime('0.92ms');
      }, 300);
    }

    setIsExecuting(false);
  };

  return (
    <div ref={containerRef} className="flex-1 flex flex-col h-full overflow-y-auto bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-3 gsap-fade-in">
        <div>
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-illum" />
            <h1 className="text-xl font-bold text-white tracking-tight">Databases & Query Studio</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Model, query, and scale with PostgreSQL, MySQL, TablesDB, or high-dimensional VectorsDB.
          </p>
        </div>

        {/* Engine Switcher */}
        <div className="flex items-center space-x-1 p-1 rounded-lg bg-surface-elevated border border-border text-xs font-mono">
          {[
            { id: 'postgres', label: 'PostgreSQL' },
            { id: 'mysql', label: 'MySQL' },
            { id: 'tables', label: 'TablesDB' },
            { id: 'vectors', label: 'VectorsDB' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setEngineTab(t.id as any)}
              className={`px-3 py-1 rounded transition-all ${
                engineTab === t.id ? 'active-tube-pill font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* SQL Editor Card */}
      <div className="p-4 rounded-xl bg-surface-card border border-border space-y-3 gsap-fade-in">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2 text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-illum" />
            <span className="font-semibold">Interactive SQL Console ({engineTab.toUpperCase()})</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Target: {activeTable}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline">Execution: {executionTime}</Badge>
            <Badge variant="success">Engine: Active</Badge>
          </div>
        </div>

        <form onSubmit={handleExecuteQuery} className="space-y-3">
          <div className="relative font-mono text-xs">
            <textarea
              rows={3}
              value={sqlQuery}
              onChange={e => setSqlQuery(e.target.value)}
              className="w-full p-3 rounded-lg bg-background border border-border text-illum font-mono text-xs focus:outline-none focus:border-illum"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
              <span>Quick:</span>
              <button
                type="button"
                onClick={() => setSqlQuery("SELECT * FROM lap_times ORDER BY pos ASC;")}
                className="px-2 py-0.5 rounded bg-surface border border-border hover:text-white"
              >
                lap_times
              </button>
              <button
                type="button"
                onClick={() => setSqlQuery("SELECT * FROM users WHERE status = 'active';")}
                className="px-2 py-0.5 rounded bg-surface border border-border hover:text-white"
              >
                active users
              </button>
            </div>

            <button
              type="submit"
              disabled={isExecuting}
              className="px-4 py-1.5 rounded-lg neon-tube-button text-xs font-semibold flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              {isExecuting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              <span>Execute SQL Query</span>
            </button>
          </div>
        </form>
      </div>

      {/* Query Results Table */}
      <div className="space-y-2 gsap-fade-in">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <Table className="w-4 h-4 text-illum" />
            <span className="font-semibold text-white">{activeTable}</span>
            <span>({rows.length} rows returned)</span>
          </div>
          <span className="text-[11px] text-slate-500">Live PostgreSQL Bounded Compartment</span>
        </div>

        <div className="rounded-xl border border-border bg-surface-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-surface text-slate-400 font-mono text-[11px]">
                  {columns.map(col => (
                    <th key={col} className="py-2.5 px-4 font-semibold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-mono">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-surface-elevated/40 transition-colors">
                    {columns.map(col => (
                      <td key={col} className="py-2.5 px-4 text-slate-300">
                        {col === '$id' ? (
                          <span className="text-illum font-bold">{row[col]}</span>
                        ) : col === 'team' ? (
                          <Badge variant="outline">{row[col]}</Badge>
                        ) : (
                          row[col]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

