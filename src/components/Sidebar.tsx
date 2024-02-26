import React, { FC, useState, useEffect } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { IUser } from '../models/IUser';
import stylesVariables from '../styles/utils/variables.module.scss';

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
                                <ListItem key={user.id} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar alt={user.name} src={user.avatar} />
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={user.name}
                                            secondary={
                                                <Typography variant="body2" className="params">
                                                    {user.birthday
                                                        ? dayjs(user.birthday).format('DD.MM.YYYY')
                                                        : user.email}
                                                </Typography>
                                            }
                                            sx={{ color: stylesVariables.whiteColor }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
