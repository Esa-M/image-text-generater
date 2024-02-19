
import React from 'react';
import { Outlet, Route, Navigate } from 'react-router-dom';

export default function PrivateRoute({isAuthenticated}) {
  return (
    (isAuthenticated) ? <Outlet></Outlet> : <Navigate to={"/"}></Navigate> 
  );
};


