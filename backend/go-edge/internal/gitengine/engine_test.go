package gitengine

import (
	"testing"
)

func TestGitEngine(t *testing.T) {
	engine := NewGitEngine()

	status := engine.Status()
	if status["current_branch"] != "main" {
		t.Fatalf("expected main branch, got %v", status["current_branch"])
	}

	// Test Add
	addRes := engine.Add([]string{"."})
	if addRes["status"] != "staged" {
		t.Fatalf("expected staged status")
	}

	// Test Commit
	commit, err := engine.Commit("feat: autonomous verification and deployment test", "Frank Van Laarhoven <frank@wrn.network>")
	if err != nil {
		t.Fatalf("commit failed: %v", err)
	}
	if commit.ShortHash == "" || commit.MerkleRoot == "" {
		t.Fatalf("expected commit hash and merkle root")
	}

	// Test Push
	pipeline, err := engine.Push("origin", "main")
	if err != nil {
		t.Fatalf("push failed: %v", err)
	}
	if pipeline.Status != "success" || len(pipeline.Steps) != 5 {
		t.Fatalf("expected 5 pipeline steps")
	}

	// Test Switch Branch
	if err := engine.SwitchBranch("feature/test-branch"); err != nil {
		t.Fatalf("switch branch failed: %v", err)
	}
	if engine.currentBranch != "feature/test-branch" {
		t.Fatalf("expected feature/test-branch")
	}
}
