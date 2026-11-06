package stepfunctions

import (
	"testing"

	"github.com/FrankAsanteVanLaarhoven/WRN/backend/go-edge/internal/cache"
	"github.com/FrankAsanteVanLaarhoven/WRN/backend/go-edge/internal/waf"
)

func TestStepFunctionsEngine(t *testing.T) {
	ctx := NewDefaultContext()
	firewall := waf.NewFirewall(100)
	rCache := cache.NewRedisCache()

	// 1. Test ExecuteStep for individual steps
	step1, err := ExecuteStep("VerifyAgentEnvelope", ctx, firewall, rCache)
	if err != nil {
		t.Fatalf("VerifyAgentEnvelope failed: %v", err)
	}
	if step1.Status != "success" || step1.Output["verified"] != true {
		t.Fatalf("expected step1 success, got %v", step1.Output)
	}

	step3, err := ExecuteStep("ParallelSecurityChecks", ctx, firewall, rCache)
	if err != nil {
		t.Fatalf("ParallelSecurityChecks failed: %v", err)
	}
	if step3.Output["rfc9421Status"] == "" {
		t.Fatalf("expected parallel RFC 9421 check output")
	}

	// 2. Test ExecuteAll pipeline
	allNodes, totalMs, err := ExecuteAll(ctx, firewall, rCache)
	if err != nil {
		t.Fatalf("ExecuteAll pipeline failed: %v", err)
	}
	if len(allNodes) != 6 {
		t.Fatalf("expected 6 nodes in pipeline, got %d", len(allNodes))
	}
	if totalMs <= 0 {
		t.Fatalf("expected positive total duration, got %d", totalMs)
	}

	lastNode := allNodes[len(allNodes)-1]
	if lastNode.Output["stateMachineStatus"] != "SUCCEEDED" {
		t.Fatalf("expected SUCCEEDED status, got %v", lastNode.Output["stateMachineStatus"])
	}
}
