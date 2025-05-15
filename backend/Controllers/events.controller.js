import { live_ride,ride,rider,driver,offeredRide } from "../Models/index.js";
import { ApiError,ApiResponse,asyncHandler } from "../Utils/index.js";

//import {mailForEventRegistration } from "../Utils/notification.js"

const requestRide=asyncHandler(async (req,res)=>{

    const {vehicle_type,rider_metamask,rider_name,rider_ratings,starting,destination,price,date,time,duration}=req.body;
   
    const new_event = await live_ride.create({
        status:"requested",
        driver_metamask:null,
        driver_name:null,
        driver_ratings:null,
        vehicle_type,
        rider_metamask,
        rider_name,
        rider_ratings,
        starting,
        destination,
        price,
        date,
        time,
        duration
    });

    const addedEvent=await live_ride.findById(new_event._id);

    if(!addedEvent){
        return new ApiError(400,"Something went wrong while creating Ride not created");
    }

    res
    .status(200)
    .json(new ApiResponse(200,addedEvent,"Ride created succesfully"))
    
})

const requestedRides=(async (req,res)=>{


    const requestedRides=await live_ride.find({status:"requested"});

    if(!requestedRides){
        return new ApiError(400,"No rides are requested");
    }

    res
    .status(200)
    .json(new ApiResponse(200,requestedRides,"Requested Rides"))
    
})

const rideStatus=(async (req,res)=>{

    const {rider_metamask} = req.body;

    const rides=await live_ride.find({status: { $in: ["requested", "progress"] },rider_metamask:rider_metamask});

    if(rides.length===0){
        return new ApiError(400,"No rides are requested");
    }

    res
    .status(200)
    .json(new ApiResponse(200,rides,"Requested Rides"))
    
})


const completeRide=asyncHandler(async (req,res)=>{
   const {_id} = req.body;

   const store=await live_ride.findByIdAndUpdate(_id,{status:"Completed"});

   if(!store){
    return new ApiError(400,"Something went wrong while completing Ride");
    }

    const {status,vehicle_type,rider_metamask,rider_name,rider_ratings,driver_metamask,driver_name,driver_ratings,starting,destination,price,date,duration}=await live_ride.findById(_id);

    const new_ride= await ride.create({  // Adding data of new user to database.
        status,
        vehicle_type,
        rider_metamask,
        rider_name,
        rider_ratings,
        driver_metamask,
        driver_name,
        driver_ratings,
        starting,
        destination,
        price,
        date,
        duration
    });

    if(!new_ride){
        return new ApiError(400,"Something went wrong while completing Ride");
        }
   
   const eventDelete = await live_ride.findByIdAndDelete(_id);
   
   if(!eventDelete){
    throw new ApiError(400,"Something went wrong while deleting live ride");
   }
   
   res
   .status(200)
   .json( new ApiResponse(200,{},"Ride completed Successfuly"));
})

const allRides=asyncHandler(async (req,res)=>{

    const {metamask}=req.body;

    const events=await live_ride.find({ driver_metamask: metamask, status: "progress" });

    if(!events){
        throw new ApiError(400,"No Rides found");
    }
    res
    .status(200)
    .json(new ApiResponse(200,events,"All Rides"))
})

const riderDetails=asyncHandler(async (req,res)=>{

    const {_id}=req.query;

    const riderDetails= await rider.findById(_id);

    if(!riderDetails){
        throw new ApiError(400,"Rider not found");
    }

    res
    .status(200)
    .json(new ApiResponse(200,riderDetails,"Rider details"))
})

const driverDetails=asyncHandler(async (req,res)=>{

    const {_id}=req.query;

    const riderDetails= await driver.findById(_id);

    if(!riderDetails){
        throw new ApiError(400,"Driver not found");
    }

    res
    .status(200)
    .json(new ApiResponse(200,riderDetails,"Driver details"))
})

const endRide=asyncHandler(async (req,res)=>{

    const {_id} = req.body;

    const store=await live_ride.findByIdAndUpdate(_id,{status:"InComplete"});

    if(!store){
    return new ApiError(400,"Something went wrong while Ending Ride");
    }

    const {status,vehicle_type,rider_metamask,rider_name,rider_ratings,driver_metamask,driver_name,driver_ratings,starting,destination,price,date,time,duration}=await live_ride.findById(_id);

    const new_ride= await ride.create({  // Adding data of new user to database.
        status,
        vehicle_type,
        rider_metamask,
        rider_name,
        rider_ratings,
        driver_metamask,
        driver_name,
        driver_ratings,
        starting,
        destination,
        price,
        date,
        time,
        duration
    });
 
     if(!new_ride){
         return new ApiError(400,"Something went wrong while completing Ride");
         }
    
    const eventDelete = await live_ride.findByIdAndDelete(_id);
    
    if(!eventDelete){
     throw new ApiError(400,"Something went wrong while deleting event");
    }
    
    res
    .status(200)
    .json( new ApiResponse(200,{},"Ride Ended Successfuly"));
    
})

const updateDriverRating=asyncHandler(async (req,res)=>{
    const {_id,ratings,rides_count}=req.body;

    const update=await driver.findByIdAndUpdate(_id,{ratings:ratings,rides_count:rides_count});

    if(!update){
        throw new ApiError(400,"Something went wrong while updating Driver");
    }

    res
    .status(200)
    .json(new ApiResponse(200,{},"Driver status updated successfully"))
})

const updateRiderRating=asyncHandler(async (req,res)=>{
    const {_id,ratings,rides_count}=req.body;

    const update=await rider.findByIdAndUpdate(_id,{ratings:ratings,rides_count:rides_count});

    if(!update){
        throw new ApiError(400,"Something went wrong while updating Rider");
    }

    res
    .status(200)
    .json(new ApiResponse(200,{},"Rider status updated successfully"))
})
 
const offerRide=asyncHandler(async (req,res)=>{
    const {ride_id,driver_id}=req.body;

    const alreadyOffered = await offeredRide.findOne({ride_id ,driver_id}); 
    if(alreadyOffered){
        throw new ApiError(400,"You are already Offered a ride");
    }

    const registerForOffered= offeredRide.create({
        ride_id:ride_id,
        driver_id:driver_id
    })

    if(!registerForOffered){
        throw new ApiError(400,"Something went wrong while offering ride");
    }

    res
    .status(200)
    .json(new ApiResponse(200,{},"Ride offered successfully"))
})

const rideAccepted=asyncHandler(async (req,res)=>{
    const {_id ,driver_metamask, driver_name , driver_ratings}=req.body;

    const acceptRide=await live_ride.findByIdAndUpdate(_id,{status:"progress",driver_metamask:driver_metamask,driver_name:driver_name,driver_ratings:driver_ratings});

    if(!acceptRide){
        throw new ApiError(400,"Something went wrong while accepting ride");
    }
 
    const updatedRide=await live_ride.findById(_id);

    const deletOffering=await offeredRide.deleteMany({ ride_id: _id });
    
    res
    .status(200)
    .json(new ApiResponse(200,updatedRide,"Ride in Progress"));
})

const allOffers=asyncHandler(async (req,res)=>{
    const {ride_id}=req.body;

    const allOffers=await offeredRide.find({ ride_id})
    
    res
    .status(200)
    .json(new ApiResponse(200,allOffers,"Rides Offered"))
})


// Controller to get available drivers by list of IDs
const getAvailableDrivers = async (req, res) => {
  try {
    const { ids } = req.body; // assuming POST request with JSON body like { "ids": ["id1", "id2", ...] }

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.res
    .status(200)
    .json(new ApiResponse(200,[],"No Rides available"));
    }
    
    // Find drivers with matching IDs and availability
    const drivers = await driver.find({
      _id: { $in: ids }
    });

    return res
    .status(200)
    .json(new ApiResponse(200,drivers,"Rides Offered"));

  } catch (error) {
    console.error("Error fetching drivers:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


export {
    requestRide,
    requestedRides,
    rideStatus,
    completeRide,
    allRides,
    riderDetails,
    driverDetails,
    endRide,
    updateDriverRating,
    updateRiderRating,
    offerRide,
    rideAccepted,
    allOffers,
    getAvailableDrivers
}