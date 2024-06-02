const { ShardedMerkleTree } = require("../src/merkle");

(async () => {
  const tree = ShardedMerkleTree.fromFiles("providers/bab");
  const [tokenId, proof] = tree.getProof("0x51b222Fec07767e46864BedbCa153FCaBBe28817");
  console.log(tokenId, proof)
})();
