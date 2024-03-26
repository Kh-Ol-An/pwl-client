import React, { useState } from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '@/store/hook';
import { IWish } from '@/models/IWish';
import EditWish from '@/layouts/wish/EditWish';
import WishItem from '@/layouts/wish/WishItem';
import DetailWish from '@/layouts/wish/detail-wish/DetailWish';
import Card from '@/layouts/Card';
import Action from '@/components/Action';
import Button from '@/components/Button';

const WishList = () => {
    const [showWish, setShowWish] = useState<boolean>(false);
    const [showEditWish, setShowEditWish] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<IWish['id'] | null>(null);

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishList = useAppSelector((state) => state.wishes?.list);
    const userList = useAppSelector((state) => state.users.list);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const selectedUser = userList.find(user => user.id === selectedUserId);
    const lastName = selectedUser?.lastName ? selectedUser.lastName : "";

    const detailWish = wishList.find(wish => wish.id === idOfSelectedWish);

    const handleShowWish = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setShowWish(true);
    };

    const handleHideWish = () => {
        setShowWish(false);
    };

    const handleShowEditWish = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setShowEditWish(true);
    };

    const handleHideEditWish = () => {
        setShowEditWish(false);
    };

    return (
        <div className="wish-list">
            <div className="head">
                {myUser?.id === selectedUserId && (
                    <Button onClick={() => handleShowEditWish(null)}>
                        Створити бажання
                    </Button>
                )}

                <h1 className={"title" + (myUser?.id !== selectedUserId ? " other-user" : "")}>
                    {
                        myUser?.id === selectedUserId
                            ? "Особистий список бажань"
                            : `Список бажань користувача ${selectedUser?.firstName} ${lastName}`
                    }
                </h1>
            </div>

            {wishList.length > 0 ? (
                <ul className="list">
                    {wishList.map((wish) => (
                        <li
                            className={
                                "item" + (wishList.length < 2 ? " alone" : "") + (wish.booking?.end ? " booked" : "")
                            }
                            key={wish.id}
                        >
                            <WishItem
                                wish={wish}
                                showWish={() => handleShowWish(wish.id)}
                                editWish={() => handleShowEditWish(wish.id)}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-box">
                    <p className="text">
                        {
                            myUser?.id === selectedUserId
                                ? "В тебе немає жодного бажання. Хіба ти нічого не бажаєш?"
                                : `В користувача ${selectedUser?.firstName} ${lastName} немає жодного бажання.`
                        }
                    </p>
                </div>
            )}

            {detailWish && (
                <Modal
                    open={showWish}
                    onClose={handleHideWish}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="modal modal-lg">
                        <DetailWish
                            wish={detailWish}
                            editWish={() => handleShowEditWish(idOfSelectedWish)}
                            close={handleHideWish}
                        />

                        <Action onClick={handleHideWish}>
                            <CloseIcon />
                        </Action>
                    </div>
                </Modal>
            )}

            <Modal
                open={showEditWish}
                onClose={handleHideEditWish}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal">
                    <Card>
                        <EditWish idOfSelectedWish={idOfSelectedWish} close={handleHideEditWish} />
                    </Card>

                    <Action onClick={handleHideEditWish}>
                        <CloseIcon />
                    </Action>
                </div>
            </Modal>
        </div>
    );
};

export default WishList;
