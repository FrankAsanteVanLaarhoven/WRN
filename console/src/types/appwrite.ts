export type TopNavTab = 'projects' | 'marketplace' | 'domains' | 'compute' | 'settings';

export type ProjectServiceTab =
  | 'overview'
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
