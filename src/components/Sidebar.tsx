import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import { IUser } from '../models/IUser';
import { useAppDispatch, useAppSelector } from '../store/hook';
import Loading from './Loading';
import Switch from './Switch';
import UserAction from './UserAction';
import { getWishList } from '../store/wishes/thunks';
import { selectUserId } from '../store/selected-user/slice';

interface IProps {
    myUser: IUser | null;
}

const Sidebar: FC<IProps> = ({ myUser }) => {
    const [isAll, setIsAll] = useState<boolean>(true);
    const [visibleUsers, setVisibleUsers] = useState<IUser[]>([]);

    const users = useAppSelector((state) => state.users);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const changeUsersType = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsAll(checked);
        localStorage.setItem('users-type-is-all', checked.toString());
    };

    useEffect(() => {
        const usersTypeIsAll = localStorage.getItem('users-type-is-all');
        if (!usersTypeIsAll) return;
        setIsAll(usersTypeIsAll === 'true');
    }, []);

    useEffect(() => {
        if (!myUser?.id) return;

        setVisibleUsers(users.list.filter((user) => isAll ? user.id !== myUser.id : user.friends.includes(myUser.id)));
    }, [myUser, users.list, isAll]);

    useEffect(() => {
        if (!myUser?.id) return;
        if (visibleUsers.some(user => user.id === selectedUserId)) return;

        const selectMyUser = async () => {
            await dispatch(getWishList(myUser.id));
            await dispatch(selectUserId(myUser.id));
            localStorage.setItem('selectedUserId', myUser.id);
        };
        selectMyUser();
    }, [myUser, visibleUsers, selectedUserId, dispatch]);

    return (
        <div className="sidebar">
            <div className="inner">
                <div className="content">
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
                                        <UserAction key={user.id} user={user} myUser={myUser} />
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
