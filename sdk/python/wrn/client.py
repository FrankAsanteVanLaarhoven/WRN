import requests
from typing import Dict, Any, Optional, List

class WRNClient:
    """Official Python Client for WRN Cloud."""

    def __init__(self, endpoint: str = "http://127.0.0.1:8080", api_key: Optional[str] = None, timeout: int = 10):
        self.endpoint = endpoint.rstrip("/")
        self.api_key = api_key
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({
            "Content-Type": "application/json",
            "X-WRN-SDK": "python-v0.2.0"
        })
        if self.api_key:
            self.session.headers.update({"Authorization": f"Bearer {self.api_key}"})

    def _request(self, method: str, path: str, **kwargs) -> Dict[str, Any]:
        url = f"{self.endpoint}{path}"
        response = self.session.request(method, url, timeout=self.timeout, **kwargs)
        response.raise_for_status()
        return response.json()

    # 1. Edge Health
    def get_health(self) -> Dict[str, Any]:
        return self._request("GET", "/health")

    # 2. Step Functions Orchestrator
    def execute_step_functions(self, input_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        return self._request("POST", "/api/v1/step-functions/execute", json=input_data or {})

    def step(self, state_name: str, input_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        return self._request("POST", "/api/v1/step-functions/step", json={"stateName": state_name, "input": input_data or {}})

    # 3. Databases
    def query(self, sql: str, engine: str = "postgresql") -> Dict[str, Any]:
        return self._request("POST", "/api/v1/databases/query", json={"sql": sql, "engine": engine})

    # 4. Energy & Carbon-Aware Dispatch
    def get_energy_metrics(self) -> Dict[str, Any]:
        return self._request("GET", "/api/v1/energy/metrics")

    def dispatch_eco_route(self, task_name: str, workload_type: str = "general", max_latency_ms: int = 100) -> Dict[str, Any]:
        return self._request("POST", "/api/v1/energy/eco-dispatch", json={
            "taskName": task_name,
            "workloadType": workload_type,
            "maxLatencyMs": max_latency_ms
        })

    # 5. Git & Cloud Deployment Framework
    def git_status(self) -> Dict[str, Any]:
        return self._request("GET", "/api/v1/git/status")

    def git_commit(self, message: str, author: str = "Frank Van Laarhoven <frank@wrn.network>") -> Dict[str, Any]:
        return self._request("POST", "/api/v1/git/commit", json={"message": message, "author": author})

    def git_push(self, remote: str = "origin", branch: str = "main") -> Dict[str, Any]:
        return self._request("POST", "/api/v1/git/push", json={"remote": remote, "branch": branch})

    # 6. Infrastructure as Code (IaC)
    def iac_plan(self) -> Dict[str, Any]:
        return self._request("POST", "/api/v1/iac/plan")

    def iac_apply(self) -> Dict[str, Any]:
        return self._request("POST", "/api/v1/iac/apply")
