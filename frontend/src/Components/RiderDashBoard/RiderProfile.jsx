import React, { useState } from "react";

export const RiderProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [rider, setRider] = useState({
    name: "Jane Smith",
    age: 28,
    phone: "+1 987 654 3210",
    email: "jane.smith@example.com",
    rating: 4.6,
    riderImage: "https://via.placeholder.com/100", // Replace with actual image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRider((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setRider((prev) => ({
        ...prev,
        riderImage: imageURL,
      }));
    }
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Optionally: send updated data to server here
  };

  return (
    <div className="max-w-3xl h-full mx-auto mt-10 bg-gray-100 shadow-xl rounded-2xl p-6 border border-gray-300">
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
        {/* Rider Image */}
        <div className="flex flex-col items-center space-y-2">
          <img
            src={rider.riderImage}
            alt="Rider"
            className="rounded-xl w-32 h-36 object-cover border border-gray-400"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm mt-2"
            />
          )}
          <span className="text-sm text-gray-600">Rider Photo</span>
        </div>

        {/* Info Section */}
        <div className="md:col-span-2 space-y-2 text-gray-800">
          <div className="grid grid-cols-2 gap-4">
            {["name", "age", "phone", "email", "rating"].map((field) => (
              <div key={field}>
                <label className="font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1")}:
                </label>
                {isEditing ? (
                  <input
                    type={field === "age" || field === "rating" ? "number" : "text"}
                    name={field}
                    value={rider[field]}
                    onChange={handleChange}
                    className="w-full mt-1 p-1 border rounded-md text-gray-700"
                  />
                ) : (
                  <p>{rider[field]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

