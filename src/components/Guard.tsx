import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../index';

interface IProps {
    type: 'private' | 'unauthenticated';
    children: ReactNode;
}

const Guard: FC<IProps> = ({ type, children }) => {
    const [authChecked, setAuthChecked] = useState(false);

    const { store } = useContext(StoreContext);
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            await store.checkAuth(!(type === 'unauthenticated' && location.pathname === '/auth'));
            setAuthChecked(store.isAuth);
        };

        if (store.isAuth && localStorage.getItem('token')) {
            setAuthChecked(true);
        } else {
            checkAuthentication();
        }
    }, [store]);

    if (type === 'unauthenticated' && authChecked && localStorage.getItem('token')) {
        return <Navigate to="/" />;
    }

    if (type === 'private' && !authChecked && !localStorage.getItem('token')) {
        return <Navigate to="/auth" />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default observer(Guard);
