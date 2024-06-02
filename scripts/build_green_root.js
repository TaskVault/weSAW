const { ShardedMerkleTree } = require("../src/merkle");
const { tokens } = require("../data/green_tokens.json");

(async () => {
  let entries = [];
  let shardNybbles = 1;
  let target = `providers/bab`;

  if (hre.network.name === "hardhat") {
    const signers = await ethers.getSigners();
    entries = signers.slice(0, 10).map((signer) => [signer.address, 1]);
    target = `providers/test_bab`;
  } else {
    shardNybbles = 2;
    entries = Object.entries(tokens).map(([key, value]) => [value, key]);
  }
  ShardedMerkleTree.build(entries, shardNybbles, target);

  const tree = ShardedMerkleTree.fromFiles(target);
  console.log("Merkle Root", tree.root);
})();
