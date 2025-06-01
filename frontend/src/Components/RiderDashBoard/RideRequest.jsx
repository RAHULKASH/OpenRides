import React, { useState ,useEffect} from 'react';
import Bike from "../../assets/vehicles/Bike.png";
import Mini from "../../assets/vehicles/Mini.png";
import Sedan from "../../assets/vehicles/Sedan.png";
import SUV from "../../assets/vehicles/SUV.png";
import HatchBack from "../../assets/vehicles/HatchBack.png";
import Auto from "../../assets/vehicles/Auto.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import { RideStatusCard } from './RideStatusCard';
import {DriverResponseCard} from './DriverResponseCard';
import { Ratings } from '../Ratings';

//import {useNavigation} from "react-router-dom";

export const RideRequest = ({auth,state,setState}) => {

  const [Vehicle, setVehicle] = useState("Mini");
  const [isScheduled, setIsScheduled] = useState(false);
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [price,setPrice]=useState(299);
  const [currentRides,setCurrentRides]=useState([]);
  const [drivers,setDrivers]=useState([]);
  const [rateView,setRateView]=useState(false);
  const [rideDetails,setRideDetails]=useState({});
 // const navigate=useNavigation();
  const today = new Date();

  const activeVehicle="flex items-center space-x-2 text-black font-semibold border-b-2 border-black pb-1";
  const inActiveVehicle="flex items-center space-x-2 text-black font-semibold pb-1 hover:border-b-2 hover:border-gray-300";

const vehicleImages = {
  Bike,
  Mini,
  Sedan,
  SUV,
  HatchBack,
  Auto,
};

  useEffect(() => {
  if (auth != null) {
    const fetchRideStatusAndOffers = async () => {
      try {
        // Fetch current rides
        const rideStatusRes = await axios.post(`/api/events/rideStatus`, {
          rider_metamask: auth.metamask,
        });

        const rides = rideStatusRes.data.data;

        if (rides.length !== 0) {
          setCurrentRides(rides);
        }

        // For each ride, fetch offered drivers
        const allDrivers = [];

        for (const ride of rides) {
          try {
            const offersRes = await axios.post("/api/events/allOffers", {
              ride_id: ride._id,
            });

            const offeredRides = offersRes.data.data;
            if (offeredRides.length === 0) continue;

            const driverIds = offeredRides.map((r) => r.driver_id);

            const driversRes = await axios.post("/api/events/getAvailableDrivers", {
              ids: driverIds,
            });

            const enriched = driversRes.data.data.map((driver) => ({
            ...driver,
            rideDetails: ride,
            }));

           allDrivers.push(...enriched);
             } catch (innerErr) {
             console.error("Error fetching offers or drivers:", innerErr);
            }
          }

        setDrivers(allDrivers); // Replace the previous list with the new one
      } catch (err) {
        console.error("Error fetching ride status:", err);
      }
    };

    // Run initially
    fetchRideStatusAndOffers();

    // Then run every 10 seconds
    const interval = setInterval(() => {
      fetchRideStatusAndOffers();
    }, 10000);

    return () => clearInterval(interval); // cleanup
  }
}, [auth]);
  
  async function handleSubmit(e) {
  e.preventDefault();

  const currentDate = new Date();
  const selectedDate = isScheduled ? rideDate : currentDate.toISOString().split("T")[0];
  const selectedTime = isScheduled ? rideTime : currentDate.toTimeString().slice(0, 5); // "HH:MM"

  const body = {
    vehicle_type: Vehicle,
    rider_metamask: auth.metamask,
    rider_name: auth.name,
    rider_ratings: auth.ratings,
    starting: e.target.starting.value,
    destination: e.target.destination.value,
    price: e.target.price.value,
    date: selectedDate, // e.g., "2025-05-14"
    time: selectedTime, // e.g., "15:30"
    duration: 2.5
  };

  // Reset form
  e.target.starting.value = "";
  e.target.destination.value = "";
  e.target.price.value = null;

  axios.post(`/api/events/requestRide`, body)
    .then((response) => {
      const data = response.data;
      toast.success(data.message);
      if (data.data) {
        setCurrentRides([...currentRides, data.data]);
        
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        toast.error("No response received from server");
      } else {
        toast.error("Error: " + error.message);
      }
    });
}


  
  return (
    <div className="flex flex-col flex-wrap justify-center items-center min-h-screen bg-gray-100 p-8 w-full">

      <Ratings rateView={rateView} setRateView={setRateView} rideDetails={rideDetails} setRideDetails={setRideDetails}/>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 w-full max-w-5xl overflow-hidden bg-gray-100">
        {/* Left Section */}
        <form className="p-8 bg-white shadow-lg rounded-2xl" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-bold mb-6">Make your Ride</h1>

      <div className="flex space-x-4 mb-6 justify-evenly flex-wrap">
      {["Bike", "Mini", "Sedan", "HatchBack", "SUV", "Auto"].map((type) => (
        <button
          key={type}
          type="button"
          className={Vehicle === type ? activeVehicle : inActiveVehicle}
          onClick={() => setVehicle(type)}
        >
       <img src={vehicleImages[type]} alt={type} className="h-8 w-10" />
      </button>
      ))}
      </div>

      <div className="space-y-8 mb-6">
        <div className="flex items-center p-3 outline outline-gray-100 rounded-xl">
          <input
            name="starting"
            className="block text-sm text-gray-600 w-full px-1 focus:outline-none"
            placeholder="Enter your Starting Location"
            required
          />
          <button type="button" className="text-gray-500">✕</button>
        </div>

        <div className="flex items-center p-3 outline outline-gray-100 rounded-xl">
          <input
            name="destination"
            className="block text-sm text-gray-600 w-full px-1 focus:outline-none"
            placeholder="Enter your Destination"
            required
          />
          <button type="button" className="text-gray-500">✕</button>
        </div>
        <div className="flex items-center p-3 outline outline-gray-100 rounded-xl">
          <input
            type='number'
            name="price"
            className="block text-sm text-gray-600  px-1 focus:outline-none"
            placeholder="Offer Price"
            required
          />
          <p className=" text-gray-500 animate-pulse">{`Aspected ₹200`}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 mb-6 text-gray-500">
        <button
          type="button"
          onClick={() => setIsScheduled(!isScheduled)}
          className="bg-gray-700 py-2 px-4 rounded-lg text-white"
        >
          {isScheduled ? "Immediate" : "Letter"}
        </button>

        {isScheduled && (
          <>
            <input
              type="date"
              name="date"
              value={rideDate}
              onChange={(e) => setRideDate(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none"
              required
            />
            <input
              type="time"
              name="time"
              value={rideTime}
              onChange={(e) => setRideTime(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none"
              required
            />
          </>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 text-white bg-black rounded-lg mt-4 text-center"
      >
        Request Ride
      </button>
    </form>

        {/* Right Section (Map Placeholder) */}
        <div className="md:block min-h-96 bg-gray-300 shadow-xl rounded-2xl"> {/* Placeholder for the map */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-600">Map Display Placeholder</p>
          </div>
        </div>
      </div>

      {currentRides.length!=0 &&


      <div className='w-full mt-24 m-8'>
      <p className='text-[2rem] text-gray-600 '>Your Rides</p>
      <div className='flex flex-row gap-6 flex-wrap'>
          {currentRides.map((ride) => {
            return <RideStatusCard key={ride._id} ride={ride} rateView={rateView} setRateView={setRateView} setRideDetails={setRideDetails} />;
          })}
      </div>
      </div>
      }

    {drivers.length!=0 &&

      <div className='w-full mt-24 m-8'>
      <p className='text-[2rem] text-gray-600 '>Available Rides</p>
      <div className='flex flex-row gap-6 flex-wrap pt-8'>
       {drivers.map((info) => {
        return <DriverResponseCard key={ Math.floor(Math.random() * 100) + 1} info={info} auth={auth}/>;
       })}
      </div>
    </div>
    }



    </div>
  )
}
