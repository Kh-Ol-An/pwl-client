import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { Avatar, Modal } from '@mui/material';
import {
    Settings as SettingsIcon,
    ManageAccounts as ManageAccountsIcon,
    Logout as LogoutIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { logout } from '../store/my-user/thunks';
import { getWishList } from '../store/wishes/thunks';
import { selectUserId } from '../store/selected-user/slice';
import { emailValidation, passwordValidation } from "../utils/validations";
import Card from './Card';
import AccountModal from './AccountModal';
import Button from '../components/Button';
import Action from '../components/Action';
import Popup from "../components/Popup";
import Input from "../components/Input";
import stylesVariables from '../styles/utils/variables.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
}

type Inputs = {
    email: string
    password: string
}

const Header: FC<IProps> = ({ open, close }) => {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const [openConfirmDeleteMyUser, setShowConfirmDeleteMyUser] = useState<boolean>(false);

    const myUser = useAppSelector((state) => state.myUser.user);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!myUser) return;

        console.log('onSubmit', data)
        // await dispatch(deleteMyUser(myUser.id));
        close();
    };

    const handleSelectWish = async () => {
        if (!myUser) return;

        await dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
        await dispatch(selectUserId(myUser.id));
        localStorage.setItem('selectedUserId', myUser.id);
        close();
    };

    const handleOpenSettings = () => {
        setOpenSettings(true);
        setAnchor(null);
        close();
    };

    const handleOpenConfirmDeleteMyUser = () => {
        setShowConfirmDeleteMyUser(true);
        setOpenSettings(false);
    };

    const handleCloseSettings = () => {
        setOpenSettings(false);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className={"header" + (open ? " open" : "")}>
            <div className="header-inner">
                <div className="header-content">
                    <button className="my-user" type="button" onClick={handleSelectWish}>
                        <Avatar alt={myUser?.firstName} src={myUser?.avatar} />

                        <div className="content">
                            <span className={"name" + (myUser?.id === selectedUserId ? " selected" : "")}>
                                {myUser?.firstName} {myUser?.lastName}
                            </span>

                            <span className="params">
                                {
                                    myUser?.birthday
                                        ? dayjs(myUser?.birthday).locale('uk').format('DD MMMM')
                                        : myUser?.email
                                }
                            </span>
                        </div>
                    </button>

                    <Popup
                        anchor={anchor}
                        setAnchor={setAnchor}
                        actionIcon={<SettingsIcon sx={{ color: stylesVariables.specialColor }} />}
                    >
                        <Button variant="text" onClick={handleOpenSettings}>
                            <ManageAccountsIcon />
                            Налаштування аккаунту
                        </Button>
                        <Button variant="text" onClick={handleLogout}>
                            <LogoutIcon />
                            Вийти з аккаунту
                        </Button>
                    </Popup>

                    <Modal
                        open={openSettings}
                        onClose={handleCloseSettings}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className="modal">
                            <Card>
                                <AccountModal
                                    close={handleCloseSettings}
                                    openConfirmDeleteMyUser={handleOpenConfirmDeleteMyUser}
                                />
                            </Card>

                            <Action onClick={handleCloseSettings}>
                                <CloseIcon />
                            </Action>
                        </div>
                    </Modal>

                    <Modal
                        open={openConfirmDeleteMyUser}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <form className="modal" onSubmit={handleSubmit(onSubmit)}>
                            <Card classes="not-full-screen">
                                <h3 className="title attention">Увага!</h3>

                                <p className="text-lg">
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
