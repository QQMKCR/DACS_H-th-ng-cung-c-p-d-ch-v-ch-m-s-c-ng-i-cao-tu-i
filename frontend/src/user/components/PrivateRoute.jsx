// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage sau khi đăng nhập
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;