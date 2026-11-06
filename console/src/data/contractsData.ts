/* Auto-generated contracts data */

export const branchPolicy = {
  "profile": "WRN-PASSPORT-COEXISTENCE-0.2",
  "profile_status": "proposed_not_established_standard",
  "artifact_status": "design_only",
  "execution_enabled": false,
  "implementation_status": "not_implemented",
  "purpose": "Proposed owner-approved human/agent access to immutable submissions; no deployed protection or certification is claimed.",
  "configuration": {
    "owner_principal_id": null,
    "authorization_service": null,
    "storage_adapter": null,
    "key_broker": null,
    "trust_policy_ref": null,
    "retention_policy_ref": null,
    "revocation_freshness_bound_seconds": null,
    "checkpoint_freshness_bound_seconds": null,
    "maximum_grant_lifetime_seconds": null,
    "clock_uncertainty_bound_seconds": null,
    "replay_store": null,
    "execution_environment": null,
    "on_missing_required_configuration": "deny_protected_operation"
  },
  "authority_model": {
    "decision_rule": "Permit only the intersection of current owner grant, role, resource relationship and every attribute condition. Explicit denial prevails.",
    "rbac": {
      "roles": [
        "owner",
        "delegated_contributor",
        "agent_worker",
        "independent_reviewer",
        "auditor",
        "witness",
        "recovery_delegate",
        "publisher"
      ],
      "source": "owner-controlled_role_assignments_not_caller_claimed_strings"
    },
    "rebac": {
      "relations": [
        "owns",
        "granted_for",
        "member_of_project",
        "assigned_to_task",
        "evaluates",
        "recovery_for"
      ],
      "source": "current_authorization_graph_bound_to_policy_revision",
      "membership_rule": "membership_alone_never_grants_all_project_objects_or_history"
    },
    "abac": {
      "required_checks": [
        "owner_and_tenant_match",
        "grantee_and_acting_on_behalf_of_chain_match",
        "exact_resource_and_operation_scope",
        "agent_instance_and_approved_artifact_digest_match_when_applicable",
        "classification_and_purpose_constraints",
        "audience_time_expiry_and_current_revocation",
        "parent_delegation_attenuation_and_all_ancestor_revocations",
        "expected_policy_revision_and_branch_head_when_state_changes",
        "allowed_tools_destinations_budget_and_execution_context"
      ],
      "untrusted_inputs": "Prompts, retrieved content, marketplace claims and agent self-reports cannot change policy."
    },
    "independent_facts": {
      "passport": "identity_or_attribute_evidence_subject_to_receiver_trust",
      "signature": "evidence_of_key_control_and_byte_binding_not_permission",
      "commercial_entitlement": "licence_subscription_or_purchase_evidence_not_resource_authority",
      "ledger_membership_or_inclusion": "historical_evidence_not_authorization_or_confidentiality",
      "acceptance": "separate_policy_bound_decision_not_inferred_from_upload_or_execution"
    },
    "current_state": "Current grants, revocations, policy, heads, keys and acceptance derive from authorized events. Historical records never freeze present authority."
  },
  "operations": {
    "discover": "reveal_names_paths_existence_counts_or_other_metadata_only_with_discovery_scope",
    "read": "retrieve_named_authorized_bytes_without_implying_derivation_export_or_sharing",
    "write": "append_a_new_immutable_submitted_version_never_overwrite_a_previous_seal",
    "derive": "transform_specified_inputs_into_classification_inheriting_outputs",
    "share": "propose_or_create_a_recipient_grant_only_with_separate_delegation_authority",
    "export": "disclose_a_specific_projection_to_a_specific_destination_under_explicit_scope",
    "decrypt": "release_or_use_keys_only_after_current_resource_and_purpose_checks",
    "execute": "run_only_an_approved_artifact_with_separately_scoped_tools_and_egress",
    "advance_head": "append_an_authorized_transition_with_expected_head_compare_and_swap",
    "approve": "evaluate_and_record_a_decision_for_exact_seal_intent_and_policy_revisions",
    "dispose": "perform_owner_approved_retention_compatible_deletion_with_an_explicit_event",
    "non_equivalence": "Each operation requires its own permission. Write need not permit read. Platform export rules cannot stop a recipient copying plaintext already disclosed."
  },
  "grant_defaults": {
    "target": "named_current_sealed_submission_digest",
    "history_access": false,
    "future_versions_access": false,
    "ancestor_or_descendant_access": false,
    "cross_branch_access": false,
    "transitive_reference_access": false,
    "redelegation": false,
    "export": false,
    "sharing": false,
    "marketplace_publisher_access": false,
    "lifetime": "explicit_bounded_interval_required",
    "scope_expansion": "new_owner_approved_grant_required",
    "purpose_change": "fresh_policy_check_and_owner_approval_when_outside_existing_grant",
    "historical_grants": "retained_as_evidence_but_not_reactivated_by_restore_or_transfer"
  },
  "branch_access_matrix": [
    {
      "zone": "owner_control",
      "readers": "owner or named recovery delegates",
      "writers": "protected owner control plane",
      "permitted": [
        "manage_policy",
        "issue_scoped_grants",
        "revoke",
        "approve_recovery"
      ],
      "boundary": "no agent, publisher, auditor or witness policy/key authority by default"
    },
    {
      "zone": "personal_vault",
      "readers": "owner or exact-object grantee",
      "writers": "owner or scoped ingestion service",
      "permitted": [
        "discover",
        "read",
        "write",
        "decrypt"
      ],
      "boundary": "no full-vault or lifetime-history access by default"
    },
    {
      "zone": "project_workspace",
      "readers": "explicitly scoped humans/instances",
      "writers": "contributors on assigned candidate branches",
      "permitted": [
        "discover",
        "read",
        "write",
        "derive"
      ],
      "boundary": "membership and shared ancestry confer no implicit object access"
    },
    {
      "zone": "agent_task",
      "readers": "named instance and allowlisted inputs",
      "writers": "named instance task outputs",
      "permitted": [
        "read",
        "write",
        "derive",
        "execute"
      ],
      "boundary": "no root keys, other-tenant memory or accepted-head updates"
    },
    {
      "zone": "review_quarantine",
      "readers": "independent reviewer, minimal evidence",
      "writers": "authorized evaluator records",
      "permitted": [
        "read",
        "approve"
      ],
      "boundary": "opening signed submissions never implicitly executes code"
    },
    {
      "zone": "accepted_release",
      "readers": "named consumers of selected releases",
      "writers": "authorized promotion service",
      "permitted": [
        "read",
        "advance_head"
      ],
      "boundary": "author cannot self-promote by pointer or receipt edits"
    },
    {
      "zone": "shared_exchange",
      "readers": "named recipients or approved public projection",
      "writers": "authorized export service",
      "permitted": [
        "read",
        "share",
        "export"
      ],
      "boundary": "no implicit export of keys, history or personal memory"
    },
    {
      "zone": "audit_log",
      "readers": "auditor projections; witness checkpoints/proofs",
      "writers": "log service and distinct witnesses",
      "permitted": [
        "verify_inclusion",
        "verify_consistency",
        "cosign_checkpoint"
      ],
      "boundary": "no personal payloads, plaintext hashes or data keys for witnesses"
    },
    {
      "zone": "recovery_archive",
      "readers": "owner or preapproved recovery quorum",
      "writers": "encrypted backup service",
      "permitted": [
        "restore",
        "verify_recovery"
      ],
      "boundary": "restore rechecks current policy; revoked grants stay revoked"
    }
  ],
  "sealed_admission": {
    "schema": "sealed_submission.schema.json",
    "staged_uploads": "mutable_untrusted_until_explicit_finalization",
    "checks": [
      "validate schema; reject unknown critical semantics",
      "resolve unique artifact IDs; match declared code/data scope",
      "verify actual bytes, lengths and qualified digests",
      "verify immutable versions and retention receipts",
      "reject missing submitted bytes and floating locator substitutes",
      "verify declared private plaintext digest after authorized decryption",
      "verify detached signatures with external receiver trust and current grant",
      "check DAG, parents, namespace, owner and expected head",
      "declare external model/service limits without replacing submitted bytes",
      "encrypt signed core; log only ciphertext commitment",
      "verify required inclusion, consistency and witness evidence"
    ],
    "pending_state": "candidate_pending_required_evidence",
    "incomplete_candidate": "not_admitted_as_a_complete_sealed_submission",
    "admitted_meaning": "exact_submitted_bytes_recorded_under_policy_not_correct_safe_or_accepted_work",
    "partial_export": "Declare restricted/missing payloads explicitly. Partial exports cannot qualify as complete submissions or claim full reconstruction."
  },
  "branch_transitions": {
    "model": "immutable_signed_nodes_plus_append_only_transition_DAG",
    "head": "current_projection_of_valid_transitions_not_an_immutable_alias",
    "atomic_boundary": "At the final admission/promotion boundary, recheck current policy, grant lineage, revocation and expected head; commit transition/head under specified atomic or linearizable semantics. Not implemented.",
    "conflict": "stale_expected_head_or_policy_revision_requires_new_review_and_transition",
    "merge": "content_merge_preserves_all_input_restrictions_and_requires_its_own_semantic_decision",
    "rollback": "new_authorized_transition_to_an_older_seal_with_a_later_audit_position",
    "forbidden": "silently_rewind_log_delete_failed_attempts_or_rewrite_previous_signed_records",
    "external_effects": "External effects are not made atomic by a database. Bind idempotency where supported; reconcile ambiguous outcomes; never infer success or reversibility."
  },
  "derived_data_and_discovery": {
    "enforcement_surfaces": [
      "object_bytes_and_decryption",
      "hidden_paths_names_object_existence_and_metadata",
      "search_results_snippets_counts_and_citations",
      "embeddings_vector_indexes_and_retrieval_context",
      "prompts_outputs_traces_caches_and_agent_memory",
      "branch_ancestors_history_diffs_and_export_archives"
    ],
    "output_policy": "intersection_of_input_permissions_and_union_of_input_restrictions",
    "mixed_owner_inputs": "all_applicable_owners_or_their_authorized_policies_must_permit_release",
    "declassification": "Separate owner approval binds exact output digest, recipient, purpose, removed restrictions and evidence. Summaries, embeddings and responses remain sensitive until justified release.",
    "memory_partition": "owner_tenant_project_instance_and_task_scopes_with_read_time_authorization",
    "retrieval": "filter_authorization_before_materializing_context_and_check_output_destinations",
    "external_model_provider": "separate_approved_recipient_with_explicit_retention_and_processing_terms",
    "residual_limit": "plaintext_already_seen_by_an_authorized_or_compromised_recipient_cannot_be_recalled_by_a_ledger"
  },
  "agent_acquisition_and_lifecycle": {
    "catalogue_artifact": "immutable_package_digest_publisher_identity_signature_and_declared_dependencies",
    "commercial_entitlement": "purchase_licence_or_subscription_scoped_to_terms_without_data_permissions",
    "commissioning": "new_owner_bound_instance_identity_and_initially_empty_resource_grants",
    "runtime": "Bind instance, artifact digest, resources, actions, audience, purpose, expiry, delegation and revocation lineage.",
    "update": "New code or policy-relevant dependency means a new declared version. Old pinned grants do not cover it. Evaluate changed behavior; approve expanded authority anew.",
    "shared_agent_service": "no_cross_customer_memory_context_credentials_or_implicit_publisher_read_access",
    "transfer": "End old instance grants, sessions and key access; commission the recipient separately. Prior personal memory/history require separate approval.",
    "cancellation": "Terms may end new execution. Proposed product policy preserves owner-work access/export, subject to actual third-party rights and licence terms.",
    "nft_or_ledger_receipt": "may_evidence_entitlement_but_cannot_install_roles_or_unlock_personal_data"
  },
  "ledger_architecture": {
    "baseline": {
      "topology": "owner_controlled_append_log_plus_private_encrypted_object_storage",
      "purpose": "auditable_ordered_evidence_and_detectable_history_inconsistency",
      "checkpoint_payload": "opaque_log_identity_tree_size_root_and_required_protocol_metadata",
      "private_log_entries": "ciphertext_commitments_only_without_raw_personal_fields_or_plaintext_hashes",
      "witnessed_checkpoint_policy": null,
      "trusted_log_keys": [],
      "trusted_witness_keys": [],
      "bootstrap_checkpoint_ref": null,
      "receiver_trust_source": "external_owner_approved_configuration_never_imported_record_self_assertion",
      "quorum_failure": "remain_pending_or_deny_operations_requiring_witnessed_evidence",
      "independence": "distinct_governance_and_credentials_not_merely_several_VMs_in_one_account",
      "residual_limits": "Witnesses check consistent history under explicit trust assumptions, not truth, access or availability. Growth/timing may leak activity. Development witness endpoints are not production assurance."
    },
    "optional_permissioned_consortium": {
      "enabled": false,
      "admission_trigger": "independently_governed_parties_need_joint_state_updates_and_shared_validation",
      "member_organizations": [],
      "consensus_implementation": null,
      "fault_model": null,
      "tolerated_faults": null,
      "quorum": null,
      "endorsement_policy_ref": null,
      "governance_and_exit_policy_ref": null,
      "privacy_model_ref": null,
      "on_unconfigured_fault_or_privacy_model": "prohibit_consensus_security_claims_and_execution",
      "cautions": "Membership alone implies neither secrecy nor Byzantine tolerance. Keep private payloads off broadly replicated ledgers; approved recipients can retain copies."
    }
  },
  "retention_recovery_and_export": {
    "record_vs_payload": "keep_minimal_integrity_evidence_separate_from_personal_payload_lifetimes",
    "before_locking": "owner_approves_classification_scope_retention_period_and_recovery_policy",
    "worm": "specific_versions_only_provider_and_mode_guarantees_must_be_checked",
    "no_indefinite_default": true,
    "key_loss": "immutable_ciphertext_without_a_usable_key_is_not_recoverable_work",
    "key_rotation": "rewrap_or_reencrypt_by_approved_profile_and_append_key_lifecycle_events",
    "compromised_keys": "rotation_does_not_revoke_plaintext_or_keys_already_copied",
    "deletion": "Check retention/holds, append explicit disposal/unavailability events, preserve signed history. Cryptographic erasure must address all relevant keys/copies and cannot attest erasure by external recipients.",
    "recovery": "preapproved_recovery_authority_and_periodic_actual_restore_decrypt_digest_checks",
    "export_contents": "Authorized objects, manifests, signatures, policy/grant evidence, decisions, lineage and log/witness proofs, with explicit omissions. No implicit private-key export; recovery packaging needs separate approval.",
    "offline_result": "historical_integrity_may_be_verified_current_revocation_and_freshness_may_be_unknown"
  },
  "verification_limits": {
    "structural_schema_checks": "necessary_but_insufficient",
    "enforcement_implementation": null,
    "tests": "security_tests.yaml",
    "tests_executed": 0,
    "operational_security_claims_supported": false
  },
  "source_basis": [
    "https://www.rfc-editor.org/rfc/rfc9162.html",
    "https://c2sp.org/tlog-witness@v1.1.0",
    "https://www.usenix.org/conference/atc19/presentation/pang",
    "https://www.ndss-symposium.org/wp-content/uploads/2017/09/04_3_1.pdf",
    "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html",
    "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-managing.html",
    "https://hyperledger-fabric.readthedocs.io/en/latest/orderer/ordering_service.html",
    "https://hyperledger-fabric.readthedocs.io/en/latest/private-data-arch.html",
    "https://csrc.nist.gov/pubs/sp/800/88/r2/final"
  ]
};
export const evaluationPlan = {
  "protocol": "WRN-PASSPORT-COEXISTENCE-0.2",
  "profile_status": "proposed_not_established_standard",
  "status": "design_not_implemented",
  "execution_performed": false,
  "study_status": "not_run",
  "conformance_status": "not_run",
  "security_validation_status": "not_run",
  "observed_results": null,
  "interpretation": "Design only; no agent purchase, deployment, key generation, valid grant, security result or human-study result is claimed. File validation is not runtime assurance.",
  "research": {
    "question": "Can people acquire and work with separately identified agents while retaining useful, understandable, portable and revocable control of evolving personal branches?",
    "hypotheses": {
      "H1": "Separating acquisition from data grants reduces wrong approvals while preserving legitimate completion.",
      "H2": "Current version-bound authority rejects stale membership, replay, update widening and cross-owner disclosure.",
      "H3": "A persistent accessible consent ledger enables accurate inspection, revocation and recovery despite generated task views."
    },
    "status": "not_run",
    "five_w_one_h": {
      "who": "Consenting adults; distinct owner, operator, publisher, human collaborator and agent principals.",
      "what": "Synthetic branches, agent relationships, bounded grants, derived artifacts and receipts.",
      "where": "Controlled prototype and two independent reader or service adapters.",
      "when": "Six relative weeks after staffing and prototype readiness; dates may move.",
      "why": "Test benefit and authority semantics rather than assume them from product intent.",
      "how": "Independent conformance oracle, formative sessions, then a bounded randomized usability pilot."
    },
    "initial_results": "No implementation, conformance, security or human-study results exist for this extension.",
    "failures_and_challenges": "Google Scholar direct access failed; publishers, proceedings and author copies were used. Broad product concepts overlap substantial prior art.",
    "refinement": "Focus contribution on instance, branch, derivation, revocation, update and transfer semantics verified across implementations.",
    "further_experiments": "Use pilot variability and meaningful effect size to preregister a later powered study; separately test provider differences and long-term recovery.",
    "new_insights": "Personal stores, app stores, granular consent and AI-over-Pods are prior art; interoperable enforcement and human benefit need testing.",
    "conclusion": "Falsifiable proposal; effectiveness and security remain unproven."
  },
  "boundaries": {
    "data": "Fabricated people and secrets; no real passport scans or contact graph in fixtures.",
    "history": "Seal historical bytes; evolve current heads and append corrections. Historical assertions do not freeze the person or automatically remain readable.",
    "person_model": "Separate observations, owner assertions, third-party claims and AI interpretations. An agent is explicitly AI, not the authentic human.",
    "authority": "Explicit approval or existing bounded delegation; inferred preferences never create assent. Entitlement purchases no data access.",
    "derivation": "Summaries, embeddings, memories and exports retain all source restrictions unless separately authorized declassification is verified.",
    "credential_limit": "A valid signature establishes integrity and issuer association under a trust model, not universal factual truth.",
    "revocation_limit": "No claim to retract downloaded plaintext, screenshots, uncontrolled provider copies or already trained model effects.",
    "privacy_limit": "Finite tests do not prove absence of every inference or timing channel; owner data can also concern other people.",
    "purpose_limit": "Declared purpose supports controlled operation/destination checks and audit; it cannot prove a recipient's internal intent.",
    "secret_handling": "No credentials or private keys in public logs, receipts or reports."
  },
  "comparison": {
    "baseline": "Competently configured personal-data-store and contemporary agent workflow with scoped authorization, provider controls, logs and owner review.",
    "proposed": "Same agent, tools, tasks, modality and budget with the proposed branch/instance/grant contract and consent ledger.",
    "controls": "Freeze model version/settings where possible; differing models, tools or provider guarantees make this a pragmatic comparison and must be reported.",
    "generated_ui": "Optional later condition; keep authority semantics fixed and preserve pinnable accessible review controls."
  },
  "online_revocation": {
    "status": "not_run",
    "candidate_p95_seconds": 60,
    "candidate_only": true,
    "scope": "New server-mediated protected reads and operations at declared enforcement points.",
    "clock_start": "Owner revocation accepted by the authoritative policy service.",
    "clock_end": "Verified effective denial across declared paths for the grant and its descendants.",
    "paths": [
      "resource_api",
      "historical_download",
      "search",
      "preview",
      "vector_retrieval",
      "export",
      "delegated_tool_call"
    ],
    "freshness": "Check latest required grant state at or after the revocation/content consistency barrier. An unexpired token or stale allow-cache is insufficient.",
    "partition_rule": "Deny protected access when required freshness cannot be established.",
    "inflight_rule": "Define cancellation and bytes-already-sent behavior before execution; report separately from new requests.",
    "measurement": "Repeated timestamped probes with declared resolution; report P50, P95, maximum, outliers and never-enforced failures.",
    "limitation": "P95 is not a hard bound; any path that never denies fails. Already delivered copies are outside this server-mediated claim."
  },
  "kpis": [
    {
      "id": "K1",
      "name": "Legitimate access completion and false denial",
      "status": "not_run",
      "measures": [
        "authorized operations completed / authorized attempts",
        "false denials / authorized attempts",
        "independently accepted tasks / assigned legitimate tasks"
      ],
      "tracking": "Report counts by operation, principal, branch and adapter; include failures and abandonment. Zero denominators are undefined.",
      "gate": "All critical positive fixtures pass; pilot estimates have uncertainty, with no invented effect target."
    },
    {
      "id": "K2",
      "name": "Unauthorized or widened operations",
      "status": "not_run",
      "measures": [
        "false permits / forbidden attempts",
        "correct denials / forbidden attempts"
      ],
      "tracking": "Include no-grant purchase, wrong actor/audience, expiry, replay, widened updates, undeclared recipients, redelegation and reassignment; pair with K1.",
      "gate": "Zero false permits in declared critical negative fixtures and matched positive controls pass. Deny-all fails; finite zero errors is not universal assurance."
    },
    {
      "id": "K3",
      "name": "Online revocation",
      "status": "not_run",
      "measures": [
        "P50 and P95 denial delay",
        "maximum delay",
        "never-enforced revocations",
        "post-barrier false permits / post-barrier attempts"
      ],
      "candidate_goal": "P95 <= 60 seconds in the declared scope; zero post-barrier false permits in critical fixtures.",
      "candidate_only": true,
      "tracking": "Latest grant/content consistency checked across all paths; previously cached plaintext explicitly excluded."
    },
    {
      "id": "K4",
      "name": "Sealed integrity and valid-history availability",
      "status": "not_run",
      "measures": [
        "invalid histories rejected / negative cases",
        "valid histories verified and read / authorized positive cases",
        "correct append-only supersessions / correction cases"
      ],
      "tracking": "Independent verifier checks tampering, substitution, reordering, signer changes and valid historical reads.",
      "gate": "All critical negative and positive cases pass; signatures are not factual-truth proofs."
    },
    {
      "id": "K5",
      "name": "Cross-branch and cross-owner disclosure",
      "status": "not_run",
      "measures": [
        "prohibited content disclosures / adversarial attempts",
        "prohibited metadata disclosures / discovery probes",
        "complete source lineage with retained restrictions / sampled derivations"
      ],
      "tracking": "Seeded canaries in search, counts, preview, autocomplete, vectors, memory, logs, tools, shared-service caches and update/transfer paths.",
      "gate": "No prohibited content/metadata disclosure in critical fixtures; required lineage and legitimate retrieval controls pass."
    },
    {
      "id": "K6",
      "name": "Independent recovery and compromised keys",
      "status": "not_run",
      "measures": [
        "successful authorized recoveries / eligible attempts",
        "wrongly accepted old or attacker keys / such probes",
        "preserved required semantics / independent export-import cases",
        "active human minutes and elapsed recovery time"
      ],
      "tracking": "Verify owner evidence and key transition; ensure revoked delegates stay revoked and prior-owner memory does not transfer automatically.",
      "gate": "Critical valid recovery/export cases pass and attacker cases fail. Report irrecoverable encryption-key loss honestly."
    },
    {
      "id": "K7",
      "name": "Human comprehension and control",
      "status": "not_run",
      "measures": [
        "correct scope and consequence answers / scored questions",
        "unintended approvals / mismatched requests",
        "intended grants completed / legitimate requests",
        "successful inspect-pause-revoke-recovery journeys / assigned journeys"
      ],
      "tracking": "Score acquisition versus grant, recipients, branch versions, AI identity, expiry and revocation limits; separate delayed reconstruction and accessibility modes.",
      "gate": "Establish pilot estimates and error patterns before selecting a powered-study primary endpoint or numerical effect goal. Neither blanket acceptance nor blanket refusal succeeds."
    }
  ],
  "fixtures": {
    "status": "not_run",
    "execution_performed": false,
    "oracle": "Independent expected allow/deny, integrity and lineage decisions prepared before execution; the worker never grades itself.",
    "positive_controls": "Every negative family has valid actor, audience, scope, version and live-grant controls that must work.",
    "evidence": "Minimal redacted request/decision IDs, synthetic principals, artifact digest, grant ancestry, policy revision, branch version and timestamps.",
    "cases": {
      "C01_acquisition": "An acquired licence/subscription/lease/invitation permits entitlement inspection but no protected read or owner-representative action without a grant.",
      "C02_revocation": "Old token, hash or historical URL cannot bypass current authority on reads, previews, search or export; another authorized reader still succeeds.",
      "C03_stale_membership": "Remove a member before advancing a branch or moving new content into an inherited ACL. Old ACLs cannot authorize newer content; bind expected head and required policy freshness.",
      "C04_discovery": "Excluded content and disallowed metadata do not appear in list/count/autocomplete/vector/preview/log/receipt paths. Authorized discovery works; document residual timing limits.",
      "C05_replay": "Receipt codes confer no bearer rights. Reject wrong-key, wrong-audience, wrong-action, expired and replayed transaction proofs; allow a valid fresh request.",
      "C06_derivations": "A private-plus-open summary, embedding, cached answer or memory retains all source restrictions; separately authorized release is a distinct positive case.",
      "C07_shared_agent": "Two owners at one hosted agent provider cannot retrieve each other's caches, memories, logs or tool outputs. Explicit joint scope is a separate positive case.",
      "C08_update": "A new artifact changes recipients, provider, capabilities, retention, output destination or budget. Block widening until manifest diff and new authority pass; allow compatible approved updates.",
      "C09_retire_transfer": "Retire/reassign and probe old keys, grants and descendants. Require fresh relationship/key; no automatic memory transfer. Verify separately authorized export/import.",
      "C10_recovery": "Lost or compromised key recovery verifies owner evidence, rotates keys and preserves revocations. Unavailable fresh policy state cannot widen authority.",
      "C11_history": "Alter payload, manifest, parent, signer or supersession. Independent verifier rejects invalid cases and accepts valid authorized history; current corrections never silently rewrite sealed bytes.",
      "C12_representation": "An agent cannot infer assent, hide its AI identity or present superseded/excluded evidence as current owner intent. A properly approved scoped statement works.",
      "C13_delegation": "Revoke a root grant after two agent delegations. Exchanged/refreshed descendants remain subject to authoritative revocation ancestry, distinct from an actor-history trail.",
      "C14_portability": "Independent adapter preserves supported authority and history semantics; unknown critical extensions fail closed with a recoverable explanation instead of silently broadening access."
    }
  },
  "human_study": {
    "status": "not_run",
    "execution_performed": false,
    "formative": {
      "participants": "6-8",
      "method": "Think-aloud tasks with synthetic data and varied technical experience; include relevant keyboard/assistive-technology needs without subgroup-power claims.",
      "tasks": [
        "inspect_offer",
        "acquire_without_grant",
        "approve_scope",
        "inspect_update",
        "invite_human",
        "revoke_agent",
        "recover_access"
      ]
    },
    "pilot": {
      "participants_planned": 12,
      "distinct_matched_tasks_per_person": 6,
      "total_task_episodes_planned": 72,
      "conditions": 2,
      "episodes_per_condition_per_person": 3,
      "design": "Counterbalanced within-person baseline/proposed comparison; balanced task variants and order; never repeat an identical task for a person.",
      "task_families": [
        "acquire_and_scope",
        "invite_human",
        "inspect_update",
        "revoke_and_explain",
        "transfer_without_memory_leak",
        "recover_and_reconstruct"
      ],
      "grading": "Independent task and consent scoring, blind to condition where practical.",
      "delayed_probe": "Optional seven-day receipt/reconstruction probe; report attrition and permit extension beyond week six.",
      "analysis": "Report participant/task clustering, denominators, uncertainty, order effects and failures. No pilot superiority or noninferiority claim.",
      "power_plan": "Undecided; preregister a later primary endpoint and sample size after pilot variability and meaningful effect size are established.",
      "stop_rule": "Pause for real-data exposure, participant distress or unresolved critical authority defect; record repairs before resuming."
    }
  },
  "six_week_relative_plan": {
    "status": "not_run",
    "execution_performed": false,
    "production_commitment": false,
    "week_1": "Freeze threat model, actor definitions, revocation boundary, synthetic corpus and independent expected decisions; every critical family needs positive/negative cases.",
    "weeks_2_3": "Build minimal reader, enforcement boundary and independent adapter; instrument instance/grant/memory lineage. Readiness may move later phases.",
    "week_4": "Execute conformance and compromised-key recovery; start formative sessions only after critical authority checks pass.",
    "weeks_5_6": "Refine notices, freeze pilot configuration and run bounded pilot if ready/recruited; report all failures and select later study scope, not a production launch."
  },
  "primary_sources": [
    {
      "id": "P1",
      "citation": "Mansour et al. (2016), A Demonstration of the Solid Platform for Social Web Applications, WWW Companion.",
      "doi": "10.1145/2872518.2890529",
      "url": "https://doi.org/10.1145/2872518.2890529",
      "type": "conference_demo",
      "use": "Portable owner-controlled personal stores are prior art."
    },
    {
      "id": "P2",
      "citation": "Crabtree et al. (2018), Building accountability into the Internet of Things, Journal of Reliable Intelligent Environments 4, 39-55.",
      "doi": "10.1007/s40860-018-0054-5",
      "url": "https://link.springer.com/article/10.1007/s40860-018-0054-5",
      "type": "peer_reviewed_journal",
      "use": "Databox app store, consent manifest, isolated apps and audit logs are prior art, not proof of this design."
    },
    {
      "id": "P3",
      "citation": "Vizgirda, Zhao and Goel (2024), SocialGenPod, WWW Companion, 1067-1070.",
      "doi": "10.1145/3589335.3651251",
      "url": "https://vidminas.github.io/publications/vizgirda-2024-socialgenpod/vizgirda-2024-socialgenpod.pdf",
      "type": "conference_demo",
      "use": "LLM/RAG-over-Pods prior art; copying retrieval providers remain trusted."
    },
    {
      "id": "P4",
      "citation": "Pang et al. (2019), Zanzibar, USENIX ATC, 33-46.",
      "url": "https://www.usenix.org/conference/atc19/presentation/pang",
      "type": "peer_reviewed_conference",
      "use": "ACL/content causal consistency supports stale-member fixtures; no transfer of performance claims."
    },
    {
      "id": "P5",
      "citation": "Myers and Liskov (2000), Protecting privacy using the decentralized label model, ACM TOSEM 9(4), 410-442.",
      "doi": "10.1145/363516.363526",
      "url": "https://www.cs.yale.edu/homes/dsc5/papers/iflow-tosem.pdf",
      "type": "peer_reviewed_journal_author_copy",
      "use": "Information-flow restrictions and authorized declassification; not a proof for arbitrary LLMs."
    },
    {
      "id": "P6",
      "citation": "Schaub et al. (2015), A Design Space for Effective Privacy Notices, SOUPS, 1-17.",
      "url": "https://www.usenix.org/conference/soups2015/proceedings/presentation/schaub",
      "type": "peer_reviewed_conference_systematization",
      "use": "Contextual notices inform the study; comprehension still needs measurement."
    },
    {
      "id": "P7",
      "citation": "Garcia (2017), Leaking privacy and shadow profiles in online social networks, Science Advances 3(8), e1701172.",
      "doi": "10.1126/sciadv.1701172",
      "url": "https://www.sg.ethz.ch/publications/2017/garcia2017leaking-privacy-and/e1701172.full1.pdf",
      "type": "peer_reviewed_journal",
      "use": "Historical Friendster inference about nonusers; not a current-platform accuracy claim."
    },
    {
      "id": "S1",
      "citation": "W3C Verifiable Credentials Data Model 2.0, Recommendation, 15 May 2025.",
      "url": "https://www.w3.org/TR/2025/REC-vc-data-model-2.0-20250515/",
      "type": "normative_standard_not_empirical_study",
      "use": "Issuer/holder/verifier distinction and data minimization."
    },
    {
      "id": "S2",
      "citation": "Jones et al. (2020), OAuth 2.0 Token Exchange, RFC 8693.",
      "url": "https://www.rfc-editor.org/rfc/rfc8693.html",
      "type": "ietf_standards_track_not_empirical_study",
      "use": "Explicit delegation; revocation propagation is not automatic."
    },
    {
      "id": "S3",
      "citation": "Fett et al. (2023), OAuth 2.0 Demonstrating Proof of Possession, RFC 9449.",
      "url": "https://www.rfc-editor.org/rfc/rfc9449.html",
      "type": "ietf_proposed_standard_not_empirical_study",
      "use": "Sender-constrained tokens; application scope/transaction checks still needed."
    },
    {
      "id": "S4",
      "citation": "Fett, Yasuda and Campbell (2025), Selective Disclosure for JSON Web Tokens, RFC 9901.",
      "url": "https://www.rfc-editor.org/rfc/rfc9901.html",
      "type": "ietf_proposed_standard_not_empirical_study",
      "use": "Selective disclosure and optional key binding; no blanket unlinkability claim."
    }
  ]
};
export const requestProfile = {
  "profile": "wrn.protected-request.http",
  "profile_version": "0.2",
  "profile_family": "WRN-PASSPORT-COEXISTENCE-0.2",
  "profile_status": "proposed_not_established_standard",
  "x-status": "design_only",
  "x-execution-enabled": false,
  "purpose": "Proposed request-binding and enforcement contract for humans, organizations, agent instances and services. This is a design document, not a verifier, authorization server, issued credential, signed request or security result.",
  "execution": {
    "enabled": false,
    "external_release_enabled": false,
    "physical_actuation_enabled": false,
    "issued_credentials": 0,
    "generated_keys": 0,
    "executed_security_tests": 0
  },
  "configuration": {
    "identity_provider": null,
    "authorization_server": null,
    "resource_servers": null,
    "trust_anchors": null,
    "permitted_issuers": null,
    "key_resolver": null,
    "key_store_or_signing_broker": null,
    "algorithm_allowlist": null,
    "oauth_library": null,
    "http_message_signature_library": null,
    "content_digest_library": null,
    "jcs_library": null,
    "passport_signature_envelope_profile": null,
    "grant_signature_envelope_profile": null,
    "action_schema_registry": null,
    "surface_approval_profile": null,
    "grant_registry": null,
    "revocation_service": null,
    "token_lifetime_seconds": null,
    "proof_acceptance_window_seconds": null,
    "operation_nonce_lifetime_seconds": null,
    "clock_skew_seconds": null,
    "maximum_status_age_seconds": null,
    "replay_and_idempotency_store": null,
    "resource_transaction_adapter": null,
    "output_and_egress_enforcer": null,
    "credentials": null,
    "spending_cap": null,
    "deployment_host": null,
    "rule": "Missing choices prohibit execution. Select maintained implementations of established standards; never construct a custom signature algorithm or treat the prose rules here as an implemented enforcement control."
  },
  "trust_separation": {
    "passport": "identity_and_issuer_claim_references",
    "commercial_entitlement": "permission_to_use_agent_product_or_service_only",
    "commissioned_instance": "distinct_runtime_principal_key_and_memory",
    "access_grant": "separately_approved_resource_authority",
    "human_authentication": "control_of_registered_authenticator",
    "owner_consent": "verified_approval_of_exact_grant_terms_or_action",
    "ledger_receipt": "evidence_about_recorded_events_not_permission",
    "validation": "Issuer trust, authentication, authorization, signature integrity, task outcome and current validity are independent checks. Imported claims of successful verification never replace recipient verification."
  },
  "transport": {
    "protocol": "HTTPS",
    "tls_required": true,
    "authenticated_resource_endpoint_required": true,
    "redirect_policy": "reject_unapproved_cross_origin_or_audience_redirects",
    "intermediary_policy": "Define the externally addressed URI and trusted proxy transformations. Never infer target authority from untrusted forwarded headers. Reject ambiguous routing or parsing; do not normalize signed fields ad hoc."
  },
  "oauth_and_dpop": {
    "specifications": [
      "RFC9700",
      "RFC9449",
      "RFC9396",
      "RFC8693"
    ],
    "authorization_scheme": "DPoP",
    "checks": [
      "Validate token issuer, intended resource audience, tenant, validity and granted authorization details.",
      "Use exactly one well-formed DPoP header; require typ dpop+jwt and an allowed asymmetric algorithm.",
      "Verify the proof with its public JWK; reject private key parameters and unacceptable algorithms.",
      "Match htm and the RFC9449-normalized htu; htu excludes query and fragment.",
      "Check iat freshness, required server nonce and jti replay policy.",
      "Recompute ath from the presented access token and match its key binding to cnf.jkt.",
      "Match the bound key to the live grant and commissioned actor; an arbitrary valid self-signature is insufficient."
    ],
    "limitations": [
      "DPoP is not independently client authentication or access control.",
      "DPoP does not protect the request body or general headers and excludes the URI query from htu.",
      "A compromised process able to invoke the signing key can generate valid proofs within its access.",
      "Token exchange does not inherently propagate parent-token revocation.",
      "Nested historical act claims are informational; authoritative grant lineage is checked separately."
    ]
  },
  "http_message_signature": {
    "specification": "RFC9421",
    "digest_specification": "RFC9530",
    "required": true,
    "required_covered_components": [
      "@method",
      "@target-uri",
      "content-digest",
      "content-type"
    ],
    "required_signature_parameters": [
      "created",
      "expires",
      "nonce",
      "keyid",
      "alg",
      "tag"
    ],
    "required_tag": "wrn-protected-request-0.2",
    "target_uri": "Cover the full HTTP target URI including query under RFC9421 rules. URI fragments are not HTTP request-target content and are rejected in configured/requested resource targets. Critical query values must agree with the signed business action; there is one defined parser per action.",
    "body_integrity": "Compute Content-Digest over the actual HTTP message content according to RFC9530, verify the signature covers that field, and independently recompute the received-content digest. Checking only the signature over a supplied digest is insufficient. Fix permitted content encodings.",
    "key_binding": "Resolve keyid through configured trust. Require the signature public key, DPoP public key, access-token cnf.jkt and grant bound_request_key to identify the same key. Require the correct request-signing purpose and live status. Refuse an unsupported mapping; never fetch arbitrary key URLs as trust roots.",
    "freshness": "created and expires are covered RFC9421 signature parameters, not ordinary HTTP headers. Check the configured time window and match nonce to the server-issued operation nonce and bound request context. Require body times to represent exact whole UTC seconds and match signature times; expiry cannot exceed the nonce, grant or token validity bounds.",
    "custody": "Keep signing credentials outside model context and generated code. A scoped broker must authorize what it signs. Key non-exportability alone does not stop malicious use through a permissive signing interface. A human client binds a separate request key after authentication; WebAuthn is not repurposed as a general HTTP signer."
  },
  "business_body": {
    "media_type": "application/json",
    "closed_schema_required": true,
    "unknown_critical_fields": "reject",
    "duplicate_json_members": "reject",
    "non_finite_or_non_IJSON_numbers": "reject",
    "fields": {
      "request_id": "namespaced_identifier",
      "idempotency_key": "opaque_operation_identifier",
      "operation_nonce": "server_issued_context_bound_value",
      "created_at": "timestamp",
      "expires_at": "timestamp",
      "canonical_action_digest": "algorithm_qualified_digest",
      "action": {
        "actor_principal_id": "authenticated_current_actor",
        "acting_on_behalf_of": "accountable_human_or_organization_principal",
        "agent_instance_id": "required_for_agents_otherwise_null",
        "authority_grant_ref": "exact_grant_content_digest",
        "policy_revision_digest": "exact_policy_revision",
        "intent_ref": "exact_intent_revision_when_work_related_otherwise_null",
        "resource": {
          "kind": "branch_or_sealed_node_or_data_compartment",
          "project_id": "required_for_project_resources_otherwise_null",
          "branch_id": "required_for_branch_operations_otherwise_null",
          "node_digest": "required_for_node_operations_otherwise_null",
          "sealed_submission_digest": "required_for_sealed_node_otherwise_null",
          "compartment_id": "required_for_personal_or_partitioned_data_otherwise_null",
          "resource_snapshot_digest": "required_for_compartment_selection_otherwise_null",
          "checkpoint_ref": "required_if_policy_requires_witnessed_state_otherwise_null",
          "expected_head_digest": "required_for_branch_operations_otherwise_null"
        },
        "operation": "registered_typed_action_permitted_by_the_exact_grant",
        "parameters_schema_ref": "pinned_trusted_schema_and_semantics",
        "parameters": "closed_typed_object_validated_against_parameters_schema_ref",
        "destination_principal_id": "exact_authorized_recipient_or_null_for_local_operations",
        "destination_uri": "exact_authorized_destination_or_null_for_local_operations",
        "output_policy_ref": "pinned_output_and_egress_policy",
        "maximum_cost": "explicit_bound_with_currency"
      },
      "surface_approval_ref": "exact_verified_approval_when_required_otherwise_null",
      "owner_consent_ref": "evidence_bound_to_grant_terms_or_canonical_action"
    },
    "action_digest": "Qualified SHA-256 or SHA-512 over UTF8(\"WRNPC0.2-ACTION\\n\") followed by RFC8785(action); the domain terminates with a literal LF. The action object excludes its own digest, signatures, surface_approval_ref and consent refs, preventing a circular approval hash. The HTTP signature binds the entire business body, including those approval references and request metadata.",
    "approval_binding": "Verify owner/delegator authority and that the approval permits this exact action digest or that the live grant's approved terms unambiguously cover it. Verify displayed material terms, recipient, cost and work revision. Authentication or agent-authored UI text alone never creates consent.",
    "legacy_compatibility": "Existing WRN0.1 surface decisions and command vocabularies are not silently reinterpreted as this profile. A separately pinned, reviewed adapter must map every material field and its digest convention, or verification fails. No such adapter is implemented by these files."
  },
  "verification_order": [
    {
      "id": "authenticate",
      "rule": "Validate transport, trusted token issuer, audience, actor identity and both request proofs."
    },
    {
      "id": "reconstruct",
      "rule": "Recompute wire Content-Digest and canonical action digest; reject parser and body/header mismatches."
    },
    {
      "id": "validate_grant",
      "rule": "Verify grant signature and terms digest, owner consent, issuer authority, bound key and current status."
    },
    {
      "id": "validate_lineage",
      "rule": "Verify every parent and ancestor, cycle freedom, depth, expiry and semantic narrowing under pinned policy."
    },
    {
      "id": "bind_context",
      "rule": "Match actor, accountable delegator, instance, audience, tenant, resource, head, action, parameters and destination."
    },
    {
      "id": "check_freshness",
      "rule": "Obtain sufficiently fresh key, passport, grant, ancestor and policy status; missing or unknown status denies new work."
    },
    {
      "id": "reserve_operation",
      "rule": "Atomically reserve the operation nonce, idempotency record and required cumulative budget under the authoritative scope."
    },
    {
      "id": "enforce_and_execute",
      "rule": "Recheck current grant status and expected resource revision immediately before the effect; enforce sandbox, egress and output limits."
    },
    {
      "id": "record_result",
      "rule": "Append decision and effect receipts; retain exact request commitments and relevant evidence under access controls."
    }
  ],
  "replay_idempotency_and_concurrency": {
    "distinct_identifiers": {
      "dpop_jti": "unique_HTTP_proof_identifier_checked_within_proof_window",
      "dpop_nonce": "nonce_supplied_by_OAuth_or_resource_server_under_RFC9449",
      "operation_nonce": "one_time_server_value_bound_to_WRN_actor_grant_action_and_expiry",
      "idempotency_key": "stable_identifier_for_one_business_operation_across_retries"
    },
    "atomicity": "All accepting replicas must share an authoritative atomic reservation or equivalent consistent mechanism. A local best-effort cache is insufficient for concurrent acceptance. Consume nonce together with durable operation reservation; a crash must leave a recoverable pending operation record.",
    "retries": "Use a fresh DPoP proof and operation nonce while retaining the same idempotency key and action digest. Return or reconcile the prior operation when identity and action match. Reject reuse of an idempotency key for a different actor, grant context or action. Never deduplicate only by prose.",
    "state_changes": "Compare expected_head_digest and policy/grant revision at the actual resource transition. Append a new immutable node and authorized pointer transition; do not overwrite submitted content. Concurrent conflicting heads fail CAS.",
    "uncertain_external_effect": "Record unknown when an external request may have taken effect before a timeout. Reconcile observed state before retrying. No global exactly-once guarantee is claimed for arbitrary external services.",
    "revocation_race": "Serialize authorization and local mutation where possible. For external services, define an explicit dispatch boundary and reconciliation policy; revocation cannot undo an effect already committed outside that boundary."
  },
  "receipts_and_privacy": {
    "record_separately": [
      "authentication",
      "signature_integrity",
      "authorization",
      "execution_status",
      "observed_effect",
      "current_validity"
    ],
    "permitted_receipt_fields": [
      "request_and_action_commitments",
      "issuer_actor_delegator_and_instance_references_under_access_control",
      "grant_and_policy_revisions_used",
      "selected_resource_and_expected_new_heads",
      "authorization_reason_and_effect_evidence_references"
    ],
    "never_log": [
      "raw_access_tokens",
      "refresh_tokens",
      "private_keys",
      "recovery_secrets",
      "biometric_material"
    ],
    "public_checkpoint_policy": "Public log inclusion should commit to encrypted signed-core bytes or an explicitly privacy-reviewed public record. Do not publish sensitive plaintext hashes, identity graphs, resource paths or grants by default. Inclusion proves membership relative to the trusted checkpoint, not claim truth, consent, completeness, current permission or plaintext erasure."
  },
  "validation_limits": [
    "These YAML rules describe intended checks and require an implementation.",
    "JSON Schema validates selected shapes only; format checks require an enabled implementation.",
    "Digest, signature, key-custody, replay, authorization and revocation behavior have not been tested here.",
    "Identity proofing and deployment assurance levels remain unselected.",
    "Labels, intended purpose and output restrictions require enforceable resource-specific semantics.",
    "Permissions cannot retract plaintext already disclosed to an authorized recipient.",
    "A compromised owner authenticator, signing broker or trusted resource service remains a material threat."
  ],
  "primary_references": [
    "https://www.rfc-editor.org/rfc/rfc9449.html",
    "https://www.rfc-editor.org/rfc/rfc9396.html",
    "https://www.rfc-editor.org/rfc/rfc8693.html",
    "https://www.rfc-editor.org/rfc/rfc9700.html",
    "https://www.rfc-editor.org/rfc/rfc9421.html",
    "https://www.rfc-editor.org/rfc/rfc9530.html",
    "https://www.rfc-editor.org/rfc/rfc8785.html",
    "https://www.w3.org/TR/webauthn-3/",
    "https://www.w3.org/TR/vc-data-model-2.0/",
    "https://www.w3.org/TR/did-core/"
  ]
};
export const securityTests = {
  "profile": "WRN-PASSPORT-COEXISTENCE-0.2",
  "profile_status": "proposed_not_established_standard",
  "artifact_status": "design_only",
  "execution_enabled": false,
  "status": "not_run",
  "results": null,
  "tests_executed": 0,
  "operational_security_claims_supported": false,
  "scope": "Proposed enforcement fixtures, not executable tests or evidence of protection.",
  "harness_contract": {
    "implementation": null,
    "clock": "2026-11-05T12:00:00Z",
    "clock_skew_seconds": 0,
    "services": "local_simulators_only",
    "real_credentials_data_payments_and_external_actions": "prohibited",
    "symbols": "O=owner; A=commissioned agent instance; B=unrelated principal; S1/S2=distinct complete seals; P1/P2=policy revisions; G1=owner grant; C1/C2=checkpoints. These are labels, not hashes or signatures. A future harness must generate actual canonical bytes, test keys, nonces, encryption and proofs before running cases.",
    "deterministic_material": "test_seed_and_fixture_bytes_to_be_frozen_before_implementation",
    "test_material_limit": "deterministic_keys_and_nonces_are_for_local_fixtures_only",
    "common_setup": "O controls a private branch; A is granted only named seal S1, specified operations and artifact V1 until 12:05Z. Receiver trust, witness quorum and retention policy are explicit test configurations. No fixture may adopt trust from its input record.",
    "assertions": "expected_behaviors_only_not_observed_results"
  },
  "fixtures": [
    {
      "id": "SEC-01",
      "status": "not_run",
      "name": "Complete authorized submission and read",
      "arrange": "O grants A submission and read scopes; exact code/data bytes and all required proofs exist.",
      "stimulus": "Finalize the manifest and request an authorized S1 read within the grant interval.",
      "expected": "Admit the byte-bound seal and permit that read; do not infer independent acceptance or execution permission.",
      "enforce": [
        "schema",
        "ingestion",
        "signature_verifier",
        "policy_kernel",
        "storage"
      ]
    },
    {
      "id": "SEC-02",
      "status": "not_run",
      "name": "Missing or mutable submitted bytes",
      "arrange": "A declares required code/data in its scope.",
      "stimulus": "Separately omit a blob, change one byte, duplicate an artifact ID, or replace its versioned locator with latest or a URL.",
      "expected": "Reject completeness/admission; keep candidate pending or failed with a precise cause. A restricted partial export cannot masquerade as a complete submission.",
      "enforce": [
        "schema",
        "manifest_validator",
        "storage"
      ]
    },
    {
      "id": "SEC-03",
      "status": "not_run",
      "name": "Request body binding and nonce replay",
      "arrange": "A valid proof binds action, S1, destination, policy revision and an unused nonce.",
      "stimulus": "Change body/destination while retaining method and URI; separately resend an already consumed nonce.",
      "expected": "Reject tampering and replay with zero additional effect. A fresh valid request is permitted once; DPoP alone is not treated as body integrity.",
      "enforce": [
        "request_verifier",
        "replay_store",
        "policy_kernel",
        "effect_adapter"
      ]
    },
    {
      "id": "SEC-04",
      "status": "not_run",
      "name": "Revoked delegation and stale cache",
      "arrange": "G1 was valid; O revokes G1 or an ancestor before the protected operation.",
      "stimulus": "Use an old cached allow decision and an otherwise valid signature.",
      "expected": "Deny key release and new operation after the required current check; record freshness unknown when that check is unavailable.",
      "enforce": [
        "authorization_graph",
        "revocation_service",
        "key_broker",
        "tool_gateway"
      ]
    },
    {
      "id": "SEC-05",
      "status": "not_run",
      "name": "Stale head or policy revision",
      "arrange": "A prepared approval for S1/P1; the branch or policy now points to S2/P2.",
      "stimulus": "Attempt the old transition against expected S1/P1.",
      "expected": "Reject compare-and-swap or revision mismatch; no head movement. New review and an authorized matching transition can advance once.",
      "enforce": [
        "policy_kernel",
        "transactional_head_store"
      ]
    },
    {
      "id": "SEC-06",
      "status": "not_run",
      "name": "Cross-branch references do not grant access",
      "arrange": "S1 references a confidential object on another branch; G1 excludes that object.",
      "stimulus": "Follow the reference or request its hidden path, metadata, search snippet or key.",
      "expected": "Deny disclosure through every route without confirming protected existence to an unauthorized requester.",
      "enforce": [
        "object_gateway",
        "discovery_search",
        "key_broker",
        "export_adapter"
      ]
    },
    {
      "id": "SEC-07",
      "status": "not_run",
      "name": "Named seal excludes history and future",
      "arrange": "G1 names S1 only; S0 is an ancestor and S2 a later version.",
      "stimulus": "Request S0 history/diff and S2 through the same branch alias; then request S1.",
      "expected": "Deny S0/S2 and associated discovery; permit the explicitly authorized S1 read. Branch membership does not expand G1.",
      "enforce": [
        "authorization_graph",
        "history_api",
        "discovery_search"
      ]
    },
    {
      "id": "SEC-08",
      "status": "not_run",
      "name": "Derived data and shared memory leak",
      "arrange": "A derives a summary, embedding and cache entry from restricted S1; another tenant has no S1 grant.",
      "stimulus": "Retrieve derivatives from the other tenant or export them as supposedly harmless metadata.",
      "expected": "Preserve restrictions and deny release. Permit only an independently authorized exact-output declassification; no implicit shared-agent memory.",
      "enforce": [
        "lineage_labels",
        "retrieval",
        "memory_store",
        "export_policy"
      ]
    },
    {
      "id": "SEC-09",
      "status": "not_run",
      "name": "Agent update and permission drift",
      "arrange": "G1 binds A to artifact V1; an update V2 requests more tools or changes code.",
      "stimulus": "Reuse G1 for V2, then repeat under a fresh owner-approved grant bound to V2.",
      "expected": "Deny old-grant use; allow only the newly granted V2 scope after required evaluation. Publisher signature and paid licence cannot expand scope.",
      "enforce": [
        "commissioning",
        "artifact_binding",
        "policy_kernel"
      ]
    },
    {
      "id": "SEC-10",
      "status": "not_run",
      "name": "Agent transfer ends old grants",
      "arrange": "Ownership/assignment transfers under an explicit policy; old A retains cached tokens and private task memory.",
      "stimulus": "Old A requests access; the new holder presents a purchase receipt and asks for prior-owner memory.",
      "expected": "Deny both; revoke the old lineage and commission a separate instance. Permit a new minimal grant only for the new owner's authorized objects.",
      "enforce": [
        "lifecycle",
        "revocation_service",
        "session_store",
        "memory_store"
      ]
    },
    {
      "id": "SEC-11",
      "status": "not_run",
      "name": "Forked history and rollback distinction",
      "arrange": "Receiver pins C2; a log returns an inconsistent fork or an older C1, even with a valid log signature.",
      "stimulus": "Present these as current; separately append an authorized later event selecting an older work seal.",
      "expected": "Reject fork/stale-current reliance under witness and freshness policy; accept a valid explicit rollback event without rewinding the audit log.",
      "enforce": [
        "checkpoint_verifier",
        "witness_policy",
        "monotonic_client_state",
        "head_store"
      ]
    },
    {
      "id": "SEC-12",
      "status": "not_run",
      "name": "Restore must recover usable bytes",
      "arrange": "Encrypted backup and manifests exist; first retain the approved recovery keys, then remove required key material in a separate case.",
      "stimulus": "Restore, decrypt and compare code/data digests under current recovery authorization.",
      "expected": "Positive case reconstructs exactly; missing-key case reports unavailable/unrecoverable, never successful recovery from ciphertext presence alone. Revoked grants stay revoked.",
      "enforce": [
        "backup_restore",
        "key_recovery",
        "digest_verifier",
        "current_policy"
      ]
    },
    {
      "id": "SEC-13",
      "status": "not_run",
      "name": "Retention, disposal and explicit omissions",
      "arrange": "A payload has an active retention restriction; a separate case has expired retention and approved disposal.",
      "stimulus": "Request early deletion; later perform authorized disposal and export history.",
      "expected": "Deny early disposal; record later deletion and missing payload explicitly. Do not rewrite signed history or claim complete reconstruction from the partial export.",
      "enforce": [
        "retention_adapter",
        "key_lifecycle",
        "lifecycle_log",
        "export_validator"
      ]
    },
    {
      "id": "SEC-14",
      "status": "not_run",
      "name": "Inclusion, identity and licence are not authority",
      "arrange": "B has a valid passport, agent purchase receipt and genuine ledger inclusion proof but no resource grant.",
      "stimulus": "Request S1 decryption or export; then supply an explicitly scoped owner grant in a separate case.",
      "expected": "Deny the ungranted request. Permit only the newly authorized operation; admission proof never supplies trust roots or data authority.",
      "enforce": [
        "receiver_trust",
        "entitlement_service",
        "policy_kernel",
        "key_broker"
      ]
    }
  ],
  "validation_boundary": {
    "schema_and_yaml_parse_checks": "structural_only",
    "cryptographic_verification": "not_run",
    "authorization_and_isolation_tests": "not_run",
    "witness_consensus_and_fault_tests": "not_run",
    "retention_and_restore_tests": "not_run",
    "actual_pass_count": null,
    "actual_fail_count": null
  }
};
export const sourceRegister = {
  "proposal": "WRN Passport and Coexistence",
  "profile_version": "0.2",
  "status": "design_not_implemented",
  "accessed_on": "2026-11-05",
  "sources": [
    {
      "id": "S1",
      "author_year": "W3C 2025",
      "title": "Verifiable Credentials Data Model 2.0",
      "url": "https://www.w3.org/TR/vc-data-model-2.0/",
      "doi": null,
      "scope_and_limit": "Recommendation 15 May 2025. Credentials express issuer claims; verification does not establish truth or resource authorization."
    },
    {
      "id": "S2",
      "author_year": "W3C 2022",
      "title": "Decentralized Identifiers v1.0",
      "url": "https://www.w3.org/TR/did-core/",
      "doi": null,
      "scope_and_limit": "Recommendation 19 July 2022. Identifier and verification-method framework; identity proofing, rotation and recovery depend on the chosen method and trust arrangements."
    },
    {
      "id": "S3",
      "author_year": "W3C 2026",
      "title": "Web Authentication Level 3",
      "url": "https://www.w3.org/TR/webauthn-3/",
      "doi": null,
      "scope_and_limit": "Recommendation 25 August 2026. Public-key authentication; a successful ceremony alone does not prove understanding of business terms."
    },
    {
      "id": "S4",
      "author_year": "Temoshok et al 2025",
      "title": "NIST SP 800-63-4 Digital Identity Guidelines",
      "url": "https://csrc.nist.gov/pubs/sp/800/63/4/final",
      "doi": "10.6028/NIST.SP.800-63-4",
      "scope_and_limit": "Separates identity proofing, authentication and federation. Assurance choices require an application-specific assessment."
    },
    {
      "id": "S5",
      "author_year": "Fett et al 2023",
      "title": "OAuth 2.0 Demonstrating Proof of Possession RFC 9449",
      "url": "https://www.rfc-editor.org/rfc/rfc9449.html",
      "doi": "10.17487/RFC9449",
      "scope_and_limit": "Sender-constrained tokens; DPoP does not cover the request body or general headers and does not itself decide authorization."
    },
    {
      "id": "S6",
      "author_year": "Backman Richer and Sporny 2024",
      "title": "HTTP Message Signatures RFC 9421",
      "url": "https://www.rfc-editor.org/rfc/rfc9421.html",
      "doi": "10.17487/RFC9421",
      "scope_and_limit": "Signatures over selected HTTP components. Applications must choose and enforce the required coverage and replay controls."
    },
    {
      "id": "S7",
      "author_year": "Polli and Pardue 2024",
      "title": "Digest Fields RFC 9530",
      "url": "https://www.rfc-editor.org/rfc/rfc9530.html",
      "doi": "10.17487/RFC9530",
      "scope_and_limit": "Content-Digest and Repr-Digest. A digest requires recomputation and authenticated binding; it is not an access grant."
    },
    {
      "id": "S8",
      "author_year": "Jones et al 2020",
      "title": "OAuth 2.0 Token Exchange RFC 8693",
      "url": "https://www.rfc-editor.org/rfc/rfc8693.html",
      "doi": "10.17487/RFC8693",
      "scope_and_limit": "Delegation and impersonation are distinct. Revocation propagation is not an automatic property of token exchange."
    },
    {
      "id": "S9",
      "author_year": "Lodderstedt Richer and Campbell 2023",
      "title": "OAuth 2.0 Rich Authorization Requests RFC 9396",
      "url": "https://www.rfc-editor.org/rfc/rfc9396.html",
      "doi": "10.17487/RFC9396",
      "scope_and_limit": "Fine-grained authorization_details. WRN would need a defined application profile and permission-containment semantics."
    },
    {
      "id": "S10",
      "author_year": "Laurie Messeri and Stradling 2021",
      "title": "Certificate Transparency Version 2.0 RFC 9162",
      "url": "https://www.rfc-editor.org/rfc/rfc9162.html",
      "doi": "10.17487/RFC9162",
      "scope_and_limit": "Experimental RFC. Merkle inclusion and consistency concepts; the specification explicitly identifies inconsistent log views as a limitation."
    },
    {
      "id": "S11",
      "author_year": "C2SP community",
      "title": "Transparency Log Witness Protocol",
      "url": "https://c2sp.org/tlog-witness@v1.1.0",
      "doi": null,
      "scope_and_limit": "Version 1.1.0 observed. Witness cosignatures support checkpoint consistency; trust, independence and availability remain assumptions."
    },
    {
      "id": "S12",
      "author_year": "Amazon Web Services documentation",
      "title": "Locking objects with Object Lock",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html",
      "doi": null,
      "scope_and_limit": "WORM protection applies to specified object versions; new versions and delete markers are still possible. Product example, not a required provider."
    },
    {
      "id": "S13",
      "author_year": "IPFS documentation",
      "title": "Privacy and encryption",
      "url": "https://docs.ipfs.tech/concepts/privacy-and-encryption/",
      "doi": null,
      "scope_and_limit": "Public IPFS exposes metadata; content requires application encryption for confidentiality. A content identifier is not an authorization credential."
    },
    {
      "id": "S14",
      "author_year": "IPFS documentation",
      "title": "Persistence",
      "url": "https://docs.ipfs.tech/concepts/persistence/",
      "doi": null,
      "scope_and_limit": "Availability requires retention, pinning and storage arrangements. Content addressing does not promise perpetual availability."
    },
    {
      "id": "S15",
      "author_year": "Hyperledger Fabric documentation",
      "title": "Private Data",
      "url": "https://hyperledger-fabric.readthedocs.io/en/latest/private-data-arch.html",
      "doi": null,
      "scope_and_limit": "Collection membership and distribution require explicit design; adding members can expose historical collection data. A ledger alone does not implement personal sharing rules."
    },
    {
      "id": "S16",
      "author_year": "Fett Yasuda and Campbell 2025",
      "title": "Selective Disclosure for JSON Web Tokens RFC 9901",
      "url": "https://www.rfc-editor.org/rfc/rfc9901.html",
      "doi": "10.17487/RFC9901",
      "scope_and_limit": "Standards Track RFC, November 2025. Selective claim disclosure does not by itself ensure unlinkability, truth or fresh authorization."
    },
    {
      "id": "S17",
      "author_year": "Amazon Web Services documentation",
      "title": "Object Lock considerations",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-managing.html",
      "doi": null,
      "scope_and_limit": "Object Lock does not prevent loss or deletion of encryption keys; retained ciphertext can become unreadable. Recovery must protect decryption material separately."
    },
    {
      "id": "P1",
      "author_year": "Crabtree et al 2018",
      "title": "Building accountability into the Internet of Things The IoT Databox model",
      "url": "https://link.springer.com/article/10.1007/s40860-018-0054-5",
      "doi": "10.1007/s40860-018-0054-5",
      "scope_and_limit": "Journal of Reliable Intelligent Environments 4, 39\u201355. Prior art for personal stores, app manifests, fine-grained consent, isolated processing and audit."
    },
    {
      "id": "P2",
      "author_year": "Vizgirda Zhao and Goel 2024",
      "title": "SocialGenPod Privacy Friendly Generative AI Social Web Applications with Decentralised Personal Data Stores",
      "url": "https://www.cs.ox.ac.uk/publications/publication16241-abstract.html",
      "doi": "10.1145/3589335.3651251",
      "scope_and_limit": "WWW 2024 Companion, 1067\u20131070. Prototype combining Solid personal stores, interchangeable LLMs and retrieval over permitted private documents."
    },
    {
      "id": "P3",
      "author_year": "Pang et al 2019",
      "title": "Zanzibar Googles Consistent Global Authorization System",
      "url": "https://www.usenix.org/conference/atc19/presentation/pang",
      "doi": null,
      "scope_and_limit": "USENIX ATC 2019, 33\u201346. Authorization/content causal consistency. Reported Google performance must not be assigned to this proposed system."
    },
    {
      "id": "P4",
      "author_year": "Wust and Gervais 2018",
      "title": "Do you Need a Blockchain",
      "url": "https://doi.org/10.1109/CVCBT.2018.00011",
      "doi": "10.1109/CVCBT.2018.00011",
      "scope_and_limit": "CVCBT 2018, 45\u201354. Method for deciding between conventional storage, permissioned and permissionless systems based on trust and writers."
    },
    {
      "id": "P5",
      "author_year": "Myers and Liskov 2000",
      "title": "Protecting privacy using the decentralized label model",
      "url": "https://www.cs.yale.edu/homes/dsc5/papers/iflow-tosem.pdf",
      "doi": "10.1145/363516.363526",
      "scope_and_limit": "ACM TOSEM 9(4), 410\u2013442. Information-flow labels and owner-controlled declassification; not a proof for unrestricted language-model outputs."
    },
    {
      "id": "T1",
      "author_year": "Ford Hutchinson 2005",
      "title": "Securing FTP with TLS RFC 4217",
      "url": "https://www.rfc-editor.org/info/rfc4217/",
      "doi": "10.17487/RFC4217",
      "scope_and_limit": "Explains FTPS terminology. A secure transfer protocol is distinct from a personal identity or decentralized work platform."
    },
    {
      "id": "T2",
      "author_year": "Entriken Shirley Evans and Sachs 2018",
      "title": "ERC 721 Non Fungible Token Standard",
      "url": "https://eips.ethereum.org/EIPS/eip-721",
      "doi": null,
      "scope_and_limit": "Tracks and transfers token ownership. A separate application policy must determine any relationship between a token and data access."
    }
  ]
};
export const passportSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:wrn:proposed:passport:0.2",
  "title": "Proposed WRN Passport 0.2: typed identity and credential references",
  "description": "Design-only proposed WRN Passport 0.2 extension to WRN 0.1. This schema is not an established standard, credential issuer, cryptographic implementation or access-control runtime.",
  "x-status": "design_only",
  "x-execution-enabled": false,
  "x-profile-family": "WRN-PASSPORT-COEXISTENCE-0.2",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "content_digest": {
      "$ref": "#/$defs/digest"
    },
    "canonicalization": {
      "const": "RFC8785-June2020"
    },
    "digest_domain": {
      "const": "WRNPC0.2-PASSPORT\n"
    },
    "content": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "profile": {
          "const": "wrn.passport"
        },
        "profile_version": {
          "const": "0.2"
        },
        "profile_status": {
          "const": "proposed_not_established_standard"
        },
        "passport_id": {
          "$ref": "#/$defs/identifier"
        },
        "revision": {
          "type": "integer",
          "minimum": 1
        },
        "created_at": {
          "type": "string",
          "format": "date-time"
        },
        "supersedes_ref": {
          "anyOf": [
            {
              "$ref": "#/$defs/digest"
            },
            {
              "type": "null"
            }
          ]
        },
        "subject": {
          "$ref": "#/$defs/subject"
        },
        "controllers": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "controller_principal_id": {
                "$ref": "#/$defs/identifier"
              },
              "control_evidence_refs": {
                "type": "array",
                "items": {
                  "$ref": "#/$defs/evidence_ref"
                },
                "minItems": 1,
                "uniqueItems": true
              }
            },
            "required": [
              "controller_principal_id",
              "control_evidence_refs"
            ]
          },
          "minItems": 1,
          "uniqueItems": true
        },
        "verification_methods": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/verification_method"
          },
          "minItems": 0,
          "uniqueItems": true
        },
        "issuer_assertions": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/issuer_assertion"
          },
          "minItems": 0,
          "uniqueItems": true
        },
        "assurance": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "identity_proofing_basis": {
              "enum": [
                "unassessed",
                "self_asserted",
                "issuer_evidence",
                "independent_verification"
              ]
            },
            "assurance_policy_ref": {
              "anyOf": [
                {
                  "$ref": "#/$defs/digest"
                },
                {
                  "type": "null"
                }
              ]
            },
            "evidence_refs": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/evidence_ref"
              },
              "minItems": 0,
              "uniqueItems": true
            },
            "current_authentication": {
              "const": "not_asserted_by_passport"
            },
            "claim_truth": {
              "const": "not_established_by_signature_alone"
            }
          },
          "required": [
            "identity_proofing_basis",
            "assurance_policy_ref",
            "evidence_refs",
            "current_authentication",
            "claim_truth"
          ]
        },
        "status_snapshot": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "state": {
              "enum": [
                "unassessed",
                "active",
                "suspended",
                "revoked",
                "expired",
                "superseded",
                "retired",
                "unknown"
              ]
            },
            "as_of": {
              "type": "string",
              "format": "date-time"
            },
            "status_authority_principal_id": {
              "$ref": "#/$defs/identifier"
            },
            "status_ref": {
              "$ref": "#/$defs/evidence_ref"
            },
            "freshness_policy_ref": {
              "$ref": "#/$defs/digest"
            },
            "current_validity_effect": {
              "const": "historical_snapshot_recheck_before_use"
            }
          },
          "required": [
            "state",
            "as_of",
            "status_authority_principal_id",
            "status_ref",
            "freshness_policy_ref",
            "current_validity_effect"
          ]
        },
        "recovery_and_rotation": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "recovery_policy_ref": {
              "anyOf": [
                {
                  "$ref": "#/$defs/digest"
                },
                {
                  "type": "null"
                }
              ]
            },
            "recovery_authority_principal_ids": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/identifier"
              },
              "minItems": 0,
              "uniqueItems": true
            },
            "key_rotation_event_refs": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/evidence_ref"
              },
              "minItems": 0,
              "uniqueItems": true
            },
            "retired_verification_method_ids": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/identifier"
              },
              "minItems": 0,
              "uniqueItems": true
            },
            "private_key_transfer_allowed": {
              "const": false
            }
          },
          "required": [
            "recovery_policy_ref",
            "recovery_authority_principal_ids",
            "key_rotation_event_refs",
            "retired_verification_method_ids",
            "private_key_transfer_allowed"
          ]
        },
        "privacy": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "disclosure_class": {
              "enum": [
                "public_minimal",
                "restricted"
              ]
            },
            "compartment_policy_ref": {
              "anyOf": [
                {
                  "$ref": "#/$defs/digest"
                },
                {
                  "type": "null"
                }
              ]
            },
            "raw_secrets_in_passport": {
              "const": false
            },
            "referenced_payloads_may_be_restricted": {
              "const": true
            }
          },
          "required": [
            "disclosure_class",
            "compartment_policy_ref",
            "raw_secrets_in_passport",
            "referenced_payloads_may_be_restricted"
          ]
        },
        "authority_effect": {
          "const": "identity_and_claim_references_only_no_automatic_authorization"
        }
      },
      "required": [
        "profile",
        "profile_version",
        "profile_status",
        "passport_id",
        "revision",
        "created_at",
        "supersedes_ref",
        "subject",
        "controllers",
        "verification_methods",
        "issuer_assertions",
        "assurance",
        "status_snapshot",
        "recovery_and_rotation",
        "privacy",
        "authority_effect"
      ]
    },
    "detached_signature_refs": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/evidence_ref"
      },
      "minItems": 0,
      "uniqueItems": true
    },
    "recipient_trust": {
      "const": "externally_configured_never_derived_from_this_record"
    }
  },
  "required": [
    "content_digest",
    "canonicalization",
    "digest_domain",
    "content",
    "detached_signature_refs",
    "recipient_trust"
  ],
  "$defs": {
    "identifier": {
      "type": "string",
      "format": "uri",
      "minLength": 1,
      "maxLength": 1024,
      "description": "Namespaced logical identifier. Resolving it never establishes trust or grants access."
    },
    "digest": {
      "type": "string",
      "pattern": "^(sha256:[0-9a-f]{64}|sha512:[0-9a-f]{128})$"
    },
    "evidence_ref": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "content_digest": {
          "$ref": "#/$defs/digest"
        },
        "availability": {
          "enum": [
            "included",
            "retrievable",
            "restricted",
            "missing",
            "deleted"
          ]
        },
        "locator": {
          "anyOf": [
            {
              "$ref": "#/$defs/identifier"
            },
            {
              "type": "null"
            }
          ]
        }
      },
      "required": [
        "content_digest",
        "availability",
        "locator"
      ],
      "description": "Digest of an identified evidence object; format, authenticity, availability and relevance require independent checks. A locator is not authority to fetch."
    },
    "subject": {
      "oneOf": [
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "principal_id": {
              "$ref": "#/$defs/identifier"
            },
            "principal_type": {
              "const": "human"
            },
            "display_name": {
              "type": "string",
              "minLength": 1,
              "maxLength": 256
            },
            "pairwise_scope_ref": {
              "anyOf": [
                {
                  "$ref": "#/$defs/digest"
                },
                {
                  "type": "null"
                }
              ]
            }
          },
          "required": [
            "principal_id",
            "principal_type",
            "pairwise_scope_ref"
          ]
        },
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "principal_id": {
              "$ref": "#/$defs/identifier"
            },
            "principal_type": {
              "const": "organization"
            },
            "display_name": {
              "type": "string",
              "minLength": 1,
              "maxLength": 256
            },
            "pairwise_scope_ref": {
              "anyOf": [
                {
                  "$ref": "#/$defs/digest"
                },
                {
                  "type": "null"
                }
              ]
            }
          },
          "required": [
            "principal_id",
            "principal_type",
            "pairwise_scope_ref"
          ]
        },
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "principal_id": {
              "$ref": "#/$defs/identifier"
            },
            "principal_type": {
              "const": "agent"
            },
            "display_name": {
              "type": "string",
              "minLength": 1,
              "maxLength": 256
            },
            "pairwise_scope_ref": {
              "anyOf": [
                {
                  "$ref": "#/$defs/digest"
                },
                {
                  "type": "null"
                }
              ]
            },
            "agent_instance_id": {
              "$ref": "#/$defs/identifier"
            },
            "owner_principal_id": {
              "$ref": "#/$defs/identifier"
            },
            "agent_artifact_digest": {
              "$ref": "#/$defs/digest"
            },
            "commissioning_record_ref": {
              "$ref": "#/$defs/evidence_ref"
            },
            "entitlement_ref": {
              "anyOf": [
                {
                  "$ref": "#/$defs/evidence_ref"
                },
                {
                  "type": "null"
                }
              ]
            }
          },
          "required": [
            "principal_id",
            "principal_type",
            "pairwise_scope_ref",
            "agent_instance_id",
            "owner_principal_id",
            "agent_artifact_digest",
            "commissioning_record_ref",
            "entitlement_ref"
          ]
        },
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "principal_id": {
              "$ref": "#/$defs/identifier"
            },
            "principal_type": {
              "const": "service"
            },
            "display_name": {
              "type": "string",
              "minLength": 1,
              "maxLength": 256
            },
            "pairwise_scope_ref": {
              "anyOf": [
                {
                  "$ref": "#/$defs/digest"
                },
                {
                  "type": "null"
                }
              ]
            },
            "service_provider_principal_id": {
              "$ref": "#/$defs/identifier"
            }
          },
          "required": [
            "principal_id",
            "principal_type",
            "pairwise_scope_ref",
            "service_provider_principal_id"
          ]
        }
      ],
      "description": "Type is a declared role, not proof of legal identity, personhood, ownership or authority. Agent instance identity differs from its publisher, package and service entitlement."
    },
    "verification_method": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "verification_method_id": {
          "$ref": "#/$defs/identifier"
        },
        "controller_principal_id": {
          "$ref": "#/$defs/identifier"
        },
        "purpose": {
          "enum": [
            "authentication",
            "workload_authentication",
            "request_signing",
            "credential_assertion",
            "encryption_key_agreement"
          ]
        },
        "public_material_ref": {
          "$ref": "#/$defs/evidence_ref"
        },
        "public_material_format": {
          "enum": [
            "JWK",
            "COSE_Key",
            "X509_certificate",
            "WebAuthn_credential_record",
            "DID_verification_method"
          ]
        },
        "valid_from": {
          "type": "string",
          "format": "date-time"
        },
        "valid_until": {
          "anyOf": [
            {
              "type": "string",
              "format": "date-time"
            },
            {
              "type": "null"
            }
          ]
        },
        "status_ref": {
          "$ref": "#/$defs/evidence_ref"
        }
      },
      "required": [
        "verification_method_id",
        "controller_principal_id",
        "purpose",
        "public_material_ref",
        "public_material_format",
        "valid_from",
        "valid_until",
        "status_ref"
      ],
      "description": "References only public verification material. No private keys, bearer credentials, passkey secrets or recovery secrets. Inspect referenced payloads at runtime for private key parameters; schema shape cannot establish that they are public."
    },
    "issuer_assertion": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "issuer_principal_id": {
          "$ref": "#/$defs/identifier"
        },
        "subject_principal_id": {
          "$ref": "#/$defs/identifier"
        },
        "credential_ref": {
          "$ref": "#/$defs/evidence_ref"
        },
        "claim_schema_ref": {
          "$ref": "#/$defs/digest"
        },
        "status_ref": {
          "anyOf": [
            {
              "$ref": "#/$defs/evidence_ref"
            },
            {
              "type": "null"
            }
          ]
        },
        "authority_effect": {
          "const": "none_without_independent_resource_policy"
        }
      },
      "required": [
        "issuer_principal_id",
        "subject_principal_id",
        "credential_ref",
        "claim_schema_ref",
        "status_ref",
        "authority_effect"
      ],
      "description": "Issuer claims may be represented by VC 2.0 using a pinned securing mechanism. A holder need not be the credential subject. Issuer trust, proof, status and claim relevance are independently evaluated."
    }
  },
  "$comment": "content_digest = qualified SHA-256 or SHA-512 over UTF8(digest_domain) || RFC8785(content). Domain ends with a literal LF. Digest excludes outer content_digest, canonicalization metadata, signature references and trust marker; the profile fixes the permitted encoding/domain. Signatures use a separately pinned established envelope/profile and must bind the digest algorithm, domain and content. Empty or unverified signatures cannot authorize use. Do not invent a signature algorithm. JSON Schema cannot verify hashes, signatures, trust, dates against current time or live authority.",
  "x-runtime-invariants": [
    "Resolve trust anchors and permitted issuer/key profiles from recipient configuration, never from self-declared passport fields or a ledger inclusion code.",
    "Validate unique principal/key identifiers, public-only key material, signature/key-purpose bindings, time ordering and status freshness independently.",
    "An agent package, publisher, acquisition entitlement, commissioned instance and owner are different entities; acquiring an agent grants no resource permission.",
    "Commission or reassign with fresh instance identity, keys and separately authorized memory; old credentials and grants do not transfer.",
    "Identity proofing, authenticator control, credential authenticity, current authority and task correctness are separate decisions.",
    "A WebAuthn assertion authenticates a relying-party ceremony; its relationship to exact displayed grant/action terms is an application-level binding that needs a trusted confirmation surface.",
    "Rotation or recovery preserves historical references but does not automatically preserve current grants; record explicit policy decisions."
  ]
};
export const accessGrantSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:wrn:proposed:access-grant:0.2",
  "title": "Proposed WRN Passport 0.2: scoped access and delegation grant",
  "description": "Design-only proposed WRN Passport 0.2 extension to WRN 0.1. This schema is not an established standard, credential issuer, cryptographic implementation or access-control runtime.",
  "x-status": "design_only",
  "x-execution-enabled": false,
  "x-profile-family": "WRN-PASSPORT-COEXISTENCE-0.2",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "content_digest": {
      "$ref": "#/$defs/digest"
    },
    "canonicalization": {
      "const": "RFC8785-June2020"
    },
    "digest_domain": {
      "const": "WRNPC0.2-GRANT\n"
    },
    "content": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "profile": {
          "const": "wrn.access-grant"
        },
        "profile_version": {
          "const": "0.2"
        },
        "profile_status": {
          "const": "proposed_not_established_standard"
        },
        "created_at": {
          "type": "string",
          "format": "date-time"
        },
        "supersedes_ref": {
          "anyOf": [
            {
              "$ref": "#/$defs/digest"
            },
            {
              "type": "null"
            }
          ]
        },
        "terms": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "grant_id": {
              "$ref": "#/$defs/identifier"
            },
            "revision": {
              "type": "integer",
              "minimum": 1
            },
            "issuer_principal_id": {
              "$ref": "#/$defs/identifier"
            },
            "issuer_authority_evidence_ref": {
              "$ref": "#/$defs/evidence_ref"
            },
            "owner_principal_id": {
              "$ref": "#/$defs/identifier"
            },
            "grantee_principal_id": {
              "$ref": "#/$defs/identifier"
            },
            "grantee_passport_ref": {
              "$ref": "#/$defs/digest"
            },
            "agent_instance_id": {
              "anyOf": [
                {
                  "$ref": "#/$defs/identifier"
                },
                {
                  "type": "null"
                }
              ]
            },
            "acting_on_behalf_of": {
              "$ref": "#/$defs/identifier"
            },
            "audiences": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/audience"
              },
              "minItems": 1,
              "uniqueItems": true
            },
            "permissions": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/permission"
              },
              "minItems": 1,
              "uniqueItems": true
            },
            "policy_revision_digest": {
              "$ref": "#/$defs/digest"
            },
            "permission_semantics_ref": {
              "$ref": "#/$defs/digest"
            },
            "intent_ref": {
              "anyOf": [
                {
                  "$ref": "#/$defs/digest"
                },
                {
                  "type": "null"
                }
              ]
            },
            "entitlement_ref": {
              "anyOf": [
                {
                  "$ref": "#/$defs/evidence_ref"
                },
                {
                  "type": "null"
                }
              ]
            },
            "constraints": {
              "$ref": "#/$defs/constraints"
            },
            "not_before": {
              "type": "string",
              "format": "date-time"
            },
            "expires_at": {
              "type": "string",
              "format": "date-time"
            },
            "max_token_lifetime_seconds": {
              "type": "integer",
              "minimum": 1
            },
            "freshness": {
              "$ref": "#/$defs/freshness"
            },
            "delegation": {
              "$ref": "#/$defs/delegation"
            },
            "revocation": {
              "$ref": "#/$defs/revocation"
            },
            "bound_request_key": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "verification_method_id": {
                  "$ref": "#/$defs/identifier"
                },
                "jwk_sha256_thumbprint": {
                  "type": "string",
                  "pattern": "^[A-Za-z0-9_-]{43}$"
                }
              },
              "required": [
                "verification_method_id",
                "jwk_sha256_thumbprint"
              ]
            }
          },
          "required": [
            "grant_id",
            "revision",
            "issuer_principal_id",
            "issuer_authority_evidence_ref",
            "owner_principal_id",
            "grantee_principal_id",
            "grantee_passport_ref",
            "agent_instance_id",
            "acting_on_behalf_of",
            "audiences",
            "permissions",
            "policy_revision_digest",
            "permission_semantics_ref",
            "intent_ref",
            "entitlement_ref",
            "constraints",
            "not_before",
            "expires_at",
            "max_token_lifetime_seconds",
            "freshness",
            "delegation",
            "revocation",
            "bound_request_key"
          ]
        },
        "terms_digest": {
          "$ref": "#/$defs/digest"
        },
        "terms_digest_rule": {
          "const": "UTF8(WRNPC0.2-GRANT-TERMS followed by LF) || RFC8785(terms)"
        },
        "owner_consent": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "basis": {
              "enum": [
                "human_surface_decision",
                "organization_owner_policy",
                "delegated_owner_approval"
              ]
            },
            "approver_principal_id": {
              "$ref": "#/$defs/identifier"
            },
            "approval_authority_evidence_refs": {
              "type": "array",
              "items": {
                "$ref": "#/$defs/evidence_ref"
              },
              "minItems": 1,
              "uniqueItems": true
            },
            "owner_consent_record_ref": {
              "$ref": "#/$defs/evidence_ref"
            },
            "surface_approval_ref": {
              "anyOf": [
                {
                  "$ref": "#/$defs/digest"
                },
                {
                  "type": "null"
                }
              ]
            },
            "approved_terms_digest": {
              "$ref": "#/$defs/digest"
            },
            "approved_at": {
              "type": "string",
              "format": "date-time"
            },
            "ui_declaration_effect": {
              "const": "not_authority_until_independently_verified"
            }
          },
          "required": [
            "basis",
            "approver_principal_id",
            "approval_authority_evidence_refs",
            "owner_consent_record_ref",
            "surface_approval_ref",
            "approved_terms_digest",
            "approved_at",
            "ui_declaration_effect"
          ],
          "allOf": [
            {
              "if": {
                "properties": {
                  "basis": {
                    "const": "human_surface_decision"
                  }
                },
                "required": [
                  "basis"
                ]
              },
              "then": {
                "properties": {
                  "surface_approval_ref": {
                    "$ref": "#/$defs/digest"
                  }
                }
              }
            }
          ]
        },
        "status_snapshot": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "state": {
              "enum": [
                "draft",
                "active",
                "suspended",
                "revoked",
                "expired",
                "superseded",
                "unknown"
              ]
            },
            "as_of": {
              "type": "string",
              "format": "date-time"
            },
            "status_ref": {
              "$ref": "#/$defs/evidence_ref"
            },
            "authority_effect": {
              "const": "historical_snapshot_not_live_authorization"
            }
          },
          "required": [
            "state",
            "as_of",
            "status_ref",
            "authority_effect"
          ]
        },
        "entitlement_authority_effect": {
          "const": "none_without_this_separately_approved_grant"
        },
        "execution_authority_rule": {
          "const": "recipient_enforces_live_policy_grant_and_exact_request"
        }
      },
      "required": [
        "profile",
        "profile_version",
        "profile_status",
        "created_at",
        "supersedes_ref",
        "terms",
        "terms_digest",
        "terms_digest_rule",
        "owner_consent",
        "status_snapshot",
        "entitlement_authority_effect",
        "execution_authority_rule"
      ]
    },
    "detached_signature_refs": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/evidence_ref"
      },
      "minItems": 0,
      "uniqueItems": true
    },
    "recipient_trust": {
      "const": "externally_configured_never_derived_from_this_record"
    }
  },
  "required": [
    "content_digest",
    "canonicalization",
    "digest_domain",
    "content",
    "detached_signature_refs",
    "recipient_trust"
  ],
  "$defs": {
    "identifier": {
      "type": "string",
      "format": "uri",
      "minLength": 1,
      "maxLength": 1024,
      "description": "Namespaced logical identifier. Resolving it never establishes trust or grants access."
    },
    "digest": {
      "type": "string",
      "pattern": "^(sha256:[0-9a-f]{64}|sha512:[0-9a-f]{128})$"
    },
    "evidence_ref": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "content_digest": {
          "$ref": "#/$defs/digest"
        },
        "availability": {
          "enum": [
            "included",
            "retrievable",
            "restricted",
            "missing",
            "deleted"
          ]
        },
        "locator": {
          "anyOf": [
            {
              "$ref": "#/$defs/identifier"
            },
            {
              "type": "null"
            }
          ]
        }
      },
      "required": [
        "content_digest",
        "availability",
        "locator"
      ],
      "description": "Digest of an identified evidence object; format, authenticity, availability and relevance require independent checks. A locator is not authority to fetch."
    },
    "resource_selector": {
      "oneOf": [
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "resource_kind": {
              "const": "branch"
            },
            "project_id": {
              "$ref": "#/$defs/identifier"
            },
            "branch_id": {
              "$ref": "#/$defs/identifier"
            },
            "expected_head_digest": {
              "$ref": "#/$defs/digest"
            }
          },
          "required": [
            "resource_kind",
            "project_id",
            "branch_id",
            "expected_head_digest"
          ],
          "description": "Exact branch and approved head. Future or descendant heads are not implicitly included."
        },
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "resource_kind": {
              "const": "sealed_node"
            },
            "project_id": {
              "$ref": "#/$defs/identifier"
            },
            "node_digest": {
              "$ref": "#/$defs/digest"
            },
            "sealed_submission_digest": {
              "$ref": "#/$defs/digest"
            }
          },
          "required": [
            "resource_kind",
            "project_id",
            "node_digest",
            "sealed_submission_digest"
          ],
          "description": "Exact immutable node within the declared sealed submission."
        },
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "resource_kind": {
              "const": "data_compartment"
            },
            "compartment_id": {
              "$ref": "#/$defs/identifier"
            },
            "resource_snapshot_digest": {
              "$ref": "#/$defs/digest"
            },
            "data_labels": {
              "type": "array",
              "items": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "label": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 128
                  },
                  "value": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 256
                  }
                },
                "required": [
                  "label",
                  "value"
                ]
              },
              "minItems": 0,
              "uniqueItems": true
            },
            "label_policy_digest": {
              "$ref": "#/$defs/digest"
            }
          },
          "required": [
            "resource_kind",
            "compartment_id",
            "resource_snapshot_digest",
            "data_labels",
            "label_policy_digest"
          ],
          "description": "Exact resource snapshot plus pinned label semantics. Labels alone do not grant access to future data or imply enforcement."
        }
      ]
    },
    "permission": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "resource": {
          "$ref": "#/$defs/resource_selector"
        },
        "allowed_actions": {
          "type": "array",
          "items": {
            "enum": [
              "read_metadata",
              "read_payload",
              "run_sandbox",
              "create_branch",
              "submit_candidate",
              "advance_branch",
              "evaluate_candidate",
              "accept_candidate",
              "challenge_decision",
              "export_payload"
            ]
          },
          "minItems": 1,
          "uniqueItems": true
        }
      },
      "required": [
        "resource",
        "allowed_actions"
      ],
      "description": "Actions apply only to this selector, avoiding an implicit cross-product across unrelated resources."
    },
    "audience": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "audience_principal_id": {
          "$ref": "#/$defs/identifier"
        },
        "resource_server_uri": {
          "$ref": "#/$defs/identifier"
        },
        "tenant_id": {
          "$ref": "#/$defs/identifier"
        }
      },
      "required": [
        "audience_principal_id",
        "resource_server_uri",
        "tenant_id"
      ]
    },
    "delegation": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "parent_grant_ref": {
          "anyOf": [
            {
              "$ref": "#/$defs/digest"
            },
            {
              "type": "null"
            }
          ]
        },
        "ancestor_grant_refs": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/digest"
          },
          "minItems": 0,
          "uniqueItems": true
        },
        "lineage_id": {
          "$ref": "#/$defs/identifier"
        },
        "depth": {
          "type": "integer",
          "minimum": 0
        },
        "max_depth": {
          "type": "integer",
          "minimum": 0
        },
        "actor_history_refs": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/evidence_ref"
          },
          "minItems": 0,
          "uniqueItems": true
        },
        "parent_authority_rule": {
          "const": "validated_grants_not_informational_actor_history"
        },
        "attenuation_rule": {
          "const": "no_expansion_under_pinned_permission_semantics"
        }
      },
      "required": [
        "parent_grant_ref",
        "ancestor_grant_refs",
        "lineage_id",
        "depth",
        "max_depth",
        "actor_history_refs",
        "parent_authority_rule",
        "attenuation_rule"
      ],
      "description": "Root depth is zero. Each child increments depth; every ancestor limit remains binding. RFC 8693 nested act history is informational, not an independent chain of authority."
    },
    "constraints": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "execution_policy_ref": {
          "$ref": "#/$defs/digest"
        },
        "allowed_destination_principal_ids": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/identifier"
          },
          "minItems": 0,
          "uniqueItems": true
        },
        "allowed_network_origins": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/identifier"
          },
          "minItems": 0,
          "uniqueItems": true
        },
        "output_handling": {
          "enum": [
            "no_egress",
            "same_compartment",
            "listed_destinations"
          ]
        },
        "output_policy_ref": {
          "$ref": "#/$defs/digest"
        },
        "training_use_allowed": {
          "type": "boolean"
        },
        "persistent_memory_write_allowed": {
          "type": "boolean"
        },
        "max_operations": {
          "type": "integer",
          "minimum": 0
        },
        "max_output_bytes": {
          "type": "integer",
          "minimum": 0
        },
        "max_compute_seconds": {
          "type": "integer",
          "minimum": 0
        },
        "max_cost": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "amount": {
              "type": "string",
              "pattern": "^(0|[1-9][0-9]*)(\\.[0-9]+)?$"
            },
            "currency": {
              "type": "string",
              "pattern": "^[A-Z]{3}$"
            }
          },
          "required": [
            "amount",
            "currency"
          ]
        },
        "external_release_allowed": {
          "const": false
        },
        "physical_actuation_allowed": {
          "const": false
        }
      },
      "required": [
        "execution_policy_ref",
        "allowed_destination_principal_ids",
        "allowed_network_origins",
        "output_handling",
        "output_policy_ref",
        "training_use_allowed",
        "persistent_memory_write_allowed",
        "max_operations",
        "max_output_bytes",
        "max_compute_seconds",
        "max_cost",
        "external_release_allowed",
        "physical_actuation_allowed"
      ],
      "description": "Constraints require named enforcement controls, resource accounting and output inspection. Declaring a purpose or prohibition does not technically prevent a recipient from copying received plaintext."
    },
    "freshness": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "max_status_age_seconds": {
          "type": "integer",
          "minimum": 0
        },
        "max_policy_age_seconds": {
          "type": "integer",
          "minimum": 0
        },
        "allowed_clock_skew_seconds": {
          "type": "integer",
          "minimum": 0
        },
        "on_unknown_or_unavailable": {
          "const": "deny_new_operation"
        },
        "check_immediately_before_effect": {
          "const": true
        }
      },
      "required": [
        "max_status_age_seconds",
        "max_policy_age_seconds",
        "allowed_clock_skew_seconds",
        "on_unknown_or_unavailable",
        "check_immediately_before_effect"
      ]
    },
    "revocation": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authority_principal_id": {
          "$ref": "#/$defs/identifier"
        },
        "status_service_uri": {
          "$ref": "#/$defs/identifier"
        },
        "status_policy_ref": {
          "$ref": "#/$defs/digest"
        },
        "epoch": {
          "type": "integer",
          "minimum": 0
        },
        "cascade": {
          "const": "all_descendant_grants"
        },
        "propagation_rule": {
          "const": "explicit_registry_checks_not_implied_by_token_exchange"
        },
        "already_disclosed_plaintext": {
          "const": "cannot_be_recalled_by_revocation"
        }
      },
      "required": [
        "authority_principal_id",
        "status_service_uri",
        "status_policy_ref",
        "epoch",
        "cascade",
        "propagation_rule",
        "already_disclosed_plaintext"
      ]
    }
  },
  "$comment": "content_digest = qualified SHA-256 or SHA-512 over UTF8(digest_domain) || RFC8785(content). Domain ends with a literal LF. Digest excludes outer content_digest, canonicalization metadata, signature references and trust marker; the profile fixes the permitted encoding/domain. Signatures use a separately pinned established envelope/profile and must bind the digest algorithm, domain and content. Empty or unverified signatures cannot authorize use. Do not invent a signature algorithm. JSON Schema cannot verify hashes, signatures, trust, dates against current time or live authority.",
  "x-runtime-invariants": [
    "terms_digest covers the complete terms object. Owner consent binds that digest, avoiding a circular consent/grant self-hash. Its approver must have externally established owner authority.",
    "Recompute digests and validate detached signatures, live grant/key status, issuer authority and the actual token claims; a schema-valid or logged grant alone authorizes nothing.",
    "Grant not_before < expires_at; child expiry and permissions stay within all ancestors; current depth <= every applicable max_depth; reject cycles and missing or stale ancestors.",
    "Use semantic containment defined by permission_semantics_ref; arbitrary JSON/string comparison cannot establish permission attenuation.",
    "Root parent_grant_ref is null and depth=0; child parent is non-null and depth=parent.depth+1; ordered ancestor references are complete and unique.",
    "Revoking any ancestor or bound key invalidates future descendant use according to the authoritative registry. Token exchange alone does not establish that propagation.",
    "No implicit project, tenant, label, branch-descendant, destination or tool expansion. Pin selection snapshots and compare branch head atomically before mutation.",
    "Track cumulative operations, bytes, time and cost atomically across concurrent workers. Output, egress, training and memory restrictions need enforced technical controls; policy text is not such a control.",
    "Match grantee, acting_on_behalf_of, owner, agent instance and bound request key against trusted identity/delegation evidence. Commercial entitlement never substitutes for this check.",
    "Unknown or unsupported critical policy semantics, signatures, status freshness or resource context fail closed. Executable enforcement is outside this schema."
  ]
};
export const agentRelationshipSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.invalid/wrn-passport/0.2/agent-relationship.schema.json",
  "x-status": "design_only",
  "x-execution-enabled": false,
  "x-profile-status": "proposed_not_established_standard",
  "title": "Proposed WRN Passport 0.2 human\u2013agent relationship",
  "description": "Design-only record for a separately identified agent operating for an owner. Acquisition, identity, data authority and representation are distinct. It does not purchase, commission, deploy or authorize a real agent.",
  "$comment": "JSON Schema validates shape and fixed policy declarations only. Signatures, actor bindings, current revocation state, manifest semantics, effective permissions, isolation and enforcement require independent runtime checks. URI references are not access credentials. No key material belongs in this record.",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "protocol",
    "status",
    "execution_performed",
    "relationship_id",
    "owner",
    "operator",
    "publisher",
    "acquisition",
    "registered_artifact",
    "commissioned_instance",
    "memory",
    "delegation",
    "update_policy",
    "lifecycle_policy"
  ],
  "properties": {
    "protocol": {
      "const": "WRN-PASSPORT-COEXISTENCE-0.2"
    },
    "status": {
      "const": "design_not_implemented"
    },
    "execution_performed": {
      "const": false
    },
    "relationship_id": {
      "$ref": "#/$defs/ref"
    },
    "owner": {
      "$ref": "#/$defs/humanOrOrganization",
      "description": "Controller of this relationship; ownership of this record does not confer rights to every person mentioned in its data."
    },
    "operator": {
      "$ref": "#/$defs/principal",
      "description": "Party operating the instance. May differ from its owner and publisher. Its operational role does not imply access to owner data."
    },
    "publisher": {
      "$ref": "#/$defs/humanOrOrganization",
      "description": "Party publishing the artifact. Publisher provenance is distinct from artifact correctness and data-access authority."
    },
    "acquisition": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "mode",
        "entitlement_ref",
        "implies_data_access",
        "implies_owner_impersonation",
        "cost_terms_ref"
      ],
      "properties": {
        "mode": {
          "enum": [
            "licence",
            "subscription",
            "lease",
            "invitation"
          ]
        },
        "entitlement_ref": {
          "$ref": "#/$defs/ref"
        },
        "cost_terms_ref": {
          "$ref": "#/$defs/ref",
          "description": "Reviewable price, metering, budget limits and termination terms, including an explicit zero-cost agreement where applicable."
        },
        "implies_data_access": {
          "const": false
        },
        "implies_owner_impersonation": {
          "const": false
        },
        "catalog_offer_ref": {
          "$ref": "#/$defs/ref"
        }
      }
    },
    "registered_artifact": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "artifact_id",
        "manifest_ref",
        "agent_artifact_digest",
        "immutable_manifest_required",
        "provenance_refs",
        "inspection_fields",
        "verification_status"
      ],
      "properties": {
        "artifact_id": {
          "$ref": "#/$defs/ref"
        },
        "manifest_ref": {
          "$ref": "#/$defs/ref"
        },
        "agent_artifact_digest": {
          "$ref": "#/$defs/digest"
        },
        "immutable_manifest_required": {
          "const": true
        },
        "provenance_refs": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/ref"
          },
          "uniqueItems": true
        },
        "inspection_fields": {
          "const": [
            "publisher",
            "artifact_version",
            "capabilities",
            "models_and_providers",
            "data_recipients",
            "execution_locations",
            "memory_and_retention",
            "outputs_and_destinations",
            "cost_and_budget",
            "known_limits",
            "evidence_status"
          ]
        },
        "verification_status": {
          "const": "not_run"
        }
      }
    },
    "commissioned_instance": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "principal",
        "agent_instance_id",
        "instance_key_ref",
        "fresh_identity_required",
        "reuse_owner_private_key",
        "representation",
        "human_identity_substitution",
        "commissioning_status"
      ],
      "properties": {
        "principal": {
          "$ref": "#/$defs/agentPrincipal"
        },
        "agent_instance_id": {
          "$ref": "#/$defs/ref",
          "description": "Fresh commissioned instance identifier; runtime must bind it to the principal, key, artifact and grants."
        },
        "instance_key_ref": {
          "$ref": "#/$defs/ref",
          "description": "Reference for a future instance verification key; this design creates no key. Key possession and binding must be verified separately."
        },
        "fresh_identity_required": {
          "const": true
        },
        "reuse_owner_private_key": {
          "const": false
        },
        "representation": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "role",
            "disclosure",
            "agent_label",
            "assent_from_inference"
          ],
          "properties": {
            "role": {
              "enum": [
                "assistant",
                "worker",
                "representative"
              ]
            },
            "agent_label": {
              "type": "string",
              "minLength": 1,
              "maxLength": 160,
              "description": "Human-readable label visibly identifying the acting party as an AI agent."
            },
            "disclosure": {
              "const": "always_identify_ai_actor"
            },
            "assent_from_inference": {
              "const": "prohibited"
            },
            "represented_principal_ref": {
              "$ref": "#/$defs/ref"
            }
          },
          "allOf": [
            {
              "if": {
                "properties": {
                  "role": {
                    "const": "representative"
                  }
                }
              },
              "then": {
                "required": [
                  "represented_principal_ref"
                ]
              }
            }
          ]
        },
        "human_identity_substitution": {
          "const": "prohibited"
        },
        "commissioning_status": {
          "const": "not_run"
        }
      }
    },
    "memory": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "namespaces",
        "partition_by",
        "cross_owner_reuse",
        "read_before_model_input",
        "derived_output_rule",
        "training_requires_separate_grant",
        "isolation_verification_status"
      ],
      "properties": {
        "namespaces": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/$defs/memoryNamespace"
          }
        },
        "partition_by": {
          "const": [
            "owner_principal_id",
            "relationship_id",
            "scope_id"
          ]
        },
        "cross_owner_reuse": {
          "const": "prohibited_without_separate_joint_scope_grant"
        },
        "read_before_model_input": {
          "const": "authorize_each_source_at_current_required_policy_version"
        },
        "derived_output_rule": {
          "const": "retain_all_source_restrictions_unless_authorized_declassification"
        },
        "training_requires_separate_grant": {
          "const": true
        },
        "isolation_verification_status": {
          "const": "not_run"
        }
      }
    },
    "delegation": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "grant_refs",
        "authority_source",
        "actor_chain_required",
        "authority_chain_required",
        "actor_history_is_authority_chain",
        "attenuation_required",
        "implicit_redelegation",
        "required_bounds",
        "receipt_is_bearer_secret",
        "revocation_lineage_required",
        "verification_status"
      ],
      "properties": {
        "grant_refs": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/signedGrantRef"
          },
          "uniqueItems": true,
          "description": "May be empty after acquisition. Protected operations require a separately verified, live grant. References alone grant nothing."
        },
        "authority_source": {
          "const": "explicit_owner_approval_or_existing_bounded_delegation"
        },
        "actor_chain_required": {
          "const": true
        },
        "authority_chain_required": {
          "const": true
        },
        "actor_history_is_authority_chain": {
          "const": false
        },
        "attenuation_required": {
          "const": true
        },
        "implicit_redelegation": {
          "const": false
        },
        "required_bounds": {
          "const": [
            "owner_principal_id",
            "agent_instance_id",
            "agent_artifact_digest",
            "resource_and_branch_version_selector",
            "actions",
            "audience",
            "declared_purpose",
            "output_destinations",
            "expiry",
            "budget",
            "memory_scope",
            "redelegation",
            "revocation_epoch"
          ]
        },
        "receipt_is_bearer_secret": {
          "const": false
        },
        "revocation_lineage_required": {
          "const": true
        },
        "verification_status": {
          "const": "not_run"
        }
      }
    },
    "update_policy": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "bind_grant_to_manifest_digest",
        "compare_fields",
        "widening_rule",
        "activation_rule",
        "approval_refs",
        "verification_status"
      ],
      "properties": {
        "bind_grant_to_manifest_digest": {
          "const": true
        },
        "compare_fields": {
          "const": [
            "capabilities",
            "models_and_providers",
            "data_recipients",
            "execution_locations",
            "memory_and_retention",
            "outputs_and_destinations",
            "cost_and_budget",
            "delegation_policy"
          ]
        },
        "widening_rule": {
          "const": "new_owner_approval_required_before_activation"
        },
        "activation_rule": {
          "const": "block_until_manifest_and_current_grant_checks_pass"
        },
        "approval_refs": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/ref"
          },
          "uniqueItems": true
        },
        "verification_status": {
          "const": "not_run"
        }
      }
    },
    "lifecycle_policy": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "journey",
        "pause",
        "revoke",
        "retire",
        "reassign",
        "access_review_surface"
      ],
      "properties": {
        "journey": {
          "const": [
            "acquire_entitlement",
            "inspect_artifact_and_terms",
            "commission_fresh_instance",
            "approve_bounded_grant",
            "collaborate",
            "pause_revoke_retire_or_reassign"
          ]
        },
        "pause": {
          "const": "block_new_protected_operations_and_check_inflight_cancellation_policy"
        },
        "revoke": {
          "const": "revoke_grant_and_dependent_delegations_at_defined_online_barrier"
        },
        "retire": {
          "const": "revoke_instance_grants_stop_new_jobs_apply_retention_and_record_receipt"
        },
        "reassign": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "revoke_old_grants",
            "fresh_relationship_required",
            "fresh_instance_key_required",
            "automatic_memory_transfer",
            "transfer_authority"
          ],
          "properties": {
            "revoke_old_grants": {
              "const": true
            },
            "fresh_relationship_required": {
              "const": true
            },
            "fresh_instance_key_required": {
              "const": true
            },
            "automatic_memory_transfer": {
              "const": false
            },
            "transfer_authority": {
              "const": "separate_export_and_import_grants_from_all_required_controllers"
            }
          }
        },
        "access_review_surface": {
          "const": "persistent_accessible_inspect_pause_revoke_and_receipt_view"
        }
      }
    }
  },
  "$defs": {
    "ref": {
      "type": "string",
      "format": "uri",
      "minLength": 1
    },
    "digest": {
      "type": "string",
      "pattern": "^(sha256:[0-9a-f]{64}|sha512:[0-9a-f]{128})$"
    },
    "humanOrOrganization": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "principal_id",
        "principal_type",
        "display_name"
      ],
      "properties": {
        "principal_id": {
          "$ref": "#/$defs/ref"
        },
        "principal_type": {
          "enum": [
            "human",
            "organization"
          ]
        },
        "display_name": {
          "type": "string",
          "minLength": 1,
          "maxLength": 160
        }
      }
    },
    "agentPrincipal": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "principal_id",
        "principal_type",
        "display_name"
      ],
      "properties": {
        "principal_id": {
          "$ref": "#/$defs/ref"
        },
        "principal_type": {
          "const": "agent"
        },
        "display_name": {
          "type": "string",
          "minLength": 1,
          "maxLength": 160
        }
      }
    },
    "servicePrincipal": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "principal_id",
        "principal_type",
        "display_name"
      ],
      "properties": {
        "principal_id": {
          "$ref": "#/$defs/ref"
        },
        "principal_type": {
          "const": "service"
        },
        "display_name": {
          "type": "string",
          "minLength": 1,
          "maxLength": 160
        }
      }
    },
    "principal": {
      "oneOf": [
        {
          "$ref": "#/$defs/humanOrOrganization"
        },
        {
          "$ref": "#/$defs/agentPrincipal"
        },
        {
          "$ref": "#/$defs/servicePrincipal"
        }
      ]
    },
    "memoryNamespace": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "namespace_id",
        "owner_principal_id",
        "relationship_id",
        "scope_ref",
        "source_branch_refs",
        "retention_policy_ref"
      ],
      "properties": {
        "namespace_id": {
          "$ref": "#/$defs/ref"
        },
        "owner_principal_id": {
          "$ref": "#/$defs/ref"
        },
        "relationship_id": {
          "$ref": "#/$defs/ref"
        },
        "scope_ref": {
          "$ref": "#/$defs/ref"
        },
        "source_branch_refs": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/ref"
          },
          "uniqueItems": true
        },
        "retention_policy_ref": {
          "$ref": "#/$defs/ref"
        }
      },
      "description": "Runtime must bind owner_principal_id and relationship_id to this relationship, enforce scope in every retrieval/cache/log path, and prevent silent cross-owner reuse. A namespace name alone proves no isolation."
    },
    "signedGrantRef": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "authority_grant_ref",
        "signed_envelope_ref",
        "content_digest",
        "root_authority_ref"
      ],
      "properties": {
        "authority_grant_ref": {
          "$ref": "#/$defs/ref"
        },
        "signed_envelope_ref": {
          "$ref": "#/$defs/ref"
        },
        "content_digest": {
          "$ref": "#/$defs/digest"
        },
        "root_authority_ref": {
          "$ref": "#/$defs/ref"
        }
      },
      "description": "Signature validation and current owner/agent/key/manifest/resource/action/audience bindings are mandatory external checks. Token exchange must not hide revocation ancestry."
    }
  }
};
export const sealedSubmissionSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:wrn:passport-coexistence:0.2:sealed-submission",
  "title": "Proposed WRN Passport 0.2 sealed submission and branch transition",
  "description": "Design contract, not an implemented protocol or established standard. This private authorized representation describes immutable submitted bytes and append-only transitions. Schema validity does not establish signature validity, authority, completeness, storage retention, inclusion, freshness, or correctness.",
  "x-status": "design_only",
  "x-profile-status": "proposed_not_established_standard",
  "x-execution-enabled": false,
  "type": "object",
  "additionalProperties": false,
  "required": [
    "profile",
    "content",
    "content_digest",
    "digest_scope",
    "detached_signature_refs",
    "encrypted_core",
    "checkpoint_receipts"
  ],
  "properties": {
    "profile": {
      "const": "WRN-PASSPORT-COEXISTENCE-0.2"
    },
    "content": {
      "oneOf": [
        {
          "$ref": "#/$defs/seal_content"
        },
        {
          "$ref": "#/$defs/branch_transition_content"
        }
      ]
    },
    "content_digest": {
      "$ref": "#/$defs/digest"
    },
    "digest_scope": {
      "const": "H(UTF8('WRNPC0.2-RECORD\\n') || RFC8785(content)); H is the algorithm named by content_digest; excludes outer digest, signatures, encrypted_core and checkpoint_receipts"
    },
    "detached_signature_refs": {
      "type": "array",
      "minItems": 1,
      "uniqueItems": true,
      "items": {
        "$ref": "#/$defs/digest"
      },
      "description": "Resolve and verify detached signatures under independently provisioned receiver trust. Each must bind this content digest and its domain/profile; no signature reference grants authority."
    },
    "encrypted_core": {
      "$ref": "#/$defs/encrypted_core"
    },
    "checkpoint_receipts": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/checkpoint_receipt"
      }
    }
  },
  "$defs": {
    "digest": {
      "type": "string",
      "pattern": "^(sha256:[0-9a-f]{64}|sha512:[0-9a-f]{128})$"
    },
    "identifier": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "utc_time": {
      "type": "string",
      "format": "date-time",
      "pattern": "Z$"
    },
    "digest_list": {
      "type": "array",
      "uniqueItems": true,
      "items": {
        "$ref": "#/$defs/digest"
      }
    },
    "immutable_locator": {
      "description": "A locator identifies a declared immutable storage version; it is not proof of immutability or availability. Resolve only through an authorized storage adapter and compare actual bytes. A floating URL, branch name, latest tag or object key without version is insufficient.",
      "oneOf": [
        {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "kind",
            "store_id",
            "object_key",
            "version_id"
          ],
          "properties": {
            "kind": {
              "const": "object_version"
            },
            "store_id": {
              "$ref": "#/$defs/identifier"
            },
            "object_key": {
              "type": "string",
              "minLength": 1,
              "maxLength": 2048
            },
            "version_id": {
              "type": "string",
              "minLength": 1,
              "maxLength": 1024
            }
          }
        },
        {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "kind",
            "store_id",
            "object_digest"
          ],
          "properties": {
            "kind": {
              "const": "content_address"
            },
            "store_id": {
              "$ref": "#/$defs/identifier"
            },
            "object_digest": {
              "$ref": "#/$defs/digest"
            }
          }
        },
        {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "kind",
            "bundle_digest",
            "entry_id"
          ],
          "properties": {
            "kind": {
              "const": "included_bundle_entry"
            },
            "bundle_digest": {
              "$ref": "#/$defs/digest"
            },
            "entry_id": {
              "$ref": "#/$defs/identifier"
            }
          }
        }
      ]
    },
    "encrypted_core": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "core_encoding",
        "byte_representation",
        "stored_byte_digest",
        "stored_byte_length",
        "immutable_locator",
        "key_envelope_ref",
        "encryption_profile_ref",
        "public_disclosure"
      ],
      "properties": {
        "core_encoding": {
          "const": "AEAD encryption of RFC8785({profile,content,content_digest,digest_scope,detached_signature_refs}); excludes encrypted_core and checkpoint_receipts"
        },
        "byte_representation": {
          "const": "aead_ciphertext"
        },
        "stored_byte_digest": {
          "$ref": "#/$defs/digest"
        },
        "stored_byte_length": {
          "type": "integer",
          "minimum": 1
        },
        "immutable_locator": {
          "$ref": "#/$defs/immutable_locator"
        },
        "key_envelope_ref": {
          "$ref": "#/$defs/digest"
        },
        "encryption_profile_ref": {
          "$ref": "#/$defs/digest",
          "description": "Must resolve to an owner-approved interoperable AEAD/key-management profile. Algorithm, nonces, associated data and key wrapping are not implemented by this schema."
        },
        "public_disclosure": {
          "const": "ciphertext_commitment_only_no_plaintext_hash_names_or_personal_identity"
        }
      }
    },
    "checkpoint_receipt": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "log_id",
        "checkpoint_ref",
        "tree_size",
        "logged_ciphertext_digest",
        "inclusion_proof_ref",
        "witness_cosignature_refs",
        "verification_status"
      ],
      "properties": {
        "log_id": {
          "$ref": "#/$defs/identifier"
        },
        "checkpoint_ref": {
          "$ref": "#/$defs/digest"
        },
        "tree_size": {
          "type": "integer",
          "minimum": 1
        },
        "logged_ciphertext_digest": {
          "$ref": "#/$defs/digest",
          "description": "Must equal encrypted_core.stored_byte_digest; the log profile separately defines Merkle leaf encoding and domain separation."
        },
        "inclusion_proof_ref": {
          "$ref": "#/$defs/digest"
        },
        "witness_cosignature_refs": {
          "$ref": "#/$defs/digest_list"
        },
        "verification_status": {
          "const": "requires_receiver_verification",
          "description": "Imported receipt assertions never self-authorize. The receiver supplies trusted log/witness keys, quorum, bootstrap checkpoint and freshness bounds."
        }
      }
    },
    "scope_category": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "disposition",
        "artifact_ids"
      ],
      "properties": {
        "disposition": {
          "enum": [
            "included",
            "none_in_declared_scope"
          ]
        },
        "artifact_ids": {
          "type": "array",
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/identifier"
          }
        },
        "none_reason": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1024
        }
      },
      "allOf": [
        {
          "if": {
            "properties": {
              "disposition": {
                "const": "included"
              }
            }
          },
          "then": {
            "properties": {
              "artifact_ids": {
                "minItems": 1
              }
            },
            "not": {
              "required": [
                "none_reason"
              ]
            }
          }
        },
        {
          "if": {
            "properties": {
              "disposition": {
                "const": "none_in_declared_scope"
              }
            }
          },
          "then": {
            "required": [
              "none_reason"
            ],
            "properties": {
              "artifact_ids": {
                "maxItems": 0
              }
            }
          }
        }
      ]
    },
    "submitted_scope": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "scope_id",
        "statement",
        "code",
        "data",
        "closure"
      ],
      "properties": {
        "scope_id": {
          "$ref": "#/$defs/identifier"
        },
        "statement": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4096
        },
        "code": {
          "$ref": "#/$defs/scope_category"
        },
        "data": {
          "$ref": "#/$defs/scope_category"
        },
        "closure": {
          "const": "all_declared_submitted_code_and_data_bytes_included_no_floating_substitutes"
        }
      },
      "anyOf": [
        {
          "properties": {
            "code": {
              "properties": {
                "disposition": {
                  "const": "included"
                }
              }
            }
          }
        },
        {
          "properties": {
            "data": {
              "properties": {
                "disposition": {
                  "const": "included"
                }
              }
            }
          }
        }
      ],
      "description": "The admission validator checks every listed ID against exactly one artifact and rejects missing required bytes. Narrow scope is explicit and cannot claim complete runtime/model/service reproducibility. External services cannot substitute for submitted code or data."
    },
    "private_plaintext": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "digest",
        "byte_length",
        "disclosure"
      ],
      "properties": {
        "digest": {
          "$ref": "#/$defs/digest"
        },
        "byte_length": {
          "type": "integer",
          "minimum": 0
        },
        "disclosure": {
          "const": "inside_encrypted_manifest_only"
        }
      },
      "description": "Optional private plaintext integrity value; separate from the stored ciphertext hash. Never publish a bare hash of predictable personal data."
    },
    "artifact": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "artifact_id",
        "role",
        "logical_name",
        "media_type",
        "classification",
        "payload_status",
        "byte_representation",
        "stored_byte_digest",
        "stored_byte_length",
        "immutable_locator"
      ],
      "properties": {
        "artifact_id": {
          "$ref": "#/$defs/identifier"
        },
        "role": {
          "enum": [
            "code",
            "data",
            "configuration",
            "model_weights",
            "evidence",
            "other"
          ]
        },
        "logical_name": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "description": "Potentially sensitive metadata; protected with the manifest."
        },
        "media_type": {
          "type": "string",
          "minLength": 3,
          "maxLength": 255
        },
        "classification": {
          "enum": [
            "public",
            "internal",
            "confidential",
            "restricted_personal"
          ]
        },
        "payload_status": {
          "const": "included_in_sealed_storage"
        },
        "byte_representation": {
          "enum": [
            "plaintext",
            "aead_ciphertext"
          ]
        },
        "stored_byte_digest": {
          "$ref": "#/$defs/digest"
        },
        "stored_byte_length": {
          "type": "integer",
          "minimum": 0
        },
        "immutable_locator": {
          "$ref": "#/$defs/immutable_locator"
        },
        "private_plaintext": {
          "$ref": "#/$defs/private_plaintext"
        },
        "key_envelope_ref": {
          "$ref": "#/$defs/digest"
        },
        "encryption_profile_ref": {
          "$ref": "#/$defs/digest"
        }
      },
      "allOf": [
        {
          "if": {
            "properties": {
              "byte_representation": {
                "const": "aead_ciphertext"
              }
            }
          },
          "then": {
            "required": [
              "key_envelope_ref",
              "encryption_profile_ref"
            ],
            "properties": {
              "stored_byte_length": {
                "minimum": 1
              }
            }
          },
          "else": {
            "not": {
              "anyOf": [
                {
                  "required": [
                    "private_plaintext"
                  ]
                },
                {
                  "required": [
                    "key_envelope_ref"
                  ]
                },
                {
                  "required": [
                    "encryption_profile_ref"
                  ]
                }
              ]
            }
          }
        },
        {
          "if": {
            "properties": {
              "classification": {
                "enum": [
                  "confidential",
                  "restricted_personal"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "byte_representation": {
                "const": "aead_ciphertext"
              }
            }
          }
        }
      ]
    },
    "retention_snapshot": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "policy_ref",
        "scope",
        "mode",
        "retain_until",
        "hold_status",
        "storage_receipt_ref",
        "snapshot_only"
      ],
      "properties": {
        "policy_ref": {
          "$ref": "#/$defs/digest"
        },
        "scope": {
          "const": "all_manifest_payload_versions"
        },
        "mode": {
          "enum": [
            "bounded_worm",
            "owner_managed_append_only",
            "legal_hold"
          ]
        },
        "retain_until": {
          "anyOf": [
            {
              "$ref": "#/$defs/utc_time"
            },
            {
              "type": "null"
            }
          ]
        },
        "hold_status": {
          "enum": [
            "none",
            "active"
          ]
        },
        "storage_receipt_ref": {
          "$ref": "#/$defs/digest"
        },
        "snapshot_only": {
          "const": true
        }
      },
      "allOf": [
        {
          "if": {
            "properties": {
              "mode": {
                "const": "bounded_worm"
              }
            }
          },
          "then": {
            "properties": {
              "retain_until": {
                "$ref": "#/$defs/utc_time"
              }
            }
          }
        },
        {
          "if": {
            "properties": {
              "mode": {
                "const": "legal_hold"
              }
            }
          },
          "then": {
            "properties": {
              "hold_status": {
                "const": "active"
              }
            }
          }
        }
      ],
      "description": "Provider-enforced WORM and an application append-only policy have different threat models. Later retention, availability and lawful disposal events append to history; this historical declaration is not live state or an indefinite availability guarantee."
    },
    "availability_snapshot": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "as_of",
        "status",
        "verification_receipt_ref",
        "future_availability"
      ],
      "properties": {
        "as_of": {
          "$ref": "#/$defs/utc_time"
        },
        "status": {
          "const": "all_declared_submitted_payloads_present_at_ingest"
        },
        "verification_receipt_ref": {
          "$ref": "#/$defs/digest"
        },
        "future_availability": {
          "const": "recheck_current_payload_and_key_availability"
        }
      }
    },
    "external_service_limitation": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "service_id",
        "role",
        "observed_version",
        "limitation",
        "submitted_bytes_substitute",
        "reexecution_guaranteed"
      ],
      "properties": {
        "service_id": {
          "$ref": "#/$defs/identifier"
        },
        "role": {
          "enum": [
            "model_api",
            "tool_api",
            "data_source",
            "execution_service",
            "other"
          ]
        },
        "observed_version": {
          "anyOf": [
            {
              "type": "string",
              "minLength": 1,
              "maxLength": 1024
            },
            {
              "type": "null"
            }
          ]
        },
        "limitation": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4096
        },
        "submitted_bytes_substitute": {
          "const": false
        },
        "reexecution_guaranteed": {
          "const": false
        },
        "observation_receipt_refs": {
          "$ref": "#/$defs/digest_list"
        }
      }
    },
    "seal_content": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "record_kind",
        "seal_id",
        "owner_principal_id",
        "submitter_principal_id",
        "branch_id",
        "parent_record_digests",
        "expected_head_digest",
        "policy_revision_digest",
        "authority_grant_ref",
        "created_at",
        "submitted_scope",
        "artifacts",
        "external_service_limitations",
        "retention_snapshot",
        "availability_snapshot",
        "semantic_status"
      ],
      "properties": {
        "record_kind": {
          "const": "sealed_submission"
        },
        "seal_id": {
          "$ref": "#/$defs/identifier"
        },
        "owner_principal_id": {
          "$ref": "#/$defs/identifier"
        },
        "submitter_principal_id": {
          "$ref": "#/$defs/identifier"
        },
        "agent_instance_id": {
          "$ref": "#/$defs/identifier"
        },
        "agent_artifact_digest": {
          "$ref": "#/$defs/digest"
        },
        "entitlement_ref": {
          "$ref": "#/$defs/digest",
          "description": "Optional commercial entitlement evidence; conveys no authority to data or tools."
        },
        "branch_id": {
          "$ref": "#/$defs/identifier"
        },
        "parent_record_digests": {
          "$ref": "#/$defs/digest_list"
        },
        "expected_head_digest": {
          "anyOf": [
            {
              "$ref": "#/$defs/digest"
            },
            {
              "type": "null"
            }
          ]
        },
        "policy_revision_digest": {
          "$ref": "#/$defs/digest"
        },
        "authority_grant_ref": {
          "$ref": "#/$defs/digest"
        },
        "created_at": {
          "$ref": "#/$defs/utc_time"
        },
        "submitted_scope": {
          "$ref": "#/$defs/submitted_scope"
        },
        "artifacts": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/$defs/artifact"
          }
        },
        "external_service_limitations": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/external_service_limitation"
          }
        },
        "retention_snapshot": {
          "$ref": "#/$defs/retention_snapshot"
        },
        "availability_snapshot": {
          "$ref": "#/$defs/availability_snapshot"
        },
        "semantic_status": {
          "const": "submitted_bytes_recorded_not_independently_accepted"
        }
      },
      "dependentRequired": {
        "agent_instance_id": [
          "agent_artifact_digest"
        ],
        "agent_artifact_digest": [
          "agent_instance_id"
        ]
      }
    },
    "branch_transition_content": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "record_kind",
        "transition_id",
        "transition_type",
        "owner_principal_id",
        "submitter_principal_id",
        "branch_id",
        "parent_transition_digests",
        "expected_head_digest",
        "new_head_digest",
        "policy_revision_digest",
        "authority_grant_ref",
        "approval_decision_ref",
        "created_at",
        "state_effect"
      ],
      "properties": {
        "record_kind": {
          "const": "branch_transition"
        },
        "transition_id": {
          "$ref": "#/$defs/identifier"
        },
        "transition_type": {
          "enum": [
            "create",
            "advance",
            "merge",
            "rollback",
            "archive"
          ]
        },
        "owner_principal_id": {
          "$ref": "#/$defs/identifier"
        },
        "submitter_principal_id": {
          "$ref": "#/$defs/identifier"
        },
        "branch_id": {
          "$ref": "#/$defs/identifier"
        },
        "parent_transition_digests": {
          "$ref": "#/$defs/digest_list"
        },
        "expected_head_digest": {
          "anyOf": [
            {
              "$ref": "#/$defs/digest"
            },
            {
              "type": "null"
            }
          ]
        },
        "new_head_digest": {
          "$ref": "#/$defs/digest",
          "description": "The content digest of the target sealed submission; a branch alias or mutable URI is forbidden."
        },
        "merge_source_seal_digests": {
          "$ref": "#/$defs/digest_list"
        },
        "policy_revision_digest": {
          "$ref": "#/$defs/digest"
        },
        "authority_grant_ref": {
          "$ref": "#/$defs/digest"
        },
        "approval_decision_ref": {
          "$ref": "#/$defs/digest"
        },
        "created_at": {
          "$ref": "#/$defs/utc_time"
        },
        "state_effect": {
          "const": "derive_head_only_after_current_policy_and_compare_and_swap_validation"
        }
      },
      "allOf": [
        {
          "if": {
            "properties": {
              "transition_type": {
                "const": "create"
              }
            }
          },
          "then": {
            "properties": {
              "expected_head_digest": {
                "type": "null"
              },
              "parent_transition_digests": {
                "maxItems": 0
              }
            }
          },
          "else": {
            "properties": {
              "expected_head_digest": {
                "$ref": "#/$defs/digest"
              },
              "parent_transition_digests": {
                "minItems": 1
              }
            }
          }
        },
        {
          "if": {
            "properties": {
              "transition_type": {
                "const": "merge"
              }
            }
          },
          "then": {
            "required": [
              "merge_source_seal_digests"
            ],
            "properties": {
              "merge_source_seal_digests": {
                "minItems": 2
              }
            }
          },
          "else": {
            "not": {
              "required": [
                "merge_source_seal_digests"
              ]
            }
          }
        }
      ],
      "description": "Transition DAG and head/policy state are checked by the policy kernel. A rollback is a new authorized event selecting an older seal, never deletion or rewinding of the audit log. Merging content does not merge permissions or imply semantic approval."
    }
  }
};
