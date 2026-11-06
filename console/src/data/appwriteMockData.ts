import { DomainItem, ComputePlan, GrokAgentInstance } from '../types/appwrite';

export const INITIAL_DOMAINS: DomainItem[] = [
  {
    id: 'dom-01',
    domain: 'wrn-platform.io',
    status: 'verified',
    sslStatus: 'active',
    registrar: 'WRN Edge Registrar (Verified)',
    pricePerYear: 12.00,
    dnsRecords: [
      { type: 'A', host: '@', value: '185.199.108.153', status: 'valid' },
      { type: 'CNAME', host: 'api', value: 'fra.edge.appwrite.network', status: 'valid' },
      { type: 'TXT', host: '_wrn-challenge', value: 'wrn-verification=78f9a2b0c1', status: 'valid' }
    ],
    nginxConfig: `server {
    listen 443 ssl http2;
    server_name wrn-platform.io api.wrn-platform.io;

    ssl_certificate /etc/letsencrypt/live/wrn-platform.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/wrn-platform.io/privkey.pem;

    # Edge Security & Rate Limiting
    limit_req zone=api_burst burst=40 nodelay;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "default-src 'self'" always;

    location / {
        proxy_pass http://upstream_wrn_core;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }

    location /v1/realtime {
        proxy_pass http://upstream_realtime;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`
  },
  {
    id: 'dom-02',
    domain: 'autonomous-agents.dev',
    status: 'verified',
    sslStatus: 'active',
    registrar: 'WRN Edge Registrar (Verified)',
    pricePerYear: 14.50,
    dnsRecords: [
      { type: 'A', host: '@', value: '185.199.109.153', status: 'valid' },
      { type: 'CNAME', host: 'mcp', value: 'mcp.appwrite.network', status: 'valid' }
    ],
    nginxConfig: `server {
    listen 443 ssl http2;
    server_name autonomous-agents.dev mcp.autonomous-agents.dev;

    ssl_certificate /etc/letsencrypt/live/autonomous-agents.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/autonomous-agents.dev/privkey.pem;

    location / {
        proxy_pass http://upstream_agent_mcp;
        proxy_set_header X-Forwarded-Proto https;
    }
}`
  }
];

export const COMPUTE_PLANS: ComputePlan[] = [
  {
    id: 'nano-1',
    name: 'Edge Nano Agent Pod',
    vCPU: 1,
    ramGB: 1,
    nvmeGB: 25,
    bandwidthTB: 1,
    ourPriceMonthly: 4.00,
    digitalOceanPriceMonthly: 6.00,
    awsEc2PriceMonthly: 7.80,
    savingsVsDOPercent: 33.3
  },
  {
    id: 'standard-2',
    name: 'Standard Coexistence Node',
    vCPU: 2,
    ramGB: 4,
    nvmeGB: 80,
    bandwidthTB: 4,
    ourPriceMonthly: 14.00,
    digitalOceanPriceMonthly: 24.00,
    awsEc2PriceMonthly: 29.20,
    savingsVsDOPercent: 41.7
  },
  {
    id: 'pro-4',
    name: 'High-Throughput Vector DB Cluster',
    vCPU: 4,
    ramGB: 8,
    nvmeGB: 160,
    bandwidthTB: 5,
    ourPriceMonthly: 28.00,
    digitalOceanPriceMonthly: 48.00,
    awsEc2PriceMonthly: 58.40,
    savingsVsDOPercent: 41.7
  },
  {
    id: 'grok-8',
    name: 'Grok Inference & Model Engine',
    vCPU: 8,
    ramGB: 16,
    nvmeGB: 320,
    bandwidthTB: 10,
    ourPriceMonthly: 56.00,
    digitalOceanPriceMonthly: 96.00,
    awsEc2PriceMonthly: 116.80,
    savingsVsDOPercent: 41.7
  }
];

export const INITIAL_LAP_TIMES = [
  { $id: '67f8a204c1', driver: 'Charles Leclerc', code: 'LEC', team: 'ferrari', pos: 1, lap_ms: 70842 },
  { $id: '67f8b112a4', driver: 'Lando Norris', code: 'NOR', team: 'mclaren', pos: 2, lap_ms: 71016 },
  { $id: '67f8c328b7', driver: 'Oscar Piastri', code: 'PIA', team: 'mclaren', pos: 3, lap_ms: 71204 },
  { $id: '67f8d439c8', driver: 'Lewis Hamilton', code: 'HAM', team: 'ferrari', pos: 4, lap_ms: 71388 },
  { $id: '67f8e540d9', driver: 'Max Verstappen', code: 'VER', team: 'red_bull', pos: 5, lap_ms: 71490 }
];

export const INITIAL_POSTGRES_USERS = [
  { id: 'usr-001', name: 'Maya Chen', email: 'maya@orbit.dev', status: 'Verified', role: 'Staff Eng', created_at: '2026-08-21T09:14:00Z' },
  { id: 'usr-002', name: 'Luis Romero', email: 'luis@northwind.io', status: 'Verified', role: 'Data Lead', created_at: '2026-08-21T11:20:00Z' },
  { id: 'usr-003', name: 'Priya Shah', email: 'priya@folio.app', status: 'Pending', role: 'Security Auditor', created_at: '2026-08-22T08:05:00Z' },
  { id: 'usr-004', name: 'Jonah Blake', email: 'jonah@kepler.so', status: 'Verified', role: 'AI Operator', created_at: '2026-08-22T14:30:00Z' }
];

export const MARKETPLACE_TOOLS = [
  { id: 'appwrite-cli', name: 'Appwrite CLI', desc: 'Manage Appwrite from your terminal.', category: 'Developer tools', stars: '4.9k', installs: '180k' },
  { id: 'appwrite-preview', name: 'Appwrite Preview', desc: 'Sign in to protected Appwrite Site previews.', category: 'Developer tools', stars: '1.2k', installs: '45k' },
  { id: 'claude-code', name: 'Claude Code', desc: 'Use Appwrite from Claude Code CLI.', category: 'Developer tools', stars: '12.4k', installs: '320k' },
  { id: 'claude-desktop', name: 'Claude Desktop', desc: 'Use Appwrite from Claude Desktop MCP.', category: 'Developer tools', stars: '8.9k', installs: '210k' },
  { id: 'cline', name: 'Cline', desc: 'Autonomous coding agent powered by Appwrite MCP.', category: 'Developer tools', stars: '15.1k', installs: '410k' },
  { id: 'codex', name: 'Codex', desc: 'Use Appwrite from OpenAI Codex.', category: 'Developer tools', stars: '7.8k', installs: '190k' },
  { id: 'cursor', name: 'Cursor', desc: 'Use Appwrite directly from Cursor editor.', category: 'Developer tools', stars: '28.3k', installs: '850k' },
  { id: 'gemini-cli', name: 'Gemini CLI', desc: 'Use Appwrite from Gemini CLI.', category: 'Developer tools', stars: '6.4k', installs: '120k' },
  { id: 'github-copilot', name: 'GitHub Copilot CLI', desc: 'Use Appwrite from GitHub Copilot CLI.', category: 'Developer tools', stars: '19.2k', installs: '620k' },
  { id: 'google-antigravity', name: 'Google Antigravity', desc: 'Native integration with Google Antigravity and AGY SDK.', category: 'Developer tools', stars: '34.0k', installs: '980k' },
  { id: 'jetbrains-ai', name: 'JetBrains AI Assistant', desc: 'Use Appwrite from JetBrains AI Assistant.', category: 'Developer tools', stars: '5.5k', installs: '95k' },
  { id: 'opencode', name: 'OpenCode', desc: 'Open source agent development environment.', category: 'Developer tools', stars: '4.1k', installs: '72k' },
  { id: 'vscode', name: 'Visual Studio Code', desc: 'Official Appwrite & WRN extension for VS Code.', category: 'Developer tools', stars: '42.1k', installs: '1.5M' },
  { id: 'warp', name: 'Warp', desc: 'Terminal with built-in Appwrite workflows.', category: 'Developer tools', stars: '18.9k', installs: '540k' },
  { id: 'zed', name: 'Zed', desc: 'Lightning-fast collaborative editor with Appwrite RPC.', category: 'Developer tools', stars: '11.3k', installs: '280k' }
];

export const AI_ARENA_BENCHMARK = [
  { model: 'Grok Build 0.1', costPer1M: '$1.00', overall: '98.9%', auth: '99.5%', tablesDb: '98.4%', functions: '100%', storage: '97.2%', sites: '100%', messaging: '100%' },
  { model: 'GPT 5.5', costPer1M: '$5.00', overall: '97.7%', auth: '98.5%', tablesDb: '96.5%', functions: '99.5%', storage: '94.3%', sites: '100%', messaging: '100%' },
  { model: 'Claude Opus 4.8', costPer1M: '$5.00', overall: '97.1%', auth: '99.3%', tablesDb: '96.1%', functions: '95.0%', storage: '94.3%', sites: '100%', messaging: '100%' },
  { model: 'Claude Opus 4.7', costPer1M: '$5.00', overall: '97.1%', auth: '99.0%', tablesDb: '91.3%', functions: '100%', storage: '94.8%', sites: '100%', messaging: '100%' }
];
