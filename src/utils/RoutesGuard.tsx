import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    isAuth: boolean;
}

const RoutesGuard: FC<PrivateRouteProps> = ({ isAuth }) => {
    return isAuth ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default RoutesGuard;
