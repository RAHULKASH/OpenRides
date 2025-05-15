import { asyncHandler } from "../Utils/asyncHandler.js";

const attendeeView=asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})

const organizerView=asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})

const facultyView=asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})

export {
    attendeeView,
    organizerView,
    facultyView
}