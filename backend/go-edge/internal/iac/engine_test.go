package iac

import (
	"testing"
)

func TestStateEngine(t *testing.T) {
	engine := NewStateEngine()

	// 1. Initial State Check
	state, root, serial, _ := engine.GetState()
	if len(state) != 3 {
		t.Fatalf("expected 3 bootstrapped resources, got %d", len(state))
	}
	if root == "" || serial != 1 {
		t.Fatalf("invalid initial root or serial")
	}

	// 2. Plan with New Resources
	desired := []Resource{
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
			Type: "wrn_serverless_function",
			Name: "auth_webhook",
			Properties: map[string]interface{}{
				"runtime": "go1.23",
				"timeout": 15,
				"memory":  256,
			},
		},
		{
			Type: "wrn_step_function",
			Name: "merkle_settlement",
			Properties: map[string]interface{}{
				"start_at": "VerifyAgentEnvelope",
				"timeout":  300,
			},
		},
	}

	plan, err := engine.GeneratePlan(desired)
	if err != nil {
		t.Fatalf("GeneratePlan failed: %v", err)
	}
	if plan.ToCreate != 2 {
		t.Fatalf("expected 2 resources to create, got %d", plan.ToCreate)
	}
	if plan.Total != 3 {
		t.Fatalf("expected 3 total resources, got %d", plan.Total)
	}

	// 3. Apply Plan
	apply, err := engine.Apply()
	if err != nil {
		t.Fatalf("Apply failed: %v", err)
	}
	if apply.Status != "SUCCEEDED" {
		t.Fatalf("expected SUCCEEDED status, got %s", apply.Status)
	}
	if apply.Serial != 2 {
		t.Fatalf("expected serial 2, got %d", apply.Serial)
	}

	// 4. Verify Updated Live State
	updatedState, newRoot, newSerial, history := engine.GetState()
	if len(updatedState) != 5 {
		t.Fatalf("expected 5 resources after apply, got %d", len(updatedState))
	}
	if newRoot == root {
		t.Fatalf("expected new Merkle state root after apply")
	}
	if newSerial != 2 || len(history) != 1 {
		t.Fatalf("unexpected history or serial")
	}
}
