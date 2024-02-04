import React, { FC, useState, useEffect } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemButton } from '@mui/material';
import { Root } from './SidebarStyles';
import { IUser } from '../../models/IUser';
import { secondaryLightColor } from '../../styles/variables';

interface IProps {
    users: IUser[];
    myUser: IUser | null;
}

const Sidebar: FC<IProps> = ({ users, myUser }) => {
    const [usersWithoutMe, setUsersWithoutMe] = useState<IUser[]>([]);

    useEffect(() => {
        if (!myUser?.id) return;

        setUsersWithoutMe(users.filter((user) => user.id !== myUser.id));
    } , [users, myUser]);

    return (
        <Root>
            {usersWithoutMe.map((user) => (
                <ListItem key={user.id} disablePadding>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar alt={user.name} src={user.avatar} />
                        </ListItemAvatar>

                        <ListItemText
                            primary={user.name}
                            secondary={user.email}
                            sx={{ color: secondaryLightColor }}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </Root>
    );
};

export default Sidebar;
