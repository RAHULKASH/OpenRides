import React from 'react';
import {RideRequestCard} from "./RideRequestCard";
import { useEffect,useState } from 'react';
import { ActiveRidesCard } from './ActiveRidesCard';
import axios from 'axios';
import {toast} from "react-toastify"


export const AvailableRideRequest = ({auth}) => {

  const [requestedRides,setRequestedRides]=useState([]);
  const [activeRides,setActiveRides]=useState([]);

  useEffect(() => {
  if (!auth) return;

  const fetchRides = async () => {
    try {
      const [requestedRes, activeRes] = await Promise.all([
        axios.get("/api/events/requestedRides"),
        axios.post("/api/events/allRides", { metamask: auth.metamask }),
      ]);

      if (requestedRes.data.data.length) {
        setRequestedRides(requestedRes.data.data);
      }

      if (activeRes) {
        setActiveRides(activeRes.data.data);
        console.log(activeRes);
      }
    } catch (error) {
      toast(error);
      console.error("Error fetching rides:", error);
    }
  };

  const interval = setInterval(fetchRides, 10000);
  fetchRides(); // initial fetch

  return () => clearInterval(interval);
}, [auth]);

  return (
    <div className='w-full'>

    {activeRides.length!=0 &&
    
          <div className='w-full  p-8'>
          <p className='text-[2rem] text-gray-600 '>Your Active Rides</p>
          <div className='flex flex-row gap-6 flex-wrap  justify-evenly'>
           {activeRides.map((ride) => {
            return <ActiveRidesCard ride={ride} key={ride._id}/>;
           })}
          </div>
        </div>
        }

    {requestedRides.length!=0 &&
    
          <div className='w-full  p-8'>
          <p className='text-[2rem] text-gray-600 '>Requested Rides</p>
          <div className='flex flex-row gap-6 flex-wrap items-center justify-evenly'>
           {requestedRides.map((ride) => {
            return <RideRequestCard ride={ride} key={ride._id} auth={auth}/>;
           })}
          </div>
        </div>
        }
    </div>
  )
}

