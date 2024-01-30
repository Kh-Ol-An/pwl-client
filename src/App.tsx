import React, { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AuthForm from './components/AuthForm/AuthForm';
import styles from './App.module.css';
import { StoreContext } from './index';

const App: FC = () => {
    const { store } = useContext(StoreContext);

    const getUsers = async () => {
        await store.getUsers();
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [store]);

    if (store.isLoading) {
        return <div>Завантаження...</div>;
    }

    if (store.isAuth) {
        return (
            <>
                <h1>{store?.user.isActivated ? 'Привіт' : 'Ти хто?'}</h1>
                <p>{store?.user?.email}</p>
                <button type="button" onClick={() => store.logout()}>Вийти</button>
                <button type="button" onClick={getUsers}>Get All Users</button>

                {store?.users.length > 0 && store?.users.map((user) => (
                    <>
                        <div>{user?.id}</div>
                        <div>{user?.email}</div>
                        <div>{user?.isActivated}</div>
                    </>
                ))}
            </>
        );
    }

    return (
        <div className={styles.root}>
            <AuthForm />
        </div>
    );
};

export default observer(App);
