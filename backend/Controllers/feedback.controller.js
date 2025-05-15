import { asyncHandler } from "../Utils/asyncHandler.js";
import { feedback } from "../Models/Feedback.model.js";
import { registration } from "../Models/Registration.model.js";
import {ApiError,ApiResponse} from "../Utils/index.js";

const showFeedback=asyncHandler(async (req,res)=>{

    const {_id} = req.query;

    const events=await feedback.find({event_id:_id});
    if(!events){
        throw new ApiError(400,"No Feedback found");
    }
    res
    .status(200)
    .json(new ApiResponse(200,events,"Feedbacks"))
})

const addFeedback=asyncHandler(async (req,res)=>{
  const {_id,ratting,comment}=req.body;

  const user=req.user;

  const isRegistered = await registration.findOne({'event_id':_id , 'attendee_id':user.id}); // checking user is participated for event or not.

  if(!isRegistered){
      throw new ApiError(400,"You are not registered for this event");
  }
 
  const new_event = await feedback.create({
    attendees_id:user._id,
    attendees_name:user.name,
    event_id:_id,
    ratting,
    comment
  });


  const isAdded=await feedback.findById(new_event._id);

  if(!isAdded){
      return new ApiError(400,"Something went wrong ");
  }

  res
  .status(200)
  .json(new ApiResponse(200,{},"Feedback submitted succesfully"))
})

export {
    showFeedback,
    addFeedback
}