import React, { FC, useEffect, useState } from 'react';
import { Avatar } from "@mui/material";
import Button from "@/components/Button";
import LogoIcon from "@/assets/images/logo.svg";
import {
    Forum as ForumIcon,
    Info as InfoIcon,
    Language as LanguageIcon,
    Logout as LogoutIcon,
    ManageAccounts as ManageAccountsIcon,
    PrivacyTip as PrivacyTipIcon,
} from "@mui/icons-material";
import 'dayjs/locale/uk';
import LanguageSelection from "@/components/LanguageSelection";
import SocialNetworks from "@/components/SocialNetworks";
import Popup from "@/components/Popup";
import CustomModal from "@/components/CustomModal";
import DetailAccount from "@/layouts/DetailAccount";
import EditAccountModal from "@/layouts/header/EditAccountModal";
import Contacts from "@/layouts/header/Contacts";
import ConfirmDeleteMyUserModal from "@/layouts/header/ConfirmDeleteMyUserModal";
import { handleGetInitialAllWishes, handleGetInitialWishList } from "@/utils/action-on-wishes";
import { changeFirsLoaded, logout } from "@/store/my-user/thunks";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useNavigate } from "react-router-dom";

interface IProps {
    hideHeader?: () => void;
}

const HeaderSettings: FC<IProps> = ({ hideHeader }) => {
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

        await handleGetInitialWishList(dispatch, myUser.id, myUser.id);
        setAnchor(null);
        hideHeader && hideHeader();
    };

    // DetailAccount
    const handleShowDetailAccount = () => {
        setShowDetailAccount(true);
        hideHeader && hideHeader();
    };
    const handleHideDetailAccount = () => {
        setShowDetailAccount(false);
    };

    // EditAccount
    const handleShowEditAccount = () => {
        setShowEditAccount(true);
        setAnchor(null);
        hideHeader && hideHeader();
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
        hideHeader && hideHeader();
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
        await handleGetInitialAllWishes(dispatch);
        setAnchor(null);
        hideHeader && hideHeader();
    };

    useEffect(() => {
        if (!myUser || myUser?.firstLoaded) return;

        setShowEditAccount(true);
    }, []);

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
            />
        </>
    );
};

export default HeaderSettings;
