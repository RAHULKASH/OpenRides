import React from 'react'

export const HistoryCard = ({ride,auth}) => {
  return (
    <div class="sm:min-w-92  mt-6 p-6 bg-gray-800 text-gray-100 rounded-2xl shadow-lg transition-transform hover:scale-105">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h2 class="text-xl font-semibold">Ride Details</h2>
    </div>
    <span class={`text-sm ${ride.status==="Completed"?"bg-green-600 text-white":"bg-red-600 text-white"} px-2 py-1 rounded-full`}>{ride.status==="Completed"?"Completed":"Not Completed"}</span>
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
      <div class="text-gray-400">{auth.driver_metamask?"Rider :":"Driver :"}</div>
      <p class="font-medium">{auth.driver_metamask?ride.rider_name:ride.driver_name}</p>
    </div>
    <div>
      <div class="text-gray-400">Vehicle:</div>
      <p class="font-medium">{ride.vehicle_type}</p>
    </div>
    {auth.driver_metamask && <div>
      <div class="text-gray-400">Vehicle number:</div>
      <p class="font-medium">{ride.vehicle_number}</p>
    </div>}
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
</div>
  )
}
