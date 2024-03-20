import React, { FC, useState } from 'react';
import { Modal } from '@mui/material';
import {
    Settings as SettingsIcon,
    ManageAccounts as ManageAccountsIcon,
    Logout as LogoutIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { useAppDispatch } from '../store/hook';
import { logout } from '../store/my-user/thunks';
import Card from './Card';
import AccountModal from './AccountModal';
import Button from '../components/Button';
import Action from '../components/Action';
import Popup from "../components/Popup";
import MyUserAction from '../components/MyUserAction';
import stylesVariables from '../styles/utils/variables.module.scss';

const Header: FC = () => {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [openSettings, setOpenSettings] = useState<boolean>(false);

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
            <div className="header-inner">
                <div className="header-content">
                    <MyUserAction />

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
