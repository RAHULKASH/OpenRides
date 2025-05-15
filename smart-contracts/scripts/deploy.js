const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const RideRegistry = await hre.ethers.getContractFactory("RideRegistry");

  // Deploy the contract
  const rideRegistry = await RideRegistry.deploy();

  // Wait for the contract to be deployed
  await rideRegistry.waitForDeployment();

  // Get the deployed address
  const contractAddress = await rideRegistry.getAddress();

  console.log(`RideRegistry deployed to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
