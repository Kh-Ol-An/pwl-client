import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { Modal } from '@mui/material';
import { ModalBox, WishListS, WishItem, ImgList, ImgItem, Image } from './WishListStyles';
import WishSettings from '../WishSettings/WishSettings';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getWishList } from '../../store/wishes/thunks';
import dayjs from 'dayjs';

const WishList = () => {
    const [openSettings, setOpenSettings] = useState<boolean>(false);

    const myUser = useAppSelector((state) => state.myUser);
    const wishList = useAppSelector((state) => state.wishes?.list);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getWishList(myUser.user?.id || ''));
    }, [dispatch, myUser.user?.id])

    const handleOpenWishSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseWishSettings = () => {
        setOpenSettings(false);
    };

    return (
        <div>
            {wishList.length > 0 && (
                <WishListS>
                    {wishList.map((wish) => (
                        <WishItem key={wish.id}>
                            <span>Ім'я: {wish.name}</span>
                            <span>Ціна: {wish.price}</span>
                            <span>Опис: {wish.description}</span>
                            <span>Створене: {dayjs(wish.createdAt).format('DD.MM.YYYY')}</span>
                            <span>Оновлене: {dayjs(wish.updatedAt).format('DD.MM.YYYY')}</span>

                            {wish.images.length > 0 && (
                                <ImgList>
                                    {wish.images.map((image) => (
                                        <ImgItem key={image.path}>
                                            <Image src={image.path} alt={image.path} />
                                        </ImgItem>
                                    ))}
                                </ImgList>
                            )}
                        </WishItem>
                    ))}
                </WishListS>
            )}

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
