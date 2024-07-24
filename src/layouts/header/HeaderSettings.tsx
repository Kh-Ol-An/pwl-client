import React, { FC, useState } from 'react';
import { Avatar } from "@mui/material";
import Button from "@/components/Button";
import LogoIcon from "@/assets/images/logo.svg";
import {
    Forum as ForumIcon,
    Info as InfoIcon,
    Language as LanguageIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
    PrivacyTip as PrivacyTipIcon,
} from "@mui/icons-material";
import 'dayjs/locale/uk';
import LanguageSelection from "@/components/LanguageSelection";
import SocialNetworks from "@/components/SocialNetworks";
import Popup from "@/components/Popup";
import CustomModal from "@/components/CustomModal";
import Contacts from "@/layouts/header/Contacts";
import { handleGetInitialAllWishes, handleGetInitialWishList } from "@/utils/action-on-wishes";
import { logout } from "@/store/my-user/thunks";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useNavigate } from "react-router-dom";

interface IProps {
    logoutWithoutUpdate?: boolean;
    hideHeader?: () => void;
}

const HeaderSettings: FC<IProps> = ({ logoutWithoutUpdate = false, hideHeader }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [ anchor, setAnchor ] = useState<HTMLButtonElement | null>(null);
    const [ showContacts, setShowContacts ] = useState<boolean>(false);

    const handleSingIn = async () => {
        navigate('/auth');
    }

    const handleSingUp = async () => {
        navigate('/auth?register');
    }

    // SelectWish
    const handleSelectWish = async () => {
        if (!myUser) return;

        await handleGetInitialWishList(dispatch, myUser.id, myUser.id);
        setAnchor(null);
        hideHeader && hideHeader();
    };

    // navigateToProfile
    const handleNavigateToProfile = () => {
        navigate(`/profile/${myUser?.id}`);
        setAnchor(null);
        hideHeader && hideHeader();
    };

    // Contacts
    const handleShowContacts = () => {
        setShowContacts(true);
        setAnchor(null);
        hideHeader && hideHeader();
    };
    const handleHideContacts = () => {
        setShowContacts(false);
    };

    // Logout
    const handleLogout = async () => {
        setAnchor(null);
        hideHeader && hideHeader();
        await dispatch(logout());
        !logoutWithoutUpdate && await handleGetInitialAllWishes(dispatch);
    };

    return (
        <>
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
                        <div className="header-avatar-box">
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

                                <Button variant="text" type="button" onClick={ handleNavigateToProfile }>
                                    <PersonIcon />
                                    { t('profile-page.my-profile') }
                                </Button>
                            </>
                        ) }

                        <div className="header-lang">
                            <LanguageIcon />
                            { t('main-page.interface_language') }:
                            <div className="header-lang-select">
                                <LanguageSelection hidPopup={ () => setAnchor(null) } />
                            </div>
                        </div>
                    </div>

                    <div className="header-popup-box">
                        {/*<Button to="/instruction" variant="text">*/ }
                        {/*    <YouTubeIcon*/ }
                        {/*        backgroundColor={ StylesVariables.lightColor }*/ }
                        {/*        playColor={ StylesVariables.backgroundColor }*/ }
                        {/*    />*/ }
                        {/*    { t('main-page.instruction') }*/ }
                        {/*</Button>*/ }

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

            {/* Contacts */ }
            <CustomModal show={ showContacts } hide={ handleHideContacts }>
                <Contacts />
            </CustomModal>
        </>
    );
};

export default HeaderSettings;
