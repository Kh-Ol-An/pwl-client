import React, { FC, useState, useEffect } from 'react';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemButton,
    Typography,
} from '@mui/material';
import { PeopleAlt as PeopleAltIcon } from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { IUser } from '../models/IUser';
import Popup from './Popup';
import Button from './Button';
import { useAppDispatch } from '../store/hook';
import stylesVariables from '../styles/utils/variables.module.scss';
import { addFriend } from '../store/my-user/thunks';

interface IProps {
    users: IUser[];
    myUser: IUser | null;
}

const Sidebar: FC<IProps> = ({ users, myUser }) => {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [usersWithoutMe, setUsersWithoutMe] = useState<IUser[]>([]);

    const dispatch = useAppDispatch();

    const handleAddFriend = async () => {
        await dispatch(addFriend({ myId: '1', friendId: '2' }));
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
                                        <Popup
                                            anchor={anchor}
                                            setAnchor={setAnchor}
                                            actionIcon={<PeopleAltIcon sx={{ color: stylesVariables.lightColor }} />}
                                        >
                                            <Button variant="text" onClick={handleAddFriend}>
                                                Додати друга
                                            </Button>
                                            <Button variant="text">
                                                Не знаю що тут писати
                                            </Button>
                                        </Popup>
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
