import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const UserLogout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem("userToken"); // ✅ Get token

        if (!token) {
          console.warn("No token found, redirecting to login...");
          navigate("/login");
          return;
        }

        // ✅ Send token with logout request
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // VERY IMPORTANT
            },
          }
        );

        console.log("Logout response:", res.data);

        // ✅ Clear local storage and context
        localStorage.removeItem("userToken");
        setUser(null);

        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
      }
    };

    logout();
  }, [navigate, setUser]);

  return <p>Logging out...</p>;
};

export default UserLogout;
