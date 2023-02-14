import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

import React from "react";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  console.log("TOKEN: ", token);
  console.log("LOCATION: ", location);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/login", state: { from: location } }} />
  );
};

export default RequireAuth;
