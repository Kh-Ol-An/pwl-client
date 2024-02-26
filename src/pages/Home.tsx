import React, { FC, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {useAppDispatch, useAppSelector} from '../store/hook';
import { getUsers } from '../store/users/thunks';
import WishList from '../components/WishList';

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

            <div className="page home-page">
                {users.list.length > 0 && <Sidebar users={users.list} myUser={myUser.user} />}

                <div className="container">
                    <WishList />
                    {/* TODO: Вибір полу і якщо жінка то можливість обрати улюблені квіти */}
                    {/* TODO: Створити розклад який би ти бажав */}
                </div>
            </div>
        </>
    );
};

export default Home;
