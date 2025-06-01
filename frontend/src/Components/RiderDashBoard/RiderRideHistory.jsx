import React from 'react';
import {HistoryCard} from "../HistoryCard";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

export const RiderRideHistory = ({auth}) => {

  const [rides,setRides]=useState([]);

  const body={
    rider_metamask:auth.metamask
  }

  useEffect(()=>{
     axios.post('/api/events/allRiderRides',body)
     .then((response)=>{
            const data=response.data;
            console.log(data);
            if(data){
              toast.success(data.message);
              setRides(data.data);
            }
          })
          .catch((error)=>{
            toast.error(error.response.data.message);
      })
  },[])

  return (
    <div className='flex flex-row flex-wrap justify-center items-center p-8 pb-16 gap-4'>
      {
        rides.length!=0 && 
        rides.map((ride)=>{
          return <HistoryCard ride={ride} auth={auth}/>
        })
      }
    </div>
  )
}
