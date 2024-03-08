import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Modal } from '@mui/material';
import Button from './Button';
import WishSettings from './WishSettings';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { getWishList } from '../store/wishes/thunks';
import { IWish } from '../models/IWish';
import Card from './Card';
import DataWithLabel from './DataWithLabel';
import { addingWhiteSpaces } from '../utils/formating-value';

const WishList = () => {
    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const [idForEditing, setIdForEditing] = useState<IWish['id'] | null>(null);

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishList = useAppSelector((state) => state.wishes?.list);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getWishList(myUser?.id || ''));
    }, [dispatch, myUser?.id])

    const handleOpenWishSettings = (id: IWish['id'] | null) => {
        setIdForEditing(id);
        setOpenSettings(true);
    };

    const handleCloseWishSettings = () => {
        setOpenSettings(false);
    };

    return (
        <div className="wish-list">
            <div className="head">
                <h1 className="title">Особистий список бажань</h1>
                <Button onClick={() => handleOpenWishSettings(null)}>
                    Додати бажання
                </Button>
            </div>

            {wishList.length > 0 ? (
                <ul className="list">
                    {wishList.map((wish) => (
                        <li key={wish.id}>
                            <Card
                                classes="thin-border without-shadow"
                                title={<DataWithLabel label="Назва:" data={wish.name} />}
                            >
                                <DataWithLabel label="Назва:" data={wish.name} />
                                {wish.price && (
                                    <DataWithLabel label="Ціна:" data={addingWhiteSpaces(wish.price)} />
                                )}
                                <DataWithLabel
                                    label="Посилання:"
                                    data={
                                        <Button to={wish.link} classes="text">
                                            {wish.link}
                                        </Button>
                                    }
                                />
                                <DataWithLabel label="Опис:" data={wish.description} />
                                <DataWithLabel label="Створене:" data={dayjs(wish.createdAt).format('DD.MM.YYYY')} />
                                <DataWithLabel label="Оновлене:" data={dayjs(wish.updatedAt).format('DD.MM.YYYY')} />

                                {wish.images.length > 0 && (
                                    <ul className="image-list">
                                        {wish.images.map((image) => (
                                            <li className="image-item" key={image.path}>
                                                <img src={image.path} alt={`wish-${image.position}`} />
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <Button onClick={() => handleOpenWishSettings(wish.id)}>
                                    Редагувати бажання
                                </Button>
                            </Card>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-box">
                    <p className="text">
                        В тебе немає жодного бажання. Хіба ти нічого не бажаєш?
                    </p>
                </div>
            )}

            <Modal
                open={openSettings}
                onClose={handleCloseWishSettings}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal">
                    <Card>
                        <WishSettings idForEditing={idForEditing} close={handleCloseWishSettings} />
                    </Card>
                </div>
            </Modal>
        </div>
    );
};

export default WishList;
