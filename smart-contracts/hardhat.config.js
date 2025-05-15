require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
 solidity: {
  version: "0.8.28",
  settings: {
    viaIR: true,
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
};
