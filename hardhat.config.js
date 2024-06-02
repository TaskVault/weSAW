require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();

const test_key= process.env.TEST_PRIVATE_KEY
console.log(process.env.TEST_PRIVATE_KEY)
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          metadata: {
            bytecodeHash: "none",
          },
        },
      },
    ],
  },
  networks: {
    mantle: {
      url: process.env.MANTLE_RPC_URL,
      accounts: [ test_key ]
    },
    optimism: {
      url: process.env.OPTIMISM_RPC_URL,
      accounts: [ test_key ]
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [ test_key ]
    },
  },
  mocha: {
    timeout: 100000,
  },
  etherscan: {
    apiKey: {
      aurora: process.env.AURORASCAN_API_KEY,
      auroraTestnet: process.env.AURORASCAN_API_KEY,
    },
  },
};
