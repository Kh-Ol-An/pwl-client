import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getWishList } from '@/store/wishes/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import { IUser } from '@/models/IUser';
import Loading from '@/layouts/Loading';
import UserAction from '@/layouts/sidebar/UserAction';
import Switch from '@/components/Switch';

interface IProps {
    open: boolean;
    close: () => void;
}

const Sidebar: FC<IProps> = ({ open, close }) => {
    const [isAll, setIsAll] = useState<boolean>(true);
    const [visibleUsers, setVisibleUsers] = useState<IUser[]>([]);

    const myUser = useAppSelector((state) => state.myUser.user);
    const users = useAppSelector((state) => state.users);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const changeUsersType = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!myUser) return;

        // показувати всіх користувачів або тільки друзів під час перемикання типу користувачів
        const checked = e.target.checked;
        const currentVisibleUsers
            = users.list.filter((user) => checked ? user.id !== myUser.id : user.friends.includes(myUser.id));
        setVisibleUsers(currentVisibleUsers);

        // зберігати в локальному сховищі вибір типу користувачів
        setIsAll(checked);
        localStorage.setItem('users-type-is-all', checked.toString());

        // при перемиканні типу користувачів скидати обраного користувача якщо його немає в списку
        if (checked || currentVisibleUsers.some(user => user.id === selectedUserId)) return;
        await dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
        await dispatch(selectUserId(myUser.id));
        localStorage.setItem('selectedUserId', myUser.id);
    };

    useEffect(() => {
        const usersTypeIsAll = localStorage.getItem('users-type-is-all');
        if (!usersTypeIsAll) return;
        setIsAll(usersTypeIsAll === 'true');
    }, []);

    useEffect(() => {
        if (!myUser?.id) return;

        // показувати всіх користувачів або тільки друзів під час завантаження сторінки
        setVisibleUsers(users.list.filter((user) => isAll ? user.id !== myUser.id : user.friends.includes(myUser.id)));
    }, [myUser, users.list, isAll]);

    return (
        <div className={"sidebar" + (open ? " open" : "")}>
            <div className="sidebar-inner">
                <div className="sidebar-content">
                    {users.isLoading ? (
                        <Loading isLocal />
                    ) : (
                        <>
                            <div className="sidebar-head">
                                <h2 className="sidebar-title">Користувачі</h2>

                                <div className="users-type">
                                    <span className={isAll ? "primary-color" : ""}>Всі</span>
                                    <Switch
                                        id="users-type"
                                        name="users-type"
                                        hiddenChoice
                                        checked={isAll}
                                        onChange={changeUsersType}
                                    />
                                    <span className={isAll ? "" : "primary-color"}>Друзі</span>
                                </div>
                            </div>

                            <ul className="list">
                                {visibleUsers.map((user) => {
                                    return (
                                        <UserAction key={user.id} user={user} close={close} />
                                    );
                                })}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
