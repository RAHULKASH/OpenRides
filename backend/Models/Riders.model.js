import mongoose from "mongoose";
import bcrypt from "bcrypt";

const RidersSchema=mongoose.Schema({
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
    rides_count:{
        type:Number,
        required:true
    },
    ratings:{
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




export const rider=mongoose.model("rider",RidersSchema);