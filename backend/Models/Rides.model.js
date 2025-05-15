import mongoose from "mongoose"

const RidesSchema=mongoose.Schema({
    status:{
        type:String,
        required:true
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
       },
    
       driver_name:{
        type:String,
       },
    
       driver_ratings:{
        type:Number,
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

export const ride=mongoose.model("ride",RidesSchema);