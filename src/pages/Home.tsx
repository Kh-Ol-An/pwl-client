import React, { FC, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {useAppDispatch, useAppSelector} from '../store/hook';
import { getUsers } from '../store/users/thunks';
import WishList from '../components/WishList';
import Loading from '../components/Loading';
import { getWishList } from '../store/wishes/thunks';
import { selectUserId } from '../store/selected-user/slice';
import Inactivated from '../components/Inactivated';

const Home: FC = () => {
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
            {myUser?.isActivated === false && <Inactivated />}

            <Header />

            <div className="page home-page">
                <Sidebar myUser={myUser} />

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
                    {/* TODO: Видаляти посилання активації через добу якщо вона не була застосована і надавати можливість користувачеві запитувати ще раз це посилання */}
                    {/* TODO: видалення акаунта. перше - написати фразу "Я видаляю свій акаунт" */}
                    {/* TODO: видалення акаунта. друге - "Це останнє підтвердження перед видаленням акаунта. Нам просто не хочеться щоб Ви уходили. Нашому суму не має меж...". Для підтвердження треба ввести логін та пароль */}
                </div>
            </div>
        </>
    );
};

export default Home;
