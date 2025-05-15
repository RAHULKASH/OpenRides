
import mongoose from "mongoose"
const LiveRidesSchema=mongoose.Schema({

   status:{
    type:String,
    default:"requested",
   },

   vehicle_type:{
    type:String,
    required:true
   },

   rider_metamask:{
    type:String,
    required:true
   },

   rider_name:{
    type:String,
    required:true
   },

   rider_ratings:{
    type:Number,
    required:true
   },

   driver_metamask:{
    type:String,
    default:null,
   },

   driver_name:{
    type:String,
    default:null,
   },

   driver_ratings:{
    type:Number,
    default:null,
   },

    starting:{
    type:String,
    required:true
   },

    destination:{
    type:String,
    required:true
   },

    price:{
    type:Number,
    required:true
   },

    date:{
    type:String,
    required:true
    },

    time:{
    type:String,
    required:true
    },

    duration:{
    type:String,
    required:true
    },

},
{
    timestamps: true
}
)



export const live_ride=mongoose.model("live_ride",LiveRidesSchema);