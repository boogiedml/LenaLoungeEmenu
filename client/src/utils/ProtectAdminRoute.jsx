import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectAdminRoute = ({ children }) => {
  const isAuthenticated = Cookies.get("auth_token");

  const isAdmin = isAuthenticated;

  if (!isAdmin) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectAdminRoute;
