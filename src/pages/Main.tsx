import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { getWishList } from '@/store/wishes/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import Inactivated from '@/layouts/Inactivated';
import Header from '@/layouts/header/Header';
import Sidebar from '@/layouts/sidebar/Sidebar';
import WishList from '@/layouts/wish/WishList';

const Main: FC = () => {
    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const [showHeaderAndSidebar, setShowHeaderAndSidebar] = useState<boolean>(false);

    useEffect(() => {
        if (!myUser) return;

        const selectedUserId = localStorage.getItem('selectedUserId');
        if (selectedUserId) {
            dispatch(getWishList({ myId: myUser.id, userId: selectedUserId }));
            dispatch(selectUserId(selectedUserId));
        } else {
            dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
            dispatch(selectUserId(myUser.id));
        }
    }, []);

    return (
        <>
            {!myUser?.isActivated && <Inactivated />}

            <Header showHeader={showHeaderAndSidebar} hideHeader={() => setShowHeaderAndSidebar(false)} />

            <div className="page main-page">
                <button
                    className={"burger" + (showHeaderAndSidebar ? " open" : "")}
                    type="button"
                    onClick={() => setShowHeaderAndSidebar(prevState => !prevState)}
                >
                    <div className="icon-left"></div>
                    <div className="icon-right"></div>
                </button>

                <Sidebar showSidebar={showHeaderAndSidebar} hideSidebar={() => setShowHeaderAndSidebar(false)} />

                <div className="main-page-container">
                    <WishList />

                    {/* TODO: text */}
                    {/* TODO: прибрати поле емейл з юзера */}
                    {/* TODO: Доробити авторизацію для додатка */}
                    {/* TODO: Створити гарну Welcome page */}
                    {/* TODO: Запустити рекламу в Україні і Америці та залучити близько 200 користувачів */}
                    {/* TODO: кнопка назад на телефоні (свайп з краю екрана) */}
                    {/* TODO: в акаунті треба додати поле з адресою куди доставляти бажання */}
                    {/* TODO: в акаунті треба додати свята які він святкує */}
                    {/* TODO: в акаунті треба додати телефон та різні форми зв'язку такі як скайп, телеграм тощо */}
                    {/* TODO: Лайки для бажань */}
                    {/* TODO: Інфініті скролл для бажань */}
                    {/* TODO: Фільтрація бажань */}
                    {/* TODO: Сортування бажань */}
                    {/* TODO: Фільтрація юзерів */}
                    {/* TODO: Сортування юзерів */}
                    {/* TODO: Пошук бажань */}
                    {/* TODO: Кнопка авторизації facebook */}
                    {/* TODO: Кнопка авторизації apple */}
                    {/* TODO: README.md які технології та який функціонал додатка */}
                    {/* TODO: можливість створювати групи для користувачів */}
                    {/* TODO: можливість часткового фінансування бажання (скинутись на подарунок) */}
                    {/* TODO: створити різні цінові категорії, перевіряти чи є бажання в кожній ціновій категорії і якщо немає, то радити створити бажання для цієї цінової категорії */}
                    {/* TODO: Вибір полу і якщо жінка то можливість обрати улюблені квіти */}
                    {/* TODO: Створити розклад який би ти бажав */}
                    {/* TODO: поверх прелоадера можна виводити всілякі поради */}
                    {/* TODO: в хедері або ще десь можна писати цитати відомих людей */}
                </div>
            </div>
        </>
    );
};

export default Main;
