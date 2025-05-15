import {Router} from "express";
import {requestRide,requestedRides,rideStatus,completeRide,allRides,riderDetails,driverDetails,endRide,updateDriverRating,updateRiderRating,offerRide,rideAccepted,allOffers,getAvailableDrivers} from "../Controllers/events.controller.js";

const router=Router();

//route for reqesting ride
router.route("/requestRide").post(requestRide);

//route for getting all the requested rides
router.route("/requestedRides").get(requestedRides);

//route for getting ride status
router.route("/rideStatus").post(rideStatus);

//route for completing ride
router.route("/completeRide").put(completeRide);

//route for all Rides
router.route("/allRides").post(allRides);

//route for Rider Detais
router.route("/riderDetails").get(riderDetails);

//route for Driver Details
router.route("/driverDetails").get(driverDetails);

//route for Ending ride
router.route("/endRide").put(endRide);

//route for update driver ratings
router.route("/updateDriverRating").put(updateDriverRating);

//route for update rider ratings
router.route("/updateRiderRating").put(updateRiderRating);

//route for offering rides
router.route("/offerRide").post(offerRide);

//route for Accepting ride
router.route("/rideAccepted").post(rideAccepted);

//route for getting all offers
router.route("/allOffers").post(allOffers);

//route for getting all drivers offers
router.route("/getAvailableDrivers").post(getAvailableDrivers)

export default router