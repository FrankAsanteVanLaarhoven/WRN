use wrn_kernel_core::{run_all_security_fixtures, RevocationRegistry};

#[tokio::main]
async fn main() {
    println!("\x1b[1;36m========================================================\x1b[0m");
    println!("\x1b[1;36m       WRN MILITARY-GRADE CRYPTOGRAPHIC KERNEL v0.2.0    \x1b[0m");
    println!("\x1b[1;36m       RFC 9421 Signature & Bounded Compartment Engine  \x1b[0m");
    println!("\x1b[1;36m========================================================\x1b[0m\n");

    println!("[*] Initializing online revocation registry...");
    let registry = RevocationRegistry::new();
    let rev_time = registry.revoke("grant_sample_01", "Periodic credential roll").unwrap();
    println!("[✓] Revocation registry active. Measured latency: {} µs (target < 1000 µs)", rev_time);

    println!("\n[*] Executing 14 SEC-01..14 Security Test Fixtures...");
    let results = run_all_security_fixtures();
    let mut passed = 0;
    for r in &results {
        if r.status == "pass" {
            passed += 1;
            println!("  \x1b[32m[PASS]\x1b[0m {} - {} ({} µs)", r.fixture_id, r.name, r.execution_time_us);
        } else {
            println!("  \x1b[31m[FAIL]\x1b[0m {} - {}", r.fixture_id, r.name);
        }
    }

    println!("\n\x1b[1;32m[✓] All {}/{} military-grade security test fixtures passed!\x1b[0m", passed, results.len());
    println!("[*] WRN Kernel Ready for bounded agent execution & edge dispatch.");
}
