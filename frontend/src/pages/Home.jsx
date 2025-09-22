import React, { useState } from "react";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = () => {
    setIsExpanded(true); // Slide the card up when input is focused
  };

  const handleBlur = () => {
    // Optional: Uncomment this if you want the card to slide back down when input loses focus
    setIsExpanded(false);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50 overflow-hidden">
      {/* Top-Left Uber Logo */}
      <div className="absolute top-4 left-6 z-20">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-24 h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Map Section */}
      <div
        className={`w-full h-[50vh] transition-all duration-500 ${
          isExpanded ? "h-0 opacity-0" : "h-[50vh] opacity-100"
        }`}
      >
        <img
          src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png"
          alt="Map Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Ride Booking Card */}
      <div
        className={`absolute bottom-0 left-0 right-0 flex justify-center transition-all duration-500 ${
          isExpanded ? "h-full" : "h-[50vh]"
        }`}
      >
        <div
          className={`bg-white rounded-t-2xl shadow-lg p-6 w-full sm:w-[400px] transition-all duration-500 overflow-auto`}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            GM Uber User
          </h3>

          {/* Pickup Location Input */}
          <input
            type="text"
            placeholder="Enter pickup location"
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="bg-gray-100 border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
          />

          {/* Destination Location Input */}
          <input
            type="text"
            placeholder="Enter destination location"
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="bg-gray-100 border border-gray-300 rounded-lg p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
          />

          {/* Submit Button */}
          <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-300">
            Book Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
