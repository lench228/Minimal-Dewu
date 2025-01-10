import { Navigate } from "react-router";
import React from "react";

import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectAuth } from "../components/popups/auth/model/auth.slice";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children,
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectAuth);

  const location = useLocation();

  if (!onlyUnAuth && isAuthenticated) {
    return <Navigate replace to={location.state?.from || "/"} />;
  }

  if (onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to="/login" state={location.state} />;
  }

  return children;
};
