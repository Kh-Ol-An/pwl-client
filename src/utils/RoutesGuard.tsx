import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    guard: boolean;
    redirectPath: string;
}

const RoutesGuard: FC<PrivateRouteProps> = ({ guard, redirectPath }) => {
    return guard ? <Outlet /> : <Navigate to={ redirectPath } replace />;
};

export default RoutesGuard;
