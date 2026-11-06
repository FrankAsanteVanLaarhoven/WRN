// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title WRNAccessGrantManager
 * @author Frank Van Laarhoven <frank@wrn.network>
 * @notice On-chain management of bounded delegation grants between humans and autonomous agents.
 * @dev Compliant with access_grant.schema.json, OAuth 2.0 DPoP (RFC 9449), and RFC 8785 terms digests.
 */
contract WRNAccessGrantManager {
    struct AccessGrant {
        string grantId;           // e.g. "grant_7a8b9c0"
        address grantor;          // Ethereum address of delegator
        address agentController;  // Agent execution instance address
        string resourceURN;       // Target resource e.g. "urn:wrn:res:contracts:v2"
        bytes32 termsDigest;      // Canonical RFC 8785 SHA-256 pre-consent digest
        uint64 issuedAt;
        uint64 expiresAt;
        uint8 zone;               // 1 = Core Ring, 2 = Strict Bounded, 3 = External Sandbox
        bool isRevoked;
        string permissions;       // Comma-separated operations e.g. "read,derive,seal"
    }

    uint256 public totalGrantsIssued;
    uint256 public totalGrantsRevoked;

    // Mapping from grantId hash to AccessGrant
    mapping(bytes32 => AccessGrant) public grants;

    event GrantIssued(
        bytes32 indexed grantHash,
        string grantId,
        address indexed grantor,
        address indexed agentController,
        uint64 expiresAt
    );

    event GrantRevoked(
        bytes32 indexed grantHash,
        string grantId,
        address indexed revokedBy,
        string reason
    );

    /**
     * @notice Issue a new bounded access grant
     */
    function issueGrant(
        string calldata grantId,
        address agentController,
        string calldata resourceURN,
        bytes32 termsDigest,
        uint64 durationSeconds,
        uint8 zone,
        string calldata permissions
    ) external returns (bytes32) {
        require(agentController != address(0), "WRN: Invalid agent controller");
        require(durationSeconds > 0, "WRN: Duration must be > 0");

        bytes32 grantHash = keccak256(abi.encodePacked(grantId));
        require(grants[grantHash].issuedAt == 0, "WRN: Grant ID already exists");

        uint64 nowSec = uint64(block.timestamp);
        uint64 expiry = nowSec + durationSeconds;

        grants[grantHash] = AccessGrant({
            grantId: grantId,
            grantor: msg.sender,
            agentController: agentController,
            resourceURN: resourceURN,
            termsDigest: termsDigest,
            issuedAt: nowSec,
            expiresAt: expiry,
            zone: zone,
            isRevoked: false,
            permissions: permissions
        });

        totalGrantsIssued++;
        emit GrantIssued(grantHash, grantId, msg.sender, agentController, expiry);
        return grantHash;
    }

    /**
     * @notice Instantly revoke an active access grant
     */
    function revokeGrant(string calldata grantId, string calldata reason) external {
        bytes32 grantHash = keccak256(abi.encodePacked(grantId));
        AccessGrant storage g = grants[grantHash];
        require(g.issuedAt > 0, "WRN: Grant not found");
        require(msg.sender == g.grantor, "WRN: Only grantor can revoke");
        require(!g.isRevoked, "WRN: Grant already revoked");

        g.isRevoked = true;
        totalGrantsRevoked++;

        emit GrantRevoked(grantHash, grantId, msg.sender, reason);
    }

    /**
     * @notice Validate if an agent currently has active authority to execute
     */
    function isGrantActive(string calldata grantId) external view returns (bool) {
        bytes32 grantHash = keccak256(abi.encodePacked(grantId));
        AccessGrant memory g = grants[grantHash];
        if (g.issuedAt == 0) return false;
        if (g.isRevoked) return false;
        if (block.timestamp > g.expiresAt) return false;
        return true;
    }
}

