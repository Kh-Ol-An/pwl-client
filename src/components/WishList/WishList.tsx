import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { Modal } from '@mui/material';
import { ModalBox } from './WishListStyles';
import WishSettings from '../WishSettings/WishSettings';
import { useAppDispatch } from '../../store/hook';
import { getWishList } from '../../store/wishes/thunks';

const WishList = () => {
    const [openSettings, setOpenSettings] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
//        dispatch(getWishList());
    }, [dispatch])

    const handleOpenWishSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseWishSettings = () => {
        setOpenSettings(false);
    };

    return (
        <div>
            <Button onClick={handleOpenWishSettings}>
                Додати бажання
            </Button>

            <Modal
                open={openSettings}
                onClose={handleCloseWishSettings}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalBox>
                    <WishSettings close={handleCloseWishSettings} />
                </ModalBox>
            </Modal>
        </div>
    );
};

export default WishList;
