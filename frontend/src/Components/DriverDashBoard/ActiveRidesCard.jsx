import React from 'react';
import { RefreshCw, User2, MapPin, Calendar } from "lucide-react";

export const ActiveRidesCard = ({ride}) => {
  return (
    <div className="w-96 mt-6 bg-white border border-gray-300 rounded-2xl shadow-lg p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Ride</h2>
        <div className="flex items-center gap-2 text-green-600 font-medium">
          <RefreshCw className="animate-spin" size={20} />
          In Progress
        </div>
      </div>

      <div className="space-y-4 text-gray-700">
        <div className="flex items-center gap-2">
          <User2 className="text-gray-600" size={20} />
          <p><span className="font-medium">Rider:</span> {ride.rider_name}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-gray-600" size={20} />
          <p><span className="font-medium">Pickup:</span> {ride.starting}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-gray-600" size={20} />
          <p><span className="font-medium">Destination:</span> {ride.destination}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="text-gray-600" size={20} />
          <pre><span className="font-medium">Schedule:</span> {ride.date}   {ride.time}</pre>
        </div>
        <div className="flex items-center gap-2">
          <p><span className="font-medium">Fare:</span> ₹{ride.price}</p>
        </div>
      </div>
    </div>
  )
}
