import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { addFriend, removeFriend } from '@/store/my-user/thunks';
import { IRemoveFriend } from '@/store/my-user/types';
import { IUser } from '@/models/IUser';
import { getLang, getMonthWithDate } from "@/utils/lang-action";
import DetailAccount from '@/layouts/DetailAccount';
import Popup from '@/components/Popup';
import CustomModal from '@/components/CustomModal';
import Button from '@/components/Button';
import StylesVariables from '@/styles/utils/variables.module.scss';
import { handleGetInitialWishList } from "@/utils/action-on-wishes";

interface IProps {
    user: IUser;
    updateUsers: () => void;
    hideSidebar: () => void;
}

const UserAction: FC<IProps> = ({ user, updateUsers, hideSidebar }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const [ anchor, setAnchor ] = useState<HTMLButtonElement | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ showDetailAccount, setShowDetailAccount ] = useState<boolean>(false);

    const navigate = useNavigate();

    let iconColor = StylesVariables.lightColor;
    myUser?.followTo.includes(user.id) && (iconColor = StylesVariables.specialColor);
    (myUser?.followFrom.includes(user.id) || myUser?.friends.includes(user.id))
    && (iconColor = StylesVariables.primaryColor);

    const showAddFriend = myUser?.followFrom.includes(user.id)
        || (!myUser?.friends.includes(user.id) && !myUser?.followTo.includes(user.id));

    const handleShowDetailAccount = () => {
        setShowDetailAccount(true);
        hideSidebar();
    };

    const handleHideDetailAccount = () => {
        setShowDetailAccount(false);
    };

    const handleSelectWish = async () => {
        await handleGetInitialWishList(dispatch, myUser?.id, user.id);
        hideSidebar();
    };

    const handleAddFriend = async () => {
        if (myUser) {
            setIsLoading(true);
            await dispatch(addFriend({ myId: myUser.id, friendId: user.id }));
            setIsLoading(false);
            setAnchor(null);
            updateUsers();
        } else {
            navigate('/auth');
        }
    };

    const handleRemoveFriend = async (whereRemove: IRemoveFriend['whereRemove']) => {
        if (myUser) {
            setIsLoading(true);
            await dispatch(removeFriend({ myId: myUser.id, friendId: user.id, whereRemove }));
            setIsLoading(false);
            setAnchor(null);
            updateUsers();
        } else {
            navigate('/auth');
        }
    };

    return (
        <ListItem
            disablePadding
            secondaryAction={
                <Popup
                    actionClasses="people-icon"
                    anchor={ anchor }
                    setAnchor={ setAnchor }
                    actionIcon={
                        isLoading
                            ? <CircularProgress
                                sx={ {
                                    maxWidth: 24,
                                    maxHeight: 24,
                                    color: StylesVariables.primaryColor,
                                } }
                            />
                            : <PeopleAltIcon
                                sx={ { color: iconColor, opacity: myUser?.followFrom.includes(user.id) ? 0.4 : 1 } }
                            />
                    }
                >
                    <div className="popup">
                        { showAddFriend && (
                            <Button variant="text" fontSize="small" onClick={ handleAddFriend }>
                                {
                                    myUser?.followFrom.includes(user.id)
                                        ? t('main-page.confirm-friendship')
                                        : t('main-page.add-friend')
                                }
                            </Button>
                        ) }
                        { (myUser?.friends.includes(user.id) || myUser?.followTo.includes(user.id)) && (
                            <Button variant="text" fontSize="small" onClick={ () => handleRemoveFriend('followTo') }>
                                { t('main-page.delete-your') } <br /> { t('main-page.delete-request') }
                            </Button>
                        ) }
                        { (myUser?.friends.includes(user.id) || myUser?.followFrom.includes(user.id)) && (
                            <Button variant="text" fontSize="small" onClick={ () => handleRemoveFriend('followFrom') }>
                                { t('main-page.delete-user_s') } <br /> { t('main-page.delete-request') }
                            </Button>
                        ) }
                        { myUser?.friends.includes(user.id) && (
                            <Button variant="text" fontSize="small" onClick={ () => handleRemoveFriend('friends') }>
                                { t('main-page.remove-friend') }
                            </Button>
                        ) }
                    </div>
                </Popup>
            }
        >
            <ListItemAvatar>
                <Avatar
                    src={ user.avatar }
                    alt={ `${ user.firstName } ${ user.lastName ? user.lastName : '' }` }
                    onClick={ handleShowDetailAccount }
                />

                <CustomModal show={ showDetailAccount } hide={ handleHideDetailAccount } classes="modal modal-md">
                    <DetailAccount user={ user } />
                </CustomModal>
            </ListItemAvatar>

            <ListItemButton onClick={ handleSelectWish }>
                <ListItemText
                    primary={
                        <span className={ "name" + (user.id === selectedUserId ? " selected" : "") }>
                            { user.firstName } { user.lastName }
                        </span>
                    }
                    secondary={
                        <span className="params">
                            {
                                user.birthday
                                    ? t('main-page.bd', { birthday: dayjs(user.birthday).locale(getLang()).format(getMonthWithDate()) })
                                    : user.email
                            }
                        </span>
                    }
                    sx={ { color: StylesVariables.whiteColor } }
                />
            </ListItemButton>
        </ListItem>
    );
};

export default UserAction;
