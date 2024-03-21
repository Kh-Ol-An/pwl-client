import React, { FC, useState } from 'react';
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    CircularProgress,
} from '@mui/material';
import { PeopleAlt as PeopleAltIcon } from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { addFriend, removeFriend } from '../store/my-user/thunks';
import { getWishList } from '../store/wishes/thunks';
import { selectUserId } from '../store/selected-user/slice';
import { IRemoveFriend } from '../store/my-user/types';
import { IUser } from '../models/IUser';
import Popup from './Popup';
import Button from './Button';
import stylesVariables from '../styles/utils/variables.module.scss';

interface IProps {
    user: IUser;
    close: () => void;
}

const UserAction: FC<IProps> = ({ user, close }) => {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const myUser = useAppSelector((state) => state.myUser.user);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const handleSelectWish = async () => {
        if (!myUser) return;

        await dispatch(getWishList({ myId: myUser.id, userId: user.id }));
        await dispatch(selectUserId(user.id));
        localStorage.setItem('selectedUserId', user.id);
        close();
    };

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
                        <Button variant="text" fontSize="small" onClick={handleAddFriend}>
                            {myUser?.followFrom.includes(user.id) ? "Підтвердити дружбу" : "Додати друга"}
                        </Button>
                    )}
                    {(myUser?.friends.includes(user.id) || myUser?.followTo.includes(user.id)) && (
                        <Button variant="text" fontSize="small" onClick={() => handleRemoveFriend('followTo')}>
                            Видалити свій запит <br/> на дружбу
                        </Button>
                    )}
                    {(myUser?.friends.includes(user.id) || myUser?.followFrom.includes(user.id)) && (
                        <Button variant="text" fontSize="small" onClick={() => handleRemoveFriend('followFrom')}>
                            Видалити запит користувача <br/> на дружбу
                        </Button>
                    )}
                    {myUser?.friends.includes(user.id) && (
                        <Button variant="text" fontSize="small" onClick={() => handleRemoveFriend('friends')}>
                            Видалити друга
                        </Button>
                    )}
                </Popup>
            }
        >
            <ListItemButton onClick={handleSelectWish}>
                <ListItemAvatar>
                    <Avatar
                        src={user.avatar}
                        alt={`${user?.firstName} ${user?.lastName ? user?.lastName : ''}`}
                    />
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <span className={"name" + (user?.id === selectedUserId ? " selected" : "")}>
                            {user?.firstName} {user?.lastName}
                        </span>
                    }
                    secondary={
                        <span className="params">
                            {user.birthday
                                ? dayjs(user.birthday).locale('uk').format('DD MMMM')
                                : user.email}
                        </span>
                    }
                    sx={{ color: stylesVariables.whiteColor }}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default UserAction;
