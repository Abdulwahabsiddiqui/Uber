import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

/**
 * Protects routes meant for authenticated users only.
 * Redirects to `/login` if the user is not authenticated.
 */
const UserProtectedWrapper = ({ children }) => {
  const { user } = useContext(UserContext);

  // Prefer context token but fallback to localStorage
  const token = user?.token || localStorage.getItem("userToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
