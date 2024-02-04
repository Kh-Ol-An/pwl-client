import React, { FC, useContext, useEffect } from 'react';
import { Container, Root } from './HomeStyles';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../index';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home: FC = () => {
    const { store } = useContext(StoreContext);

    useEffect(() => {
        store.getUsers();
    }, [store]);

    return (
        <Root>
            {store?.users?.length > 0 && <Sidebar users={store.users} myUser={store.myUser} />}

            <Container>
                <a href="/auth">auth</a>
                <h1>{store?.myUser?.isActivated ? 'Привіт' : 'Ти хто?'}</h1>
                <p>{store?.myUser?.email}</p>
                <button type="button" onClick={() => store.logout()}>Вийти</button>
            </Container>
        </Root>
    );
};

export default observer(Home);
