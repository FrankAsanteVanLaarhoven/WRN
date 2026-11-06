use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use crate::crypto::constant_time_eq;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WRNPassport {
    pub passport_id: String,
    pub issuer: String,
    pub subject_agent_id: String,
    pub key_id: String,
    pub valid_from: DateTime<Utc>,
    pub valid_until: DateTime<Utc>,
    pub allowed_zones: Vec<String>,
    pub qualification_digest: String,
    pub max_memory_mb: u64,
    pub is_revoked: bool,
}

impl WRNPassport {
    /// Validates passport temporal validity, revocation status, and cryptographic qualifications
    pub fn verify(&self, current_time: DateTime<Utc>, required_zone: &str) -> Result<bool, String> {
        if self.is_revoked {
            return Err(format!("Passport '{}' has been revoked online", self.passport_id));
        }

        if current_time < self.valid_from {
            return Err("Passport is not yet valid (premature temporal window)".to_string());
        }

        if current_time > self.valid_until {
            return Err("Passport has expired (temporal boundary violation)".to_string());
        }

        if !self.allowed_zones.iter().any(|z| z == required_zone || z == "*") {
            return Err(format!(
                "Zone '{}' is unauthorized for passport '{}'. Allowed: {:?}",
                required_zone, self.passport_id, self.allowed_zones
            ));
        }

        // Verify qualification digest format
        if !self.qualification_digest.starts_with("sha-256=") {
            return Err("Invalid qualification digest prefix; must be 'sha-256='".to_string());
        }

        Ok(true)
    }

    /// Verifies terms digest match against proposed grant
    pub fn verify_terms_digest(&self, computed_digest: &str) -> bool {
        constant_time_eq(self.qualification_digest.as_bytes(), computed_digest.as_bytes())
    }
}
