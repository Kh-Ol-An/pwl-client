import React, { FC, useContext, useEffect } from 'react';
import { Root } from './AuthStyles';
import { StoreContext } from '../../index';
import AuthForm from '../../components/AuthForm/AuthForm';
import { observer } from 'mobx-react-lite';

const Auth: FC = () => {
    const { store } = useContext(StoreContext);

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
        </Root>
    );
};

export default observer(Auth);
