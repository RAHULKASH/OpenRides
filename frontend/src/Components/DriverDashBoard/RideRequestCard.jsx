import React,{useState} from "react";
import icon from '../../assets/IMG3.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';


export const RideRequestCard = ({ride,auth}) => {

  const [offer,setOffer]=useState(false);

  function handleSubmit(){

    if(auth!=null){

      const body={
        ride_id:ride._id,
        driver_id:auth._id
      }
    
      axios.post(`/api/events/offerRide`,body)
          .then((response)=>{
            const data=response.data;
            if(data){
              toast.success(data.message);
              setOffer(true);
            }
          })
          .catch((error)=>{
            toast.error(error.response.data.message);
          })
        }
  }

  return (
    <div className="max-w-md w-full p-4 animate-fade-in-up">
      <div className="bg-white shadow-lg rounded-2xl p-5 space-y-4">
        {/* Rider Info */}
        <div className="flex items-center flex-row gap-4 w-full">
          <img
            src={icon}
            alt="Rider"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-bold text-gray-500">{ride.rider_name}</p>
            <pre className="text-gray-500 text-sm ">
              {ride.date}  {ride.time}
            </pre>
          </div>
          <div className="mx-auto flex flex-row gap-1">
            <p className="justify-self-end">{ride.rider_ratings}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-300">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
            </svg>

          </div>
        </div>

        {/* Ride Route */}
        <div className="flex items-center space-x-2 text-gray-700">
          <svg
            className="h-5 w-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
          </svg>
          <span>{ride.starting}</span>
          <svg
            className="h-4 w-4 text-gray-400 mx-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" strokeWidth="2" />
          </svg>
          <svg
            className="h-5 w-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
          </svg>
          <span>{ride.destination}</span>
        </div>

        {/* Price */}
        <div className="flex flex-row justify-between 0">
          <button onClick={handleSubmit} className={`text-white ${!offer?"bg-green-400 hover:bg-green-500":"bg-red-400 hover:bg-red-500"}  px-4 py-1 rounded font-semibold`}>{!offer?"Offer Ride":"Offered"} </button>
         <p className="text-xl font-bold text-blue-600"> ₹{ride.price}</p>
        </div>
      </div>
    </div>
  );
};