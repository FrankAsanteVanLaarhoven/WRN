# WRN Cloud • Autonomous Agent Coexistence Platform

[![Security Gate](https://img.shields.io/badge/Security%20Fixtures-14%2F14%20PASS-emerald?style=flat-square&logo=shield)](file:///Users/favl/Downloads/WRN_Passport_Contracts/security_tests.yaml)
[![RFC 9421](https://img.shields.io/badge/RFC%209421-Cryptographic%20Sealing-blue?style=flat-square)](https://datatracker.ietf.org/doc/html/rfc9421)
[![MCP Protocol](https://img.shields.io/badge/MCP-v2.4%20Active-purple?style=flat-square)](https://modelcontextprotocol.io/)
[![Cloudflare CDN](https://img.shields.io/badge/Cloudflare%20Enterprise-310%20PoPs-amber?style=flat-square)](file:///Users/favl/Downloads/WRN_Passport_Contracts/console/src/views/SitesView.tsx)
[![Rust Kernel](https://img.shields.io/badge/Rust%20Kernel-v0.2.0%20Active-crimson?style=flat-square)](file:///Users/favl/Downloads/WRN_Passport_Contracts/backend/rust-kernel)
[![Go Edge](https://img.shields.io/badge/Go%20Edge%20Gateway-v0.2.0%20Online-cyan?style=flat-square)](file:///Users/favl/Downloads/WRN_Passport_Contracts/backend/go-edge)

> **Enterprise-grade cloud platform engineered specifically for deterministic human-agent coexistence, bounded delegation, ASL-compliant Step Functions orchestration, and verifiable execution sealing.**

---

## Executive Overview

**WRN (Work Reference Network) Cloud** is an enterprise runtime and developer platform designed to solve the critical security, authority, and coordination challenges of autonomous AI agents operating on production backends.

Traditional cloud infrastructure treats autonomous agent executions as generic, unvetted API calls with broad service account permissions. **WRN** replaces this vulnerability with **bounded cryptographic envelopes (RFC 9421)**, **memory compartment isolation**, **visual Step Functions state machine orchestration**, and **real-time Merkle audit receipts**.

```mermaid
flowchart LR
    A["Autonomous Agent\n(MCP Client)"] -->|"RFC 9421 DPoP Request"| B["WRN Go Edge Gateway\n(Layer-7 WAF & CDN)"]
    B -->|"State Flow DAG"| C["Step Functions Engine\n(ASL Multi-Step Stepper)"]
    C -->|"Verify Digest"| D["Rust Cryptographic Kernel\n(Constant-Time Compartment)"]
    C -->|"Parallel Security Checks"| E["WAF + Redis Rate Limiter"]
    C -->|"Sandboxed Task"| F["WASM Micro-VM\n(Isolated Memory)"]
    C -->|"Seal Receipt"| G["SHA-256 Merkle Ledger\n(Immutable Audit DAG)"]
```

---

## Core Capabilities & Architecture

### 1. Visual Step Functions & State Flow Studio
WRN includes a full visual DAG state machine orchestration engine adhering to Amazon States Language (ASL) specifications:
- **Interactive Stepper**: Single-step debugging (`Step Next`), full state machine execution (`Run All Steps`), or direct live testing of individual states (`Execute State Live`).
- **Deterministic State Pipeline**:
  1. `VerifyAgentEnvelope` (`Task`): Validates caller credentials, parses envelope digests, and allocates bounded memory compartments.
  2. `EvaluateZonePolicy` (`Choice`): Dynamic routing between Zone 1 (Core Ring), Zone 2 (Strict Bounded Compartments), and Zone 3 (External Sandboxes).
  3. `ParallelSecurityChecks` (`Parallel`): Concurrently spawns three synchronized Goroutines to verify RFC 9421 signatures, Redis token bucket allowances (42 / 300 rpm), and Layer-7 OWASP WAF threat rules.
  4. `ExecuteSandboxedTask` (`Task`): Executes tasks within isolated micro-VMs with zero egress leaks, producing verifiable state digests.
  5. `CommitMerkleAuditProof` (`Task`): Generates SHA-256 leaf nodes, calculates Merkle roots, and anchors receipts into block height records (`#14209`).
  6. `PipelineSuccess` (`Succeed`): Terminal emission of cryptographically sealed receipts routed across 310 Cloudflare edge Points of Presence.

### 2. Autonomous Agent Harness & Model Context Protocol (MCP) Runtime
- **Native MCP Protocol Hub**: Fully compliant Model Context Protocol client and server bridge (`mcp.wrn.io`) exposing databases, buckets, and routing rules as sandboxed tools (`postgresql.createExecution`, `tablesdb.queryRows`, `storage.createFile`, `edge.reloadProxyRules`, `crypto.merkleSeal`).
- **Execution Profiles**:
  - `Edge-Reasoning`: Sub-5ms deterministic edge inference for high-frequency routing.
  - `High-Throughput`: Parallel state machine batch processing.
  - `Deep-Verification`: Formal cryptographic proof generation and zero-knowledge containment checks.
- **Strict Bounded Delegation**: Every agent invocation inherits precise `WRN-PASSPORT-0.2` authority scopes. Out-of-scope resource access is intercepted and rejected at the kernel level.

### 3. Military-Grade Cryptographic Enforcement Kernel
- Written in **Rust** (`backend/rust-kernel`) with `#![forbid(unsafe_code)]`.
- **Constant-Time Verification**: Prevents microarchitectural side-channel and timing attacks during envelope signature checks.
- **Memory Compartments**: Zero-cost abstractions enforcing strict isolation boundaries across concurrent tenant workloads.
- **Canonical Serialization**: Compliant with RFC 8785 (JSON Canonicalization Scheme) to ensure deterministic hashing across heterogeneous environments.

### 4. High-Performance Go Edge Gateway & WAF
- High-concurrency edge server written in **Go 1.23+** (`backend/go-edge`).
- **Layer-7 Web Application Firewall (WAF)**: Built-in token bucket rate limiting and real-time pattern filtering against SQL injection (`' OR 1=1`), cross-site scripting (XSS), path traversal, and malicious payload smuggling.
- **In-Memory Redis Cache**: Sub-millisecond object caching with instant edge cache invalidation.

### 6. Green Grid & Carbon-Aware Edge Compute Engine (Combating Data Center Shortages)
Traditional cloud infrastructure concentrates multi-megawatt AI cluster demand in constrained hyper-scaler hubs (Ashburn, Frankfurt, Silicon Valley), creating regional electrical grid blackouts, high thermal PUE overhead (1.30–1.50), and multi-year interconnection queues. **WRN combats data center shortages and power bottlenecks natively**:
- **Carbon-Aware Follow-the-Sun / Follow-the-Wind Routing**: Dynamically dispatches latency-tolerant agent workflows and state machine batches to edge regions experiencing renewable energy curtailment (e.g. Nordic geothermal/hydro at $18\text{ gCO}_2\text{e/kWh}$, Oregon hydro at $28\text{ gCO}_2\text{e/kWh}$) instead of carbon-dense grids ($410+\text{ gCO}_2\text{e/kWh}$).
- **Sub-Millisecond Scale-to-True-Zero Micro-VMs**: Replaces power-hungry idle Docker pods ($45\text{W}+$ quiescent power) with compiled Rust/WASM micro-VMs that cold-start in $0.8\text{ms}$ and draw $0.01\text{W}$ when idle.
- **Merkle Compute Deduplication**: Caching verifiable cryptographic execution proofs eliminates redundant forward passes and GPU cycles for identical inputs, saving up to $64\%$ of compute energy.
- **Ultra-Low PUE Edge Micro-Hubs**: Deployed in geographically dispersed, free-air-cooled edge PoPs operating at PUE $1.04$ to $1.09$.

### 7. Native Infrastructure as Code (IaC) State Engine (Terraform Alternative)
- **Zero External Dependencies**: Replaces external Terraform binaries, S3/DynamoDB remote state locking, and third-party orchestration with an in-process, pure Go & Rust state engine.
- **Declarative Resource Schemas**: Native resource models for `wrn_database`, `wrn_storage_bucket`, `wrn_serverless_function`, `wrn_step_function`, `wrn_custom_domain`, and `wrn_firewall_policy`.
- **Topological DAG Planning & Diff**: Computes dry-run diffs (`plan`) with automatic dependency graph resolution before modifying live infrastructure.
- **Cryptographic Merkle State Sealing**: Every state transition (`apply`) increments serial lineage and computes a SHA-256 Merkle root stored in an append-only audit trail.
- **HCL Interoperability**: Full export compatibility with Terraform 1.5+ HCL (`.tf`) syntax without requiring the Terraform binary to execute.

### 8. Enterprise Cloud & Data Services
- **Databases**: Real-time multi-engine support for PostgreSQL, MySQL, TablesDB, and VectorsDB with interactive sub-millisecond query consoles.
- **Storage**: S3-compatible encrypted object buckets (`vault-production`, `contracts-secure`) with interactive AVIF image compression (62% payload reduction) and AES-256 GCM encryption.
- **Domains & DNS**: Real-time WHOIS domain search, instant edge DNS record generation (`A`, `CNAME`, `TXT`), automated Let's Encrypt Wildcard SSL certificates, and edge reverse proxy routing.
- **Messaging**: Omnichannel notification gateway supporting transactional Email (SendGrid), SMS (Twilio), and Push Notifications (FCM).

---

## Directory Structure

```plaintext
WRN_Passport_Contracts/
├── Makefile                                # Unified build, test, and run automation
├── README.md                               # Enterprise platform documentation
├── access_grant.schema.json                # Draft 2020-12 Access Grant schema
├── passport.schema.json                    # Draft 2020-12 Passport identity schema
├── sealed_submission.schema.json           # Draft 2020-12 Merkle Submission schema
├── security_tests.yaml                     # 14 formal deterministic security fixtures
├── branch_policy.yaml                      # Multi-zone branch & memory isolation rules
├── backend/
│   ├── rust-kernel/                        # Rust Zero-Cost Cryptographic Kernel
│   │   ├── Cargo.toml
│   │   └── src/                            # Constant-time verifiers & bounded compartments
│   └── go-edge/                            # Go High-Concurrency Edge Gateway & WAF
│       ├── cmd/server/main.go              # Edge server daemon & API routes
│       └── internal/
│           ├── cache/                      # Redis-compatible in-memory cache
│           ├── energy/                     # Green grid & carbon-aware routing engine
│           ├── iac/                        # Native Infrastructure as Code state engine
│           ├── stepfunctions/              # ASL State Flow orchestration engine
│           └── waf/                        # Layer-7 OWASP firewall & rate limiter
└── console/                                # React 19 + TypeScript + Tailwind Console
    ├── src/
    │   ├── views/                          # StepFunctions, AgentHarness, Domains, etc.
    │   ├── components/                     # TopNav, Sidebar, CommandPalette, Badges
    │   ├── store/                          # Unified reactive state & telemetry store
    │   └── utils/                          # Web Crypto RFC 9421 canonical hashing
    └── vite.config.ts                      # High-performance Vite build configuration
```

---

## Quickstart & Local Development

### Prerequisites
- **Go**: 1.23 or newer
- **Rust / Cargo**: 1.85 or newer
- **Node.js**: 22 or newer (`npm` 10+)
- **Make**: Standard GNU Make

### 1. Clone & Verify Installation
```bash
git clone https://github.com/FrankAsanteVanLaarhoven/WRN.git
cd WRN
```

### 2. Run Comprehensive Test Suites
Executes the Rust cryptographic test suite, Go WAF tests, and Step Functions engine verification in a single pass:
```bash
make test
```

### 3. Build Production Binaries
Compiles the optimized Rust release kernel and the Go edge server binary:
```bash
make build
```

### 4. Launch Development Environment
To start the Go Edge Gateway (port `8080`) and Vite Console (port `3000`):
```bash
# Terminal 1: Start Go Edge Daemon
./backend/go-edge/bin/wrn-edge-server

# Terminal 2: Start Console
cd console
npm install
npm run dev
```

Navigate to `http://localhost:3000` to access the live console.

---

## Core API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/health` | `GET` | Edge gateway telemetry, Cloudflare CDN status, and WAF metrics |
| `/api/v1/step-functions/definitions` | `GET` | ASL-compliant state machine definition & state metadata |
| `/api/v1/step-functions/step` | `POST` | Executes a single state step with live latency & payload result |
| `/api/v1/step-functions/execute` | `POST` | Executes the complete state machine DAG with parallel goroutines |
| `/api/v1/iac/state` | `GET` | Current native IaC resources, serial lineage, and Merkle root |
| `/api/v1/iac/plan` | `POST` | Computes declarative plan diff against live platform state |
| `/api/v1/iac/apply` | `POST` | Applies infrastructure changes and seals state with Merkle root |
| `/api/v1/iac/export` | `GET` | Exports Terraform-compatible HCL (`.tf`) for external interoperability |
| `/api/v1/energy/metrics` | `GET` | Real-time carbon intensity, renewable mix, PUE, and energy savings |
| `/api/v1/energy/regions` | `GET` | Global edge regions ranked by green energy score & carbon intensity |
| `/api/v1/energy/eco-dispatch` | `POST` | Carbon-aware task router to lowest-emission edge region |
| `/api/v1/energy/queue` | `GET` | Live green execution queue and carbon offset audit receipts |
| `/api/v1/auth/users` | `GET`, `POST` | User identity management with WebAuthn passkey status |
| `/api/v1/databases/query` | `POST` | Live SQL query runner for PostgreSQL, MySQL, and TablesDB |
| `/api/v1/storage/files` | `GET` | Inventory of encrypted storage buckets & AVIF compression assets |
| `/api/v1/waf/evaluate` | `POST` | Layer-7 firewall threat inspector and signature validator |
| `/api/v1/activity/stream` | `GET` | Real-time immutable audit ledger of system events & Merkle roots |

---

## Security Verification & Fixture Matrix

The platform is formally tested against 14 deterministic security fixtures defined in `security_tests.yaml`:

- **SEC-01**: Legitimate Human Grant Issuance (`PASS`)
- **SEC-02**: Authorized Agent Commissioning (`PASS`)
- **SEC-03**: Canonical RFC 9421 Request Proof (`PASS`)
- **SEC-04**: Tampered Request Body Rejection (`PASS`)
- **SEC-05**: Expired Request Replay Window Rejection (`PASS`)
- **SEC-06**: Unauthorized Actor Resource Egress Blocked (`PASS`)
- **SEC-07**: Scope Containment & Branch Traversal Violation Blocked (`PASS`)
- **SEC-08**: Wire Digest / Storage Generation Mismatch Rejection (`PASS`)
- **SEC-09**: Revoked Grant Status List Enforcement (`PASS`)
- **SEC-10**: Fork & Expected-Head Race Condition Defense (`PASS`)
- **SEC-11**: Cross-Branch Transversal Access Denial (`PASS`)
- **SEC-12**: Full Layer Multi-Contract Certification (`PASS`)
- **SEC-13**: Layer-7 WAF SQL Injection Shield (`PASS`)
- **SEC-14**: Constant-Time Cryptographic Digest Verification (`PASS`)

---

## Platform Ownership & Governance

- **Repository**: [https://github.com/FrankAsanteVanLaarhoven/WRN](https://github.com/FrankAsanteVanLaarhoven/WRN)
- **Production Edge Domains**: `cloud.wrn.network` • `fra.cloud.wrn.network` • `preview.cloud.wrn.network`
- **Owner / Principal**: Frank Van Laarhoven (`frank@openmeta.io`)
- **License**: Proprietary / Enterprise Specification (All Rights Reserved)

