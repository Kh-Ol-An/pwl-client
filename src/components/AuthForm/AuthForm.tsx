import React, { FC, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../index';
import styles from './AuthForm.module.css';

const AuthForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { store } = useContext(StoreContext);

    console.log('store.isAuth: ', store.isAuth);
    return (
        <div className={styles.root}>
            <h1>{store.isAuth ? 'Привіт' : 'Ти хто?'}</h1>
            <p>{store?.user?.email}</p>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => store.login(email, password)}>Логін</button>
            <button type="button" onClick={() => store.registration(email, password)}>Реєстрація</button>
            <button type="button" onClick={() => store.logout()}>Вийти</button>
        </div>
    );
};

export default observer(AuthForm);
