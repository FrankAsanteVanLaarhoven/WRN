import React, { useState } from 'react';
import {
  FileJson,
  CheckCircle2,
  AlertCircle,
  Copy,
  Code2,
  Key,
  Shield,
  Layers
} from 'lucide-react';
import {
  passportSchema,
  accessGrantSchema,
  agentRelationshipSchema,
  sealedSubmissionSchema
} from '../data/contractsData';

export const SchemasView: React.FC = () => {
  const schemas = [
    {
      id: 'passport',
      name: 'Passport Schema',
      file: 'passport.schema.json',
      title: passportSchema.title,
      schema: passportSchema,
      description: 'Draft 2020-12 typed identity for humans, organizations, agent instances, and services.'
    },
    {
      id: 'access_grant',
      name: 'Access Grant Schema',
      file: 'access_grant.schema.json',
      title: accessGrantSchema.title,
      schema: accessGrantSchema,
      description: 'Scoped delegation, pre-consent terms digests, exact operations, and validity intervals.'
    },
    {
      id: 'agent_relationship',
      name: 'Agent Relationship Schema',
      file: 'agent_relationship.schema.json',
      title: agentRelationshipSchema.title,
      schema: agentRelationshipSchema,
      description: 'Acquisition (subscription, license, lease), publisher information, and dedicated memory isolation.'
    },
    {
      id: 'sealed_submission',
      name: 'Sealed Submission Schema',
      file: 'sealed_submission.schema.json',
      title: sealedSubmissionSchema.title,
      schema: sealedSubmissionSchema,
      description: 'Immutable byte-bound submissions, SHA-256 digests, CAS expected-heads, and witness receipts.'
    }
  ];

  const [selectedSchema, setSelectedSchema] = useState(schemas[0]);
  const [copied, setCopied] = useState(false);

  const copySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedSchema.schema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <FileJson className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg font-semibold text-white tracking-tight">
              Draft 2020-12 Contract Schemas Studio
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Formal JSON Schema specifications defining immutable wire models for WRN-PASSPORT-COEXISTENCE-0.2.
          </p>
        </div>

        <button
          onClick={copySchema}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-xs text-slate-200 hover:text-white transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>{copied ? 'Copied' : 'Copy Schema JSON'}</span>
        </button>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Schema Selector */}
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border p-4 bg-surface/50 overflow-y-auto space-y-3">
          <div className="text-xs font-mono text-slate-400 pb-1 border-b border-border">
            FOUNDATION SCHEMAS (4)
          </div>

          <div className="space-y-2">
            {schemas.map(s => {
              const isSelected = selectedSchema.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSchema(s)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-surface-elevated border-indigo-500/60 shadow-glow-primary'
                      : 'bg-surface-card border-border hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white">
                      {s.name}
                    </span>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/30">
                      2020-12
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 truncate mb-1">
                    {s.file}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {s.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border space-y-1.5 text-xs">
            <div className="font-semibold text-slate-300">Schema Integrity</div>
            <div className="text-[11px] text-slate-400 leading-relaxed">
              Every schema enforces strictly closed properties, qualified digest patterns, and domain separation to ensure cryptographic deterministic validation.
            </div>
          </div>
        </div>

        {/* Right: Code & Property Inspector */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-background font-mono text-xs">
          <div>
            <div className="text-[10px] uppercase text-slate-500 mb-1">{selectedSchema.file}</div>
            <h2 className="text-base font-bold text-white mb-1 font-sans">{selectedSchema.title}</h2>
            <div className="text-xs text-primary">{selectedSchema.schema.$id}</div>
          </div>

          {/* Required Properties */}
          <div className="p-4 rounded-xl bg-surface-card border border-border space-y-2">
            <div className="text-slate-300 font-semibold font-sans">Required Properties</div>
            <div className="flex flex-wrap gap-1.5">
              {(selectedSchema.schema.required || []).map((req: string) => (
                <span
                  key={req}
                  className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>

          {/* Raw Schema JSON */}
          <div className="space-y-2">
            <div className="text-slate-300 font-semibold font-sans">Full Schema Definition</div>
            <pre className="p-4 rounded-xl bg-surface border border-border text-[11px] text-slate-300 overflow-x-auto max-h-[500px]">
              {JSON.stringify(selectedSchema.schema, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

