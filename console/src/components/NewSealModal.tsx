import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import { X, GitFork, Lock, ShieldCheck } from 'lucide-react';
import { sha256Hex } from '../utils/crypto';

interface NewSealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewSealModal: React.FC<NewSealModalProps> = ({ isOpen, onClose }) => {
  const { sealSubmission, activeBranch, instances, passports } = useConsole();
  const [branch, setBranch] = useState(activeBranch || 'candidate/v0.2');
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState(instances[0]?.instanceId || '');
  const [content, setContent] = useState('// WRN Sealed Code Payload\nexport function verifyTransition() {\n  return { status: "sealed", verified: true };\n}');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    await sealSubmission({
      branch,
      title: title.trim(),
      authorId,
      content,
      delegatorId: 'urn:wrn:passport:human:frank-vl-01'
    });
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface-elevated border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-foundry-cyan/10 border border-foundry-cyan/30 flex items-center justify-center">
              <GitFork className="w-4 h-4 text-foundry-cyan" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Seal New Immutable Submission</h2>
              <p className="text-[11px] text-slate-400">Blueprint §3: Submissions are immutable byte-bound objects held in quarantine.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Submission Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Formal specification of DPoP Replay Nonce Cache"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-primary text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Target Branch</label>
              <select
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-primary text-xs font-mono"
              >
                <option value="candidate/v0.2">candidate/v0.2</option>
                <option value="quarantine/review">quarantine/review</option>
                <option value="main">main (direct release)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Author Principal / Instance</label>
              <select
                value={authorId}
                onChange={e => setAuthorId(e.target.value)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-primary text-xs font-mono"
              >
                {instances.map(inst => (
                  <option key={inst.instanceId} value={inst.instanceId}>
                    [Agent] {inst.name}
                  </option>
                ))}
                {passports.filter(p => p.type === 'human').map(h => (
                  <option key={h.id} value={h.id}>
                    [Human] {h.displayName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Payload Content / Artifact Manifest</label>
            <textarea
              rows={5}
              required
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full bg-surface border border-border rounded-md p-3 text-slate-100 focus:outline-none focus:border-primary font-mono text-[11px]"
            />
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border space-y-1.5 text-[11px] text-slate-400">
            <div className="flex items-center space-x-1.5 text-slate-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Deterministic Digest Commitment</span>
            </div>
            <p>
              The system will compute an immutable SHA-256 digest over the canonicalized bytes. An expected-head CAS check verifies no concurrent branch head divergence.
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
              className="px-4 py-1.5 rounded-lg bg-foundry-cyan hover:bg-cyan-500 text-slate-950 font-semibold shadow-glow-cyan"
            >
              Seal and Quarantine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

