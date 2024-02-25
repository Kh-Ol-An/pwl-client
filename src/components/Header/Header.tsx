import React, { FC, useState } from 'react';
import { secondaryLightColor } from '../../styles/variables';
import dayjs from 'dayjs';
import { Avatar, IconButton, Modal, Popover } from '@mui/material';
import { CustomButton, HeaderBox, ModalBox, PopoverBox, PopoverWrap } from './HeaderStyles';
import { Settings } from '@mui/icons-material';
import AccountSettings from '../AccountSettings/AccountSettings';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { logout } from '../../store/my-user/thunks';

const Header: FC = () => {
    const [anchorSetting, setAnchorSetting] = React.useState<HTMLButtonElement | null>(null);
    const [openSettings, setOpenSettings] = useState<boolean>(false);

    const myUser = useAppSelector((state) => state.myUser);

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
        dispatch(logout())
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
                    <>
                        <IconButton aria-describedby={id} onClick={handleOpenSettings}>
                            <Settings sx={{ color: secondaryLightColor }} />
                        </IconButton>
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
                        >
                            <PopoverWrap>
                                <PopoverBox>
                                    <CustomButton onClick={handleOpenAccountSettings}>
                                        Налаштування аккаунту
                                    </CustomButton>
                                    <CustomButton onClick={handleLogout}>
                                        Вийти з аккаунту
                                    </CustomButton>
                                </PopoverBox>
                            </PopoverWrap>
                        </Popover>
                    </>
                }
            />

            <Modal
                open={openSettings}
                onClose={handleCloseAccountSettings}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalBox>
                    <AccountSettings close={handleCloseAccountSettings} />
                </ModalBox>
            </Modal>
        </>
    );
};

export default Header;
