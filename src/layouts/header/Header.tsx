import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
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
import DetailAccount from '@/layouts/DetailAccount';
import EditAccountModal from '@/layouts/header/EditAccountModal';
import Contacts from '@/layouts/header/Contacts';
import ConfirmDeleteMyUserModal from '@/layouts/header/ConfirmDeleteMyUserModal';
import CustomModal from '@/components/CustomModal';
import Button from '@/components/Button';
import Popup from '@/components/Popup';
import LanguageSelection from '@/components/LanguageSelection';
import LogoIcon from '@/assets/images/logo.svg';
import StylesVariables from '@/styles/utils/variables.module.scss';
import YouTubeIcon from '@/assets/images/social-networks/YouTubeIcon';
import SocialNetworks from "@/components/SocialNetworks";
import { handleGetAllWishes, handleGetWishList } from "@/utils/action-on-wishes";

interface IProps {
    showHeader: boolean;
    hideHeader: () => void;
}

const Header: FC<IProps> = ({ showHeader, hideHeader }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [ anchor, setAnchor ] = useState<HTMLButtonElement | null>(null);
    const [ showDetailAccount, setShowDetailAccount ] = useState<boolean>(false);
    const [ showEditAccount, setShowEditAccount ] = useState<boolean>(false);
    const [ showContacts, setShowContacts ] = useState<boolean>(false);
    const [ showConfirmDeleteMyUser, setShowConfirmDeleteMyUser ] = useState<boolean>(false);

    const handleSingIn = async () => {
        navigate('/auth');
    }

    const handleSingUp = async () => {
        navigate('/auth?register');
    }

    // SelectWish
    const handleSelectWish = async () => {
        if (!myUser) return;

        await handleGetWishList(dispatch, myUser.id, myUser.id);
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
        await handleGetAllWishes(dispatch);
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
                    <button className="logo" type="button" onClick={ () => handleGetAllWishes(dispatch) }>
                        <span className="logo-name">Wish Hub</span>
                    </button>

                    {/* Settings */ }
                    <Popup
                        actionClasses="header-settings-icon"
                        anchor={ anchor }
                        setAnchor={ setAnchor }
                        actionIcon={
                            <>
                                <div className={ "header-user-data" + (myUser && anchor ? ' show' : '') }>
                                    <span className="header-user-name">
                                        { myUser?.firstName } { myUser?.lastName }
                                    </span>
                                    <span className="header-user-email">
                                        { myUser?.email }
                                    </span>
                                </div>
                                <div className="avatar-box">
                                    <Avatar
                                        alt={ myUser?.firstName }
                                        src={ myUser?.avatar }
                                        sx={ { width: '100%', height: '100%' } }
                                    />
                                </div>
                            </>
                        }
                    >
                        <div className="header-popup">
                            { !myUser && (
                                <div className="header-popup-auth">
                                    <Button onClick={ handleSingIn } variant="text">{ t('sing-in') }</Button>
                                    <Button onClick={ handleSingUp }>{ t('sing-up') }</Button>
                                </div>
                            ) }

                            <div className="header-popup-box">
                                { myUser && (
                                    <>
                                        <Button variant="text" type="button" onClick={ handleSelectWish }>
                                            <img
                                                className="wish-hub-icon"
                                                src={ LogoIcon }
                                                alt={ t('wish_hub_icon') }
                                            />
                                            { t('main-page.my-wishes') }
                                        </Button>

                                        <Button variant="text" type="button" onClick={ handleShowEditAccount }>
                                            <ManageAccountsIcon />
                                            { t('main-page.account_settings') }
                                        </Button>
                                    </>
                                ) }

                                <div className="header-lang">
                                    <LanguageIcon />
                                    { t('main-page.interface_language') }:
                                    <div className="header-lang-select">
                                        <LanguageSelection />
                                    </div>
                                </div>
                            </div>

                            <div className="header-popup-box">
                                <Button to="/instruction" variant="text">
                                    <YouTubeIcon
                                        backgroundColor={ StylesVariables.lightColor }
                                        playColor={ StylesVariables.backgroundColor }
                                    />
                                    { t('main-page.instruction') }
                                </Button>

                                <Button to="/about" variant="text">
                                    <InfoIcon />
                                    { t('main-page.about') }
                                    <span className="logo-name">Wish Hub</span>
                                </Button>

                                <Button variant="text" type="button" onClick={ handleShowContacts }>
                                    <ForumIcon />
                                    { t('main-page.contacts') }
                                </Button>
                            </div>

                            <div className="header-popup-box">
                                { myUser && (
                                    <Button variant="text" type="button" onClick={ handleLogout }>
                                        <LogoutIcon />
                                        { t('logout') }
                                    </Button>
                                ) }

                                <div className="header-popup-social-networks">
                                    <div className="header-popup-social-networks-box">
                                        <SocialNetworks />
                                    </div>

                                    <Button to="/privacy-policy" variant="text">
                                        <PrivacyTipIcon />
                                        { t('privacy-policy-page.title') }
                                    </Button>
                                </div>
                            </div>
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
