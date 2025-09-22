import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  CaptainContext  from "../context/CaptainContext"; // ✅ Captain Context

const CaptainLogout = () => {
  const { setCaptain } = useContext(CaptainContext); // ✅ Access captain context
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem("captainToken"); // ✅ Get token for captain

        if (!token) {
          console.warn("No token found for captain, redirecting to login...");
          navigate("/captain/login");
          return;
        }

        // ✅ Send token with logout request
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/captains/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send JWT token
            },
          }
        );

        console.log("Captain Logout response:", res.data);

        // ✅ Clear local storage and context
        localStorage.removeItem("captainToken");
        setCaptain(null);

        navigate("/captain/login");
      } catch (error) {
        console.error("Captain Logout error:", error.response?.data || error.message);
      }
    };

    logout();
  }, [navigate, setCaptain]);

  return <p>Logging out captain...</p>;
};

export default CaptainLogout;
