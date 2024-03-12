import React, { FC, useState, useEffect } from 'react';
import { IUser } from '../models/IUser';
import UserAction from './UserAction';

interface IProps {
    users: IUser[];
    myUser: IUser | null;
}

const Sidebar: FC<IProps> = ({ users, myUser }) => {
    const [usersWithoutMe, setUsersWithoutMe] = useState<IUser[]>([]);

    useEffect(() => {
        if (!myUser?.id) return;

        setUsersWithoutMe(users.filter((user) => user.id !== myUser.id));
    }, [users, myUser]);

    return (
        <div className="sidebar">
            <div className="inner">
                <div className="content">
                    <ul className="list">
                        {usersWithoutMe.map((user) => {
                            return (
                                <UserAction key={user.id} user={user} myUser={myUser} />
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
