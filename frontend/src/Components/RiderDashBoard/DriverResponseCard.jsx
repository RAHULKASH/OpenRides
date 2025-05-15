import React from 'react';
import axios from 'axios';
import {toast} from "react-toastify";

import { getContract } from "../../web3/contract";

export const DriverResponseCard = ({info,auth}) => {

 async function handleAccept(){
     alert("Do you want to Activate this ride !");
     const contract = await getContract();
     if (!contract) return;

      const tx = await contract.createRide(
      info.rideDetails._id,
      auth.metamask,
      info.metamask, // driver address
      info.rideDetails.starting,
      info.rideDetails.destination,
      info.rideDetails.price , // sample price
      info.vehicle_number,
      info.rideDetails.date,
      info.rideDetails.time,
      info.rideDetails.duration,
      info.rideDetails._id // txId used as reference
    );

    const receipt = await tx.wait();
    console.log("Ride created on blockchain, Tx:", receipt.transactionHash);

    const body={
      _id:info.rideDetails._id,
      driver_name:info.name,
      driver_metamask:info.metamask,
      driver_ratings:info.ratings,
    }
    
    axios.post(`/api/events/rideAccepted`,body)
        .then((response)=>{
          const data=response.data;
          toast.success(data.message);
        })
        .catch((error)=>{
          if (error.response) {
            const data = error.response.data;
            toast.error(data.message || 'An error occurred');
            console.error('Error response:', data);
          } else if (error.request) {
            toast.error('No response received from server');
            console.error('Error request:', error.request);
          } else {
            toast.error('Error: ' + error.message);
            console.error('Error message:', error.message);
          }
        })
  }

  return (

<div class=" max-w-96 mt-16 bg-white shadow-xl rounded-lg text-gray-900 ">
    <div class="rounded-t-lg h-32 overflow-hidden">
        <img class="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
    </div>
    <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img class="object-cover object-center h-32" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front'/>
    </div>
    <div class="text-center mt-2 px-4">
        <h2 class="font-semibold">{info.name}</h2>
        <p class="text-gray-500">{info.number}</p>
        <p class="text-gray-500 text-sm p-2 text-gray-700">{info.rideDetails.starting} - {info.rideDetails.destination}</p>
    </div>
    <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li class="flex flex-col items-center justify-around">
            <svg class="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <div>{info.ratings}</div>
        </li>
        <li class="flex flex-col items-center justify-between">
            <svg class="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            <div>{info.rides_count}</div>
        </li>
        <li class="flex flex-col items-center justify-around">
            <svg class="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg>
            <div>{info.experience}</div>
        </li>
    </ul>
    <div class="p-4 border-t mx-8 mt-2" onClick={handleAccept}>
        <button class="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Accept</button>
    </div>
</div>

  )
}
