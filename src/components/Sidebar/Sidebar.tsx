import React, { FC, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Root } from './SidebarStyles';
import { IUser } from '../../models/IUser';
import { secondaryLightColor } from '../../styles/variables';

interface IProps {
    users: IUser[];
    myUser: IUser | null;
}

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

//const usersMock = [
//    {
//        id: 1,
//        name: 'Ivan',
//        avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
//    },
//    {
//        id: 2,
//        name: 'Petro',
//        avatar: 'https://material-ui.com/static/images/avaftar/2.jpg',
//    },
//    {
//        id: 3,
//        name: 'Stepan',
//        avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
//    },
//    {
//        id: 4,
//        name: 'Oleg',
//        avatar: 'https://material-ui.com/static/images/avdatar/4.jpg',
//    },
//];

const Sidebar: FC<IProps> = ({ users, myUser }) => {
    const [usersWithoutMe, setUsersWithoutMe] = useState<IUser[]>([]);

    useEffect(() => {
        if (!myUser?.id) return;

        setUsersWithoutMe(users.filter((user) => user.id !== myUser.id));
    } , [users, myUser]);

    return (
        <ThemeProvider theme={theme}>
            <Root>
                {usersWithoutMe.map((user) => (
                    <ListItem key={user.id}>
                        <ListItemAvatar>
                            <Avatar alt={user.name} src={user.avatar} />
                        </ListItemAvatar>

                        <ListItemText
                            primary={user.name}
                            secondary={user.id}
                            sx={{ color: secondaryLightColor }}
                        />
                    </ListItem>
                ))}
            </Root>
        </ThemeProvider>
    );
};

export default Sidebar;
