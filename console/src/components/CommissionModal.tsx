import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import { X, Bot, Shield, Plus, Database } from 'lucide-react';

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommissionModal: React.FC<CommissionModalProps> = ({ isOpen, onClose }) => {
  const { commissionAgent } = useConsole();
  const [name, setName] = useState('');
  const [publisher, setPublisher] = useState('Anthropic Synthetics');
  const [acquisitionType, setAcquisitionType] = useState<'subscription' | 'licence' | 'lease'>('subscription');
  const [egressUrl, setEgressUrl] = useState('api.github.com/v3');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await commissionAgent({
      name: name.trim(),
      publisher,
      acquisitionType,
      egress: egressUrl ? [egressUrl] : []
    });
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface-elevated border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-foundry-cyan/10 border border-foundry-cyan/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-foundry-cyan" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Commission Fresh Agent Instance</h2>
              <p className="text-[11px] text-slate-400">Blueprint §5: Acquisition allocates fresh instance ID and isolated memory.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Agent Model / Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Claude-Coder-v3, Sentinel-Sec-v1"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-primary font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Publisher Organization</label>
              <select
                value={publisher}
                onChange={e => setPublisher(e.target.value)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-primary text-xs"
              >
                <option value="Anthropic Synthetics">Anthropic Synthetics</option>
                <option value="Veritas Formal Systems">Veritas Formal Systems</option>
                <option value="OpenAI Autonomous">OpenAI Autonomous</option>
                <option value="Google DeepMind Robotics">Google DeepMind</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Acquisition Type</label>
              <select
                value={acquisitionType}
                onChange={e => setAcquisitionType(e.target.value as any)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-primary text-xs capitalize"
              >
                <option value="subscription">Subscription</option>
                <option value="licence">Licence</option>
                <option value="lease">Lease</option>
                <option value="purchase">Purchase</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Egress Boundary Allowlist</label>
            <input
              type="text"
              placeholder="api.github.com/v3, raw.githubusercontent.com"
              value={egressUrl}
              onChange={e => setEgressUrl(e.target.value)}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-primary font-mono text-xs"
            />
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border space-y-1.5 text-[11px] text-slate-400">
            <div className="flex items-center space-x-1.5 text-slate-300 font-semibold">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Automatic Memory Compartmentalization</span>
            </div>
            <p>
              A new isolated memory container (e.g. <code className="text-cyan-300">mem_comp_{'{name}'}_isolated</code>) will be created with separate encryption keys. Acquisition confers no access to the owner's personal data.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-border text-slate-300 hover:bg-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium shadow-glow-primary"
            >
              Commission Instance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

