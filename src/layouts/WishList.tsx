import React, { useState } from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../store/hook';
import { IWish } from '../models/IWish';
import WishModal from './WishModal';
import Card from './Card';
import WishCard from './WishCard';
import DetailWishModal from './DetailWishModal';
import Action from '../components/Action';
import Button from '../components/Button';

const WishList = () => {
    const [openWish, setOpenWish] = useState<boolean>(false);
    const [openWishSettings, setOpenWishSettings] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<IWish['id'] | null>(null);

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishList = useAppSelector((state) => state.wishes?.list);
    const userList = useAppSelector((state) => state.users.list);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const selectedUser = userList.find(user => user.id === selectedUserId);
    const lastName = selectedUser?.lastName ? selectedUser.lastName : "";

    const detailWish = wishList && wishList.find(wish => wish.id === idOfSelectedWish);

    const handleOpenWish = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setOpenWish(true);
    };

    const handleCloseWish = () => {
        setOpenWish(false);
    };

    const handleOpenWishSettings = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setOpenWishSettings(true);
    };

    const handleCloseWishSettings = () => {
        setOpenWishSettings(false);
    };

    return (
        <div className="wish-list">
            <div className="head">
                <h1 className="title">
                    {
                        myUser?.id === selectedUserId
                            ? "Особистий список бажань"
                            : `Список бажань користувача ${selectedUser?.firstName} ${lastName}`
                    }
                </h1>

                {myUser?.id === selectedUserId && (
                    <Button onClick={() => handleOpenWishSettings(null)}>
                        Додати бажання
                    </Button>
                )}
            </div>

            {wishList.length > 0 ? (
                <ul className="list">
                    {wishList.map((wish) => (
                        <li className={"item" + (wishList.length < 2 ? " alone" : "")} key={wish.id}>
                            <WishCard
                                wish={wish}
                                myUser={myUser}
                                showWish={() => handleOpenWish(wish.id)}
                                editWish={() => handleOpenWishSettings(wish.id)}
                            />
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

            {detailWish && (
                <Modal
                    open={openWish}
                    onClose={handleCloseWish}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="modal modal-lg">
                        <DetailWishModal
                            wish={detailWish}
                            myUser={myUser}
                            editWish={() => handleOpenWishSettings(idOfSelectedWish)}
                            close={handleCloseWish}
                        />

                        <Action onClick={handleCloseWish}>
                            <CloseIcon />
                        </Action>
                    </div>
                </Modal>
            )}

            <Modal
                open={openWishSettings}
                onClose={handleCloseWishSettings}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal">
                    <Card>
                        <WishModal idOfSelectedWish={idOfSelectedWish} close={handleCloseWishSettings} />
                    </Card>

                    <Action onClick={handleCloseWishSettings}>
                        <CloseIcon />
                    </Action>
                </div>
            </Modal>
        </div>
    );
};

export default WishList;
