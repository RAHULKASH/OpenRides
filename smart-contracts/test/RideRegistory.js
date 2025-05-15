const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RideRegistory Contract", function () {
  let RideRegistory;
  let rideRegistory;
  let owner;
  let driver;

  beforeEach(async function () {
    [owner, driver] = await ethers.getSigners();

    RideRegistory = await ethers.getContractFactory("RideRegistory");
    rideRegistory = await RideRegistory.deploy(); // No need for .deployed()
  });

  it("Should register a ride successfully", async function () {
    const txId = "txn123";

    const tx = await rideRegistory.createRide(
      driver.address,
      "Sedan",
      "Location A",
      "Location B",
      1000,
      txId
    );

    const ride = await rideRegistory.getRide(1); // rideId starts from 1
    expect(ride.rider).to.equal(owner.address);
    expect(ride.driver).to.equal(driver.address);
    expect(ride.vehicleType).to.equal("Sedan");
    expect(ride.pickup).to.equal("Location A");
    expect(ride.drop).to.equal("Location B");
    expect(ride.price).to.equal(1000);
    expect(ride.status).to.equal("requested");
    expect(ride.txId).to.equal(txId);
  });
});
