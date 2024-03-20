import React, { FC, useState } from 'react';
import { Avatar, Modal } from '@mui/material';
import {
    Settings as SettingsIcon,
    ManageAccounts as ManageAccountsIcon,
    Logout as LogoutIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { logout } from '../store/my-user/thunks';
import Card from './Card';
import AccountModal from './AccountModal';
import Button from '../components/Button';
import Action from '../components/Action';
import Popup from "../components/Popup";
import stylesVariables from '../styles/utils/variables.module.scss';
import dayjs from 'dayjs';
import { getWishList } from '../store/wishes/thunks';
import { selectUserId } from '../store/selected-user/slice';

interface IProps {
    open: boolean;
    close?: () => void;
}

const Header: FC<IProps> = ({ open, close }) => {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [openSettings, setOpenSettings] = useState<boolean>(false);

    const myUser = useAppSelector((state) => state.myUser.user);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const handleSelectWish = async () => {
        if (!myUser) return;

        await dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
        await dispatch(selectUserId(myUser.id));
        localStorage.setItem('selectedUserId', myUser.id);
        close && close();
    };

    const handleOpenSettings = () => {
        setOpenSettings(true);
        setAnchor(null);
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
                                <AccountModal close={handleCloseSettings} />
                            </Card>

                            <Action onClick={handleCloseSettings}>
                                <CloseIcon />
                            </Action>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Header;
