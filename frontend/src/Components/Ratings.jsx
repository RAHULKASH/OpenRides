import React, { useState } from "react";
import { Star } from "lucide-react";
import { getContract } from"../web3/contract.js";
import {useNavigate} from "react-router-dom";

export const Ratings = ({ rateView, setRateView ,rideId,setRideId}) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const navigate=useNavigate();

  if (!rateView) return null;

  async function handleConfirm(){
     try {
        const contract = await getContract();
        if (!contract) {
          toast.error("Smart contract not available");
          return;
        }
    
        const rideId = ride._id;
        // Update status to 'completed'
        const tx = await contract.updateStatus(rideId, "Completed");
        await tx.wait(); // Wait for the transaction to be mined
        toast.success("Ride status updated on blockchain");
    
        // Now call your backend API
        const body = { _id: ride._id };
        const response = await axios.put(`/api/events/completeRide`, body);
        toast.success(response.data.message);
        navigate('/riderDashboard');
    
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
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md border border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Rate Your Experience</h2>

        {/* Rating Input */}
         <div className="flex justify-center mb-6 space-x-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="focus:outline-none"
            >
              <Star
                size={32}
                className={`transition-colors ${
                  (hovered || rating) >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={(hovered || rating) >= star ? "#facc15" : "none"}
              />
            </button>
          ))}
        </div>

        {/* Confirm + Cancel Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="bg-gray-800 text-white px-5 py-2 rounded-xl hover:bg-gray-700 transition"
          >
            Confirm
          </button>
          <button
            onClick={()=>{setRateView(false);setRideId(null);}}
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded-xl hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

