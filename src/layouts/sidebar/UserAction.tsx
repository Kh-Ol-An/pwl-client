import React, { FC, useState, useMemo } from 'react';
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
import {
    PeopleAlt as PeopleAltIcon,
    Person as PersonIcon,
    GroupAdd as GroupAddIcon,
    GroupRemove as GroupRemoveIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { addFriend, removeFriend } from '@/store/my-user/thunks';
import { EWhereRemove, IRemoveFriend } from '@/store/my-user/types';
import { IUser } from '@/models/IUser';
import { getLang, getMonthWithDate } from "@/utils/lang-action";
import Popup from '@/components/Popup';
import Button from '@/components/Button';
import StylesVariables from '@/styles/utils/variables.module.scss';
import { EShow, EWishSort, EWishStatus } from "@/models/IWish";
import { getWishList } from "@/store/wishes/thunks";
import { WISHES_PAGINATION_LIMIT } from "@/utils/constants";
import { setWishesSearch, setWishesSort, setWishStatus } from "@/store/wishes/slice";
import { selectUserId } from "@/store/selected-user/slice";

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

    const navigate = useNavigate();

    let iconColor = StylesVariables.lightColor;
    myUser?.followTo.includes(user.id) && (iconColor = StylesVariables.specialColor);
    (myUser?.followFrom.includes(user.id) || myUser?.friends.includes(user.id))
    && (iconColor = StylesVariables.primaryColor);

    const showAddFriend = myUser?.followFrom.includes(user.id)
        || (!myUser?.friends.includes(user.id) && !myUser?.followTo.includes(user.id));

    const params = useMemo(
        () => {
            const showBirthday = user?.birthday && (
                user?.id === myUser?.id || user?.showBirthday === EShow.ALL || (user?.showBirthday === EShow.FRIENDS && myUser?.friends.includes(user.id))
            );
            if (showBirthday) {
                return <span className="params">{ t('main-page.bd', { birthday: dayjs(user.birthday).locale(getLang()).format(getMonthWithDate()) }) }</span>;
            }

            const showDeliveryAddress = user?.deliveryAddress && (
                user?.id === myUser?.id || user?.showDeliveryAddress === EShow.ALL || (user?.showDeliveryAddress === EShow.FRIENDS && myUser?.friends.includes(user.id))
            );
            if (showDeliveryAddress) {
                return <span className="params">{ user.deliveryAddress }</span>;
            }

            const showEmail = user?.email && (
                user?.id === myUser?.id || user?.showEmail === EShow.ALL || (user?.showEmail === EShow.FRIENDS && myUser?.friends.includes(user.id))
            );
            if (showEmail) {
                return <span className="params">{ user.email }</span>;
            }

            return null;
        },
        [ user, myUser ],
    );

    const handleShowDetailAccount = () => {
        navigate(`/profile/${user.id}`);
        hideSidebar();
    };

    const handleSelectWish = async () => {
        await dispatch(getWishList({
            myId: myUser?.id,
            userId: user.id,
            status: EWishStatus.ALL,
            page: 1,
            limit: WISHES_PAGINATION_LIMIT,
            search: '',
            sort: EWishSort.POPULAR,
        }));
        await dispatch(setWishStatus(EWishStatus.ALL));
        await dispatch(setWishesSearch(''));
        await dispatch(setWishesSort(EWishSort.CREATED_DESC));
        await dispatch(selectUserId(user.id));
        localStorage.setItem('selectedUserId', user.id);
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
                        <Button to={`profile/${user.id}`} variant="text" fontSize="small">
                            <PersonIcon />
                            { t('profile-page.user-profile') }
                        </Button>
                        { showAddFriend && (
                            <Button variant="text" fontSize="small" onClick={ handleAddFriend }>
                                <GroupAddIcon />
                                {
                                    myUser?.followFrom.includes(user.id)
                                        ? t('main-page.confirm-friendship')
                                        : t('main-page.add-friend')
                                }
                            </Button>
                        ) }
                        { (myUser?.friends.includes(user.id) || myUser?.followTo.includes(user.id)) && (
                            <Button variant="text" fontSize="small" onClick={ () => handleRemoveFriend(EWhereRemove.FOLLOW_TO) }>
                                <GroupRemoveIcon />
                                { t('main-page.delete-your') } <br /> { t('main-page.delete-request') }
                            </Button>
                        ) }
                        { (myUser?.friends.includes(user.id) || myUser?.followFrom.includes(user.id)) && (
                            <Button variant="text" fontSize="small" onClick={ () => handleRemoveFriend(EWhereRemove.FOLLOW_FROM) }>
                                <GroupRemoveIcon />
                                { t('main-page.delete-user_s') } <br /> { t('main-page.delete-request') }
                            </Button>
                        ) }
                        { myUser?.friends.includes(user.id) && (
                            <Button variant="text" fontSize="small" onClick={ () => handleRemoveFriend(EWhereRemove.FRIENDS) }>
                                <GroupRemoveIcon />
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
            </ListItemAvatar>

            <ListItemButton
                sx={{
                    border: `1px dashed ${user.id === selectedUserId ? "#45f3ff90" : "transparent"}`,
                }}
                onClick={ handleSelectWish }
            >
                <ListItemText
                    primary={
                        <span className="name">
                            { user.firstName } { user.lastName }
                        </span>
                    }
                    secondary={params}
                    sx={ { color: StylesVariables.whiteColor } }
                />
            </ListItemButton>
        </ListItem>
    );
};

export default UserAction;
