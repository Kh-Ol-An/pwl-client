import React, { FC, useContext, useState } from 'react';
import { secondaryLightColor } from '../../styles/variables';
import dayjs from 'dayjs';
import { Avatar, IconButton, Modal } from '@mui/material';
import { HeaderBox } from './HeaderStyles';
import { Settings } from '@mui/icons-material';
import { StoreContext } from '../../index';
import SettingsModal from '../SettingsModal/SettingsModal';

const Header: FC = () => {
    const { store } = useContext(StoreContext);

    const [openSettings, setOpenSettings] = useState<boolean>(false);

    const handleOpenSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseSettings = () => {
        setOpenSettings(false);
    };

    return (
        <>
            <HeaderBox
                sx={{ color: secondaryLightColor }}
                title={store.myUser?.name}
                subheader={store.myUser?.birthday ? dayjs(store.myUser?.birthday).format('DD.MM.YYYY') : store.myUser?.email}
                avatar={
                    <Avatar alt={store.myUser?.name} src={store.myUser?.avatar} />
                }
                action={
                    <IconButton onClick={handleOpenSettings}>
                        <Settings sx={{ color: secondaryLightColor }} />
                    </IconButton>
                }
            />

            <Modal
                open={openSettings}
                onClose={handleCloseSettings}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <SettingsModal />
            </Modal>
        </>
    );
};

export default Header;
