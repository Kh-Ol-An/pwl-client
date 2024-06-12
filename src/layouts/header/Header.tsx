import React, { FC, useState, useEffect } from 'react';
import i18next from "i18next";
import { useTranslation } from 'react-i18next';
import { Avatar } from '@mui/material';
import {
    Settings as SettingsIcon,
    ManageAccounts as ManageAccountsIcon,
//    Info as InfoIcon,
    Forum as ForumIcon,
    Language as LanguageIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { changeFirsLoaded, logout } from '@/store/my-user/thunks';
import { getWishList } from '@/store/wishes/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import DetailAccount from '@/layouts/DetailAccount';
import EditAccountModal from '@/layouts/header/EditAccountModal';
import About from '@/layouts/header/About';
import Contacts from '@/layouts/header/Contacts';
import ConfirmDeleteMyUserModal from '@/layouts/header/ConfirmDeleteMyUserModal';
import CustomModal from '@/components/CustomModal';
import Button from '@/components/Button';
import Popup from '@/components/Popup';
import LanguageSelection from '@/components/LanguageSelection';
import LogoIcon from '@/assets/images/logo.svg';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    showHeader: boolean;
    hideHeader: () => void;
}

const Header: FC<IProps> = ({ showHeader, hideHeader }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [showDetailAccount, setShowDetailAccount] = useState<boolean>(false);
    const [showEditAccount, setShowEditAccount] = useState<boolean>(false);
    const [showAbout, setShowAbout] = useState<boolean>(false);
    const [showContacts, setShowContacts] = useState<boolean>(false);
    const [showLanguage, setShowLanguage] = useState<boolean>(false);
    const [showConfirmDeleteMyUser, setShowConfirmDeleteMyUser] = useState<boolean>(false);

    let lang = 'en';
    i18next.language.includes('en') && (lang = 'en');
    i18next.language.includes('uk') && (lang = 'uk');

    let dateFormat = 'MMMM Do';
    i18next.language.includes('en') && (dateFormat = 'MMMM Do');
    i18next.language.includes('uk') && (dateFormat = 'DD MMMM');

    // SelectWish
    const handleSelectWish = async () => {
        if (!myUser) return;

        await dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
        await dispatch(selectUserId(myUser.id));
        localStorage.setItem('selectedUserId', myUser.id);
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

    // About
    const handleShowAbout = () => {
        setShowAbout(true);
        setAnchor(null);
        hideHeader();
    };
    const handleHideAbout = () => {
        setShowAbout(false);
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

    // Language
    const handleShowLanguage = () => {
        setShowLanguage(true);
        setAnchor(null);
        hideHeader();
    };
    const handleHideLanguage = () => {
        setShowLanguage(false);
    };

    // ConfirmDeleteMyUser
    const handleShowConfirmDeleteMyUser = () => {
        setShowConfirmDeleteMyUser(true);
        setShowEditAccount(false);
    };

    // Logout
    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (!myUser || myUser?.firstLoaded) return;

        setShowEditAccount(true);
    }, []);

    return (
        <div className={"header" + (showHeader ? " show" : "")}>
            <div className="header-inner">
                <div className="header-content">
                    <div className="my-user">
                        <button className="avatar-box" type="button" onClick={handleShowDetailAccount}>
                            <Avatar alt={myUser?.firstName} src={myUser?.avatar} />

                            {myUser && myUser.successfulWishes > 0 && (
                                <span className="count success">
                                    {myUser?.successfulWishes}
                                </span>
                            )}
                            {myUser && myUser.unsuccessfulWishes > 0 && (
                                <span className="count unsuccess">K
                                    {myUser?.unsuccessfulWishes}
                                </span>
                            )}
                        </button>

                        <button className="content" type="button" onClick={handleSelectWish}>
                            <span className={"name" + (myUser?.id === selectedUserId ? " selected" : "")}>
                                {myUser?.firstName} {myUser?.lastName}
                            </span>

                            <span className="params">
                                {
                                    myUser?.birthday
                                        ? t('main-page.bd', { birthday: dayjs(myUser?.birthday).locale(lang).format(dateFormat) })
                                        : myUser?.email
                                }
                            </span>
                        </button>
                    </div>

                    <button className="logo" type="button" onClick={ handleSelectWish }>
                        <span className="logo-name">Wish Hub</span>
                    </button>

                    {/* Settings */ }
                    <Popup
                        anchor={anchor}
                        setAnchor={setAnchor}
                        actionIcon={<SettingsIcon sx={{ color: StylesVariables.specialColor }} />}
                    >
                        <Button variant="text" color="primary-color" type="button" onClick={handleShowEditAccount}>
                            <ManageAccountsIcon />
                            {t('main-page.account_settings')}
                        </Button>

                        <Button variant="text" color="primary-color" type="button" onClick={ handleShowAbout }>
                            <img className="wish-hub-icon" src={ LogoIcon } alt={ t('wish_hub_icon') } />
                            { t('main-page.about') }
                            <span className="logo-name">Wish Hub</span>
                        </Button>

                        {/*<Button to="/instruction" variant="text">*/}
                        {/*    <InfoIcon />*/}
                        {/*    {t('main-page.instruction')}*/}
                        {/*</Button>*/}

                        <Button variant="text" color="primary-color" type="button" onClick={handleShowContacts}>
                            <ForumIcon />
                            {t('main-page.contacts')}
                        </Button>

                        <Button variant="text" color="primary-color" type="button" onClick={handleShowLanguage}>
                            <LanguageIcon />
                            {t('main-page.interface_language')}
                        </Button>

                        <Button variant="text" color="primary-color" type="button" onClick={handleLogout}>
                            <LogoutIcon />
                            {t('logout')}
                        </Button>
                    </Popup>

                    {/* Detail Account */}
                    {myUser && (
                        <CustomModal show={showDetailAccount} hide={handleHideDetailAccount} classes="modal modal-md">
                            <DetailAccount user={myUser} />
                        </CustomModal>
                    )}

                    {/* Edit Account */}
                    <EditAccountModal
                        show={showEditAccount}
                        hide={handleHideEditAccount}
                        handleShowConfirmDeleteMyUser={handleShowConfirmDeleteMyUser}
                    />

                    {/* About */}
                    <CustomModal show={showAbout} hide={handleHideAbout}>
                        <About />
                    </CustomModal>

                    {/* Contacts */}
                    <CustomModal show={showContacts} hide={handleHideContacts}>
                        <Contacts />
                    </CustomModal>

                    {/* Language */}
                    <CustomModal show={showLanguage} hide={handleHideLanguage}>
                        <div className="header-language">
                            {t('main-page.interface_language')}:
                            <LanguageSelection />
                        </div>
                    </CustomModal>

                    {/* Confirm Delete My User */}
                    <ConfirmDeleteMyUserModal
                        show={showConfirmDeleteMyUser}
                        hide={() => setShowConfirmDeleteMyUser(false)}
                        hideHeader={hideHeader}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
