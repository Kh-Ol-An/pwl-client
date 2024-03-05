import React, { FC, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {useAppDispatch, useAppSelector} from '../store/hook';
import { getUsers } from '../store/users/thunks';
import WishList from '../components/WishList';

const Home: FC = () => {
    const userList = useAppSelector((state) => state.users.list);
    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    return (
        <>
            <Header />

            <div className="page home-page">
                {userList.length > 0 && <Sidebar users={userList} myUser={myUser} />}

                <div className="container">
                    <WishList />
                    {/* TODO: Вибір полу і якщо жінка то можливість обрати улюблені квіти */}
                    {/* TODO: Створити розклад який би ти бажав */}
                    {/* TODO: README.md які технології та який функціонал додатка */}
                    {/* TODO: Заголовок головної сторінки з іменем користувача */}
                    {/* TODO: карточку бажання в згорнутому вигляді зробити з картинкою (розмита по краям) та назвою бажання */}
                    {/* TODO: вибір між матеріальним та нематеріальним бажанням */}
                    {/* TODO: поверх прелоадера можна виводити всілякі поради */}
                </div>
            </div>
        </>
    );
};

export default Home;
