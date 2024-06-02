const { ShardedMerkleTree } = require("../src/merkle");

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

async function main() {
  const Gtw = await ethers.getContractFactory("weSAWpool");
  const gtw = await Gtw.deploy();
  await gtw.initialize();
  await gtw.deployed();

  tree = ShardedMerkleTree.fromFiles("providers/bab");
  await gtw.updateRoot(tree.root);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
