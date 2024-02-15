import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hook';
import { checkAuth } from '../store/my-user/thunks';

interface IProps {
    type: 'all' | 'private' | 'unauthenticated';
    children: ReactNode;
}

const Guard: FC<IProps> = ({ type, children }) => {
    const [authChecked, setAuthChecked] = useState(false);

    const myUser = useAppSelector((state) => state.myUser);

    const dispatch = useAppDispatch();

    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            await dispatch(checkAuth());
            setAuthChecked(myUser.isAuth);
        };

        if (myUser.isAuth && localStorage.getItem('token')) {
            setAuthChecked(true);
        } else {
            checkAuthentication();
        }
    }, [myUser, type, location.pathname]);

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

export default Guard;
