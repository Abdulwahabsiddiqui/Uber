import React from "react";
import { Link } from "react-router-dom"; // Only if you want navigation

const Start = () => {
  return (
    <div
      className="h-screen w-screen bg-black text-white flex flex-col justify-between relative overflow-hidden"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1549921296-3b4a3a7da6e8?auto=format&fit=crop&w=1920&q=80")`,
        backgroundSize: "cover", // Make image cover the full screen
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent repetition
      }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Center Content */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4 relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
          Get Started with Uber
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-lg mb-8">
          Book rides quickly and easily. Drive, ride, or deliver — Uber connects you
          with what you need, when you need it.
        </p>
      </main>

      {/* Bottom "Continue" Button */}
      <div className="w-full flex justify-center pb-10 relative z-10">
        {/* Use Link for navigation or button for action */}
        <Link
          to="/login" // <-- Change this to your route
          className="bg-white text-black px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transform transition"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
