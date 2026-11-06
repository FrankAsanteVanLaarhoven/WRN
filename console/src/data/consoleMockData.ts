import { DomainItem, ComputePlan, GrokAgentInstance } from '../types/console';

export const INITIAL_DOMAINS: DomainItem[] = [
  {
    id: 'dom_01',
    domain: 'openmeta.io',
    status: 'verified',
    sslStatus: 'active',
    registrar: 'WRN Edge Registrar',
    pricePerYear: 14.00,
    dnsRecords: [
      { type: 'A', host: '@', value: '185.199.108.153', status: 'valid' },
      { type: 'CNAME', host: 'api', value: 'fra.edge.wrn.network', status: 'valid' },
      { type: 'TXT', host: '@', value: 'wrn-verification=f9812a00c6d', status: 'valid' }
    ],
    nginxConfig: `server {
    listen 443 ssl http2;
    server_name openmeta.io api.openmeta.io;

    ssl_certificate /etc/letsencrypt/live/openmeta.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/openmeta.io/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /v1 {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header X-WRN-Project "6aed448b00010a9c93f6";
        proxy_set_header X-Edge-Region "fra-1";
    }
}`
  },
  {
    id: 'dom_02',
    domain: 'agentmesh.dev',
    status: 'verified',
    sslStatus: 'active',
    registrar: 'WRN Edge Registrar',
    pricePerYear: 12.00,
    dnsRecords: [
      { type: 'A', host: '@', value: '185.199.109.153', status: 'valid' },
      { type: 'CNAME', host: 'mcp', value: 'mcp.wrn.network', status: 'valid' }
    ],
    nginxConfig: `server {
    listen 443 ssl http2;
    server_name agentmesh.dev *.agentmesh.dev;

    ssl_certificate /etc/letsencrypt/live/agentmesh.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/agentmesh.dev/privkey.pem;

    location /mcp {
        proxy_pass http://127.0.0.1:9090;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400s;
    }
}`
  }
];

export const COMPUTE_PLANS: ComputePlan[] = [
  {
    id: 'starter',
    name: 'Nano Agent',
    vCPU: 1,
    ramGB: 2,
    nvmeGB: 50,
    bandwidthTB: 2,
    ourPriceMonthly: 7.20,
    digitalOceanPriceMonthly: 12.00,
    awsEc2PriceMonthly: 15.40,
    savingsVsDOPercent: 40.0
  },
  {
    id: 'developer',
    name: 'Standard Pro',
    vCPU: 2,
    ramGB: 4,
    nvmeGB: 100,
    bandwidthTB: 4,
    ourPriceMonthly: 14.50,
    digitalOceanPriceMonthly: 24.00,
    awsEc2PriceMonthly: 31.80,
    savingsVsDOPercent: 39.6
  },
  {
    id: 'production',
    name: 'High-Mem Swarm',
    vCPU: 4,
    ramGB: 16,
    nvmeGB: 250,
    bandwidthTB: 8,
    ourPriceMonthly: 48.00,
    digitalOceanPriceMonthly: 84.00,
    awsEc2PriceMonthly: 112.50,
    savingsVsDOPercent: 42.8
  },
  {
    id: 'enterprise',
    name: 'Dedicated AI Kernel',
    vCPU: 8,
    ramGB: 32,
    nvmeGB: 600,
    bandwidthTB: 16,
    ourPriceMonthly: 96.00,
    digitalOceanPriceMonthly: 168.00,
    awsEc2PriceMonthly: 224.00,
    savingsVsDOPercent: 42.9
  }
];

export const INITIAL_LAP_TIMES = [
  { $id: '67f8a204c1', driver: 'Charles Leclerc', code: 'LEC', team: 'Ferrari', pos: 1, lap_ms: 70842 },
  { $id: '67f8b112a4', driver: 'Lando Norris', code: 'NOR', team: 'McLaren', pos: 2, lap_ms: 71016 },
  { $id: '67f8c328b7', driver: 'Oscar Piastri', code: 'PIA', team: 'McLaren', pos: 3, lap_ms: 71204 },
  { $id: '67f8d439c8', driver: 'Lewis Hamilton', code: 'HAM', team: 'Ferrari', pos: 4, lap_ms: 71388 },
  { $id: '67f8e540d9', driver: 'Max Verstappen', code: 'VER', team: 'Red Bull', pos: 5, lap_ms: 71490 }
];

export const INITIAL_POSTGRES_USERS = [
  { id: 'usr_maya', name: 'Maya Chen', email: 'maya@orbit.dev', role: 'Architect', status: 'Verified' },
  { id: 'usr_luis', name: 'Luis Romero', email: 'luis@northwind.io', role: 'Lead Dev', status: 'Verified' },
  { id: 'usr_priya', name: 'Priya Shah', email: 'priya@folio.app', role: 'Engineer', status: 'Pending' },
  { id: 'usr_jonah', name: 'Jonah Blake', email: 'jonah@kepler.so', role: 'Security Ops', status: 'Verified' },
  { id: 'usr_frank', name: 'Frank Van Laarhoven', email: 'frank@openmeta.io', role: 'Owner', status: 'Verified' }
];

export const MARKETPLACE_TOOLS = [
  { id: 'wrn-cli', name: 'WRN CLI', desc: 'Manage WRN services, contracts, and deployments from your terminal.', category: 'Developer tools', stars: '4.9k', installs: '180k' },
  { id: 'wrn-preview', name: 'WRN Preview', desc: 'Sign in to protected WRN site previews and edge environments.', category: 'Developer tools', stars: '1.2k', installs: '45k' },
  { id: 'mcp-client-sdk', name: 'MCP Client SDK', desc: 'Standard Model Context Protocol client for autonomous agent delegation.', category: 'Agent protocols', stars: '14.2k', installs: '380k' },
  { id: 'mcp-server-kit', name: 'MCP Server Kit', desc: 'Expose local and cloud databases as sandboxed MCP tool servers.', category: 'Agent protocols', stars: '11.8k', installs: '290k' },
  { id: 'vscode-extension', name: 'Visual Studio Code', desc: 'Official WRN language server and state machine studio extension.', category: 'Developer tools', stars: '45.1k', installs: '1.8M' },
  { id: 'cursor-extension', name: 'Cursor IDE Kit', desc: 'Direct MCP context integration and bounded policy verification.', category: 'Developer tools', stars: '28.3k', installs: '850k' },
  { id: 'github-actions', name: 'GitHub Actions', desc: 'Continuous integration, cryptographic passport checks, and edge deploy.', category: 'Automation', stars: '19.2k', installs: '620k' },
  { id: 'jetbrains-plugin', name: 'JetBrains IDE Suite', desc: 'WRN integration for IntelliJ, PyCharm, WebStorm, and RustRover.', category: 'Developer tools', stars: '9.8k', installs: '260k' },
  { id: 'neovim-plugin', name: 'Neovim Lua Plugin', desc: 'Zero-latency Lua RPC binding for WRN contracts and edge logs.', category: 'Developer tools', stars: '6.4k', installs: '120k' },
  { id: 'warp-workflows', name: 'Warp Workflows', desc: 'Pre-configured terminal command playbooks and audit stream tailing.', category: 'Developer tools', stars: '18.9k', installs: '540k' }
];

export const AI_ARENA_BENCHMARK = [
  { model: 'Edge Reasoning Profile', costPer1M: '$0.20', overall: '99.4%', auth: '99.5%', tablesDb: '98.8%', functions: '100%', storage: '99.2%', sites: '100%', messaging: '100%' },
  { model: 'Balanced Coexistence Profile', costPer1M: '$0.80', overall: '98.9%', auth: '99.8%', tablesDb: '99.1%', functions: '99.5%', storage: '98.6%', sites: '100%', messaging: '100%' },
  { model: 'Deep Formal Verification', costPer1M: '$2.40', overall: '99.8%', auth: '100%', tablesDb: '99.7%', functions: '100%', storage: '99.8%', sites: '100%', messaging: '100%' },
  { model: 'Cryptographic Proof Sealer', costPer1M: '$0.50', overall: '100.0%', auth: '100%', tablesDb: '100%', functions: '100%', storage: '100%', sites: '100%', messaging: '100%' }
];

