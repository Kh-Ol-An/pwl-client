import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Root, Wrap } from './AuthStyles';
import { StoreContext } from '../../index';
import Loading from '../../components/Loading/Loading';
import { observer } from 'mobx-react-lite';
import { TextField } from '@mui/material';
import Button from '../../components/Button/Button';

const Auth: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { store } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';

    const getUsers = async () => {
        await store.getUsers();
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [store]);

    if (store.isLoading) {
        return <Loading />;
    }

    return (
        <Root>
            <Wrap>
                <TextField
                    id="email"
                    type="text"
                    label="Email"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    type="password"
                    label="Пароль"
                    size="small"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="button" onClick={() => store.login(email, password)}>Логін</Button>
                <Button type="button" onClick={() => store.registration(email, password)}>Реєстрація</Button>
            </Wrap>
        </Root>
    );
};

export default observer(Auth);
