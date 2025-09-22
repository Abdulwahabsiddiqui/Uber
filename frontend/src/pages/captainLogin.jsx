import React, { useState, useContext } from "react"; // ✅ import useContext
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainContext } from "../context/CaptainContext"; // ✅ Captain Context

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCaptain } = useContext(CaptainContext); // ✅ Access context here
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/captains/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Update global context state
      setCaptain({
        name: res.data.captain.name,
        email: res.data.captain.email,
        token: res.data.token,
        isAuthenticated: true,
      });

      // ✅ Save token in local storage
      localStorage.setItem("userToken", res.data.token);
       console.log("Captain Login successful:", res.data);
      // Redirect to home
      navigate("/captain/home");
      
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        alert(error.response.data.message || "Login failed. Try again.");
      } else {
        alert("Something went wrong. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-black mb-2">Uber</h1>
        <p className="text-center text-gray-600 mb-8 text-sm">Captain Login</p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm mb-2">Email12</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

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

        {/* Create Account */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/captainsignup"
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

        {/* Back to User Login */}
        <Link
          to="/login"
          className="w-full block bg-gray-200 text-black text-center py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
        >
          Login as User
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

export default CaptainLogin;
