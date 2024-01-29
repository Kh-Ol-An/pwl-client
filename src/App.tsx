import React, { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AuthForm from './components/AuthForm/AuthForm';
import styles from './App.module.css';
import { StoreContext } from './index';

const App: FC = () => {
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
        <div className={styles.root}>
            <AuthForm />
        </div>
    );
};

export default observer(App);
// 1.37.40
