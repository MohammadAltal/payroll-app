import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const authService = new AuthService();
    const isAuthenticated = authService.isUserAuthenticated();

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
