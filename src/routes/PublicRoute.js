import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const PublicRoute = ({ element: Component, ...rest }) => {
    const authService = new AuthService();
    const isAuthenticated = authService.isUserAuthenticated();

    return isAuthenticated ? <Navigate to="/home" /> : <Component {...rest} />;
};

export default PublicRoute;
