import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  Settings,
  Copy,
  Users,
  CreditCard,
  ShieldCheck,
  Key,
  AlertTriangle,
  CheckCircle2,
  Palette,
  Check
} from 'lucide-react';
import { ILLUMINATION_OPTIONS, IlluminationColor } from '../types/console';

export const ProjectSettingsView: React.FC = () => {
  const { illuminationColor, setIlluminationColor } = useConsole();
  const [activeSub, setActiveSub] = useState<'General' | 'Members' | 'Billing' | 'Compliance' | 'OAuth apps'>('General');
  const [orgName, setOrgName] = useState('Personal projects');
  const [copied, setCopied] = useState(false);
  const [updated, setUpdated] = useState(false);

  const orgId = '6865393b00206707eab4';

  const handleCopy = () => {
    navigator.clipboard.writeText(orgId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdated(true);
    setTimeout(() => setUpdated(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-illum" />
          <h1 className="text-lg font-bold text-white tracking-tight">Organization Settings</h1>
        </div>
        <span className="text-xs font-mono text-illum bg-illum-muted px-2.5 py-1 rounded-full border border-illum-muted">
          Free Tier • Personal Workspace
        </span>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Subnav */}
        <div className="w-full lg:w-60 border-b lg:border-b-0 lg:border-r border-border p-4 bg-surface/50 space-y-1 font-mono text-xs">
          {[
            { id: 'General', icon: Settings },
            { id: 'Members', icon: Users },
            { id: 'Billing', icon: CreditCard },
            { id: 'Compliance', icon: ShieldCheck },
            { id: 'OAuth apps', icon: Key }
          ].map(item => {
            const Icon = item.icon;
            const isSelected = activeSub === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSub(item.id as any)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'active-tube-pill font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.id}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-3xl">
          {/* Changeable Illumination & Tube Glow Theme */}
          <div className="p-5 rounded-xl neon-tube-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-illum" />
                <h2 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Illumination & Tube Glow Accent
                </h2>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Hover Tube Mode: Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Customize the platform illumination color (White, Green, Neon Blue, Purple, Amber, Rose). Clean and minimalist at rest; the neon tube glows dynamically on hover.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {ILLUMINATION_OPTIONS.map(opt => {
                const isSelected = illuminationColor === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setIlluminationColor(opt.id as IlluminationColor)}
                    className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-surface border-illum text-white font-semibold'
                        : 'bg-surface/50 border-border text-slate-300 hover:border-illum-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: opt.hex,
                          boxShadow: isSelected ? `0 0 10px ${opt.hex}` : 'none'
                        }}
                      />
                      <span className="text-xs truncate">{opt.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-illum shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Organization ID Card */}
          <div className="p-5 rounded-xl neon-tube-card space-y-2">
            <h2 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Organization ID</h2>
            <p className="text-xs text-slate-400">
              Use this ID when integrating with the WRN API, webhooks, or SDKs. Support may also ask for this ID when assisting with issues.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <div className="p-2.5 rounded-lg bg-surface border border-border font-mono text-xs text-illum flex items-center justify-between flex-1">
                <span>{orgId}</span>
                <button onClick={handleCopy} className="text-slate-400 hover:text-white" aria-label="Copy Org ID">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              {copied && <span className="text-xs text-emerald-400 font-mono">Copied!</span>}
            </div>
          </div>

          {/* Organization Name Card */}
          <form onSubmit={handleUpdate} className="p-5 rounded-xl neon-tube-card space-y-3">
            <h2 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Organization Name</h2>
            <p className="text-xs text-slate-400">
              Update your organization's display name. This will be visible to all organization members and collaborators.
            </p>
            <input
              id="org-name-input"
              name="orgName"
              type="text"
              value={orgName}
              onChange={e => setOrgName(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-illum font-mono transition-colors"
            />
            <div className="flex items-center space-x-3 pt-1">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg neon-tube-button text-xs font-bold font-mono transition-all"
              >
                Update
              </button>
              {updated && (
                <span className="text-xs text-emerald-400 font-mono flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Name updated successfully</span>
                </span>
              )}
            </div>
          </form>

          {/* Delete Organization Danger Box */}
          <div className="p-5 rounded-xl bg-surface-card border border-rose-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 font-mono uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Delete Organization</span>
            </div>
            <p className="text-xs text-slate-400">
              Permanently delete this organization and all associated projects, databases, and cryptographic keys. This action cannot be undone.
            </p>
            <div className="p-3 rounded-lg bg-surface border border-border flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">{orgName} (1 member • 1 project)</span>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-all"
              >
                Delete Organization
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
