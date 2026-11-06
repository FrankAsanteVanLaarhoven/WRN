import React, { useState, useEffect } from 'react';
import { useStaggerEntrance } from '../hooks/useGsapAnimation';
import {
  HardDrive,
  Upload,
  FileText,
  Image as ImageIcon,
  Lock,
  Download,
  Trash2,
  Sliders,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface FileRecord {
  id: string;
  name: string;
  bucket: string;
  sizeKb: number;
  compressedKb: number;
  savingsPercent: number;
  mimeType: string;
  encrypted: boolean;
  updatedAt: string;
}

export const StorageView: React.FC = () => {
  const containerRef = useStaggerEntrance();
  const [activeBucket, setActiveBucket] = useState('vault-production');
  const [targetWidth, setTargetWidth] = useState(1200);
  const [quality, setQuality] = useState(62);

  const [files, setFiles] = useState<FileRecord[]>([
    { id: 'file_01', name: 'landing-hero-opt.avif', bucket: 'vault-production', sizeKb: 2400, compressedKb: 920, savingsPercent: 62, mimeType: 'image/avif', encrypted: true, updatedAt: '2 mins ago' },
    { id: 'file_02', name: 'WRN_Passport_Coexistence_Blueprint.docx', bucket: 'contracts-secure', sizeKb: 1450, compressedKb: 580, savingsPercent: 60, mimeType: 'application/docx', encrypted: true, updatedAt: '1 hour ago' },
    { id: 'file_03', name: 'wrn-kernel-core.rlib', bucket: 'vault-production', sizeKb: 4800, compressedKb: 2100, savingsPercent: 56, mimeType: 'application/octet-stream', encrypted: true, updatedAt: '3 hours ago' },
    { id: 'file_04', name: 'audit_ledger_2026_q3.json.zst', bucket: 'contracts-secure', sizeKb: 12400, compressedKb: 3100, savingsPercent: 75, mimeType: 'application/zstd', encrypted: true, updatedAt: '1 day ago' }
  ]);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/v1/storage/files')
      .then(res => res.json())
      .then(data => {
        if (data && data.files) setFiles(data.files);
      })
      .catch(() => {});
  }, []);

  return (
    <div ref={containerRef} className="flex-1 flex flex-col h-full overflow-y-auto bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-3 gsap-fade-in">
        <div>
          <div className="flex items-center space-x-2">
            <HardDrive className="w-5 h-5 text-illum" />
            <h1 className="text-xl font-bold text-white tracking-tight">Storage & Asset Transformation</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Store files with AVIF compression, AES-256 GCM encryption, image transformations, and signed token access control.
          </p>
        </div>

        <button className="px-3.5 py-1.5 rounded-lg neon-tube-button text-xs font-semibold flex items-center space-x-1.5 cursor-pointer">
          <Upload className="w-3.5 h-3.5" />
          <span>+ Upload File</span>
        </button>
      </div>

      {/* AVIF Transformation Interactive Box */}
      <div className="p-5 rounded-xl neon-tube-card space-y-4 gsap-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-illum" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Real-Time AVIF Compression Engine
            </h3>
          </div>
          <Badge variant="tube">62% Average Bandwidth Savings</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Target Width (px)</span>
              <span className="text-white font-bold">{targetWidth}px</span>
            </div>
            <input
              type="range"
              min="320"
              max="3840"
              step="80"
              value={targetWidth}
              onChange={e => setTargetWidth(Number(e.target.value))}
              className="w-full accent-illum cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Quality ({quality}%)</span>
              <span className="text-illum font-bold">{quality}% (Recommended)</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={quality}
              onChange={e => setQuality(Number(e.target.value))}
              className="w-full accent-illum cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-slate-500 line-through">2.4 MB RAW</span>
              <div className="text-white font-bold text-sm">920 KB AVIF</div>
            </div>
            <div className="text-right">
              <span className="text-emerald-400 font-bold">-62% Reduction</span>
              <div className="text-[10px] text-slate-400">Zero Artifacts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="space-y-3 gsap-fade-in">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="text-white font-semibold">Active Bucket: {activeBucket}</span>
          <span>{files.length} Files Total</span>
        </div>

        <div className="rounded-xl border border-border bg-surface-card overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-surface text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-4 font-semibold">File Name</th>
                <th className="py-2.5 px-4 font-semibold">MIME</th>
                <th className="py-2.5 px-4 font-semibold">Original Size</th>
                <th className="py-2.5 px-4 font-semibold">Compressed (AVIF)</th>
                <th className="py-2.5 px-4 font-semibold">Encryption</th>
                <th className="py-2.5 px-4 font-semibold">Updated</th>
                <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-mono">
              {files.map(f => (
                <tr key={f.id} className="hover:bg-surface-elevated/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-3.5 h-3.5 text-illum" />
                      <span>{f.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{f.mimeType}</td>
                  <td className="py-3 px-4 text-slate-400">{(f.sizeKb / 1024).toFixed(1)} MB</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">
                    {(f.compressedKb / 1024).toFixed(1)} MB (-{f.savingsPercent}%)
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="success">AES-256 GCM</Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{f.updatedAt}</td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <button className="p-1 rounded hover:bg-surface text-slate-400 hover:text-white" title="Download">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 rounded hover:bg-surface text-slate-400 hover:text-red-400" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
