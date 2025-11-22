import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth();

    if (loading) {
        return (
            <div>
                <span className="loading loading-dots loading-xl justify-items-center"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;  
};

export default PrivateRoutes;
