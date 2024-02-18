import React, { FC } from 'react';
import { Container, Root } from './HomeStyles';
import { logout } from '../../store/my-user/thunks';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import {useAppDispatch, useAppSelector} from "../../store/hook";

const Home: FC = () => {
    const state = useAppSelector((state) => state);

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout())
    };

    return (
        <>
            <Header />

            <Root>
                {state.users.users.length > 0 && <Sidebar users={state.users.users} myUser={state.myUser.user} />}

                <Container>
                    <p style={{ color: 'white' }}>Створити розклад який би ти бажав</p>
                    <p style={{ color: 'white' }}>Вибір полу і якщо жінка то можливість обрати улюблені квіти</p>
                    <p style={{ color: 'white' }}>Видалити сторінку налаштувань і створити модалку</p>
                    <a href="/auth">auth</a>
                    <button type="button" onClick={handleLogout}>Вийти</button>
                </Container>
            </Root>
        </>
    );
};

export default Home;
