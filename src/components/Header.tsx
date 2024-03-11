import React, { useState } from 'react';
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
import Card from './Card';
import Button from './Button';
import AccountSettings from './AccountSettings';
import Action from './Action';
import Popup from "./Popup";
import stylesVariables from '../styles/utils/variables.module.scss';

const Header = () => {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [openSettings, setOpenSettings] = useState<boolean>(false);

    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

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
        <div className="header">
            <div className="inner">
                <div className="content">
                    <div className="data">
                        <Avatar alt={myUser?.firstName} src={myUser?.avatar} />

                        <div className="box">
                            <span className="name">{myUser?.firstName} {myUser?.lastName}</span>
                            <span className="params">
                                {
                                    myUser?.birthday
                                        ? dayjs(myUser?.birthday).locale('uk').format('DD MMMM')
                                        : myUser?.email
                                }
                            </span>
                        </div>
                    </div>

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
                                <AccountSettings close={handleCloseSettings} />
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
