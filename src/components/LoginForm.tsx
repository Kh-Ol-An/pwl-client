import React, { FC, useState, useContext } from 'react';
import { StoreContext } from '../index';

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(StoreContext);

    return (
        <div>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => store.login(email, password)}>Логін</button>
            <button type="button" onClick={() => store.registration(email, password)}>Реєстрація</button>
        </div>
    );
};

export default LoginForm;
