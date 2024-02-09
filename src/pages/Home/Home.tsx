import React, { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Root } from './HomeStyles';
import { StoreContext } from '../../index';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home: FC = () => {
    const { store } = useContext(StoreContext);

    useEffect(() => {
        store.getUsers();
    }, [store]);

    return (
        <>
            <Header />

            <Root>
                {store?.users?.length > 0 && <Sidebar users={store.users} myUser={store.myUser} />}

                <Container>
                    <p style={{ color: 'white' }}>Створити розклад який би ти бажав</p>
                    <p style={{ color: 'white' }}>Вибір полу і якщо жінка то можливість обрати улюблені квіти</p>
                    <p style={{ color: 'white' }}>Видалити сторінку налаштувань і створити модалку</p>
                    <a href="/auth">auth</a>
                    <h1>{store?.myUser?.isActivated ? 'Привіт' : 'Ти хто?'}</h1>
                    <p>{store?.myUser?.email}</p>
                    <button type="button" onClick={() => store.logout()}>Вийти</button>
                </Container>
            </Root>
        </>
    );
};

export default observer(Home);
