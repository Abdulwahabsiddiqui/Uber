import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Correct
import { UserContext } from "../context/userContext";

const UserSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ New state
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Optional error message
  const navigate = useNavigate();

  const { user, setUser } = React.useContext(UserContext);

  const handleSignup = (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Reset previous message
    setErrorMessage("");

    console.log("User Signup Data:", { name, email, password });

    axios
      .post(`${import.meta.env.VITE_API_URL}/users/register`, { name, email, password })
      .then((response) => {
        console.log("Signup successful:", response.data);
        setUser({
          name: response.data.user.name,
          email: response.data.user.email,
            token: response.data.token,
          isAuthenticated: true,
        });

        setSuccessMessage("Successfully Registered! You can now login."); // ✅ Show message

        // Optional: navigate after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 3000); // 3 seconds
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setErrorMessage(
          error.response?.data?.error || "Signup failed. Please try again."
        );
      });
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <h1 className="text-3xl font-bold text-center text-black mb-8">Uber</h1>

        {/* Show success message */}
        {successMessage && (
          <div className="mb-4 text-green-600 font-semibold text-center">
            {successMessage}
          </div>
        )}

        {/* Show error message */}
        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
