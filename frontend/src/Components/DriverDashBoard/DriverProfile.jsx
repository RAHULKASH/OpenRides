import React, { useState } from "react";

export const DriverProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [driver, setDriver] = useState({
    name: "John Doe",
    age: 32,
    phone: "+1 234 567 8901",
    email: "john.doe@example.com",
    vehicleName: "Toyota Prius",
    vehicleType: "Sedan",
    vehicleNumber: "AB12CD3456",
    rating: 4.8,
    driverImage: "https://via.placeholder.com/100",
    vehicleImage: "https://via.placeholder.com/160x100",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // You could also send data to backend here
  };

  return (
    <div className=" h-full mx-auto mt-10 bg-gray-100 shadow-xl rounded-2xl p-6 border border-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
        <button
          onClick={isEditing ? handleSave : handleToggleEdit}
          className="bg-gray-800 text-white px-4 py-1 rounded-lg hover:bg-gray-700 transition"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={driver.driverImage}
            alt="Driver"
            className="rounded-xl w-32 h-42 object-cover border border-gray-400"
          />
          <span className="text-sm text-gray-600">Driver Photo</span>
        </div>

        <div className="md:col-span-2 space-y-2 text-gray-800">
          <div className="grid grid-cols-2 gap-4">
            {["name", "age", "phone", "email", "vehicleName", "vehicleType", "vehicleNumber", "rating"].map(
              (field) => (
                <div key={field}>
                  <label className="font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}:</label>
                  {isEditing ? (
                    <input
                      type={field === "age" || field === "rating" ? "number" : "text"}
                      name={field}
                      value={driver[field]}
                      onChange={handleChange}
                      className="w-full mt-1 p-1 border rounded-md text-gray-700"
                    />
                  ) : (
                    <p>{driver[field]}</p>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <img
          src={driver.vehicleImage}
          alt="Vehicle"
          className="rounded-xl mx-auto w-3/4 min-h-32 object-cover border border-gray-400"
        />
        <span className="text-sm text-gray-600 mt-1 block">Vehicle Photo</span>
      </div>
    </div>
  );
};


