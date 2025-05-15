import {asyncHandler,ApiError} from "../Utils/index.js";
import jwt from "jsonwebtoken";
import {attendee,organizer,faculty} from "../Models/index.js"; 


const verifyJWTAttendee = asyncHandler(async(req,_, next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await attendee.findById(decodedToken?._id).select("-password")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})

 const verifyJWTOrganizer = asyncHandler(async(req,_, next) => {
    try {
        
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        console.log(req.cookies);

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await organizer.findById(decodedToken?._id).select("-password")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token ")
        }

        req.user = user;

        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token ")
    }

})

 const verifyJWTFaculty = asyncHandler(async(req,_, next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await faculty.findById(decodedToken?._id).select("-password");
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
        
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})

export {
    verifyJWTRider,
    verifyJWTDriver,
    verifyJWTFaculty
}