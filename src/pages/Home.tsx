import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { getWishList } from '@/store/wishes/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import Inactivated from '@/layouts/Inactivated';
import Header from '@/layouts/Header';
import Sidebar from '@/layouts/sidebar/Sidebar';
import WishList from '@/layouts/wish/WishList';

const Home: FC = () => {
    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<boolean>(false);

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

            <Header open={open} close={() => setOpen(false)} />

            <div className="page home-page">
                <button
                    className={"burger" + (open ? " open" : "")}
                    type="button"
                    onClick={() => setOpen(prevState => !prevState)}
                >
                    <div className="icon-left"></div>
                    <div className="icon-right"></div>
                </button>

                <Sidebar open={open} close={() => setOpen(false)} />

                <div className="home-page-container">
                    <WishList />

                    {/* TODO: створити різні цінові категорії, перевіряти чи є бажання в кожній ціновій категорії і якщо немає, то радити створити бажання для цієї цінової категорії */}
                    {/* TODO: Вибір полу і якщо жінка то можливість обрати улюблені квіти */}
                    {/* TODO: Створити розклад який би ти бажав */}
                    {/* TODO: README.md які технології та який функціонал додатка */}
                    {/* TODO: поверх прелоадера можна виводити всілякі поради */}
                    {/* TODO: privacy policy додати укр мову */}
                    {/* TODO: в акаунті треба додати поле з адресою куди доставляти бажання */}
                    {/* TODO: в хедері або ще десь можна писати цитати відомих людей */}
                </div>
            </div>
        </>
    );
};

export default Home;
