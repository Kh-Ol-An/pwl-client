import React, { FC, useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
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
import ShareButton from '@/components/ShareButton';
import { PAGINATION_LIMIT } from '@/utils/constants';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    showSidebar: boolean;
    hideSidebar: () => void;
}

const Sidebar: FC<IProps> = ({ showSidebar, hideSidebar }) => {
    const { t } = useTranslation();

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

    const userListRef = useRef<HTMLDivElement>(null);

    const handleChangeUserType = (event: SelectChangeEvent) => {
        const value = event.target.value as ISendUsersParams['userType'];
        setUserType(value);

        if (!myUser || !userListRef.current) return;

        userListRef.current.scrollTo(0, 0);

        dispatch(getUsers({ page: 1, limit: PAGINATION_LIMIT, myUserId: myUser.id, userType: value, search }));
    };

    const handleChangeSearchBar = (value: string) => {
        setSearch(value);

        if (!myUser || !userListRef.current) return;

        userListRef.current.scrollTo(0, 0);

        dispatch(getUsers({ page: 1, limit: PAGINATION_LIMIT, myUserId: myUser.id, userType, search: value }));
    };

    const updateUsers = () => {
        if (!myUser || !userListRef.current) return;

        userListRef.current.scrollTo(0, 0);

        dispatch(getUsers({ page: 1, limit: PAGINATION_LIMIT, myUserId: myUser.id, userType, search }));
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
        <div className={"sidebar" + (showSidebar ? " show" : "")}>
            <div className="sidebar-inner">
                <div className="sidebar-content">
                    <div className="sidebar-head">
                        <h2 className="sidebar-title">{t('main.users')}</h2>

                        <ShareButton link="welcome" />
                    </div>

                    <div className="custom-mui-select">
                        <div className="select-box">
                            <Select
                                id="sidebar-user-type"
                                variant="standard"
                                sx={{ padding: '0 10px', color: StylesVariables.primaryColor }}
                                value={userType}
                                onChange={handleChangeUserType}
                            >
                                <MenuItem value="all">{t('main.all')}</MenuItem>
                                <MenuItem value="friends">{t('main.friends')}</MenuItem>
                                <MenuItem value="followFrom">
                                    <span className="sidebar-user-type-item">
                                        {t('main.friend-requests')}
                                        {users.followFromCount > 0 && (
                                            <span className="count">{users.followFromCount}</span>
                                        )}
                                    </span>
                                </MenuItem>
                                <MenuItem value="followTo">{t('main.sent-friend-requests')}</MenuItem>
                            </Select>

                            {users.followFromCount > 0 && (
                                <span className="count">{users.followFromCount}</span>
                            )}
                        </div>
                    </div>

                    <div className="sidebar-search">
                        <Search id="search" label={t('main.users-search')} changeSearchBar={handleChangeSearchBar} />
                    </div>

                    <div className="user-list" ref={userListRef}>
                        <ul className="list">
                            {users.list.map(user => (
                                <UserAction
                                    key={user.id}
                                    user={user}
                                    updateUsers={updateUsers}
                                    hideSidebar={hideSidebar}
                                />
                            ))}
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
