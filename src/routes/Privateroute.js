import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';



export const Privateroute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/Login" />;
    }

    if (adminOnly && !user.isAdmin) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};