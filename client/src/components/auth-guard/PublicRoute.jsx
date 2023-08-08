import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const auth = JSON.parse(localStorage.getItem("userData"));
  return auth ? (
    <Navigate to={auth.is_admin ? "../admin" : `../profile/${auth.userId}`} />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
