import React, { useState } from 'react';
import { useStaggerEntrance } from '../hooks/useGsapAnimation';
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  Terminal,
  Play,
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Globe,
  Zap,
  ArrowRight,
  Clock,
  Sparkles,
  Lock,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface CommitItem {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  timestamp: string;
  branch: string;
  rfc9421Signature: string;
  merkleRoot: string;
  status: 'deployed' | 'building' | 'queued';
  deploymentUrl: string;
  filesChanged: number;
}

interface PipelinePhase {
  id: string;
  name: string;
  description: string;
  durationMs: number;
  status: 'success' | 'running' | 'idle';
  icon: React.ComponentType<{ className?: string }>;
}

export const GitWorkflowView: React.FC = () => {
  const containerRef = useStaggerEntrance();
  const [activeBranch, setActiveBranch] = useState('main');
  const [commitMessage, setCommitMessage] = useState('feat: autonomous verification and deployment test');
  const [isPushing, setIsPushing] = useState(false);
  const [pipelinePhase, setPipelinePhase] = useState<number>(5); // 0 to 5 (5 = all complete)
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '$ wrn status',
    '[*] On branch main (synced with origin/main)',
    '[*] Head Merkle Root: 0x91fa4e01c5b8823f9901ad982b1c43209',
    '[*] Passport Identity: Frank Van Laarhoven <frank@wrn.network>',
    '[✓] Working tree clean. All 14 security fixtures verified.'
  ]);

  const [commits, setCommits] = useState<CommitItem[]>([
    {
      hash: '8defb8c1902a7b6291a0c7746182103f1947a1bc',
      shortHash: '8defb8c',
      message: 'feat: green grid & energy dispatch engine, interactive flexbox playground, and complete zero-branding cleanup',
      author: 'Frank Van Laarhoven <frank@wrn.network>',
      timestamp: 'Just now',
      branch: 'main',
      rfc9421Signature: 'sig1=:8defb8c:;tag="wrn-passport-v2"',
      merkleRoot: '0x91fa4e01c5b8823f9901ad982b1c43209',
      status: 'deployed',
      deploymentUrl: 'https://cloud.wrn.network',
      filesChanged: 15
    },
    {
      hash: '7dc9359e98b04a1fc6c981240183ac905b184ef1',
      shortHash: '7dc9359',
      message: 'feat: native in-process Infrastructure as Code (IaC) engine replacing Terraform binaries',
      author: 'Frank Van Laarhoven <frank@wrn.network>',
      timestamp: '2 hours ago',
      branch: 'main',
      rfc9421Signature: 'sig1=:7dc9359:;tag="wrn-passport-v2"',
      merkleRoot: '0x7ab29c01f84091a12001c981203498b21',
      status: 'deployed',
      deploymentUrl: 'https://7dc9359.preview.wrn.network',
      filesChanged: 12
    },
    {
      hash: '3f74ada09c12b774a1005b81a947c0128495a89f',
      shortHash: '3f74ada',
      message: 'feat: step functions ASL orchestration studio and visual state machine debugger',
      author: 'Frank Van Laarhoven <frank@wrn.network>',
      timestamp: '4 hours ago',
      branch: 'main',
      rfc9421Signature: 'sig1=:3f74ada:;tag="wrn-passport-v2"',
      merkleRoot: '0x3f74ada09c12b774a1005b81a947c0128',
      status: 'deployed',
      deploymentUrl: 'https://3f74ada.preview.wrn.network',
      filesChanged: 9
    }
  ]);

  const pipelinePhases: PipelinePhase[] = [
    {
      id: 'phase-1',
      name: 'Phase 1: Cryptographic Envelope & RFC 9421 Signature',
      description: 'Author verification, Ed25519 passport validation, and SHA-256 Merkle root generation.',
      durationMs: 42,
      status: pipelinePhase >= 1 ? 'success' : isPushing && pipelinePhase === 0 ? 'running' : 'idle',
      icon: Lock
    },
    {
      id: 'phase-2',
      name: 'Phase 2: Security Fixture Matrix (14/14 SEC Pass)',
      description: 'Multi-layer policy kernel evaluated. Constant-time digest equality and bounded memory confirmed.',
      durationMs: 120,
      status: pipelinePhase >= 2 ? 'success' : isPushing && pipelinePhase === 1 ? 'running' : 'idle',
      icon: ShieldCheck
    },
    {
      id: 'phase-3',
      name: 'Phase 3: Zero-Cost Rust Kernel Compilation',
      description: 'Compiled release target wrn-kernel-core with #![forbid(unsafe_code)].',
      durationMs: 340,
      status: pipelinePhase >= 3 ? 'success' : isPushing && pipelinePhase === 2 ? 'running' : 'idle',
      icon: Cpu
    },
    {
      id: 'phase-4',
      name: 'Phase 4: Go High-Concurrency Edge Gateway & WAF Tests',
      description: 'Executed test suites for energy, iac, stepfunctions, and Layer-7 rate limiter.',
      durationMs: 280,
      status: pipelinePhase >= 4 ? 'success' : isPushing && pipelinePhase === 3 ? 'running' : 'idle',
      icon: Zap
    },
    {
      id: 'phase-5',
      name: 'Phase 5: Cloudflare 310 PoP Global Edge CDN Purge & 0-RTT Deploy',
      description: 'Purged global edge cache. Production domain updated and preview domain live with TLS 1.3.',
      durationMs: 410,
      status: pipelinePhase >= 5 ? 'success' : isPushing && pipelinePhase === 4 ? 'running' : 'idle',
      icon: Globe
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleTriggerPush = async () => {
    if (isPushing) return;
    setIsPushing(true);
    setPipelinePhase(0);

    const logLines = [
      `$ wrn commit -m "${commitMessage}"`,
      `[✓] Created sealed commit on [${activeBranch}] with RFC 9421 signature`,
      `$ wrn push origin ${activeBranch}`,
      `[*] Triggering WRN Automated 5-Phase Cloud Deployment Pipeline...`
    ];
    setTerminalOutput(prev => [...prev, ...logLines]);

    for (let i = 1; i <= 5; i++) {
      await new Promise(r => setTimeout(r, 350));
      setPipelinePhase(i);
      setTerminalOutput(prev => [
        ...prev,
        `  [✓] Phase ${i} completed in ${pipelinePhases[i - 1].durationMs}ms: ${pipelinePhases[i - 1].name}`
      ]);
    }

    const newShort = Math.random().toString(36).substring(2, 9);
    const newCommit: CommitItem = {
      hash: `${newShort}1902a7b6291a0c7746182103f1947a1bc`,
      shortHash: newShort,
      message: commitMessage,
      author: 'Frank Van Laarhoven <frank@wrn.network>',
      timestamp: 'Just now',
      branch: activeBranch,
      rfc9421Signature: `sig1=:${newShort}:;tag="wrn-passport-v2"`,
      merkleRoot: `0x${Math.random().toString(36).substring(2, 18)}`,
      status: 'deployed',
      deploymentUrl: `https://${newShort}.preview.wrn.network`,
      filesChanged: 4
    };

    setCommits([newCommit, ...commits]);
    setTerminalOutput(prev => [
      ...prev,
      `[✓] Cloud Deployment Complete! Live at https://${newShort}.preview.wrn.network`
    ]);
    setIsPushing(false);
  };

  return (
    <div ref={containerRef} className="flex-1 flex flex-col h-full overflow-y-auto bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-4 gsap-fade-in">
        <div>
          <div className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-illum" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              WRN Native Git & Cloud CI/CD Framework
            </h1>
            <Badge variant="success">Native v0.2.0</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Simplified in-platform git workflow: cryptographic commits, Merkle audit lineage, automated 5-phase cloud pipelines, and global edge deployments.
          </p>
        </div>

        {/* Branch Selector & Fast Deploy */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-mono">
            <label htmlFor="git-branch-selector" className="text-slate-400 cursor-pointer">Branch:</label>
            <select
              id="git-branch-selector"
              name="gitBranch"
              aria-label="Active Git Branch"
              value={activeBranch}
              onChange={e => setActiveBranch(e.target.value)}
              className="bg-transparent text-illum font-bold focus:outline-hidden cursor-pointer"
            >
              <option value="main" className="bg-surface text-white">main (production)</option>
              <option value="candidate/v0.2" className="bg-surface text-white">candidate/v0.2</option>
              <option value="feature/green-grid-mesh" className="bg-surface text-white">feature/green-grid-mesh</option>
            </select>
          </div>

          <button
            onClick={handleTriggerPush}
            disabled={isPushing}
            className="px-4 py-1.5 rounded-lg neon-tube-button text-xs font-bold flex items-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {isPushing ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Deploying to Edge...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>wrn push origin {activeBranch}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 gsap-fade-in">
        <div className="p-4 rounded-xl border border-border bg-surface/70 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>ACTIVE BRANCH</span>
            <GitPullRequest className="w-4 h-4 text-illum" />
          </div>
          <div className="text-base font-bold text-white font-mono">{activeBranch}</div>
          <div className="text-[11px] text-emerald-400 flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Synced with origin/main</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface/70 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>HEAD MERKLE ROOT</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-base font-bold text-white font-mono truncate">
            {commits[0]?.merkleRoot.substring(0, 14)}...
          </div>
          <div className="text-[11px] text-slate-400 font-mono">RFC 9421 Passport Valid</div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface/70 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>CI/CD PIPELINE</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-base font-bold text-white font-mono">5/5 Phases Passed</div>
          <div className="text-[11px] text-emerald-400">1,192ms total execution</div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface/70 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>GLOBAL EDGE CDN</span>
            <Globe className="w-4 h-4 text-illum" />
          </div>
          <div className="text-base font-bold text-white font-mono">310 PoPs Online</div>
          <div className="text-[11px] text-emerald-400 font-mono">0-RTT HTTP/3 Quic</div>
        </div>
      </div>

      {/* Main Grid: Pipeline Visualizer + Interactive Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 gsap-fade-in">
        {/* Automated Cloud Deployment Pipeline Visualizer */}
        <div className="p-5 rounded-xl neon-tube-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-illum" />
              <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                5-Phase Cloud Deployment Pipeline
              </h2>
            </div>
            <Badge variant={isPushing ? 'warning' : 'success'}>
              {isPushing ? `Phase ${pipelinePhase}/5 Running` : 'Pipeline Ready'}
            </Badge>
          </div>

          <div className="space-y-3">
            {pipelinePhases.map((phase, idx) => {
              const Icon = phase.icon;
              const isDone = phase.status === 'success';
              const isRunning = phase.status === 'running';

              return (
                <div
                  key={phase.id}
                  className={`p-3.5 rounded-lg border transition-all ${
                    isRunning
                      ? 'border-illum bg-illum/10 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : isDone
                      ? 'border-border/80 bg-surface/60'
                      : 'border-border/40 bg-surface/30 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center ${
                          isDone
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : isRunning
                            ? 'bg-illum/20 text-illum border border-illum animate-pulse'
                            : 'bg-surface text-slate-500'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white font-mono flex items-center space-x-2">
                          <span>{phase.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{phase.description}</p>
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs">
                      {isDone && <span className="text-emerald-400 font-bold">{phase.durationMs}ms</span>}
                      {isRunning && <span className="text-illum animate-pulse">Running...</span>}
                      {!isDone && !isRunning && <span className="text-slate-500">Queued</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-border/60">
            <span>Automated trigger on <strong>wrn push</strong></span>
            <span className="text-white font-bold">Zero-Downtime Atomic Swap</span>
          </div>
        </div>

        {/* Interactive WRN Git Terminal & Quick Actions */}
        <div className="p-5 rounded-xl border border-border bg-surface/90 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                  WRN CLI & Git Framework Terminal
                </h2>
              </div>
              <div className="flex items-center space-x-1.5 font-mono text-[11px] text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Connected :8080</span>
              </div>
            </div>

            {/* Quick Commit Message Input */}
            <div className="mt-3 space-y-2">
              <label htmlFor="commit-msg-input" className="text-[11px] text-slate-300 font-mono">
                Commit Message:
              </label>
              <div className="flex space-x-2">
                <input
                  id="commit-msg-input"
                  name="commitMessage"
                  type="text"
                  value={commitMessage}
                  onChange={e => setCommitMessage(e.target.value)}
                  placeholder="feat: enter commit message..."
                  className="flex-1 bg-surface-elevated border border-border rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-illum"
                />
                <button
                  onClick={handleTriggerPush}
                  disabled={isPushing}
                  className="px-3.5 py-1.5 rounded-lg neon-tube-button text-xs font-semibold cursor-pointer disabled:opacity-50"
                >
                  Commit & Push
                </button>
              </div>
            </div>

            {/* Terminal Window */}
            <div className="mt-4 p-4 rounded-xl bg-black/90 border border-border/80 font-mono text-xs text-slate-300 h-56 overflow-y-auto space-y-1.5 leading-relaxed">
              {terminalOutput.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    line.startsWith('$')
                      ? 'text-illum font-bold'
                      : line.includes('[✓]')
                      ? 'text-emerald-400'
                      : line.includes('[*]')
                      ? 'text-yellow-400'
                      : 'text-slate-300'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Quick CLI Command Helpers */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
            <button
              onClick={() =>
                setTerminalOutput(prev => [
                  ...prev,
                  '$ wrn status',
                  '[*] On branch main. Working tree clean. Cryptographic Merkle Root valid.'
                ])
              }
              className="px-2 py-1.5 rounded border border-border bg-surface-elevated/40 hover:border-illum text-slate-300 hover:text-white transition-colors"
            >
              wrn status
            </button>
            <button
              onClick={() =>
                setTerminalOutput(prev => [
                  ...prev,
                  '$ wrn add .',
                  '[✓] Staged all modified files for RFC 9421 sealing.'
                ])
              }
              className="px-2 py-1.5 rounded border border-border bg-surface-elevated/40 hover:border-illum text-slate-300 hover:text-white transition-colors"
            >
              wrn add .
            </button>
            <button
              onClick={() =>
                setTerminalOutput(prev => [
                  ...prev,
                  '$ wrn test',
                  '[✓] 14/14 Security Fixtures (SEC-01..14) PASS.'
                ])
              }
              className="px-2 py-1.5 rounded border border-border bg-surface-elevated/40 hover:border-illum text-slate-300 hover:text-white transition-colors"
            >
              wrn test
            </button>
            <button
              onClick={() =>
                setTerminalOutput(prev => [
                  ...prev,
                  '$ wrn deploy --env=production',
                  '[✓] Deployed across 310 Cloudflare edge PoPs with 0-RTT HTTP/3.'
                ])
              }
              className="px-2 py-1.5 rounded border border-border bg-surface-elevated/40 hover:border-illum text-slate-300 hover:text-white transition-colors"
            >
              wrn deploy
            </button>
          </div>
        </div>
      </div>

      {/* Cryptographically Sealed Commits History */}
      <div className="space-y-3 gsap-fade-in">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <GitCommit className="w-4 h-4 text-illum" />
            <span className="text-white font-semibold">
              Cryptographically Sealed Commit History ({commits.length})
            </span>
          </div>
          <span>RFC 9421 & Merkle Lineage Verified</span>
        </div>

        <div className="rounded-xl border border-border bg-surface-card overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-surface text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-4 font-semibold">Commit</th>
                <th className="py-2.5 px-4 font-semibold">Branch</th>
                <th className="py-2.5 px-4 font-semibold">Message</th>
                <th className="py-2.5 px-4 font-semibold">Author</th>
                <th className="py-2.5 px-4 font-semibold">Merkle Root</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold">Live Preview</th>
                <th className="py-2.5 px-4 font-semibold text-right">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-mono">
              {commits.map(c => (
                <tr key={c.hash} className="hover:bg-surface-elevated/40 transition-colors">
                  <td className="py-3 px-4 text-illum font-bold">
                    <button
                      onClick={() => handleCopy(c.hash)}
                      className="flex items-center space-x-1 hover:underline cursor-pointer"
                      title="Click to copy full commit hash"
                    >
                      <span>{c.shortHash}</span>
                      {copiedHash === c.hash ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-2.5 h-2.5 text-slate-500" />
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center space-x-1 text-slate-300">
                      <GitBranch className="w-3 h-3 text-slate-500" />
                      <span>{c.branch}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-white font-medium truncate max-w-xs">{c.message}</td>
                  <td className="py-3 px-4 text-slate-300 truncate max-w-[160px]">{c.author}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px] truncate max-w-[120px]">
                    {c.merkleRoot}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="success">Deployed</Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <a
                      href={c.deploymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-illum hover:underline flex items-center space-x-1"
                    >
                      <span className="truncate max-w-[140px]">{c.deploymentUrl.replace('https://', '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400">{c.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
