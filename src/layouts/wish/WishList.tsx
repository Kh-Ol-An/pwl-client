import React, { ChangeEvent, useState } from 'react';
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
import Switch from '@/components/Switch';

const WishList = () => {
    const myUser = useAppSelector((state) => state.myUser.user);
    const wishList = useAppSelector((state) => state.wishes?.list);
    const userList = useAppSelector((state) => state.users.list);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const [isUndone, setIsUndone] = useState<boolean>(true);
    const [showWish, setShowWish] = useState<boolean>(false);
    const [showEditWish, setShowEditWish] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<IWish['id'] | null>(null);
    const [selectedWishList, setSelectedWishList] = useState<IWish[]>(wishList.filter(wish => !wish.executed));

    const selectedUser = userList.find(user => user.id === selectedUserId);
    const lastName = selectedUser?.lastName ? selectedUser.lastName : "";
    const detailWish = wishList.find(wish => wish.id === idOfSelectedWish);

    let emptyText = <>В тебе немає жодного бажання. Хіба ти нічого не бажаєш?</>;
    myUser?.id !== selectedUserId && (emptyText = (
        <>В користувача <span>{selectedUser?.firstName} {lastName}</span> немає жодного бажання.</>
    ));
    !isUndone && (emptyText = <>В тебе поки що немає жодного виконаного бажання.</>);
    !isUndone && myUser?.id !== selectedUserId && (emptyText = (
        <>В користувача <span>{selectedUser?.firstName} {lastName}</span> немає жодного виконаного бажання.</>
    ));

    const changeWishesType = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsUndone(checked);

        if (checked) {
            setSelectedWishList(wishList.filter(wish => !wish.executed));
        } else {
            setSelectedWishList(wishList.filter(wish => wish.executed));
        }
    };

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

                <div className="title-box">
                    <div className="wishes-type">
                        <span className={isUndone ? "primary-color" : ""}>Не виконані</span>
                        <Switch
                            id="wishes-type"
                            name="wishes-type"
                            hiddenChoice
                            checked={isUndone}
                            onChange={changeWishesType}
                        />
                        <span className={isUndone ? "" : "primary-color"}>Виконані</span>
                    </div>

                    <h1 className={"title" + (myUser?.id !== selectedUserId ? " other-user" : "")}>
                        {
                            myUser?.id === selectedUserId
                                ? <>особисті бажання</>
                                : <>бажання користувача <span>{selectedUser?.firstName} {lastName}</span></>
                        }
                    </h1>
                </div>
            </div>

            {selectedWishList.length > 0 ? (
                <ul className="list">
                    {selectedWishList.map((wish) => (
                        <li
                            className={
                                "item" + (selectedWishList.length < 2 ? " alone" : "") + (wish.booking?.end ? " booked" : "")
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
                    <p className="text">{emptyText}</p>
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
