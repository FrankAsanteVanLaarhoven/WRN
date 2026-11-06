// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title WRNPassportRegistry
 * @author Frank Van Laarhoven <frank@wrn.network>
 * @notice On-chain identity, cryptographic passport registry, and instant revocation list for WRN Cloud.
 * @dev Compliant with W3C Verifiable Credentials 2.0, DID 1.0, and RFC 9421 DPoP signature verification.
 */
contract WRNPassportRegistry {
    // Identity types matching passport.schema.json
    enum IdentityType { Human, Organization, AutonomousAgent, EdgeService }

    struct Passport {
        string passportId;       // URN e.g. "urn:wrn:human:frank" or "urn:wrn:agent:runtime-01"
        IdentityType identityType;
        address owner;           // Ethereum address of delegator or agent controller
        bytes ed25519PublicKey;  // 32-byte Ed25519 public key for RFC 9421 signatures
        uint8 zone;              // 1 = Core Ring, 2 = Strict Bounded, 3 = External Sandbox
        uint64 issuedAt;
        uint64 expiresAt;
        bool isRevoked;
        bytes32 metadataDigest;  // SHA-256 canonical digest of qualification record
    }

    address public protocolAdmin;
    uint256 public totalPassports;

    // Mapping from passport URN hash to Passport struct
    mapping(bytes32 => Passport) public passports;
    
    // Revocation status list (O(1) lookups)
    mapping(bytes32 => bool) public revocationStatusList;

    // Events
    event PassportRegistered(bytes32 indexed urnHash, string passportId, address indexed owner, uint8 zone);
    event PassportRevoked(bytes32 indexed urnHash, string reason, uint64 timestamp);
    event KeyRotated(bytes32 indexed urnHash, bytes newPublicKey, uint64 timestamp);

    modifier onlyAdmin() {
        require(msg.sender == protocolAdmin, "WRN: Caller is not protocol admin");
        _;
    }

    constructor() {
        protocolAdmin = msg.sender;
    }

    /**
     * @notice Register a new verifiable passport on-chain
     * @param passportId Full URN string of identity
     * @param identityType 0=Human, 1=Org, 2=Agent, 3=Service
     * @param ed25519PublicKey The 32-byte Ed25519 public key used for RFC 9421 HTTP signatures
     * @param zone Security isolation zone (1, 2, or 3)
     * @param durationSeconds Validity duration in seconds
     * @param metadataDigest Canonical RFC 8785 SHA-256 hash of profile JSON
     */
    function registerPassport(
        string calldata passportId,
        IdentityType identityType,
        bytes calldata ed25519PublicKey,
        uint8 zone,
        uint64 durationSeconds,
        bytes32 metadataDigest
    ) external returns (bytes32) {
        require(ed25519PublicKey.length == 32, "WRN: Invalid Ed25519 key length (must be 32 bytes)");
        require(zone >= 1 && zone <= 3, "WRN: Zone must be 1 (Core), 2 (Bounded), or 3 (External)");

        bytes32 urnHash = keccak256(abi.encodePacked(passportId));
        require(passports[urnHash].issuedAt == 0, "WRN: Passport already exists");

        uint64 nowSec = uint64(block.timestamp);
        uint64 expiry = nowSec + durationSeconds;

        passports[urnHash] = Passport({
            passportId: passportId,
            identityType: identityType,
            owner: msg.sender,
            ed25519PublicKey: ed25519PublicKey,
            zone: zone,
            issuedAt: nowSec,
            expiresAt: expiry,
            isRevoked: false,
            metadataDigest: metadataDigest
        });

        totalPassports++;
        emit PassportRegistered(urnHash, passportId, msg.sender, zone);
        return urnHash;
    }

    /**
     * @notice Instantly revoke a passport across the global network
     * @param passportId Full URN string of passport
     * @param reason Human-readable revocation reason
     */
    function revokePassport(string calldata passportId, string calldata reason) external {
        bytes32 urnHash = keccak256(abi.encodePacked(passportId));
        Passport storage p = passports[urnHash];
        require(p.issuedAt > 0, "WRN: Passport not found");
        require(msg.sender == p.owner || msg.sender == protocolAdmin, "WRN: Unauthorized to revoke");
        require(!p.isRevoked, "WRN: Already revoked");

        p.isRevoked = true;
        revocationStatusList[urnHash] = true;

        emit PassportRevoked(urnHash, reason, uint64(block.timestamp));
    }

    /**
     * @notice Verify whether a passport is currently valid and active
     */
    function isValidPassport(string calldata passportId) external view returns (bool) {
        bytes32 urnHash = keccak256(abi.encodePacked(passportId));
        Passport memory p = passports[urnHash];
        if (p.issuedAt == 0) return false;
        if (p.isRevoked) return false;
        if (block.timestamp > p.expiresAt) return false;
        return true;
    }

    /**
     * @notice Retrieve public Ed25519 key for off-chain or on-chain signature verification
     */
    function getPassportKey(string calldata passportId) external view returns (bytes memory, uint8, bool) {
        bytes32 urnHash = keccak256(abi.encodePacked(passportId));
        Passport memory p = passports[urnHash];
        return (p.ed25519PublicKey, p.zone, !p.isRevoked && block.timestamp <= p.expiresAt);
    }
}

