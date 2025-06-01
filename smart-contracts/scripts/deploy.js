const hre = require("hardhat");

async function main() {
  const RideRegistry = await hre.ethers.getContractFactory("RideRegistry");
  const contract = await RideRegistry.deploy(); // Deploys the contract
  await contract.waitForDeployment(); // Use this in newer versions of Hardhat

  const address = await contract.getAddress();
  console.log("Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

