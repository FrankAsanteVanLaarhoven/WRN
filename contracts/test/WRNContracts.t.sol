// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../WRNPassportRegistry.sol";
import "../WRNMerkleProofSettler.sol";
import "../WRNAccessGrantManager.sol";

/**
 * @title WRNContractsTest
 * @notice Test suite for WRN Passport, Merkle Settler, and Access Grant Smart Contracts
 */
contract WRNContractsTest {
    WRNPassportRegistry passportRegistry;
    WRNMerkleProofSettler merkleSettler;
    WRNAccessGrantManager grantManager;

    function setUp() public {
        passportRegistry = new WRNPassportRegistry();
        merkleSettler = new WRNMerkleProofSettler();
        grantManager = new WRNAccessGrantManager();
    }

    function testRegisterAndVerifyPassport() public {
        bytes memory ed25519Key = hex"9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60";
        bytes32 digest = sha256("canonical-profile-json");

        passportRegistry.registerPassport(
            "urn:wrn:human:frank",
            WRNPassportRegistry.IdentityType.Human,
            ed25519Key,
            1, // Zone 1 Core
            3600 * 24 * 365,
            digest
        );

        bool isValid = passportRegistry.isValidPassport("urn:wrn:human:frank");
        require(isValid, "Passport must be valid");

        passportRegistry.revokePassport("urn:wrn:human:frank", "Key compromised");
        bool isRevokedValid = passportRegistry.isValidPassport("urn:wrn:human:frank");
        require(!isRevokedValid, "Revoked passport must be invalid");
    }

    function testSettleMerkleRoot() public {
        bytes32 root = sha256("execution-batch-merkle-root");
        bytes memory sig = hex"1234567890abcdef";

        merkleSettler.settleMerkleRoot(
            root,
            14209,
            "exec_pipeline_01",
            "urn:wrn:human:frank",
            12,
            sig
        );

        require(merkleSettler.isMerkleRootSettled(root), "Root must be marked settled");
    }
}
