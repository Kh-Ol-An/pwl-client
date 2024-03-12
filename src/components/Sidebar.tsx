import React, { FC, useState, useEffect } from 'react';
import { IUser } from '../models/IUser';
import UserAction from './UserAction';
import { useAppSelector } from '../store/hook';
import Loading from './Loading';

interface IProps {
    myUser: IUser | null;
}

const Sidebar: FC<IProps> = ({ myUser }) => {
    const [usersWithoutMe, setUsersWithoutMe] = useState<IUser[]>([]);

    const users = useAppSelector((state) => state.users);

    useEffect(() => {
        if (!myUser?.id) return;

        setUsersWithoutMe(users.list.filter((user) => user.id !== myUser.id));
    }, [users.list, myUser]);

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
                            </div>

                            <ul className="list">
                                {usersWithoutMe.map((user) => {
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
