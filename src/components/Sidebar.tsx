import React, { FC, useState, useEffect } from 'react';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemButton,
    Typography,
    IconButton, Popover,
} from '@mui/material';
import { PeopleAlt as PeopleAltIcon } from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { IUser } from '../models/IUser';
import stylesVariables from '../styles/utils/variables.module.scss';
import Card from './Card';
import Button from './Button';
import { useAppDispatch } from '../store/hook';

interface IProps {
    users: IUser[];
    myUser: IUser | null;
}

const Sidebar: FC<IProps> = ({ users, myUser }) => {
    const [usersWithoutMe, setUsersWithoutMe] = useState<IUser[]>([]);
    const [anchorSetting, setAnchorSetting] = React.useState<HTMLButtonElement | null>(null);

    const open = Boolean(anchorSetting);
    const id = open ? 'simple-popover' : undefined;

    const handleOpenSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorSetting(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorSetting(null);
    };

    const dispatch = useAppDispatch();

    const addFriend = () => {
        console.log('add friend');
    };

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
                                <ListItem
                                    key={user.id}
                                    disablePadding
                                    secondaryAction={
                                        <>
                                            <IconButton edge="end" aria-label="comments" onClick={handleOpenSettings}>
                                                <PeopleAltIcon />
                                            </IconButton>

                                            <Popover
                                                id={id}
                                                open={open}
                                                anchorEl={anchorSetting}
                                                onClose={handleCloseSettings}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                style={{ borderRadius: '20px' }}
                                            >
                                                <Card classes="thin-border">
                                                    <div className="sidebar-popover">
                                                        <Button variant="text" onClick={addFriend}>
                                                            Додати друга
                                                        </Button>
                                                        <Button variant="text">
                                                            Не знаю що тут писати
                                                        </Button>
                                                    </div>
                                                </Card>
                                            </Popover>
                                        </>
                                    }
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                src={user.avatar}
                                                alt={`${user?.firstName} ${user?.lastName ? user?.lastName : ''}`}
                                            />
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={`${user?.firstName} ${user?.lastName ? user?.lastName : ''}`}
                                            secondary={
                                                <Typography variant="body2" className="params">
                                                    {user.birthday
                                                        ? dayjs(user.birthday).locale('uk').format('DD MMMM')
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
