import React, { useState } from 'react';
import { useConsole } from '../store/consoleStore';
import {
  User,
  Bot,
  Key,
  FileCheck,
  Database,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

interface Node {
  id: string;
  label: string;
  type: 'human' | 'agent' | 'grant' | 'seal' | 'memory' | 'zone';
  x: number;
  y: number;
  details: any;
}

interface Edge {
  source: string;
  target: string;
  label?: string;
  dashed?: boolean;
}

export const OntologyGraphCanvas: React.FC<{ onSelectEntity: (entity: any) => void }> = ({ onSelectEntity }) => {
  const { passports, instances, grants, submissions } = useConsole();
  const [zoom, setZoom] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-frank');

  // Define topological Foundry layout
  const nodes: Node[] = [
    // Humans
    {
      id: 'node-frank',
      label: 'Frank (Owner)',
      type: 'human',
      x: 180,
      y: 120,
      details: passports[0]
    },
    {
      id: 'node-aris',
      label: 'Dr. Thorne (Reviewer)',
      type: 'human',
      x: 720,
      y: 120,
      details: passports[1]
    },
    // Agents
    {
      id: 'node-nova',
      label: 'Nova-CodeAssist-v2',
      type: 'agent',
      x: 180,
      y: 340,
      details: instances[0]
    },
    {
      id: 'node-sentinel',
      label: 'Sentinel-Audit-v1',
      type: 'agent',
      x: 450,
      y: 340,
      details: instances[1]
    },
    // Isolated Memory Containers
    {
      id: 'node-mem-nova',
      label: 'Memory Compartment #882',
      type: 'memory',
      x: 80,
      y: 480,
      details: {
        id: instances[0]?.memoryCompartmentId,
        displayName: 'Isolated Container mem_comp_nova_882',
        status: 'active',
        entityCategory: 'instance'
      }
    },
    // Grants
    {
      id: 'node-grant-nova',
      label: 'Grant: Nova Candidate Workspace',
      type: 'grant',
      x: 180,
      y: 230,
      details: grants[1]
    },
    {
      id: 'node-grant-aris',
      label: 'Grant: Aris Review Quarantine',
      type: 'grant',
      x: 720,
      y: 230,
      details: grants[2]
    },
    // Submissions
    {
      id: 'node-seal-patch',
      label: 'Seal: Agent Candidate Patch',
      type: 'seal',
      x: 450,
      y: 480,
      details: submissions[1]
    },
    {
      id: 'node-seal-init',
      label: 'Seal: Baseline Specification',
      type: 'seal',
      x: 720,
      y: 480,
      details: submissions[0]
    },
    // Security Zones
    {
      id: 'node-zone-quarantine',
      label: 'Zone 5: Review Quarantine',
      type: 'zone',
      x: 580,
      y: 380,
      details: {
        id: 'zone-review-quarantine',
        displayName: 'Review Quarantine Zone',
        status: 'active',
        entityCategory: 'zone'
      }
    }
  ];

  const edges: Edge[] = [
    { source: 'node-frank', target: 'node-grant-nova', label: 'Issues' },
    { source: 'node-frank', target: 'node-grant-aris', label: 'Delegates' },
    { source: 'node-grant-nova', target: 'node-nova', label: 'Binds Mandate' },
    { source: 'node-grant-aris', target: 'node-aris', label: 'Binds Review' },
    { source: 'node-nova', target: 'node-mem-nova', label: 'Isolated Memory', dashed: true },
    { source: 'node-nova', target: 'node-seal-patch', label: 'Seals Code' },
    { source: 'node-seal-patch', target: 'node-seal-init', label: 'CAS Parent Link' },
    { source: 'node-seal-patch', target: 'node-zone-quarantine', label: 'Quarantined', dashed: true },
    { source: 'node-aris', target: 'node-zone-quarantine', label: 'Evaluates' },
    { source: 'node-sentinel', target: 'node-seal-patch', label: 'Audits', dashed: true }
  ];

  const getNodeColor = (type: Node['type'], isSelected: boolean) => {
    if (isSelected) return 'stroke-foundry-cyan stroke-2 fill-surface-elevated';
    switch (type) {
      case 'human':
        return 'stroke-amber-400 fill-surface';
      case 'agent':
        return 'stroke-foundry-cyan fill-surface';
      case 'grant':
        return 'stroke-indigo-400 fill-surface';
      case 'seal':
        return 'stroke-emerald-400 fill-surface';
      case 'memory':
        return 'stroke-cyan-500 fill-surface';
      case 'zone':
        return 'stroke-purple-400 fill-surface-card stroke-dasharray-4';
      default:
        return 'stroke-slate-500 fill-surface';
    }
  };

  const handleNodeClick = (node: Node) => {
    setSelectedNodeId(node.id);
    if (node.details) {
      onSelectEntity(node.details);
    }
  };

  return (
    <div className="relative w-full h-full bg-background overflow-hidden flex items-center justify-center select-none">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 p-1 rounded-lg bg-surface-elevated border border-border shadow-lg">
        <button
          onClick={() => setZoom(z => Math.max(0.6, z - 0.1))}
          className="p-1.5 rounded hover:bg-surface text-slate-300 hover:text-white"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-[11px] font-mono text-slate-400 px-1">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom(z => Math.min(1.6, z + 0.1))}
          className="p-1.5 rounded hover:bg-surface text-slate-300 hover:text-white"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(1)}
          className="p-1.5 rounded hover:bg-surface text-slate-300 hover:text-white"
          title="Reset Zoom"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SVG Interactive Canvas */}
      <div
        className="w-full h-full transition-transform duration-200"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
      >
        <svg className="w-full h-full min-w-[900px] min-h-[600px]">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="18"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#3B4261" />
            </marker>
            <marker
              id="arrowhead-active"
              markerWidth="8"
              markerHeight="6"
              refX="18"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#06B6D4" />
            </marker>
          </defs>

          {/* Render Edges */}
          {edges.map((edge, idx) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const isConnected = selectedNodeId === edge.source || selectedNodeId === edge.target;
            const midX = (sourceNode.x + targetNode.x) / 2;
            const midY = (sourceNode.y + targetNode.y) / 2;

            return (
              <g key={idx}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isConnected ? '#06B6D4' : '#1E2333'}
                  strokeWidth={isConnected ? 2 : 1.5}
                  strokeDasharray={edge.dashed ? '4 4' : undefined}
                  markerEnd={isConnected ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                  className="transition-colors duration-200"
                />
                {edge.label && (
                  <text
                    x={midX}
                    y={midY - 6}
                    fill={isConnected ? '#06B6D4' : '#64748B'}
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="select-none pointer-events-none"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Render Nodes */}
          {nodes.map(node => {
            const isSelected = selectedNodeId === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => handleNodeClick(node)}
                className="cursor-pointer group"
              >
                {/* Node Box */}
                <rect
                  x="-75"
                  y="-22"
                  width="150"
                  height="44"
                  rx="10"
                  className={`${getNodeColor(node.type, isSelected)} transition-all shadow-md group-hover:stroke-primary`}
                />

                {/* Node Text Label */}
                <text
                  x="0"
                  y="-2"
                  fill="#F8FAFC"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  className="select-none pointer-events-none"
                >
                  {node.label}
                </text>
                <text
                  x="0"
                  y="12"
                  fill="#94A3B8"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="select-none pointer-events-none uppercase"
                >
                  {node.type}
                </text>

                {isSelected && (
                  <circle cx="65" cy="-14" r="4" fill="#06B6D4" className="animate-ping" />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Canvas Footnote */}
      <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-500 z-10 flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
        <span>Palantir Foundry Visual Topology • Click any node to inspect ontology bindings</span>
      </div>
    </div>
  );
};
