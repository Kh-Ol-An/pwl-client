import React, { FC, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Root } from './AuthStyles';
import { StoreContext } from '../../index';
import AuthForm from '../../components/AuthForm/AuthForm';
import { observer } from 'mobx-react-lite';

const Auth: FC = () => {
    const { store } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [store]);

    if (store.isLoading) {
        return <div>Завантаження...</div>;
    }

    return (
        <Root>
            <a href="/">Home</a>
            <AuthForm />
            {fromPage}
        </Root>
    );
};

export default observer(Auth);
