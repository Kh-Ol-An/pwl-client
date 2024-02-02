import React, { FC, ReactNode, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../index';

interface IProps {
    children: ReactNode;
}

const PrivateRoutes: FC<IProps> = ({ children }) => {
    const { store } = useContext(StoreContext);
    const location = useLocation();

    if (!store.isAuth) {
        return <Navigate to="/auth" state={{ from: location }} />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default observer(PrivateRoutes);
