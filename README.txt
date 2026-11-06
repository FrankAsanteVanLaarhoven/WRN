WRN Passport and Human Agent Coexistence
Proposed architecture profile 0.2
Prepared for Frank Van Laarhoven on 5 November 2026

PURPOSE AND STATUS

This bundle specifies a proposed extension to the Work Reference Network.
It describes human and agent identity, agent acquisition and commissioning,
bounded delegation, protected requests, sealed submissions, personal data
compartments, revocation, recovery and a falsifiable evaluation programme.

The profile family is WRN-PASSPORT-COEXISTENCE-0.2. It is a design proposal,
not an established standard, implementation, certification or security result.
No credentials, private keys, valid grants or signatures are included. No
agent was acquired or deployed. Runtime configuration remains unset and
execution flags are false. The JSON files are schemas, not issued passports
or operational authorization records. The YAML files describe requirements
and proposed tests; they are not executable enforcement policies.

CONTENTS

1. passport.schema.json
   Draft 2020-12 structure for typed human, organization, agent and service
   identities, public verification references, issuer claims, current-status
   references, rotation and recovery. Agent identity is bound to a distinct
   commissioned instance. A passport does not assert current authentication
   and grants no automatic resource authority.

2. access_grant.schema.json
   Draft 2020-12 structure for immutable grant terms and approval references.
   Each permission combines its own exact resource selector and operations.
   Actor, owner, issuer, represented principal, recipient, bound key, expiry,
   parent authority, output restrictions and revocation remain explicit.
   The terms digest is calculated before consent references are attached,
   avoiding circular hashes. Semantic permission containment requires an
   implemented verifier; schema shape cannot establish it.

3. agent_relationship.schema.json
   Draft 2020-12 structure for purchase, subscription, licence, lease,
   invitation or service relationships; publisher and operator information;
   fresh commissioned identity and key reference; isolated memory; update
   review; retirement and reassignment. Entitlement never creates a grant.

4. sealed_submission.schema.json
   Draft 2020-12 structure for the exact submitted code and data scope,
   immutable manifests and storage generations, ciphertext identities,
   protected plaintext commitments, signatures and checkpoint references.
   Includes append-only branch transitions with expected-head conditions.
   External services and unavailable replay conditions are explicit.

5. request_profile.yaml
   Proposed HTTPS/OAuth DPoP/HTTP Message Signatures/Content-Digest profile.
   Specifies full URI and body integrity, actor/key/grant agreement,
   canonical action binding, consent references, freshness, authoritative
   grant ancestry, anti-replay, idempotency, concurrency and effect receipts.
   Standard encodings remain standard encodings; the profile is not a new
   signature algorithm.

6. branch_policy.yaml
   Proposed admission, access, derivation, publication, recovery and ledger
   rules. Separates history branches, confidentiality compartments and
   audience views. Access defaults to an exact named seal, not all history
   or future states. Applies restrictions at content, metadata, discovery,
   retrieval, memory, export and egress boundaries.

7. security_tests.yaml
   Fourteen proposed deterministic fixture designs with expected outcomes,
   including legitimate positive cases. Every fixture is not_run; execution
   count is zero and actual results are null. An independent harness must
   be implemented before any pass/fail security assertion is possible.

8. evaluation_plan.yaml
   Research questions, hypotheses, seven KPIs, fourteen broader evaluation
   fixture families, a six-week bounded programme and formative/pilot plans.
   The proposed pilot is 12 participants x six distinct matched tasks = 72
   task episodes across two conditions. Repeated episodes are not independent
   participants. Pilot estimates inform a later powered study; no efficacy
   threshold, effect size or observed result is invented.

9. source_register.json
   Twenty-four verified primary standards, documentation and research sources
   used in the companion blueprint, with DOI where available and limits on
   the claims each source supports. Access date is 5 November 2026. Source
   identifiers embedded inside individual policy/evaluation files are local
   to those files; use the title, DOI and URL to reconcile references.

10. README.txt
    This guide, compatibility boundaries and verification status.

READING ORDER

Read the companion WRN Passport Coexistence Blueprint first. Then inspect
the passport, relationship and grant schemas together; follow one request
through request_profile.yaml; examine sealed submission and branch policy;
finally use the security and evaluation plans to define implementation gates.

The platform lifecycle is: inspect an agent offer; acquire or connect it;
commission a distinct instance; approve bounded authority; execute and
collaborate within that mandate; seal results and record evidence; inspect,
pause, update, revoke, retire or recover under the current authority model.

INTEGRATION RULES

Identity, entitlement, authority, confidentiality, ledger inclusion and task
acceptance are distinct. A public passport or ledger locator is not a bearer
secret. A purchase does not authorize reading the customer's records. A
signature does not establish factual truth or successful task completion.

Qualified WRN content digests use sha256:<64 lowercase hexadecimal digits>
or sha512:<128 lowercase hexadecimal digits>. Each schema/profile defines
which content is covered, domain separation and where signatures or later
receipts are excluded to avoid self-reference. OAuth JWK thumbprints and HTTP
Content-Digest retain their own standard encodings. Do not substitute one
digest scope or encoding for another because the hash algorithm is shared.

The authoritative grant and complete parent chain must be checked for current
status and semantic narrowing. Historical actor claims are not that chain.
Every enforcement point must bind authority to the correct resource state;
an old allowed policy must not authorize newly introduced content. Retried
operations need durable idempotency and reconciliation of uncertain effects.

Submitted records are immutable within their declared scope and retention
commitment. Current branch heads, permissions, identity keys and recovery
arrangements evolve through recorded transitions. Expiry, unavailability or
authorized retention actions must be explicit; content must never silently
change beneath a sealed identity. Sealing submitted bytes does not promise
that every external model, dependency or service can be replayed forever.

Keep plaintext and low-entropy personal commitments off public ledgers.
Protect both content and discovery metadata. Summaries, embeddings, agent
memories, caches and exports retain relevant source restrictions unless an
authorized declassification is separately verified. A purpose label alone
cannot enforce a recipient's internal intent. Ordinary cloud inference
discloses supplied plaintext to its provider unless a separately supported
execution model changes that trust boundary.

Revocation denies future protected operations at controlled enforcement
points; it cannot erase downloaded plaintext, screenshots or uncontrolled
copies. Key rotation and recovery must not silently resurrect revoked grants.
Reassignment requires retiring old authority and commissioning a new instance;
private keys and the previous owner's memory do not transfer automatically.

COMPATIBILITY WITH EARLIER WRN WORK

This extension preserves the earlier work-provenance design but is not an
automatic wire-compatible replacement for WRN 0.1. A reviewed, pinned adapter
must map all material fields, action semantics and digest conventions. No
such adapter is supplied. Format versions remain necessary for compatibility;
the product's richer sealed-state graph does not eliminate technical versions.

IMPLEMENTATION AND VERIFICATION BOUNDARY

Local checks performed for this bundle: JSON/YAML parsing, local JSON Schema
reference resolution, declared required-property consistency, shared profile
alignment, disabled-execution status and ZIP byte/CRC readback. The companion
document was rendered and visually reviewed. These checks concern artifact
structure and presentation.

Not performed: full Draft 2020-12 instance-conformance validation, credential
issuance, cryptographic interoperability, authorization execution, malicious
agent isolation, storage/ledger fault injection, recovery drills, usability
sessions or operational security testing. A full JSON Schema validator was
not available in the authoring environment; no validator was installed.

Before a pilot, select maintained standard implementations and explicit trust
anchors; implement the verifiers, key custody, policy service, transactional
state adapter, encryption, egress and independent evidence checks; then run
both legitimate and forbidden fixture cases on synthetic data. Report actual
counts, failures and uncertainty. The candidate online revocation goal is
P95 <= 60 seconds for new server-mediated access under declared conditions;
it is neither an observed result nor a hard guarantee for every request.

The first bounded milestone is one owner, one invited human, two commissioned
agents and one sealed work task. Aim to demonstrate the complete authorized
journey and rejection of unrelated-compartment access by week four; report
all seven KPIs, unresolved failures and the next decision by week six.
