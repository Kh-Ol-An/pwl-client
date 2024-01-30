import React, { FC, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../index';
import styles from './AuthForm.module.css';

const AuthForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { store } = useContext(StoreContext);

    const getUsers = async () => {
        await store.getUsers();
    };

    return (
        <div className={styles.root}>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => store.login(email, password)}>Логін</button>
            <button type="button" onClick={() => store.registration(email, password)}>Реєстрація</button>
            <button type="button" onClick={getUsers}>Get All Users</button>

            {store?.users.length > 0 && store?.users.map((user) => (
                <>
                    <div>{user?.id}</div>
                    <div>{user?.email}</div>
                    <div>{user?.isActivated}</div>
                </>
            ))}
        </div>
    );
};

export default observer(AuthForm);
