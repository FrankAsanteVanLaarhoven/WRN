package energy

import (
	"testing"
)

func TestEnergyEngine(t *testing.T) {
	engine := NewEnergyEngine()

	// 1. Check Regions
	regions := engine.GetRegions()
	if len(regions) < 5 {
		t.Fatalf("expected at least 5 regions, got %d", len(regions))
	}

	// 2. Check Metrics
	metrics := engine.GetMetrics()
	if metrics.PowerReductionPct < 90.0 {
		t.Fatalf("expected high power reduction, got %f", metrics.PowerReductionPct)
	}

	// 3. Test Delay Tolerant Routing (should route to clean geothermal/hydro surplus)
	reg, reason := engine.DispatchOptimalRoute("delay_tolerant", 100)
	if reg.CarbonIntensity > 15.0 {
		t.Fatalf("expected ultra low carbon route for delay_tolerant, got %f in %s", reg.CarbonIntensity, reg.RegionID)
	}
	if reason == "" {
		t.Fatalf("expected routing reason")
	}

	// 4. Test Enqueue
	engine.EnqueueDelayTolerant("job_01", "Merkle DAG batch indexer")
	queue := engine.GetDelayQueue()
	if len(queue) != 1 {
		t.Fatalf("expected 1 queued job, got %d", len(queue))
	}
}

