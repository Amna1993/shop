import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user?.isAdmin) {
    alert('You do not have permission to access this page.');
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;