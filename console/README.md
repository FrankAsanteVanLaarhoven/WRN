# WRN Passport Foundry Console (Profile 0.2)

State-of-the-art operational governance console, cryptographic sealed submissions DAG, and bounded human-agent coexistence platform built for **WRN-PASSPORT-COEXISTENCE-0.2**.

Combining the design aesthetics of **Vercel** (crisp dark mode, edge typography, subtle glow accents), **Linear** (high-velocity keyboard navigation, Cmd+K command palette, granular status badges), and state-of-the-art **Autonomous Agent Sandboxes** (real-time reasoning stream, isolated memory compartments, cryptographic tool traces), anchored in a **Palantir Foundry-style** ontology and data lineage graph.

---

## Architecture & Contract Integration

The console directly operationalizes and visualizes the core contracts in `/Users/favl/Downloads/WRN_Passport_Contracts`:
- **`passport.schema.json`**: Typed human, organization, agent, and service identities; Ed25519 public keys, and status list verification.
- **`access_grant.schema.json`**: Bounded delegation grants, pre-consent RFC 8785 terms digests, resource selectors, and online revocation.
- **`agent_relationship.schema.json`**: Agent acquisition models (subscription, licence, lease), commissioned instance isolation, and dedicated memory containers.
- **`sealed_submission.schema.json`**: Immutable SHA-256 byte-bound submissions, CAS expected-head compare-and-swap, quarantine barriers, and witness receipts.
- **`branch_policy.yaml`**: 9-Zone Branch Access Matrix (`owner_control`, `personal_vault`, `agent_task`, `review_quarantine`, `accepted_release`, etc.) and 11 explicit operations.
- **`security_tests.yaml`**: 14 deterministic security fixtures (SEC-01 through SEC-14) with multi-layer kernel enforcement.
- **`evaluation_plan.yaml`**: 7 KPIs (K1–K7), 72 pilot task episodes, and online revocation P95 ≤ 60s benchmark.
- **`source_register.json`**: Directory of 24 primary standards (W3C VC 2.0, DID 1.0, RFC 9421, RFC 9449, NIST SP 800-63-4).

---

## Quickstart

```bash
cd console

# Install dependencies (already installed)
npm install

# Start development server
npm run dev

# Or build and preview production release
npm run build
npm run preview
```

The console runs locally at `http://127.0.0.1:3000/`.

---

## Key Features

1. **Foundry Ontology Explorer**: Live object graph linking Humans (Frank Van Laarhoven, Dr. Aris Thorne), Commissioned Agents (Nova-CodeAssist, Sentinel-Audit), Grants, and Submissions.
2. **Cryptographic Lineage & Branches**: Visual DAG showing parent hashes, quarantine promotion, and detached witness notary receipts.
3. **Autonomous Agent Operations Console**: Real-time reasoning stream, sandbox execution step trigger, memory compartment isolation inspector, and token metrics.
4. **Access Grants Studio**: Fine-grained grant issuer with pre-consent digest computation and sub-second online revocation trigger.
5. **Deterministic Security Harness**: Executable runner for all 14 fixtures (SEC-01 to SEC-14) verifying schema, ingestion, signature verifier, policy kernel, and storage boundaries.
6. **9-Zone Branch Access Matrix**: Visual security perimeter rules and non-equivalence principle breakdown.
7. **6-Week Evaluation Dashboard**: Live KPI tracker and 72-episode pilot roadmap.
8. **Primary Standards Register**: Searchable library of all 24 verified foundation specifications.
9. **Global Command Palette (`⌘K`)**: Instant keyboard switcher for views and actions.

