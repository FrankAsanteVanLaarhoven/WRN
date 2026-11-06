import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import { X, KeyRound, ShieldAlert, Check } from 'lucide-react';
import { OperationType } from '../types/wrn';

interface NewGrantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewGrantModal: React.FC<NewGrantModalProps> = ({ isOpen, onClose }) => {
  const { issueGrant, instances, passports } = useConsole();
  const [granteeId, setGranteeId] = useState(instances[0]?.instanceId || '');
  const [resourceSelector, setResourceSelector] = useState('urn:wrn:branch:candidate/v0.2/contracts/*');
  const [targetZone, setTargetZone] = useState('agent_task');
  const [durationHours, setDurationHours] = useState(4);
  const [selectedOps, setSelectedOps] = useState<OperationType[]>(['read', 'write', 'derive']);

  if (!isOpen) return null;

  const allOps: OperationType[] = [
    'discover',
    'read',
    'write',
    'derive',
    'share',
    'export',
    'decrypt',
    'execute',
    'advance_head',
    'approve',
    'dispose'
  ];

  const toggleOp = (op: OperationType) => {
    if (selectedOps.includes(op)) {
      setSelectedOps(selectedOps.filter(o => o !== op));
    } else {
      setSelectedOps([...selectedOps, op]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOps.length === 0) return;
    await issueGrant({
      granteeId,
      resourceSelector,
      operations: selectedOps,
      targetZone,
      durationHours
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface-elevated border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
              <KeyRound className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Issue Scoped Access Grant</h2>
              <p className="text-[11px] text-slate-400">Blueprint §4 & §7: Bounded authority with pre-consent digest.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Grantee Principal / Agent</label>
            <select
              value={granteeId}
              onChange={e => setGranteeId(e.target.value)}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-primary text-xs font-mono"
            >
              {instances.map(inst => (
                <option key={inst.instanceId} value={inst.instanceId}>
                  [Agent] {inst.name} ({inst.instanceId.split(':').pop()})
                </option>
              ))}
              {passports.filter(p => p.type === 'human').map(h => (
                <option key={h.id} value={h.id}>
                  [Human] {h.displayName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Target Zone (Perimeter)</label>
              <select
                value={targetZone}
                onChange={e => setTargetZone(e.target.value)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-primary text-xs font-mono capitalize"
              >
                <option value="agent_task">agent_task</option>
                <option value="project_workspace">project_workspace</option>
                <option value="review_quarantine">review_quarantine</option>
                <option value="accepted_release">accepted_release</option>
                <option value="personal_vault">personal_vault</option>
                <option value="shared_exchange">shared_exchange</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Bounded Duration (Hours)</label>
              <input
                type="number"
                min="1"
                max="720"
                value={durationHours}
                onChange={e => setDurationHours(Number(e.target.value))}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-primary text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Resource Selector (URN / Path)</label>
            <input
              type="text"
              required
              value={resourceSelector}
              onChange={e => setResourceSelector(e.target.value)}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-primary font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Permitted Operations (Select all that apply)
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {allOps.map(op => {
                const isSelected = selectedOps.includes(op);
                return (
                  <button
                    type="button"
                    key={op}
                    onClick={() => toggleOp(op)}
                    className={`px-2 py-1.5 rounded text-[11px] font-mono flex items-center justify-between border transition-all ${
                      isSelected
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 font-semibold'
                        : 'bg-surface border-border text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{op}</span>
                    {isSelected && <Check className="w-3 h-3 text-indigo-400" />}
                  </button>
                );
              })}
            </div>
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
              disabled={selectedOps.length === 0}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium shadow-glow-primary"
            >
              Issue Bounded Grant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

