package waf

import (
	"testing"
)

func TestFirewallBlockMalicious(t *testing.T) {
	fw := NewFirewall(100)

	// SQL injection check
	action := fw.EvaluateRequest("192.168.1.1", "/api/v1/auth", "Mozilla/5.0", "' OR 1=1 --")
	if action != ActionBlock {
		t.Fatalf("Expected ActionBlock for SQL injection, got %v", action)
	}

	// Normal valid request
	action = fw.EvaluateRequest("192.168.1.2", "/api/v1/projects", "Mozilla/5.0", `{"project":"dac"}`)
	if action != ActionAllow {
		t.Fatalf("Expected ActionAllow for valid request, got %v", action)
	}

	// Rate limiting challenge check
	fwRate := NewFirewall(2)
	_ = fwRate.EvaluateRequest("10.0.0.1", "/test", "agent", "")
	_ = fwRate.EvaluateRequest("10.0.0.1", "/test", "agent", "")
	action = fwRate.EvaluateRequest("10.0.0.1", "/test", "agent", "")
	if action != ActionChallenge {
		t.Fatalf("Expected ActionChallenge for exceeded rate limit, got %v", action)
	}
}

