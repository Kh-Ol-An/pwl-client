import React, { FC, useState } from 'react';
import { secondaryLightColor } from '../../styles/variables';
import dayjs from 'dayjs';
import { Avatar, IconButton, Modal } from '@mui/material';
import { HeaderBox, ModalBox } from './HeaderStyles';
import { Settings } from '@mui/icons-material';
import SettingsModal from '../SettingsModal/SettingsModal';
import {useAppSelector} from "../../store/hook";

const Header: FC = () => {
    const myUser = useAppSelector((state) => state.myUser);

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
                title={myUser.user?.name}
                subheader={myUser.user?.birthday ? dayjs(myUser.user?.birthday).format('DD.MM.YYYY') : myUser.user?.email}
                avatar={
                    <Avatar alt={myUser.user?.name} src={myUser.user?.avatar} />
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
                <ModalBox>
                    <SettingsModal close={handleCloseSettings} />
                </ModalBox>
            </Modal>
        </>
    );
};

export default Header;
