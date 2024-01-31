import React, { FC, useContext } from 'react';
import { Root } from './HomeStyles';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../index';

const Home: FC = () => {
    const { store } = useContext(StoreContext);

    const getUsers = async () => {
        await store.getUsers();
    };

    return (
        <Root>
            <a href="/auth">auth</a>
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
        </Root>
    );
};

export default observer(Home);
