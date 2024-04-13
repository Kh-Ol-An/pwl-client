import React, { FC, useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getWishList } from '@/store/wishes/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import { addUsers, getUsers } from '@/store/users/thunks';
import { ISendUsersParams } from '@/store/users/types';
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
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [userType, setUserType] = useState<ISendUsersParams['userType']>('all');
    const [search, setSearch] = useState<string>('');

    const userListRef = useRef<HTMLDivElement | null>(null);

    const handleChangeUserType = (event: SelectChangeEvent) => {
        const value = event.target.value as ISendUsersParams['userType'];
        setUserType(value);

        if (!myUser || !userListRef.current) return;

        userListRef.current.scrollTo(0, 0);

        localStorage.setItem('selectedUserId', myUser.id);
        dispatch(getUsers({ page: 1, limit: PAGINATION_LIMIT, myUserId: myUser.id, userType: value, search }));
    };

    const handleChangeSearchBar = (value: string) => {
        setSearch(value);

        if (!myUser || !userListRef.current) return;

        userListRef.current.scrollTo(0, 0);

        localStorage.setItem('selectedUserId', myUser.id);
        dispatch(getUsers({ page: 1, limit: PAGINATION_LIMIT, myUserId: myUser.id, userType, search: value }));
    };

    useEffect(() => {
        if (!myUser) return;
        dispatch(getUsers({ page: 1, limit: PAGINATION_LIMIT, myUserId: myUser.id, userType, search }));
    }, []);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || !myUser || users.stopRequests) return;
        dispatch(addUsers({ page: users.page, limit: PAGINATION_LIMIT, myUserId: myUser.id, userType, search }));
    }, [inView]);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!myUser || myUser.id === selectedUserId || users.list.some(user => user.id === selectedUserId)) return;
        dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
        dispatch(selectUserId(myUser.id));
    }, [users.list]);

    return (
        <div className={"sidebar" + (open ? " open" : "")}>
            <div className="sidebar-inner">
                <div className="sidebar-content">
                    <h2 className="sidebar-title">Користувачі</h2>

                    <div className="custom-select">
                        <div className="select-box">
                            <Select
                                id="sidebar-user-type"
                                variant="standard"
                                sx={{ padding: '0 10px', color: StylesVariables.primaryColor }}
                                value={userType}
                                onChange={handleChangeUserType}
                            >
                                <MenuItem value="all">Всі</MenuItem>
                                <MenuItem value="friends">Друзі</MenuItem>
                                <MenuItem value="followFrom">
                                    <span className="sidebar-user-type-item">
                                        Запити на дружбу
                                        <span className="count">{users.followFromCount}</span>
                                    </span>
                                </MenuItem>
                                <MenuItem value="followTo">Надіслані запити на дружбу</MenuItem>
                            </Select>

                            <span className="count">{users.followFromCount}</span>
                        </div>
                    </div>

                    <div className="sidebar-search">
                        <Search id="search" changeSearchBar={handleChangeSearchBar} />
                    </div>

                    <div className="user-list" ref={userListRef}>
                        <ul className="list">
                            {users.list.map(user => <UserAction key={user.id} user={user} close={close} />)}
                        </ul>

                        <div
                            className="observable-element"
                            style={{ display: users.stopRequests ? 'none' : 'block' }}
                            ref={ref}
                        ></div>

                        {users.isLoading && <Loading isLocal />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
