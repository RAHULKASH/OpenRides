import mongoose from "mongoose";

const feedbackSchema=mongoose.Schema({
    attendees_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"attendee"
    },
    attendees_name:{
        type:String,
        required:true
    },
    event_id:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"event"
    },
    ratting:{
        type:Number,
        require:true
    },
    comment:{
        type:String,
        require:true
    }
},
{
    timestamps: true
}
)

export const feedback=mongoose.model("feedback",feedbackSchema);