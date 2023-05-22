import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  return (
    props.isLogin ? <Navigate to="/" replace/> : props.children
)};

export default ProtectedRoute;