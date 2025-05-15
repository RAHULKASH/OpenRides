import React,{useState} from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';

import { getContract } from "../../web3/contract.js";


export const RideStatusCard = ({ride,rateView,setRateView,setRideId}) => {


async function handleCompleteRide(){
    alert("Do you want to complete your ride!");
    if (!confirm) return;
    setRateView(true);
    setRideId(ride._id);
  }

  async function handleEndRide() {
  const confirm = window.confirm("Do you want to end your ride?");
  if (!confirm) return;

  try {
    const contract = await getContract();
    if (!contract) {
      toast.error("Smart contract not available");
      return;
    }

    const rideId = ride._id; // Assuming you have this from props or state
    const rideData = await contract.getRide(rideId);

    if (!rideData || rideData.rideId.toNumber() === 0) {
      toast.error("Ride not found on blockchain");
      return;
    }

    // Optionally check if it's already completed
    if (rideData.status === "completed") {
      toast.info("Ride already marked as completed");
      return;
    }

    // Update status to 'completed'
    const tx = await contract.updateStatus(rideId, "In Complete");
    await tx.wait(); // Wait for the transaction to be mined
    toast.success("Ride status updated on blockchain");

    // Now call your backend API
    const body = { _id: ride._id };
    const response = await axios.put(`/api/events/endRide`, body);
    toast.success(response.data.message);

  } catch (error) {
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
  }
}

  return (
    <div class="sm:min-w-92  mt-6 p-6 bg-gray-800 text-gray-100 rounded-2xl shadow-lg transition-transform hover:scale-105">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h2 class="text-xl font-semibold">Ride Details</h2>
      <p class="text-sm text-gray-400">Processing <span class="inline-block animate-spin ml-1">🔄</span></p>
    </div>
    <span class={`text-sm ${ride.status==="requested"?"bg-gray-700 text-gray-300":"bg-green-600 text-white"} px-2 py-1 rounded-full`}>{ride.status==="requested"?"In Progress":"Active"}</span>
  </div>

  <div class="space-y-2">
    <div>
      <span class="text-gray-400">From:</span>
      <p class="font-medium">{ride.starting}</p>
    </div>
    <div>
      <span class="text-gray-400">To:</span>
      <p class="font-medium">{ride.destination}</p>
    </div>
    <div>
      <div class="text-gray-400">Vehicle:</div>
      <p class="font-medium">{ride.vehicle_type}</p>
    </div>
    <div class="flex justify-between">
      <div>
        <span class="text-gray-400">Price:</span>
        <p class="font-medium">{ride.price}</p>
      </div>
      <div>
        <span class="text-gray-400">Date:</span>
        <p class="font-medium">{ride.date}</p>
      </div>
      <div>
        <p class="text-gray-400">Time:</p>
        <p class="font-medium">{ride.time}</p>
      </div>
    </div>
  </div>

  <div class="mt-6  flex justify-between gap-6">
    <button onClick={(handleCompleteRide)} class={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 ${ride.status==="requested"?"hidden":"block"}`}>
      Complete Ride
    </button>
    <button onClick={handleEndRide} class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 ">
      End Ride
    </button>
  </div>
</div>

  )
}
