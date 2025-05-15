import mongoose from "mongoose";
import bcrypt from "bcrypt";

const DriversSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    number:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    vehicle_name:{
        type:String,
        required:true
    },
    vehicle_number:{
        type:String,
        required:true
    },
    vehicle_type:{
        type:String,
        required:true
    },
    driving_license:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    },
    rides_count:{
        type:Number,
        required:true
    },
    metamask:{
        type:String,
        required:true
    }
},
{
    timestamps: true
}
);



export const driver=mongoose.model("driver",DriversSchema);