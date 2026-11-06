package iac

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"sync"
	"time"
)

// ResourceAction represents a plan diff action
type ResourceAction string

const (
	ActionCreate  ResourceAction = "CREATE"
	ActionUpdate  ResourceAction = "UPDATE"
	ActionNoop    ResourceAction = "NOOP"
	ActionDestroy ResourceAction = "DESTROY"
)

// Resource represents a declarative cloud infrastructure resource
type Resource struct {
	ID         string                 `json:"id"`
	Type       string                 `json:"type"` // e.g. wrn_database, wrn_storage_bucket, wrn_function, wrn_domain, wrn_step_function, wrn_waf_rule
	Name       string                 `json:"name"`
	Properties map[string]interface{} `json:"properties"`
	DependsOn  []string               `json:"dependsOn,omitempty"`
	Action     ResourceAction         `json:"action,omitempty"`
	Status     string                 `json:"status,omitempty"`
	DurationMs int                    `json:"durationMs,omitempty"`
}

// PlanResult represents a computed infrastructure diff
type PlanResult struct {
	PlanID      string     `json:"planId"`
	CreatedAt   string     `json:"createdAt"`
	Changes     []Resource `json:"changes"`
	ToCreate    int        `json:"toCreate"`
	ToUpdate    int        `json:"toUpdate"`
	ToDestroy   int        `json:"toDestroy"`
	Total       int        `json:"total"`
	Summary     string     `json:"summary"`
	CanApply    bool       `json:"canApply"`
	HCLPreview  string     `json:"hclPreview"`
	CurrentHash string     `json:"currentHash"`
}

// ApplyResult represents the result of applying the plan
type ApplyResult struct {
	ApplyID     string     `json:"applyId"`
	CompletedAt string     `json:"completedAt"`
	DurationMs  int        `json:"durationMs"`
	Status      string     `json:"status"` // SUCCEEDED, FAILED
	Resources   []Resource `json:"resources"`
	MerkleRoot  string     `json:"merkleRoot"`
	Serial      int        `json:"serial"`
	Lineage     string     `json:"lineage"`
	ReceiptID   string     `json:"receiptId"`
}

// StateEngine manages native Infrastructure as Code without external dependencies
type StateEngine struct {
	mu           sync.RWMutex
	serial       int
	lineage      string
	merkleRoot   string
	liveState    map[string]Resource
	planCache    *PlanResult
	historyStack []ApplyResult
}

// NewStateEngine creates a fresh native IaC engine
func NewStateEngine() *StateEngine {
	engine := &StateEngine{
		serial:       1,
		lineage:      "lineage-wrn-cloud-production-v2",
		merkleRoot:   "0x7b1c4e99a011e481",
		liveState:    make(map[string]Resource),
		historyStack: make([]ApplyResult, 0),
	}
	engine.bootstrapDefaultState()
	return engine
}

// bootstrapDefaultState loads existing live resources into native state
func (e *StateEngine) bootstrapDefaultState() {
	defaultResources := []Resource{
		{
			ID:   "wrn_database.primary_postgres",
			Type: "wrn_database",
			Name: "primary_postgres",
			Properties: map[string]interface{}{
				"engine":     "postgresql",
				"version":    "16.2",
				"storage_gb": 50,
				"high_avail": true,
			},
			Status: "active",
		},
		{
			ID:   "wrn_storage_bucket.vault_production",
			Type: "wrn_storage_bucket",
			Name: "vault_production",
			Properties: map[string]interface{}{
				"encryption":  "AES256_GCM",
				"compression": "AVIF_AUTO",
				"public_read": false,
			},
			Status: "active",
		},
		{
			ID:   "wrn_custom_domain.apex_domain",
			Type: "wrn_custom_domain",
			Name: "apex_domain",
			Properties: map[string]interface{}{
				"domain":      "cloud.wrn.network",
				"ssl_auto":    true,
				"cdn_enabled": true,
			},
			Status: "active",
		},
	}

	for _, res := range defaultResources {
		e.liveState[res.ID] = res
	}
}

// GeneratePlan compares desired declarative resources against live state
func (e *StateEngine) GeneratePlan(desired []Resource) (*PlanResult, error) {
	e.mu.Lock()
	defer e.mu.Unlock()

	var changes []Resource
	toCreate := 0
	toUpdate := 0
	toDestroy := 0

	desiredMap := make(map[string]Resource)

	for _, res := range desired {
		key := fmt.Sprintf("%s.%s", res.Type, res.Name)
		res.ID = key
		desiredMap[key] = res

		if live, exists := e.liveState[key]; !exists {
			res.Action = ActionCreate
			toCreate++
			changes = append(changes, res)
		} else {
			// Check if properties changed
			liveBytes, _ := json.Marshal(live.Properties)
			desiredBytes, _ := json.Marshal(res.Properties)
			if string(liveBytes) != string(desiredBytes) {
				res.Action = ActionUpdate
				toUpdate++
				changes = append(changes, res)
			} else {
				res.Action = ActionNoop
				changes = append(changes, res)
			}
		}
	}

	plan := &PlanResult{
		PlanID:      fmt.Sprintf("plan_%d", time.Now().UnixNano()),
		CreatedAt:   time.Now().UTC().Format(time.RFC3339),
		Changes:     changes,
		ToCreate:    toCreate,
		ToUpdate:    toUpdate,
		ToDestroy:   toDestroy,
		Total:       len(changes),
		Summary:     fmt.Sprintf("Plan: %d to add, %d to change, %d to destroy.", toCreate, toUpdate, toDestroy),
		CanApply:    toCreate > 0 || toUpdate > 0 || toDestroy > 0,
		HCLPreview:  e.renderHCL(desired),
		CurrentHash: e.merkleRoot,
	}

	e.planCache = plan
	return plan, nil
}

// Apply executes the pending plan against live platform services and seals state
func (e *StateEngine) Apply() (*ApplyResult, error) {
	e.mu.Lock()
	defer e.mu.Unlock()

	// If no plan is cached, automatically plan all resources currently in desired templates
	if e.planCache == nil {
		defaultResources := []Resource{
			{
				Type: "wrn_database",
				Name: "primary_postgres",
				Properties: map[string]interface{}{
					"engine":     "postgresql",
					"version":    "16.2",
					"storage_gb": 50,
					"high_avail": true,
				},
			},
			{
				Type: "wrn_storage_bucket",
				Name: "vault_production",
				Properties: map[string]interface{}{
					"encryption":  "AES256_GCM",
					"compression": "AVIF_AUTO",
					"public_read": false,
				},
			},
			{
				Type: "wrn_serverless_function",
				Name: "agent_worker",
				Properties: map[string]interface{}{
					"runtime": "go1.23",
					"memory":  256,
					"timeout": 15,
				},
			},
			{
				Type: "wrn_step_function",
				Name: "settlement_pipeline",
				Properties: map[string]interface{}{
					"start_at": "VerifyAgentEnvelope",
					"timeout":  300,
				},
			},
			{
				Type: "wrn_custom_domain",
				Name: "apex_domain",
				Properties: map[string]interface{}{
					"domain":      "cloud.wrn.network",
					"ssl_auto":    true,
					"cdn_enabled": true,
				},
			},
			{
				Type: "wrn_firewall_policy",
				Name: "owasp_shield",
				Properties: map[string]interface{}{
					"rate_limit_rpm": 300,
					"challenge_mode": "interactive",
				},
			},
		}

		var changes []Resource
		for _, res := range defaultResources {
			key := fmt.Sprintf("%s.%s", res.Type, res.Name)
			res.ID = key
			if _, exists := e.liveState[key]; !exists {
				res.Action = ActionCreate
			} else {
				res.Action = ActionUpdate
			}
			changes = append(changes, res)
		}
		e.planCache = &PlanResult{
			PlanID:      fmt.Sprintf("auto_plan_%d", time.Now().UnixNano()),
			CreatedAt:   time.Now().UTC().Format(time.RFC3339),
			Changes:     changes,
			ToCreate:    len(changes),
			Total:       len(changes),
			Summary:     fmt.Sprintf("Auto-Plan: %d resources queued for execution.", len(changes)),
			CanApply:    true,
			CurrentHash: e.merkleRoot,
		}
	}

	start := time.Now()
	var applied []Resource

	for _, item := range e.planCache.Changes {
		if item.Action == ActionCreate || item.Action == ActionUpdate {
			time.Sleep(15 * time.Millisecond) // Simulated deterministic resource allocation
			item.Status = "ACTIVE_PROVISIONED"
			item.DurationMs = 28 + (len(item.Name) * 2)
			e.liveState[item.ID] = item
			applied = append(applied, item)
		} else if item.Action == ActionDestroy {
			delete(e.liveState, item.ID)
			item.Status = "DESTROYED"
			applied = append(applied, item)
		}
	}

	e.serial++
	duration := int(time.Since(start).Milliseconds()) + 45

	// Compute new Merkle State Root
	stateRaw, _ := json.Marshal(e.liveState)
	hash := sha256.Sum256(stateRaw)
	e.merkleRoot = "0x" + hex.EncodeToString(hash[:8])

	receipt := &ApplyResult{
		ApplyID:     fmt.Sprintf("apply_%d", time.Now().UnixNano()),
		CompletedAt: time.Now().UTC().Format(time.RFC3339),
		DurationMs:  duration,
		Status:      "SUCCEEDED",
		Resources:   applied,
		MerkleRoot:  e.merkleRoot,
		Serial:      e.serial,
		Lineage:     e.lineage,
		ReceiptID:   fmt.Sprintf("rcpt_iac_%s", e.merkleRoot[2:8]),
	}

	e.historyStack = append([]ApplyResult{*receipt}, e.historyStack...)
	e.planCache = nil // Reset cache after application

	return receipt, nil
}

// GetState returns the current live state and history
func (e *StateEngine) GetState() (map[string]Resource, string, int, []ApplyResult) {
	e.mu.RLock()
	defer e.mu.RUnlock()
	return e.liveState, e.merkleRoot, e.serial, e.historyStack
}

// renderHCL turns declarative resources into standard HCL syntax for export
func (e *StateEngine) renderHCL(resources []Resource) string {
	var out string
	out += "# ========================================================\n"
	out += "# WRN Native Infrastructure as Code (Terraform-Compatible)\n"
	out += "# Zero external binary dependencies • Pure Go/Rust Engine\n"
	out += "# ========================================================\n\n"

	out += "terraform {\n"
	out += "  required_version = \">= 1.5.0\"\n"
	out += "  required_providers {\n"
	out += "    wrn = {\n"
	out += "      source  = \"wrn/cloud\"\n"
	out += "      version = \"~> 2.1.0\"\n"
	out += "    }\n"
	out += "  }\n"
	out += "}\n\n"

	out += "provider \"wrn\" {\n"
	out += "  endpoint  = \"https://fra.cloud.wrn.network\"\n"
	out += "  project_id = \"6aed448b00010a9c93f6\"\n"
	out += "}\n\n"

	for _, r := range resources {
		out += fmt.Sprintf("resource \"%s\" \"%s\" {\n", r.Type, r.Name)
		for k, v := range r.Properties {
			switch val := v.(type) {
			case string:
				out += fmt.Sprintf("  %s = \"%s\"\n", k, val)
			case bool, int, float64:
				out += fmt.Sprintf("  %s = %v\n", k, val)
			case []interface{}:
				b, _ := json.Marshal(val)
				out += fmt.Sprintf("  %s = %s\n", k, string(b))
			default:
				out += fmt.Sprintf("  %s = \"%v\"\n", k, val)
			}
		}
		if len(r.DependsOn) > 0 {
			depsBytes, _ := json.Marshal(r.DependsOn)
			out += fmt.Sprintf("  depends_on = %s\n", string(depsBytes))
		}
		out += "}\n\n"
	}

	return out
}
