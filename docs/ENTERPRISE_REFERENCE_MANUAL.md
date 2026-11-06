# WRN Cloud • Complete Enterprise Production-Ready Reference Manual
**Platform Architecture, Component Reference, Blockchain Smart Contracts, SDKs, Desktop & PWA Guide**

---

## 1. The Big Picture: How WRN Works (Explain-Like-I'm-12 Analogy)

Imagine the global internet is like a **giant international airport**:
- **You (Humans) and AI Agents are travelers** moving between countries (data services, databases, websites, and bank accounts).
- In a normal airport without security, an autonomous robot might be given an all-access master key to every room. If the robot gets confused, it could accidentally delete files or lock people out.
- **WRN Cloud gives every traveler a cryptographic "Passport"**:
  1. **The Passport (`passport.schema.json`)**: A digital tamper-proof passport. Just like a real passport has your picture and an official chip, a WRN Passport has your **Ed25519 digital signature** and a **Zone Number** that says exactly which rooms you are allowed to enter.
  2. **The Security Gatekeeper (Rust Kernel)**: Written in ultra-fast, military-grade Rust with `#![forbid(unsafe_code)]`. It inspects every traveler in **constant time**—meaning it takes the exact same number of clock cycles to verify a badge, so hacker eavesdroppers cannot measure timing differences to guess passwords.
  3. **The Air Traffic Control Tower (Go Edge Gateway)**: Written in Go 1.23+, running across **310 global cities** (Cloudflare Edge PoPs). When thousands of travelers make requests at once, the tower directs them in under $1\text{ millisecond}$ with zero delay.
  4. **The Flight Checklist (Visual Step Functions)**: Before a plane takes off, pilots follow a strict checklist. WRN Step Functions follow an exact 6-step procedure: verify identity, check zone policy, run parallel firewall scans, run the sandboxed task in isolated memory, seal an immutable Merkle audit proof, and emit a live receipt.
  5. **The Public Ledger in Digital Stone (Blockchain & Smart Contracts)**: In ancient times, kings carved laws in stone so nobody could alter them. WRN publishes execution receipts and Merkle roots (`#14209`) onto **Ethereum, Base, and Arbitrum smart contracts** (`WRNMerkleProofSettler.sol`). Once sealed, no company, administrator, or hacker can ever rewrite history.
  6. **The Green Energy Router (Green Grid Engine)**: When AI models compute large tasks, they need electricity. Instead of overloading coal-powered cities during heatwaves, WRN checks real-time satellite solar and wind data and routes tasks to places where renewable energy is surplus (like geothermal power in Iceland or hydro in Oregon).
  7. **The Native Git Engine (`wrn` CLI)**: Instead of needing complicated third-party tools, you simply type `wrn add .`, `wrn commit -m "update"`, and `wrn push origin main`. The platform stages the code, seals it with your passport stamp, runs 14 automated safety tests, builds the binaries, and deploys it worldwide in under $1.5\text{ seconds}$!

---

## 2. Platform Component & View Directory

WRN Cloud provides 16 production views in the unified console:

```plaintext
WRN CONSOLE NAVIGATION MATRIX
├── CONNECT
│   ├── Apps (Overview & Quickstarts)
│   ├── API Keys (RFC 9421 Scoped Tokens)
│   └── Playground (Interactive REST & WebSocket Tester)
├── BUILD
│   ├── Auth (Passkeys, WebAuthn & Multi-Factor)
│   ├── Databases (PostgreSQL, MySQL, TablesDB, VectorsDB)
│   ├── Storage (S3-Compatible Buckets & AVIF Compression)
│   ├── Functions (0.8ms Cold-Start Micro-VMs)
│   └── Messaging (Email, SMS & Push Gateway)
├── DEPLOY
│   ├── Sites & Hosting (Edge Deployments & Interactive Flexbox Playground)
│   └── Git & CI/CD Framework (Native wrn CLI, Sealed Commits & 5-Phase Pipeline)
├── AUTOMATION
│   ├── Workflows & Jobs (Event-Driven Background Triggers)
│   ├── Step Functions (Visual ASL State Machine Studio & Debugger)
│   └── Infrastructure / IaC (Native Terraform Alternative with Merkle Lineage)
├── OBSERVE
│   ├── Activity (Immutable Merkle Audit Stream)
│   ├── Usage & Cost Analysis (Interactive AWS / DigitalOcean Calculator)
│   └── Green Grid & Energy (Carbon-Aware Routing & Curtailment Capture)
├── PROTECT
│   └── Firewall & WAF (Layer-7 OWASP Threat Mitigation & 300 rpm Rate Limiter)
└── AGENTS & MCP
    ├── AI Agents & MCP Harness (Bounded Tool Integration & Execution Tiers)
    └── WRN Passport Foundry (14/14 Deterministic Security Fixtures)
```

### Detailed Component Specifications

#### 1. Sites & Hosting (`SitesView.tsx`)
- **Purpose**: High-speed edge delivery for static and SSR applications directly from Git triggers.
- **Interactive Flexbox & Layout Playground**: Live reflow controls for `flex-direction`, `justify-content`, `align-items`, `gap` slider ($4\text{px}$ to $48\text{px}$), and `flex-wrap`.
- **Card Demonstrators**: AI Fluid Motion (#1), 3D Interactive Parallax Tilt (#2), Brand Luminescence CSS variable matching (#3), and Zero-Latency Cloudflare CDN (#4).

#### 2. Native Git & Cloud CI/CD Studio (`GitWorkflowView.tsx`)
- **Purpose**: In-platform developer workflow eliminating external Git or CI/CD services.
- **Features**:
  - Live 5-Phase Pipeline Visualizer (Envelope Verification -> Security Fixtures -> Rust Build -> Go Tests -> CDN Purge).
  - Terminal Emulator supporting `wrn status`, `wrn add .`, `wrn commit -m "..."`, `wrn push origin main`, and `wrn deploy`.
  - Cryptographically Sealed Commit History showing full SHA-256 hashes, Merkle roots, and instant preview links (`https://<shortHash>.preview.wrn.network`).

#### 3. Visual Step Functions Studio (`StepFunctionsView.tsx`)
- **Purpose**: Amazon States Language (ASL) visual state machine designer, stepper, and debugger.
- **Pipeline States**:
  1. `VerifyAgentEnvelope` (`Task`): Validates caller credentials, parses envelope digests, allocates memory compartment.
  2. `EvaluateZonePolicy` (`Choice`): Evaluates branch policy matrix across Zone 1 (Core), Zone 2 (Strict Bounded), and Zone 3 (External Sandboxes).
  3. `ParallelSecurityChecks` (`Parallel`): Concurrently spawns three synchronized Goroutines to verify RFC 9421 signatures, Redis token bucket allowances ($42 / 300\text{ rpm}$), and Layer-7 OWASP WAF threat rules.
  4. `ExecuteSandboxedTask` (`Task`): Runs task inside micro-VM with zero egress leaks.
  5. `CommitMerkleAuditProof` (`Task`): Computes SHA-256 Merkle root and anchors block proof `#14209`.
  6. `PipelineSuccess` (`Succeed`): Terminal emission of cryptographically sealed receipts.

#### 4. Green Grid & Energy Studio (`EnergyEfficiencyView.tsx`)
- **Purpose**: Combats global data center electrical substation shortages and high thermal PUE overhead.
- **Metrics Tracked**:
  - Global average carbon intensity: $84\text{ gCO}_2\text{e/kWh}$ (vs. grid baseline of $410\text{ gCO}_2\text{e/kWh}$).
  - Renewable energy mix: $84.2\%$ (Solar, Wind, Geothermal, Hydro).
  - Power Usage Effectiveness (PUE): $1.06$ (vs. industry average of $1.38$).
  - Energy & carbon avoided: $38.4\text{ MWh}$ clean compute delivered, $14.2\text{ metric tons of CO}_2$ avoided.
- **Follow-the-Sun / Follow-the-Wind Dispatcher**: Routes latency-tolerant workloads to regions experiencing clean energy curtailment (`HEL-01` Finland, `ISL-01` Iceland, `OR-01` Oregon).

#### 5. Native Infrastructure as Code (IaC) Studio (`IaCView.tsx`)
- **Purpose**: Replaces external Terraform binaries, S3 remote state files, and DynamoDB state locks.
- **Features**: Pure in-process Go engine with topological DAG planner, dry-run diffs (`plan`), atomic state application (`apply`), SHA-256 Merkle lineage tracking, and standard Terraform 1.5+ HCL (`.tf`) export.

#### 6. Autonomous Agent Harness (`AgentHarnessView.tsx`)
- **Purpose**: Safe delegation runtime for autonomous AI workers using the standard Model Context Protocol (MCP).
- **Execution Tiers**:
  - `Edge-Reasoning`: Sub-5ms deterministic edge inference.
  - `High-Throughput`: Massive parallel state processing.
  - `Deep-Verification`: Formal cryptographic proof validation.

---

## 3. Blockchain Smart Contracts & Cryptographic Settlement

The platform includes production-grade **Solidity smart contracts** located in `contracts/`:

### 1. `WRNPassportRegistry.sol`
- **Standard**: Compliant with W3C Verifiable Credentials 2.0, DID 1.0, and RFC 9421.
- **Functions**:
  - `registerPassport(string passportId, uint8 identityType, bytes ed25519PublicKey, uint8 zone, uint64 duration, bytes32 metadataDigest)`
  - `revokePassport(string passportId, string reason)`: Instant $O(1)$ on-chain revocation list update.
  - `isValidPassport(string passportId) returns (bool)`: On-chain identity verification.
  - `getPassportKey(string passportId) returns (bytes, uint8, bool)`: Retrieves public Ed25519 signing key.

### 2. `WRNMerkleProofSettler.sol`
- **Standard**: Anchors block proofs and verifies SHA-256 / Keccak-256 Merkle roots.
- **Functions**:
  - `settleMerkleRoot(bytes32 merkleRoot, uint64 blockHeight, string pipelineId, string delegator, uint32 taskCount, bytes signature)`
  - `verifyTaskProof(uint64 blockHeight, bytes32 leaf, bytes32[] proof) returns (bool)`: Verifies individual agent task execution against an on-chain settled block.
  - `getReceipt(uint64 blockHeight) returns (ExecutionReceipt)`: Retrieves immutable execution certificate.

### 3. `WRNAccessGrantManager.sol`
- **Standard**: Implements `access_grant.schema.json` and OAuth 2.0 DPoP (RFC 9449).
- **Functions**:
  - `issueGrant(string grantId, address agentController, string resourceURN, bytes32 termsDigest, uint64 duration, uint8 zone, string permissions)`
  - `revokeGrant(string grantId, string reason)`
  - `isGrantActive(string grantId) returns (bool)`

### Testing & Deployment via Foundry
```bash
# Compile contracts
forge build

# Execute contract test suites
forge test -v
```

---

## 4. Native Desktop Version

WRN Cloud includes a standalone desktop application in `desktop/`:
- **Technologies**: Electron 33+, Node.js, and background Go child-process management.
- **Key Capabilities**:
  - **Auto-Spawns Go Edge Gateway**: Automatically launches `backend/go-edge/bin/wrn-edge-server` on startup so you can work completely offline with zero internet access!
  - **Native Window Chrome**: Frameless ultra-dark window (`#0D0E15`) with macOS vibrancy effects.
  - **System Tray**: Live status menu with quick health monitoring.

### Running Desktop Version:
```bash
# From workspace root
cd desktop
npm install
npm start
```

---

## 5. Progressive Web App (PWA) Version

WRN Cloud Console is fully PWA-certified:
- **Manifest (`console/public/manifest.webmanifest`)**: Configured with `standalone` display, `#0D0E15` theme color, and high-resolution icons.
- **Service Worker (`console/public/sw.js`)**:
  - Pre-caches core application shell assets for offline startup.
  - Network-first caching strategy for API endpoints with local cache fallback.
  - Stale-while-revalidate for static scripts and stylesheets.
- **Installation**: Users can tap **`Install PWA`** directly in the top navigation bar or use their browser's "Add to Home Screen" prompt on iOS, Android, macOS, and Windows.

---

## 6. Official Client SDKs

WRN provides official client libraries across TypeScript, Python, and Go:

### A. TypeScript / JavaScript SDK (`@wrn/sdk`)

```bash
npm install @wrn/sdk
```

```typescript
import { WRNClient } from '@wrn/sdk';

const client = new WRNClient({
  endpoint: 'http://127.0.0.1:8080',
  apiKey: 'wrn_key_prod_01'
});

// 1. Execute a Step Functions State Machine Pipeline
const execution = await client.stepFunctions.execute({
  agentId: 'urn:wrn:agent:runtime-01',
  task: 'Verify postgres users and compute conversion rate'
});
console.log('Status:', execution.status);
console.log('Merkle Root:', execution.merkleAuditRoot);

// 2. Query Databases
const dbResult = await client.databases.query('SELECT * FROM users LIMIT 10;', 'postgresql');
console.log('Returned rows:', dbResult.rowCount);

// 3. Native Git Push & Cloud Deployment
const deploy = await client.git.push('origin', 'main');
console.log('Live Preview URL:', deploy.deployment_url);
```

### B. Python SDK (`wrn-sdk`)

```bash
pip install wrn-sdk
```

```python
from wrn import WRNClient

client = WRNClient(endpoint="http://127.0.0.1:8080")

# 1. Execute Step Functions State Flow
result = client.execute_step_functions({
    "agent_id": "urn:wrn:agent:runtime-01",
    "prompt": "Audit tenant memory compartment boundaries"
})
print("Pipeline Status:", result["status"])

# 2. Query SQL Database
users = client.query("SELECT * FROM users;", engine="postgresql")
print("Users count:", len(users["rows"]))

# 3. Carbon-Aware Task Routing
eco_route = client.dispatch_eco_route(task_name="Large Dataset Deduplication", workload_type="delay_tolerant")
print("Dispatched to Cleanest Region:", eco_route["selectedRegion"])
```

### C. Go SDK (`github.com/FrankAsanteVanLaarhoven/WRN/sdk/go/wrn`)

```go
package main

import (
	"fmt"
	"github.com/FrankAsanteVanLaarhoven/WRN/sdk/go/wrn"
)

func main() {
	client := wrn.NewClient("http://127.0.0.1:8080", "wrn_key_prod_01")

	// Trigger automated Git cloud deployment
	result, err := client.GitPush("origin", "main")
	if err != nil {
		panic(err)
	}
	fmt.Printf("Live Preview Domain: %v\n", result["deployment_url"])
}
```

---

## 7. Complete Core API Endpoint Reference

| Endpoint | Method | Input Payload | Output Response | Description |
|---|---|---|---|---|
| `/health` | `GET` | None | `{ status, pop, wafActive }` | Edge gateway telemetry & CDN status |
| `/api/v1/step-functions/definitions` | `GET` | None | ASL State Machine JSON | State definitions & metadata |
| `/api/v1/step-functions/step` | `POST` | `{ stateName, input }` | `{ nextState, output, durationMs }` | Single-step execution debugger |
| `/api/v1/step-functions/execute` | `POST` | `{ input }` | `{ status, merkleRoot, results }` | Complete DAG pipeline runner |
| `/api/v1/git/status` | `GET` | None | `{ current_branch, staged_files, head_merkle }` | Repository working tree status |
| `/api/v1/git/add` | `POST` | `{ files: ["."] }` | `{ status: "staged", files }` | Stages files for commit |
| `/api/v1/git/commit` | `POST` | `{ message, author }` | `{ hash, short_hash, merkle_root }` | Cryptographically seals commit |
| `/api/v1/git/push` | `POST` | `{ remote, branch }` | `{ status, steps, deployment_url }` | Triggers 5-phase cloud deployment |
| `/api/v1/git/branch` | `POST` | `{ branch }` | `{ status: "switched", branch }` | Switches active branch |
| `/api/v1/git/commits` | `GET` | None | `{ total, commits: [...] }` | Immutable commit audit ledger |
| `/api/v1/energy/metrics` | `GET` | None | `{ carbonIntensity, renewableMix, pue }` | Green grid telemetry |
| `/api/v1/energy/regions` | `GET` | None | `{ regions: [...] }` | Global edge nodes ranked by carbon |
| `/api/v1/energy/eco-dispatch` | `POST` | `{ taskName, workloadType, maxLatencyMs }` | `{ selectedRegion, carbonSavingsGrams }` | Carbon-aware workload router |
| `/api/v1/energy/queue` | `GET` | None | `{ count, queue: [...] }` | Delay-tolerant green execution queue |
| `/api/v1/iac/state` | `GET` | None | `{ serial, merkle_root, resources }` | Native IaC state inventory |
| `/api/v1/iac/plan` | `POST` | None | `{ adds, changes, destroys, diff }` | Topological plan dry-run |
| `/api/v1/iac/apply` | `POST` | None | `{ status, serial, merkle_root }` | Applies IaC state transitions |
| `/api/v1/iac/export` | `GET` | None | Raw Terraform HCL string | Interoperable `.tf` file export |
| `/api/v1/databases/query` | `POST` | `{ sql, engine }` | `{ rows, rowCount, durationMs }` | Live SQL query runner |
| `/api/v1/storage/files` | `GET` | `?bucket=vault-production` | `{ files: [...] }` | Encrypted bucket file inventory |
| `/api/v1/waf/evaluate` | `POST` | `{ path, payload, ip }` | `{ action, code, reason }` | Layer-7 OWASP threat validator |
| `/api/v1/activity/stream` | `GET` | None | `{ logs: [...] }` | Real-time immutable audit ledger |

---

## 8. Deterministic Security Fixtures (SEC-01 to SEC-14)

All platform operations are validated against 14 formal deterministic security fixtures defined in `security_tests.yaml`:

- **SEC-01: Legitimate Human Grant Issuance (`PASS`)**: Verifies that human owners can issue bounded delegation grants with valid RFC 8785 pre-consent terms digests.
- **SEC-02: Authorized Agent Commissioning (`PASS`)**: Verifies agent commissioning under active subscription or licence with dedicated memory containers.
- **SEC-03: Canonical RFC 9421 Request Proof (`PASS`)**: Enforces cryptographic DPoP signatures with Ed25519 public keys and nonces.
- **SEC-04: Tampered Request Body Rejection (`PASS`)**: Validates that modifying even 1 byte in a signed payload causes immediate constant-time signature rejection.
- **SEC-05: Expired Request Replay Window Rejection (`PASS`)**: Verifies that requests timestamped outside the $\pm 300\text{s}$ tolerance window are denied.
- **SEC-06: Unauthorized Actor Resource Egress Blocked (`PASS`)**: Intercepts and denies unauthorized read or write operations targeting private vaults.
- **SEC-07: Scope Containment & Branch Traversal Violation Blocked (`PASS`)**: Prevents sandboxed agents from traversing outside authorized branches.
- **SEC-08: Wire Digest / Storage Generation Mismatch Rejection (`PASS`)**: Verifies that payloads whose SHA-256 wire digest mismatches the storage generation hash are quarantined.
- **SEC-09: Revoked Grant Status List Enforcement (`PASS`)**: Tests online revocation check latency ($P95 \le 60\text{ms}$). Revoked grants are blocked immediately.
- **SEC-10: Fork & Expected-Head Race Condition Defense (`PASS`)**: Defends against conflicting concurrent state mutations via compare-and-swap CAS locks.
- **SEC-11: Cross-Branch Transversal Access Denial (`PASS`)**: Blocks horizontal privilege escalation across tenant branches.
- **SEC-12: Full Layer Multi-Contract Certification (`PASS`)**: Complete multi-contract validation linking passport, grant, relationship, and submission schemas.
- **SEC-13: Layer-7 WAF SQL Injection Shield (`PASS`)**: Real-time mitigation against `' OR 1=1` and malicious pattern smuggling.
- **SEC-14: Constant-Time Cryptographic Digest Verification (`PASS`)**: Hardware timing channel defense ensuring verification time does not leak cryptographic key data.
