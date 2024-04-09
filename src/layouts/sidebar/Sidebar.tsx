import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getWishList } from '@/store/wishes/thunks';
import { getUsers } from '@/store/users/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import { userType } from '@/store/users/types';
import { IUser } from '@/models/IUser';
import Loading from '@/layouts/Loading';
import UserAction from '@/layouts/sidebar/UserAction';
import Switch from '@/components/Switch';
import Search from '@/components/Search';

interface IProps {
    open: boolean;
    close: () => void;
}

const Sidebar: FC<IProps> = ({ open, close }) => {
    const myUser = useAppSelector((state) => state.myUser.user);
    const users = useAppSelector((state) => state.users);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const [userType, setUserType] = useState<userType>('all');
    const [search, setSearch] = useState<string>('');
    const [visibleUsers, setVisibleUsers] = useState<IUser[]>([]);

//    const changeUsersType = async (e: ChangeEvent<HTMLInputElement>) => {
//        if (!myUser) return;
//
//        // показувати всіх користувачів або тільки друзів під час перемикання типу користувачів
//        const checked = e.target.checked;
//        const currentVisibleUsers
//            = users.list.filter((user) => checked ? user.id !== myUser.id : user.friends.includes(myUser.id));
//        setVisibleUsers(currentVisibleUsers);
//
//        // зберігати в локальному сховищі вибір типу користувачів
//        setIsAll(checked);
//        localStorage.setItem('users-type-is-all', checked.toString());
//
//        // при перемиканні типу користувачів скидати обраного користувача якщо його немає в списку
//        if (checked || currentVisibleUsers.some(user => user.id === selectedUserId)) return;
//        await dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
//        await dispatch(selectUserId(myUser.id));
//        localStorage.setItem('selectedUserId', myUser.id);
//    };

    const handleChangeUserType = (event: SelectChangeEvent) => {
        const value = event.target.value as userType;
        setUserType(value);

        if (!myUser) return;

        dispatch(getUsers({ page: 1, limit: 200, myUserId: myUser.id, userType: value, search }));
    };

    const changeSearchBar = (value: string) => {
        setSearch(value);
        if (!myUser) return;

        dispatch(getUsers({ page: 1, limit: 200, myUserId: myUser.id, userType, search: value }));
    };

//    useEffect(() => {
//        const usersTypeIsAll = localStorage.getItem('users-type-is-all');
//        if (!usersTypeIsAll) return;
//        setIsAll(usersTypeIsAll === 'true');
//    }, []);

//    useEffect(() => {
//        if (!myUser?.id) return;
//
//        // показувати всіх користувачів або тільки друзів під час завантаження сторінки
//        setVisibleUsers(users.list.filter((user) => isAll ? user.id !== myUser.id : user.friends.includes(myUser.id)));
//    }, [myUser, users.list, isAll]);

    useEffect(() => {
        if (!myUser?.id) return;

        // показувати всіх користувачів або тільки друзів під час завантаження сторінки
        setVisibleUsers(users.list.filter((user) => user.id !== myUser.id));
    }, [myUser, users.list]);

    useEffect(() => {
        if (!myUser) return;

        dispatch(getUsers({ page: 1, limit: 200, myUserId: myUser.id, userType, search })); // TODO
    }, [dispatch, myUser]);

    return (
        <div className={"sidebar" + (open ? " open" : "")}>
            <div className="sidebar-inner">
                <div className="sidebar-content">
                    <div className="sidebar-head">
                        <h2 className="sidebar-title">Користувачі</h2>

                        <div className="users-type">
                            <InputLabel id="sidebar-user-type-label">all</InputLabel>
                            <Select
                                labelId="sidebar-user-type-label"
                                id="sidebar-user-type"
                                value={userType}
                                label="all"
                                onChange={handleChangeUserType}
                            >
                                <MenuItem value="all">all</MenuItem>
                                <MenuItem value="friends">friends</MenuItem>
                                <MenuItem value="followFrom">followFrom</MenuItem>
                                <MenuItem value="followTo">followTo</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="sidebar-search">
                        <Search id="search" changeSearchBar={changeSearchBar} />
                    </div>

                    {users.isLoading ? (
                        <Loading isLocal />
                    ) : (
                        <ul className="list">
                            {visibleUsers.map((user) => {
                                return (
                                    <UserAction key={user.id} user={user} close={close} />
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
