// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RideRegistry {
    struct Ride {
        string rideId;
        address rider;
        address driver;
        string pickup;
        string drop;
        uint256 price;
        string status; // progress,incomplete , completed
        string vehicle_number;
        string date;
        string time;
        string duration;
        uint8 riderRating;  // 1 to 5
        uint8 driverRating; // 1 to 5
        string txId;
    }

    uint public rideCount = 0;
    mapping(string => Ride) public rides;

    event RideCreated(string indexed rideId, address indexed rider, string txId);
    event RideStatusUpdated(string indexed rideId, string status);
    event DriverRated(string indexed rideId, uint8 rating);
    event RiderRated(string indexed rideId, uint8 rating);
    event TxIdUpdated(string indexed rideId, string txId);

    function createRide(
        string memory rideId,
        address rider,
        address driver,
        string memory pickup,
        string memory drop,
        uint256 price,
        string memory vehicle_number,
        string memory date,
        string memory time,
        string memory duration,
        string memory txId
    ) public returns (string memory) {
        require(rides[rideId].rider == address(0), "Ride ID already exists");

        rideCount++;
        rides[rideId] = Ride(
            rideId,
            rider,
            driver,
            pickup,
            drop,
            price,
            vehicle_number,
            "progress",
            date,
            time,
            duration,
            0,
            0,
            txId
        );

        emit RideCreated(rideId, rider, txId);
        return rideId;
    }

    function updateStatus(string memory rideId, string memory newStatus) public {
        Ride storage ride = rides[rideId];
        require(ride.rider != address(0), "Ride not found");
        require(msg.sender == ride.rider || msg.sender == ride.driver, "Not authorized");

        ride.status = newStatus;
        emit RideStatusUpdated(rideId, newStatus);
    }

    function updateDriverRating(string memory rideId, uint8 rating) public {
        require(rating <= 5, "Invalid rating");
        Ride storage ride = rides[rideId];
        require(ride.rider != address(0), "Ride not found");
        require(msg.sender == ride.rider, "Only rider can rate the driver");

        ride.driverRating = rating;
        emit DriverRated(rideId, rating);
    }

    function updateRiderRating(string memory rideId, uint8 rating) public {
        require(rating <= 5, "Invalid rating");
        Ride storage ride = rides[rideId];
        require(ride.rider != address(0), "Ride not found");
        require(msg.sender == ride.driver, "Only driver can rate the rider");

        ride.riderRating = rating;
        emit RiderRated(rideId, rating);
    }

    function updateTxId(string memory rideId, string memory newTxId) public {
        Ride storage ride = rides[rideId];
        require(ride.rider != address(0), "Ride not found");
        require(msg.sender == ride.rider || msg.sender == ride.driver, "Not authorized");

        ride.txId = newTxId;
        emit TxIdUpdated(rideId, newTxId);
    }

    function getRide(string memory rideId) public view returns (Ride memory) {
        require(rides[rideId].rider != address(0), "Ride not found");
        return rides[rideId];
    }
}
