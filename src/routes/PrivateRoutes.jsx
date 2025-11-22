import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div>
                <span className="loading loading-dots loading-xl justify-items-center"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate state={location.pathname} to="/login" />;
    }

    return children;  
};

export default PrivateRoutes;
