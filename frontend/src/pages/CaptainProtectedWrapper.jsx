import React from "react";
import { Navigate } from "react-router-dom";
import { useCaptain } from "../context/CaptainContext";

/**
 * Protects routes meant for authenticated captains only.
 * Redirects to `/captain/login` if the captain is not authenticated.
 */
const CaptainProtectedWrapper = ({ children }) => {
  const { captain } = useCaptain();

  if (!captain?.isAuthenticated) {
    return <Navigate to="/captain/login" replace />;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
