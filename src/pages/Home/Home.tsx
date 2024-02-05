import React, { FC, useContext, useEffect } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import dayjs from 'dayjs';
import { Container, Header, HeaderLink, Root } from './HomeStyles';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../index';
import Sidebar from '../../components/Sidebar/Sidebar';
import { secondaryLightColor } from '../../styles/variables';

const Home: FC = () => {
    const { store } = useContext(StoreContext);

    useEffect(() => {
        store.getUsers();
    }, [store]);

    return (
        <>
            <Header
                sx={{ color: secondaryLightColor }}
                title={store.myUser?.name}
                subheader={store.myUser?.birthday ? dayjs(store.myUser?.birthday).format('DD.MM.YYYY') : store.myUser?.email}
                avatar={
                    <Avatar alt={store.myUser?.name} src={store.myUser?.avatar} />
                }
                action={
                    <IconButton>
                        <HeaderLink to="/settings">
                            <Settings sx={{ color: secondaryLightColor }} />
                        </HeaderLink>
                    </IconButton>
                }
            />

            <Root>
                {store?.users?.length > 0 && <Sidebar users={store.users} myUser={store.myUser} />}

                <Container>
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
