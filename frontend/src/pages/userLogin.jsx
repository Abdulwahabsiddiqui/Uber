import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
    email: "",
    name: "",
    token: "",
  });
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    setUser({
      email: res.data.email,
      name: res.data.name,
      token: res.data.token,
    });

    localStorage.setItem("userToken", res.data.token);
 
    // ✅ Clear input fields
    setEmail("");
    setPassword("");
     console.log("Login successful:", res.data);
    navigate("/home"); // Redirect to home page
  } catch (error) {
    console.error("Login error:", error);
    if (error.response) {
      alert(error.response.data.message || "Login failed. Please try again.");
    } else {
      alert("Something went wrong. Please try again later.");
    }}
//   } finally {
//     setLoading(false);
//   }
};


  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <h1 className="text-3xl font-bold text-center text-black mb-8">Uber</h1>
            <p className="text-center text-gray-600 mb-8 text-sm">User Login</p>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-lg font-semibold transition ${
              loading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Create Account Option */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/usersignup"
              className="text-black font-semibold hover:underline"
            >
              Create New Account
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Captain Sign In Button */}
        <Link
          to="/captain/login"
          className="w-full block bg-gray-200 text-black text-center py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
        >
          Login as Captain
        </Link>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-black text-sm underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
