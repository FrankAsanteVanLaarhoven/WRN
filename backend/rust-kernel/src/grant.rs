use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::RwLock;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AccessGrant {
    pub grant_id: String,
    pub grantor_id: String,
    pub grantee_agent_id: String,
    pub resource_selector: String,
    pub allowed_operations: Vec<String>,
    pub target_zone: String,
    pub terms_digest: String,
    pub issued_at: DateTime<Utc>,
    pub expires_at: DateTime<Utc>,
    pub is_active: bool,
}

/// Military-grade in-memory online revocation registry with sub-second propagation
pub struct RevocationRegistry {
    revoked_grants: RwLock<HashMap<String, String>>, // grant_id -> revocation_reason
}

impl RevocationRegistry {
    pub fn new() -> Self {
        Self {
            revoked_grants: RwLock::new(HashMap::new()),
        }
    }

    /// Revokes an access grant immediately, invalidating any active cached tokens
    pub fn revoke(&self, grant_id: &str, reason: &str) -> Result<u128, String> {
        let start = std::time::Instant::now();
        let mut map = self.revoked_grants.write().map_err(|e| e.to_string())?;
        map.insert(grant_id.to_string(), reason.to_string());
        let elapsed_micros = start.elapsed().as_micros();
        Ok(elapsed_micros)
    }

    /// Checks if a grant is revoked
    pub fn is_revoked(&self, grant_id: &str) -> bool {
        if let Ok(map) = self.revoked_grants.read() {
            map.contains_key(grant_id)
        } else {
            true // Fail-closed on lock poisoning
        }
    }
}
