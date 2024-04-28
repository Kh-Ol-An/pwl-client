import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { Avatar, Modal } from '@mui/material';
import {
    Settings as SettingsIcon,
    ManageAccounts as ManageAccountsIcon,
    Info as InfoIcon,
    Forum as ForumIcon,
    Logout as LogoutIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { logout, deleteMyUser } from '@/store/my-user/thunks';
import { getWishList } from '@/store/wishes/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import { IUser } from '@/models/IUser';
import { emailValidation, passwordValidation } from "@/utils/validations";
import Card from '@/layouts/Card';
import DetailAccount from '@/layouts/DetailAccount';
import EditAccount from '@/layouts/EditAccount';
import ChangePassword from '@/layouts/ChangePassword';
import About from '@/layouts/About';
import Contacts from '@/layouts/Contacts';
import Button from '@/components/Button';
import Switch from '@/components/Switch';
import Action from '@/components/Action';
import Popup from "@/components/Popup";
import Input from "@/components/Input";
import LogoIcon from '@/assets/images/logo.svg';
import WishHub from '@/assets/images/wish-hub.png';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
}

type Inputs = {
    email: IUser['email']
    password: string
}

const Header: FC<IProps> = ({ open, close }) => {
    const myUser = useAppSelector((state) => state.myUser.user);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [showDetailAccount, setShowDetailAccount] = useState<boolean>(false);
    const [isEditAccount, setIsEditAccount] = useState<boolean>(true);
    const [showEditAccount, setShowEditAccount] = useState<boolean>(false);
    const [showAbout, setShowAbout] = useState<boolean>(false);
    const [showContacts, setShowContacts] = useState<boolean>(false);
    const [showConfirmDeleteMyUser, setShowConfirmDeleteMyUser] = useState<boolean>(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!myUser) return;

        await dispatch(deleteMyUser({ ...data, id: myUser.id }));
        close();
    };

    // SelectWish
    const handleSelectWish = async () => {
        if (!myUser) return;

        await dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
        await dispatch(selectUserId(myUser.id));
        localStorage.setItem('selectedUserId', myUser.id);
        close();
    };

    // DetailAccount
    const handleShowDetailAccount = () => {
        setShowDetailAccount(true);
        close();
    };

    const handleHideDetailAccount = () => {
        setShowDetailAccount(false);
    };

    // EditAccount
    const handleShowEditAccount = () => {
        setShowEditAccount(true);
        setAnchor(null);
        close();
    };

    const handleHideEditAccount = () => {
        setShowEditAccount(false);
    };

    // About
    const handleShowAbout = () => {
        setShowAbout(true);
        setAnchor(null);
        close();
    };

    const handleHideAbout = () => {
        setShowAbout(false);
    };

    // Contacts
    const handleShowContacts = () => {
        setShowContacts(true);
        setAnchor(null);
        close();
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
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className={"header" + (open ? " open" : "")}>
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
                                        ? `Д.н. ${dayjs(myUser?.birthday).locale('uk').format('DD MMMM')}`
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

                        <Button variant="text" type="button" onClick={handleLogout}>
                            <LogoutIcon />
                            Вийти з аккаунту
                        </Button>
                    </Popup>

                    {/* Detail Account */}
                    {myUser && (
                        <Modal
                            open={showDetailAccount}
                            onClose={handleHideDetailAccount}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div className="modal modal-md">
                                <Card>
                                    <DetailAccount user={myUser} />
                                </Card>

                                <Action onClick={handleHideDetailAccount}>
                                    <CloseIcon sx={{ color: StylesVariables.blackColor }} />
                                </Action>
                            </div>
                        </Modal>
                    )}

                    {/* Edit Account */}
                    <Modal
                        open={showEditAccount}
                        onClose={handleHideEditAccount}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className="modal">
                            <Card>
                                <div className="change-edit-account">
                                    <span className={isEditAccount ? "primary-color" : ""}>Редагувати акаунт</span>
                                    <Switch
                                        id="change-edit-account"
                                        name="change-edit-account"
                                        checked={isEditAccount}
                                        onChange={(e) => setIsEditAccount(e.target.checked)}
                                    />
                                    <span className={isEditAccount ? "" : "action-color"}>Змінити пароль</span>
                                </div>

                                <div className="header-actions-account">
                                    <div className={"header-edit-account" + (isEditAccount ? " show" : "")}>
                                        <EditAccount
                                            close={handleHideEditAccount}
                                            handleShowConfirmDeleteMyUser={handleShowConfirmDeleteMyUser}
                                        />
                                    </div>

                                    <div className={"header-change-password" + (isEditAccount ? "" : " show")}>
                                        <ChangePassword userId={myUser?.id} close={handleHideEditAccount} />
                                    </div>
                                </div>
                            </Card>

                            <Action onClick={handleHideEditAccount}>
                                <CloseIcon sx={{ color: StylesVariables.blackColor }} />
                            </Action>
                        </div>
                    </Modal>

                    {/* About */}
                    <Modal
                        open={showAbout}
                        onClose={handleHideAbout}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className="modal">
                            <Card>
                                <About />
                            </Card>

                            <Action onClick={handleHideAbout}>
                                <CloseIcon sx={{ color: StylesVariables.blackColor }} />
                            </Action>
                        </div>
                    </Modal>

                    {/* Contacts */}
                    <Modal
                        open={showContacts}
                        onClose={handleHideContacts}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className="modal">
                            <Card>
                                <Contacts />
                            </Card>

                            <Action onClick={handleHideContacts}>
                                <CloseIcon sx={{ color: StylesVariables.blackColor }} />
                            </Action>
                        </div>
                    </Modal>

                    {/* Confirm Delete My User */}
                    <Modal
                        open={showConfirmDeleteMyUser}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <form className="modal confirm" onSubmit={handleSubmit(onSubmit)}>
                            <Card classes="not-full-screen">
                                <h3 className="title attention">Увага!</h3>

                                <p className="text">
                                    Нашому суму не має меж... Ми сподіваємось що Ви дасте нам ще один шанс та залишитись.
                                    Якщо Ви рішуче вирішили покинути нас, то підтвердьте свій намір ввівши відповідні дані.
                                </p>

                                <Input
                                    {...register("email", emailValidation)}
                                    id="email"
                                    name="email"
                                    type="text"
                                    label="Email*"
                                    error={errors?.email?.message}
                                />

                                <Input
                                    {...register("password", passwordValidation)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Пароль*"
                                    error={errors?.password?.message}
                                />

                                <div className="modal-actions">
                                    <Button variant="text" color="action-color" type="submit">
                                        Видаліть мій акаунт
                                    </Button>

                                    <Button type="button" onClick={() => setShowConfirmDeleteMyUser(false)}>
                                        Залишитись
                                    </Button>
                                </div>
                            </Card>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Header;
