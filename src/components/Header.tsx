import React, { useState } from 'react';
import { Avatar, Modal, Popover } from '@mui/material';
import {
    Settings as SettingsIcon,
    ManageAccounts as ManageAccountsIcon,
    Logout as LogoutIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { logout } from '../store/my-user/thunks';
import Card from './Card';
import Button from './Button';
import AccountSettings from './AccountSettings';
import stylesVariables from '../styles/utils/variables.module.scss';
import Action from './Action';

const Header = () => {
    const [anchorSetting, setAnchorSetting] = React.useState<HTMLButtonElement | null>(null);
    const [openSettings, setOpenSettings] = useState<boolean>(false);

    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const open = Boolean(anchorSetting);
    const id = open ? 'simple-popover' : undefined;

    const handleOpenSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorSetting(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorSetting(null);
    };

    const handleOpenAccountSettings = () => {
        setOpenSettings(true);
        setAnchorSetting(null);
    };

    const handleCloseAccountSettings = () => {
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
                                        ? dayjs(myUser?.birthday).format('DD.MM.YYYY')
                                        : myUser?.email
                                }
                            </span>
                        </div>
                    </div>

                    <button className="settings" type="button" onClick={handleOpenSettings}>
                        <SettingsIcon sx={{ color: stylesVariables.specialColor }} />
                    </button>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorSetting}
                        onClose={handleCloseSettings}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        style={{ borderRadius: '20px' }}
                    >
                        <Card classes="thin-border">
                            <div className="header-popover">
                                <Button classes="text" onClick={handleOpenAccountSettings}>
                                    <ManageAccountsIcon />
                                    Налаштування аккаунту
                                </Button>
                                <Button classes="text" onClick={handleLogout}>
                                    <LogoutIcon />
                                    Вийти з аккаунту
                                </Button>
                            </div>
                        </Card>
                    </Popover>

                    <Modal
                        open={openSettings}
                        onClose={handleCloseAccountSettings}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className="modal">
                            <Card>
                                <AccountSettings close={handleCloseAccountSettings} />
                            </Card>

                            <Action onClick={handleCloseAccountSettings}>
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
