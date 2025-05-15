import React, { useState } from 'react';
import Bike from "../../assets/vehicles/Bike.png";
import Mini from "../../assets/vehicles/Mini.png";
import Sedan from "../../assets/vehicles/Sedan.png";
import SUV from "../../assets/vehicles/SUV.png";
import HatchBack from "../../assets/vehicles/HatchBack.png";
import Auto from "../../assets/vehicles/Auto.png";

export const SearchRide = () => {

  const [Vehicle, setVehicle] = useState("Mini");


  const activeVehicle="flex items-center space-x-2 text-black font-semibold border-b-2 border-black pb-1";
  const inAvtiveVechile="flex items-center space-x-2 text-black font-semibold pb-1 hover:border-b-2 hover:border-gray-300";

  return (
    <div className="flex flex-row flex-wrap justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 w-full max-w-5xl overflow-hidden bg-gray-100">
        {/* Left Section */}
        <div className="p-8 bg-white shadow-lg rounded-2xl">
          <h1 className="text-4xl font-bold mb-6">Go anywhere with Open Ride</h1>
          <div className="flex space-x-4 mb-6 justify-evenly flex-wrap">
          <button className={Vehicle==="Bike"?activeVehicle:inAvtiveVechile} onClick={()=>setVehicle("Bike")}>
              <img src={Bike} alt='Bike' className='h-8 w-10'/>
          </button>
          <button className={Vehicle==="Mini"?activeVehicle:inAvtiveVechile} onClick={()=>setVehicle("Mini")}>
              <img src={Mini} alt='Mini' className='h-8 w-10'/>
          </button>
          <button className={Vehicle==="Sedan"?activeVehicle:inAvtiveVechile} onClick={()=>setVehicle("Sedan")}>
              <img src={Sedan} alt='Sedan' className='h-8 w-10'/>
          </button>
          <button className={Vehicle==="HatchBack"?activeVehicle:inAvtiveVechile} onClick={()=>setVehicle("HatchBack")}>
              <img src={HatchBack} alt='HatchBack' className='h-8 w-10'/>
          </button>
          <button className={Vehicle==="SUV"?activeVehicle:inAvtiveVechile} onClick={()=>setVehicle("SUV")}>
              <img src={SUV} alt='SUV' className='h-8 w-10'/>
          </button>
          <button className={Vehicle==="Auto"?activeVehicle:inAvtiveVechile} onClick={()=>setVehicle("Auto")}>
              <img src={Auto} alt='Auto' className='h-8 w-10'/>
          </button>
          </div>

          <div className="space-y-8 mb-6">  
            <div>
              <div className="flex items-center p-3 outline outline-gray-100 rounded-xl">
                <div className='w-full'>
                  <input className="block text-sm text-gray-600 w-full px-1  focus:outline-none" placeholder='Enter your Starting Location'/>
                </div>
                <button className="text-gray-500">✕</button>
              </div>
            </div>

            <div>
              <div className="flex items-center p-3 outline outline-gray-100 rounded-xl">
                <div className='w-full'>
                <input className="block text-sm text-gray-600 w-full px-1  focus:outline-none" placeholder='Enter you Destination'/>
                </div>
                <button className="text-gray-500">✕</button>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button className="flex items-center space-x-2 bg-gray-100 py-2 px-4 rounded-lg">
              <div size={20} />
              <span>Today</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 py-2 px-4 rounded-lg">
              <div size={20} />
              <span>Now</span>
            </button>
          </div>

          <div className="w-full py-3 text-white bg-black rounded-lg mt-4 text-center">Check Avilability</div>

          <p className="text-center text-gray-500 mt-4">Log in to see your recent activity</p>
        </div>

        {/* Right Section (Map Placeholder) */}
        <div className="md:block min-h-96 bg-gray-300 shadow-xl rounded-2xl"> {/* Placeholder for the map */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-600">Map Display Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  )
}
