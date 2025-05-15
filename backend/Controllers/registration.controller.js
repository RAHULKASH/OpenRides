import { asyncHandler,ApiError,ApiResponse } from "../Utils/index.js";
import { rider , driver } from "../Models/index.js"
import {mailForRegistration} from "../Utils/notification.js"


const registerAsRider=asyncHandler(async (req,res)=>{
    const {name ,email, number, gender , address , metamask} = req.body;

    const user = await rider.findOne({metamask}); // checking user is already exist or not.

    if(user){
        throw new ApiError(400,"User Already Exist");
    }

    const new_user= await rider.create({  // Adding data of new user to database.
        name,
        email,
        number,
        gender,
        address,
        rides_count:0,
        ratings:0,
        metamask
    });

    const createdUser = await rider.findById(new_user._id).select()// returning user data .

    if(!createdUser){
        throw new ApiError(500,"Something went wrong");
    }

    // mailForRegistration(createdUser);

    res
    .status(200)
    .json(new ApiResponse(200,createdUser,"User Registered successfully"))
})

const registerAsDriver=asyncHandler(async (req,res)=>{

    const {name ,email, number, gender , address , vehicle_name , vehicle_type , vehicle_number , driving_license , experience  , metamask } = req.body;

    const user = await driver.findOne({metamask}); // checking user is already exist or not.

    if(user){
        throw new ApiError(400,"User Already Exist");
    }

    const new_user=await driver.create({ // Adding data of new user to database.
        name ,email, number, gender , address , vehicle_name , vehicle_type , vehicle_number , driving_license , experience , ratings:0 , rides_count:0 , metamask
    });

    const createdUser = await driver.findById(new_user._id).select();

    if(!createdUser){
        throw new ApiError(500,"Something went wrong");
    }

    mailForRegistration(createdUser);

    res
    .status(200)
    .json(new ApiResponse(200,createdUser,"User Registered successfully"))
})



const loginAsRider=asyncHandler(async (req,res)=>{

    const {metamask}=req.body;

    if(!metamask){      // checking Metamask is provided or not by user.
        throw new ApiError(400,"Metamask is required");
    }

    const user = await rider.findOne({metamask});       // checking user data on server.
    
    if(!user){ 
        throw new ApiError(404,"User not Exist");
    }

    
    return res  // genrating response
    .status(200)
    .json(
        new ApiResponse(200,user,"Login Successfull")
        )
})

const loginAsDriver=asyncHandler(async (req,res)=>{

    
    const {metamask}=req.body;

    if(!metamask){      // checking metamask is provided or not by user.
        throw new ApiError(400,"Metamask is required");
    }

    const user = await driver.findOne({metamask});       // checking user data on server.
    
    if(!user){ 
        throw new ApiError(404,"User not Exist");
    }
    
    
    return res      // genrating response
    .status(200)
    .json(
        new ApiResponse(200,user,"Login Successfull")
        )
})




export { 
    registerAsRider,
    registerAsDriver,
    loginAsRider,
    loginAsDriver,
};