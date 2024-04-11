import React, { FC, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { addUsers, getUsers } from '@/store/users/thunks';
import { userType } from '@/store/users/types';
import { IUser } from '@/models/IUser';
import Loading from '@/layouts/Loading';
import UserAction from '@/layouts/sidebar/UserAction';
import Search from '@/components/Search';
import { PAGINATION_LIMIT } from '@/utils/constants';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
}

const Sidebar: FC<IProps> = ({ open, close }) => {
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useAppSelector((state) => state.myUser.user);
    const users = useAppSelector((state) => state.users);

    const dispatch = useAppDispatch();

    const [userType, setUserType] = useState<userType>('all');
    const [search, setSearch] = useState<string>('');
//    const [page, setPage] = useState<number>(1);
    const [visibleUsers, setVisibleUsers] = useState<IUser[]>([]);

    const handleChangeUserType = (event: SelectChangeEvent) => {
        const value = event.target.value as userType;
        setUserType(value);

        if (!myUser) return;

//        console.log('get');
//        setPage(1);
        dispatch(getUsers({ page: 1, limit: PAGINATION_LIMIT, myUserId: myUser.id, userType: value, search }));
    };

    const changeSearchBar = (value: string) => {
        setSearch(value);
        if (!myUser) return;

//        setPage(1);
        dispatch(getUsers({ page: 1, limit: PAGINATION_LIMIT, myUserId: myUser.id, userType, search: value }));
    };

    useEffect(() => {
        if (!myUser?.id) return;

        // показувати всіх користувачів без мене під час завантаження сторінки
        setVisibleUsers(users.list.filter((user) => user.id !== myUser.id));
    }, [myUser, users.list]);

    useEffect(() => {
        if (!inView || !myUser) return;

//        console.log('useEffect');
        !users.stopRequests
            && dispatch(addUsers({ page: users.page, limit: PAGINATION_LIMIT, myUserId: myUser.id, userType, search }));
    }, [inView]);

    return (
        <div className={"sidebar" + (open ? " open" : "")}>
            <div className="sidebar-inner">
                <div className="sidebar-content">
                    <h2 className="sidebar-title">Користувачі: {inView}</h2>

                    <div className="custom-select">
                        <Select
                            id="sidebar-user-type"
                            label="Всі"
                            variant="standard"
                            sx={{ padding: '0 10px', color: StylesVariables.primaryColor }}
                            value={userType}
                            onChange={handleChangeUserType}
                        >
                            <MenuItem value="all">Всі</MenuItem>
                            <MenuItem value="friends">Друзі</MenuItem>
                            <MenuItem value="followFrom">Запити на дружбу</MenuItem>
                            <MenuItem value="followTo">Надіслані запити на дружбу</MenuItem>
                        </Select>
                    </div>

                    <div className="sidebar-search">
                        <Search id="search" changeSearchBar={changeSearchBar} />
                    </div>

                    <div className="user-list">
                        <ul className="list">
                            {visibleUsers.map((user) => {
                                return (
                                    <UserAction key={user.id} user={user} close={close} />
                                );
                            })}

                            {/*{!users.stopRequests && <div className="observable-element" ref={ref}></div>}*/}
                            {/*<div className="observable-element" ref={ref}></div>*/}
                            <div
                                className="observable-element"
                                style={{ display: users.stopRequests ? 'none' : 'block' }}
                                ref={ref}
                            ></div>
                        </ul>

                        {users.isLoading && <Loading isLocal />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
