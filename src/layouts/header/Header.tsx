import React, { FC, useState } from 'react';
import i18next from "i18next";
import { useTranslation } from 'react-i18next';
import { Avatar } from '@mui/material';
import {
    Settings as SettingsIcon,
    ManageAccounts as ManageAccountsIcon,
    Info as InfoIcon,
    Forum as ForumIcon,
    Language as LanguageIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { logout } from '@/store/my-user/thunks';
import { getWishList } from '@/store/wishes/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import DetailAccount from '@/layouts/DetailAccount';
import EditAccountModal from '@/layouts/header/EditAccountModal';
import About from '@/layouts/header/About';
import Contacts from '@/layouts/header/Contacts';
import ConfirmDeleteMyUserModal from '@/layouts/header/ConfirmDeleteMyUserModal';
import Button from '@/components/Button';
import Popup from '@/components/Popup';
import LanguageSelection from '@/components/LanguageSelection';
import LogoIcon from '@/assets/images/logo.svg';
import WishHub from '@/assets/images/wish-hub.png';
import StylesVariables from '@/styles/utils/variables.module.scss';
import HeaderModal from '@/layouts/header/HeaderModal';

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

    let language = 'en';
    i18next.language.includes('en') && (language = 'en');
    i18next.language.includes('uk') && (language = 'uk');

    let dayjsFormat = 'MMMM Do';
    i18next.language.includes('en') && (dayjsFormat = 'MMMM Do');
    i18next.language.includes('uk') && (dayjsFormat = 'DD MMMM');

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
    const handleHideEditAccount = () => {
        setShowEditAccount(false);
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
                                <span className="count unsuccess">
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
                                        ? t('home.bd', { birthday: dayjs(myUser?.birthday).locale(language).format(dayjsFormat) })
                                        : myUser?.email
                                }
                            </span>
                        </button>
                    </div>

                    <button className="logo" type="button" onClick={handleSelectWish}>
                        <img className="name" src={WishHub} alt="Wish Hub" />
                    </button>

                    {/* Settings */}
                    <Popup
                        anchor={anchor}
                        setAnchor={setAnchor}
                        actionIcon={<SettingsIcon sx={{ color: StylesVariables.specialColor }} />}
                    >
                        <Button variant="text" type="button" onClick={handleShowEditAccount}>
                            <ManageAccountsIcon />
                            Налаштування аккаунту
                        </Button>

                        <Button variant="text" type="button" onClick={handleShowAbout}>
                            <img className="wish-hub-icon" src={LogoIcon} alt="Wish Hub icon" />
                            Про
                            <img className="wish-hub-text" src={WishHub} alt="Wish Hub" />
                        </Button>

                        <Button to="/instruction" variant="text">
                            <InfoIcon />
                            Інструкція
                        </Button>

                        <Button variant="text" type="button" onClick={handleShowContacts}>
                            <ForumIcon />
                            Контакти
                        </Button>

                        <Button variant="text" type="button" onClick={handleShowLanguage}>
                            <LanguageIcon />
                            {t('home.interface_language')}
                        </Button>

                        <Button variant="text" type="button" onClick={handleLogout}>
                            <LogoutIcon />
                            Вийти з аккаунту
                        </Button>
                    </Popup>

                    {/* Detail Account */}
                    {myUser && (
                        <HeaderModal show={showDetailAccount} hide={handleHideDetailAccount} classes="modal modal-md">
                            <DetailAccount user={myUser} />
                        </HeaderModal>
                    )}

                    {/* Edit Account */}
                    <EditAccountModal
                        show={showEditAccount}
                        hide={handleHideEditAccount}
                        handleShowConfirmDeleteMyUser={handleShowConfirmDeleteMyUser}
                    />

                    {/* About */}
                    <HeaderModal show={showAbout} hide={handleHideAbout}>
                        <About />
                    </HeaderModal>

                    {/* Contacts */}
                    <HeaderModal show={showContacts} hide={handleHideContacts}>
                        <Contacts />
                    </HeaderModal>

                    {/* Language */}
                    <HeaderModal show={showLanguage} hide={handleHideLanguage}>
                        <div className="header-language">
                            {t('home.interface_language')}:
                            <LanguageSelection />
                        </div>
                    </HeaderModal>

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
