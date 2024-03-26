import React, { FC, useState, useEffect } from 'react';
import {useAppDispatch, useAppSelector} from '@/store/hook';
import { getUsers } from '@/store/users/thunks';
import { getWishList } from '@/store/wishes/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import Loading from '@/layouts/Loading';
import Inactivated from '@/layouts/Inactivated';
import Header from '@/layouts/Header';
import Sidebar from '@/layouts/Sidebar';
import WishList from '@/layouts/wish/WishList';

const Home: FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishes = useAppSelector((state) => state.wishes);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsers());

        if (!myUser) return;

        const selectedUserId = localStorage.getItem('selectedUserId');
        if (selectedUserId) {
            dispatch(getWishList({ myId: myUser.id, userId: selectedUserId }));
            dispatch(selectUserId(selectedUserId));
        } else {
            dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
            dispatch(selectUserId(myUser.id));
        }
    }, [dispatch, myUser]);

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

                <div className="container">
                    {wishes.isLoading ? <Loading isLocal /> : <WishList />}

                    {/* TODO: Вибір полу і якщо жінка то можливість обрати улюблені квіти */}
                    {/* TODO: Створити розклад який би ти бажав */}
                    {/* TODO: README.md які технології та який функціонал додатка */}
                    {/* TODO: карточку бажання в згорнутому вигляді зробити з картинкою (розмита по краям) та назвою бажання */}
                    {/* TODO: поверх прелоадера можна виводити всілякі поради */}
                    {/* TODO: додати кнопку "Забув пароль" */}
                    {/* TODO: додати можливість змінювати пароль */}
                    {/* TODO: privacy policy */}
                    {/* TODO: в акаунті треба додати поле з адресою куди доставляти бажання */}
                    {/* TODO: в хедері або ще десь можна писати цитати відомих людей */}
                </div>
            </div>
        </>
    );
};

export default Home;
