import mongoose from "mongoose";

const OfferedRideSchema=mongoose.Schema({
    ride_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"live_ride"
    },
    driver_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"driver"
    }
},
{
    timestamps: true
}
)

export const offeredRide=mongoose.model("offeredRide",OfferedRideSchema);