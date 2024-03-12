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
import { addFriend, removeFriend } from '../store/my-user/thunks';
import { IUser } from '../models/IUser';
import stylesVariables from '../styles/utils/variables.module.scss';
import { IRemoveFriend } from '../store/my-user/types';

interface IProps {
    user: IUser;
    myUser: IUser | null;
}

const UserAction: FC<IProps> = ({ user, myUser }) => {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const handleAddFriend = async () => {
        if (!myUser) return;

        setIsLoading(true);
        await dispatch(addFriend({ myId: myUser.id, friendId: user.id }));
        setIsLoading(false);
        setAnchor(null);
    };

    const handleRemoveFriend = async (whereRemove: IRemoveFriend['whereRemove']) => {
        if (!myUser) return;

        setIsLoading(true);
        await dispatch(removeFriend({ myId: myUser.id, friendId: user.id, whereRemove }));
        setIsLoading(false);
        setAnchor(null);
    };

    let iconColor = stylesVariables.lightColor;
    myUser?.followTo.includes(user.id) && (iconColor = stylesVariables.specialColor);
    (myUser?.followFrom.includes(user.id) || myUser?.friends.includes(user.id))
        && (iconColor = stylesVariables.primaryColor);

    const showAddFriend = myUser?.followFrom.includes(user.id)
        || (!myUser?.friends.includes(user.id) && !myUser?.followTo.includes(user.id));

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
                    {showAddFriend && (
                        <Button variant="text" onClick={handleAddFriend}>
                            {myUser?.followFrom.includes(user.id) ? "Підтвердити дружбу" : "Додати друга"}
                        </Button>
                    )}
                    {(myUser?.friends.includes(user.id) || myUser?.followTo.includes(user.id)) && (
                        <Button variant="text" onClick={() => handleRemoveFriend('followTo')}>
                            Видалити свій запит на дружбу
                        </Button>
                    )}
                    {(myUser?.friends.includes(user.id) || myUser?.followFrom.includes(user.id)) && (
                        <Button variant="text" onClick={() => handleRemoveFriend('followFrom')}>
                            Видалити запит користувача на дружбу
                        </Button>
                    )}
                    {myUser?.friends.includes(user.id) && (
                        <Button variant="text" onClick={() => handleRemoveFriend('friends')}>
                            Видалити друга
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
