export type TopNavTab = 'projects' | 'ai-experience' | 'backend-architecture' | 'marketplace' | 'domains' | 'compute' | 'settings';

export type ProjectServiceTab =
  | 'overview'
  | 'ai-experience'
  | 'backend-architecture'
  | 'apps'
  | 'api-keys'
  | 'playground'
  | 'auth'
  | 'databases'
  | 'storage'
  | 'functions'
  | 'messaging'
  | 'sites'
  | 'activity'
  | 'usage'
  | 'firewall'
  | 'grok-agents'
  | 'passport-foundry';

export type IlluminationColor = 'cyan' | 'white' | 'green' | 'purple' | 'amber' | 'rose';

export interface IlluminationOption {
  id: IlluminationColor;
  label: string;
  hex: string;
  rgb: string;
  twClass: string;
}

export const ILLUMINATION_OPTIONS: IlluminationOption[] = [
  { id: 'cyan', label: 'Neon Blue', hex: '#00E5FF', rgb: '0, 229, 255', twClass: 'bg-[#00E5FF]' },
  { id: 'white', label: 'Laser White', hex: '#FFFFFF', rgb: '255, 255, 255', twClass: 'bg-white' },
  { id: 'green', label: 'Cyber Green', hex: '#10B981', rgb: '16, 185, 129', twClass: 'bg-[#10B981]' },
  { id: 'purple', label: 'Amethyst', hex: '#A855F7', rgb: '168, 85, 247', twClass: 'bg-[#A855F7]' },
  { id: 'amber', label: 'Solar Amber', hex: '#F59E0B', rgb: '245, 158, 11', twClass: 'bg-[#F59E0B]' },
  { id: 'rose', label: 'Electric Rose', hex: '#FD366E', rgb: '253, 54, 110', twClass: 'bg-[#FD366E]' }
];

export interface DomainItem {
  id: string;
  domain: string;
  status: 'verified' | 'pending' | 'purchased' | 'failed';
  sslStatus: 'active' | 'provisioning' | 'expired';
  registrar: string;
  dnsRecords: Array<{
    type: 'A' | 'CNAME' | 'TXT';
    host: string;
    value: string;
    status: 'valid' | 'invalid';
  }>;
  nginxConfig: string;
  pricePerYear: number;
}

export interface ComputePlan {
  id: string;
  name: string;
  vCPU: number;
  ramGB: number;
  nvmeGB: number;
  bandwidthTB: number;
  ourPriceMonthly: number;
  digitalOceanPriceMonthly: number;
  awsEc2PriceMonthly: number;
  savingsVsDOPercent: number;
}

export interface GrokAgentInstance {
  id: string;
  name: string;
  model: 'Grok-Build-0.1' | 'GPT-5.5' | 'Claude-Opus-4.8';
  status: 'idle' | 'running' | 'completed' | 'paused';
  taskPrompt: string;
  mcpServers: string[];
  tokensPerSec: number;
  costEstimate: number;
  steps: Array<{
    id: string;
    type: 'reasoning' | 'tool_call' | 'db_query' | 'code_edit' | 'security_gate';
    text: string;
    timestamp: string;
    status: 'success' | 'running' | 'error';
  }>;
}

export interface DatabaseRow {
  $id: string;
  [key: string]: any;
}
