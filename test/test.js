const { expect } = require("chai");

const { ShardedMerkleTree } = require("../src/merkle");

describe("weSAWpool", () => {
  let tree;

  it("should allow KYCed users", async () => {
    const signers = await ethers.getSigners();

    const Gtw = await ethers.getContractFactory("weSAWpoolFactory");
    const gtw = await Gtw.deploy();
    await gtw.initialize();

    const pool = await ethers.getContractFactory("weSAWpool");
    const gPool = await pool.deploy();
    await gPool.initialize("GuardedPool", "weSAWpool", gtw.address);

    tree = ShardedMerkleTree.fromFiles("providers/test_bab");
    await gtw.updateRoot(tree.root);

    const tokenA = "tokenAddress";
    const tokenB = "tokenAddress";
    await expect(gPool.swap(signers[1].address, tokenA, tokenB)).to.be.revertedWith(
      "Account should pass SCAM check"
    );

    await expect(
      gtw.register(1, [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      ])
    ).to.be.revertedWith("Valid proof required");

    const [tokenId, proof] = tree.getProof(signers[0].address);
    await gtw.register(tokenId, proof);

    await gPool.swap(signers[1].address, tokenA, tokenB);
    expect(await gPool.balanceOf(signers[1].address)).to.equal("1");
  });
});
