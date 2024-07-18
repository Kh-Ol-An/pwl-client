import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@mui/material';
import {
    ManageAccounts as ManageAccountsIcon,
    Info as InfoIcon,
    PrivacyTip as PrivacyTipIcon,
    Forum as ForumIcon,
    Language as LanguageIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import 'dayjs/locale/uk';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { changeFirsLoaded, logout } from '@/store/my-user/thunks';
import { getAllWishes, addAllWishes, getWishList } from '@/store/wishes/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import DetailAccount from '@/layouts/DetailAccount';
import EditAccountModal from '@/layouts/header/EditAccountModal';
import Contacts from '@/layouts/header/Contacts';
import ConfirmDeleteMyUserModal from '@/layouts/header/ConfirmDeleteMyUserModal';
import CustomModal from '@/components/CustomModal';
import Button from '@/components/Button';
import Popup from '@/components/Popup';
import LanguageSelection from '@/components/LanguageSelection';
import LogoIcon from '@/assets/images/logo.svg';
import { USERS_PAGINATION_LIMIT, WISHES_PAGINATION_LIMIT } from "@/utils/constants";
import { setWishesSearch, setWishStatus } from "@/store/wishes/slice";
import { getAllUsers } from "@/store/users/thunks";
import { setUsersSearch } from "@/store/users/slice";

interface IProps {
    showHeader: boolean;
    hideHeader: () => void;
}

const Header: FC<IProps> = ({ showHeader, hideHeader }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const [ anchor, setAnchor ] = useState<HTMLButtonElement | null>(null);
    const [ showDetailAccount, setShowDetailAccount ] = useState<boolean>(false);
    const [ showEditAccount, setShowEditAccount ] = useState<boolean>(false);
    const [ showContacts, setShowContacts ] = useState<boolean>(false);
    const [ showConfirmDeleteMyUser, setShowConfirmDeleteMyUser ] = useState<boolean>(false);

    // SelectAllWishes
    const handleSelectAllWishes = async () => {
        await dispatch(getAllWishes({ page: 1, limit: WISHES_PAGINATION_LIMIT, search: '' }));
        await dispatch(selectUserId(null));
        localStorage.removeItem('selectedUserId');
        await dispatch(setWishesSearch(''));
        await dispatch(setWishStatus('all'));
    };

    // SelectWish
    const handleSelectWish = async () => {
        if (!myUser) return;

        await dispatch(getWishList({
            myId: myUser.id,
            userId: myUser.id,
            wishStatus: 'all',
            page: 1,
            limit: WISHES_PAGINATION_LIMIT,
            search: '',
        }));
        await dispatch(setWishesSearch(''));
        await dispatch(setWishStatus('all'));
        await dispatch(selectUserId(myUser.id));
        localStorage.setItem('selectedUserId', myUser.id);
        setAnchor(null);
        hideHeader();
    };

    // DetailAccount
    const handleShowDetailAccount = () => {
        setShowDetailAccount(true);
        hideHeader();
    };
    const handleHideDetailAccount = () => {
        setShowDetailAccount(false);
    };

    // EditAccount
    const handleShowEditAccount = () => {
        setShowEditAccount(true);
        setAnchor(null);
        hideHeader();
    };
    const handleHideEditAccount = async () => {
        setShowEditAccount(false);

        if (!myUser || myUser?.firstLoaded) return;
        await dispatch(changeFirsLoaded({ userId: myUser.id }));
    };

    // Contacts
    const handleShowContacts = () => {
        setShowContacts(true);
        setAnchor(null);
        hideHeader();
    };
    const handleHideContacts = () => {
        setShowContacts(false);
    };

    // ConfirmDeleteMyUser
    const handleShowConfirmDeleteMyUser = () => {
        setShowConfirmDeleteMyUser(true);
        setShowEditAccount(false);
    };

    // Logout
    const handleLogout = async () => {
        await dispatch(logout());
        await dispatch(getAllUsers({ page: 1, limit: USERS_PAGINATION_LIMIT, search: '' }));
        await dispatch(setUsersSearch(''));
        await handleSelectAllWishes();
        setAnchor(null);
        hideHeader();
    };

    useEffect(() => {
        if (!myUser || myUser?.firstLoaded) return;

        setShowEditAccount(true);
    }, []);

    return (
        <div className={ "header" + (showHeader ? " show" : "") }>
            <div className="header-inner">
                <div className="header-content">
                    <button className="logo" type="button" onClick={ handleSelectAllWishes }>
                        <span className="logo-name">Wish Hub</span>
                    </button>

                    {/* Settings */ }
                    <Popup
                        actionClasses="header-settings-icon"
                        anchor={ anchor }
                        setAnchor={ setAnchor }
                        actionIcon={
                            <div className="avatar-box">
                                <Avatar
                                    alt={ myUser?.firstName }
                                    src={ myUser?.avatar }
                                    sx={ { width: '100%', height: '100%' } }
                                />
                            </div>
                        }
                    >
                        <div className="header-popup">
                            <Button
                                variant="text"
                                color="primary-color"
                                type="button"
                                onClick={ handleSelectWish }
                            >
                                {/*<ManageAccountsIcon />*/}
                                Selcet Oner WISH
                            </Button>

                            <Button
                                variant="text"
                                color="primary-color"
                                type="button"
                                onClick={ handleShowEditAccount }
                            >
                                <ManageAccountsIcon />
                                { t('main-page.account_settings') }
                            </Button>

                            <Button to="/about" variant="text" color="primary-color">
                                <img className="wish-hub-icon" src={ LogoIcon } alt={ t('wish_hub_icon') } />
                                { t('main-page.about') }
                                <span className="logo-name">Wish Hub</span>
                            </Button>

                            <Button to="/instruction" variant="text" color="primary-color">
                                <InfoIcon />
                                { t('main-page.instruction') }
                            </Button>

                            <Button to="/privacy-policy" variant="text" color="primary-color">
                                <PrivacyTipIcon />
                                { t('privacy-policy-page.title') }
                            </Button>

                            <Button variant="text" color="primary-color" type="button" onClick={ handleShowContacts }>
                                <ForumIcon />
                                { t('main-page.contacts') }
                            </Button>

                            <div className="header-lang">
                                <LanguageIcon />
                                { t('main-page.interface_language') }:
                                <div className="header-lang-select">
                                    <LanguageSelection />
                                </div>
                            </div>

                            <Button variant="text" color="primary-color" type="button" onClick={ handleLogout }>
                                <LogoutIcon />
                                { t('logout') }
                            </Button>
                        </div>
                    </Popup>

                    {/* Detail Account */ }
                    { myUser && (
                        <CustomModal
                            show={ showDetailAccount }
                            hide={ handleHideDetailAccount }
                            classes="modal modal-md"
                        >
                            <DetailAccount user={ myUser } />
                        </CustomModal>
                    ) }

                    {/* Edit Account */ }
                    <EditAccountModal
                        show={ showEditAccount }
                        hide={ handleHideEditAccount }
                        handleShowConfirmDeleteMyUser={ handleShowConfirmDeleteMyUser }
                    />

                    {/* Contacts */ }
                    <CustomModal show={ showContacts } hide={ handleHideContacts }>
                        <Contacts />
                    </CustomModal>

                    {/* Confirm Delete My User */ }
                    <ConfirmDeleteMyUserModal
                        show={ showConfirmDeleteMyUser }
                        hide={ () => setShowConfirmDeleteMyUser(false) }
                        hideHeader={ hideHeader }
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
