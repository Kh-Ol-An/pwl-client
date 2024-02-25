import React, { FC, useEffect } from 'react';
import { Container, Root } from './HomeStyles';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import { getUsers } from '../../store/users/thunks';
import WishList from '../../components/WishList/WishList';

const Home: FC = () => {
    const users = useAppSelector((state) => state.users);
    const myUser = useAppSelector((state) => state.myUser);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    return (
        <>
            <Header />

            <Root>
                {users.list.length > 0 && <Sidebar users={users.list} myUser={myUser.user} />}

                <Container>
                    <WishList />
                    <div>
                        <p style={{ color: 'white' }}>Створити розклад який би ти бажав</p>
                        <p style={{ color: 'white' }}>Вибір полу і якщо жінка то можливість обрати улюблені квіти</p>
                        <p style={{ color: 'white' }}>Додати різні мови</p>
                    </div>
                </Container>
            </Root>
        </>
    );
};

export default Home;
