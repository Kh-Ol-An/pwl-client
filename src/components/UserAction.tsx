import React, { FC, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
    CircularProgress,
} from '@mui/material';
import { PeopleAlt as PeopleAltIcon } from '@mui/icons-material';
import Popup from './Popup';
import Button from './Button';
import { useAppDispatch } from '../store/hook';
import { addFriend } from '../store/my-user/thunks';
import { IUser } from '../models/IUser';
import stylesVariables from '../styles/utils/variables.module.scss';

interface IProps {
    user: IUser;
    myUser: IUser | null;
}

const UserAction: FC<IProps> = ({ user, myUser }) => {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const handleAddFriend = async (friendId: IUser['id']) => {
        if (!myUser) return;

        setIsLoading(true);
        await dispatch(addFriend({ myId: myUser.id, friendId }));
        setIsLoading(false);
        setAnchor(null);
    };

    // білий - не друзі
    //// Додати друга

    // сірий - запит від мене
    //// Видалити свій запит на дружбу

    // синій - запит від користувача
    //// Підтвердити дружбу
    //// Видалити запит користувача на дружбу

    // яркий - друзі
    //// Видалити свій запит на дружбу
    //// Видалити запит користувача на дружбу
    //// Видалити друга

    let iconColor = stylesVariables.lightColor;
    myUser?.followTo.includes(user.id) && (iconColor = stylesVariables.specialColor);
    (myUser?.followFrom.includes(user.id) || myUser?.friends.includes(user.id)) && (iconColor = stylesVariables.primaryColor);

    let addFriendText = '';
    !myUser?.followTo.includes(user.id) && (addFriendText = 'Додати друга');
    myUser?.followFrom.includes(user.id) && (addFriendText = 'Підтвердити дружбу');

    let removeFriendText = '';
    myUser?.friends.includes(user.id) && (removeFriendText = 'Видалити друга');
    myUser?.followTo.includes(user.id) && (removeFriendText = 'Видалити свій запит на дружбу');
    myUser?.followFrom.includes(user.id) && (removeFriendText = 'Видалити запит користувача на дружбу');

    return (
        <ListItem
            disablePadding
            secondaryAction={
                <Popup
                    anchor={anchor}
                    setAnchor={setAnchor}
                    actionIcon={
                        isLoading
                            ? <CircularProgress
                                  sx={{
                                      maxWidth: 24,
                                      maxHeight: 24,
                                      color: stylesVariables.primaryColor,
                                  }}
                              />
                            : <PeopleAltIcon
                                  sx={{ color: iconColor, opacity: myUser?.followFrom.includes(user.id) ? 0.4 : 1 }}
                              />
                    }
                >
                    {addFriendText.length > 0 && (
                        <Button variant="text" onClick={() => handleAddFriend(user.id)}>
                            {addFriendText}
                        </Button>
                    )}
                    {removeFriendText.length > 0 && (
                        <Button variant="text">
                            {removeFriendText}
                        </Button>
                    )}
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
};

export default UserAction;
