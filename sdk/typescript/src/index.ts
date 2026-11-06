/**
 * @package @wrn/sdk
 * @author Frank Van Laarhoven <frank@wrn.network>
 * @description Official TypeScript & JavaScript client for WRN Cloud.
 */

export interface WRNClientConfig {
  endpoint?: string;       // Default: "https://api.wrn.network" or "http://127.0.0.1:8080"
  apiKey?: string;         // WRN-PASSPORT API key
  privateKey?: string;     // Ed25519 private key for RFC 9421 request signing
  timeoutMs?: number;      // Request timeout in milliseconds (default: 10000)
}

export interface StepFunctionExecutionResult {
  executionId: string;
  status: 'SUCCESS' | 'FAILED' | 'RUNNING';
  durationMs: number;
  terminalState: string;
  merkleAuditRoot: string;
  receiptSignature: string;
  results: Record<string, any>;
}

export interface QueryResult {
  rows: any[];
  rowCount: number;
  durationMs: number;
  engine: 'postgresql' | 'mysql' | 'tablesdb' | 'vectorsdb';
}

export class WRNClient {
  public readonly endpoint: string;
  private readonly apiKey?: string;
  private readonly timeoutMs: number;

  constructor(config: WRNClientConfig = {}) {
    this.endpoint = (config.endpoint || 'http://127.0.0.1:8080').replace(/\/$/, '');
    this.apiKey = config.apiKey;
    this.timeoutMs = config.timeoutMs || 10000;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.endpoint}${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-WRN-SDK': 'typescript-v0.2.0',
      ...(options.headers as Record<string, string> || {})
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`WRN API Error [${response.status}]: ${errorText}`);
      }

      return (await response.json()) as T;
    } finally {
      clearTimeout(timer);
    }
  }

  // 1. Health & Edge Gateway Status
  public async getHealth(): Promise<{ status: string; pop: string; wafActive: boolean }> {
    return this.request('/health');
  }

  // 2. Step Functions & State Machine Orchestrator
  public readonly stepFunctions = {
    getDefinitions: async () => {
      return this.request<any>('/api/v1/step-functions/definitions');
    },
    execute: async (input: Record<string, any> = {}): Promise<StepFunctionExecutionResult> => {
      return this.request<StepFunctionExecutionResult>('/api/v1/step-functions/execute', {
        method: 'POST',
        body: JSON.stringify(input)
      });
    },
    executeStep: async (stateName: string, input: Record<string, any> = {}) => {
      return this.request<any>('/api/v1/step-functions/step', {
        method: 'POST',
        body: JSON.stringify({ stateName, input })
      });
    }
  };

  // 3. Databases & SQL Query Engine
  public readonly databases = {
    query: async (sql: string, engine: 'postgresql' | 'mysql' | 'tablesdb' = 'postgresql'): Promise<QueryResult> => {
      return this.request<QueryResult>('/api/v1/databases/query', {
        method: 'POST',
        body: JSON.stringify({ sql, engine })
      });
    }
  };

  // 4. Storage & Asset Compression
  public readonly storage = {
    listFiles: async (bucket: string = 'vault-production') => {
      return this.request<any>(`/api/v1/storage/files?bucket=${encodeURIComponent(bucket)}`);
    }
  };

  // 5. Green Grid & Carbon-Aware Energy Dispatch
  public readonly energy = {
    getMetrics: async () => {
      return this.request<any>('/api/v1/energy/metrics');
    },
    getRegions: async () => {
      return this.request<any>('/api/v1/energy/regions');
    },
    dispatchEcoRoute: async (taskName: string, workloadType: string = 'general', maxLatencyMs: number = 100) => {
      return this.request<any>('/api/v1/energy/eco-dispatch', {
        method: 'POST',
        body: JSON.stringify({ taskName, workloadType, maxLatencyMs })
      });
    }
  };

  // 6. Native Git & Cloud Deployment Framework
  public readonly git = {
    status: async () => {
      return this.request<any>('/api/v1/git/status');
    },
    add: async (files: string[] = ['.']) => {
      return this.request<any>('/api/v1/git/add', {
        method: 'POST',
        body: JSON.stringify({ files })
      });
    },
    commit: async (message: string, author: string = 'Frank Van Laarhoven <frank@wrn.network>') => {
      return this.request<any>('/api/v1/git/commit', {
        method: 'POST',
        body: JSON.stringify({ message, author })
      });
    },
    push: async (remote: string = 'origin', branch: string = 'main') => {
      return this.request<any>('/api/v1/git/push', {
        method: 'POST',
        body: JSON.stringify({ remote, branch })
      });
    },
    getCommits: async () => {
      return this.request<any>('/api/v1/git/commits');
    }
  };

  // 7. Native Infrastructure as Code (IaC) Engine
  public readonly iac = {
    getState: async () => {
      return this.request<any>('/api/v1/iac/state');
    },
    plan: async () => {
      return this.request<any>('/api/v1/iac/plan', { method: 'POST' });
    },
    apply: async () => {
      return this.request<any>('/api/v1/iac/apply', { method: 'POST' });
    },
    exportHCL: async () => {
      const res = await fetch(`${this.endpoint}/api/v1/iac/export`);
      return await res.text();
    }
  };
}

export default WRNClient;
