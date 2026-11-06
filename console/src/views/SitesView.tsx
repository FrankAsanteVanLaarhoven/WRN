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
  Clock
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

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
