// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title WRNMerkleProofSettler
 * @author Frank Van Laarhoven <frank@wrn.network>
 * @notice On-chain settlement of Merkle roots, agent execution proofs, and cryptographic audit receipts.
 * @dev Anchors execution receipts from the WRN Go edge gateway and Step Functions state machines.
 */
contract WRNMerkleProofSettler {
    struct ExecutionReceipt {
        bytes32 merkleRoot;       // Merkle tree root hash of the batch execution
        uint64 blockHeight;       // Logical block sequence e.g. 14209
        uint64 settledAt;        // Unix timestamp
        string pipelineId;        // Step functions execution ID
        string delegatorPassport; // Initiator passport URN
        uint32 taskCount;         // Number of agent tasks sealed in this block
        bytes rfc9421Signature;   // Ed25519 signature proof over (merkleRoot || blockHeight)
    }

    address public authorizedGatekeeper;
    uint256 public totalSettledBlocks;

    // Mapping from block height to ExecutionReceipt
    mapping(uint64 => ExecutionReceipt) public settledBlocks;
    
    // Mapping from Merkle Root to settlement status
    mapping(bytes32 => bool) public isMerkleRootSettled;

    event MerkleRootSettled(
        uint64 indexed blockHeight,
        bytes32 indexed merkleRoot,
        string pipelineId,
        uint32 taskCount,
        uint64 timestamp
    );

    event TaskProofVerified(
        uint64 indexed blockHeight,
        bytes32 indexed leafHash,
        bool isValid
    );

    modifier onlyGatekeeper() {
        require(msg.sender == authorizedGatekeeper, "WRN: Caller is not authorized edge gatekeeper");
        _;
    }

    constructor() {
        authorizedGatekeeper = msg.sender;
    }

    function setGatekeeper(address newGatekeeper) external onlyGatekeeper {
        require(newGatekeeper != address(0), "WRN: Invalid gatekeeper address");
        authorizedGatekeeper = newGatekeeper;
    }

    /**
     * @notice Settle an autonomous agent execution batch on-chain
     * @param merkleRoot The root hash of the SHA-256 execution DAG
     * @param blockHeight Sequential block number (e.g. 14209)
     * @param pipelineId State machine pipeline identifier
     * @param delegatorPassport Initiator passport URN
     * @param taskCount Number of tasks in the batch
     * @param signature RFC 9421 cryptographic signature bytes
     */
    function settleMerkleRoot(
        bytes32 merkleRoot,
        uint64 blockHeight,
        string calldata pipelineId,
        string calldata delegatorPassport,
        uint32 taskCount,
        bytes calldata signature
    ) external onlyGatekeeper {
        require(settledBlocks[blockHeight].settledAt == 0, "WRN: Block height already settled");
        require(!isMerkleRootSettled[merkleRoot], "WRN: Merkle root already settled");

        settledBlocks[blockHeight] = ExecutionReceipt({
            merkleRoot: merkleRoot,
            blockHeight: blockHeight,
            settledAt: uint64(block.timestamp),
            pipelineId: pipelineId,
            delegatorPassport: delegatorPassport,
            taskCount: taskCount,
            rfc9421Signature: signature
        });

        isMerkleRootSettled[merkleRoot] = true;
        totalSettledBlocks++;

        emit MerkleRootSettled(blockHeight, merkleRoot, pipelineId, taskCount, uint64(block.timestamp));
    }

    /**
     * @notice Verify a single task leaf against a settled on-chain Merkle root
     * @param blockHeight The block height where the root was settled
     * @param leaf The leaf hash (SHA-256 digest of task payload + envelope)
     * @param proof Sibling nodes along the Merkle branch from leaf to root
     */
    function verifyTaskProof(
        uint64 blockHeight,
        bytes32 leaf,
        bytes32[] calldata proof
    ) external returns (bool) {
        ExecutionReceipt memory receipt = settledBlocks[blockHeight];
        require(receipt.settledAt > 0, "WRN: Block not settled");

        bytes32 computedHash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];

            if (computedHash <= proofElement) {
                // Hash(current, element)
                computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
            } else {
                // Hash(element, current)
                computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
            }
        }

        bool isValid = (computedHash == receipt.merkleRoot);
        emit TaskProofVerified(blockHeight, leaf, isValid);
        return isValid;
    }

    /**
     * @notice View function to retrieve block receipt
     */
    function getReceipt(uint64 blockHeight) external view returns (ExecutionReceipt memory) {
        require(settledBlocks[blockHeight].settledAt > 0, "WRN: Block height not found");
        return settledBlocks[blockHeight];
    }
}
