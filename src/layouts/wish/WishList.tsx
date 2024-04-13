import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectUserId } from '@/store/selected-user/slice';
import { getWishList } from '@/store/wishes/thunks';
import { IWish } from '@/models/IWish';
import EditWish from '@/layouts/wish/EditWish';
import WishItem from '@/layouts/wish/WishItem';
import DetailWish from '@/layouts/wish/detail-wish/DetailWish';
import Card from '@/layouts/Card';
import Loading from '@/layouts/Loading';
import Action from '@/components/Action';
import Button from '@/components/Button';
import Switch from '@/components/Switch';
import WishHub from '@/assets/images/wish-hub.png';
import StylesVariables from '@/styles/utils/variables.module.scss';

const WishList = () => {
    const myUser = useAppSelector((state) => state.myUser.user);
    const wishes = useAppSelector((state) => state.wishes);
    const userList = useAppSelector((state) => state.users.list);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const [isUndone, setIsUndone] = useState<boolean>(true);
    const [showWish, setShowWish] = useState<boolean>(false);
    const [showEditWish, setShowEditWish] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<IWish['id'] | null>(null);
    const [selectedWishList, setSelectedWishList] = useState<IWish[]>(wishes.list.filter(wish => !wish.executed));

    const selectedUser = userList.find(user => user.id === selectedUserId);
    const lastName = selectedUser?.lastName ? selectedUser.lastName : "";
    const detailWish = wishes.list.find(wish => wish.id === idOfSelectedWish);

    let emptyText = <>В тебе немає жодного бажання. Хіба ти нічого не бажаєш?</>;
    myUser?.id !== selectedUserId && (emptyText = (
        <>В користувача <span>{selectedUser?.firstName} {lastName}</span> немає жодного бажання.</>
    ));
    !isUndone && (emptyText = <>В тебе поки що немає жодного виконаного бажання.</>);
    !isUndone && myUser?.id !== selectedUserId && (emptyText = (
        <>В користувача <span>{selectedUser?.firstName} {lastName}</span> немає жодного виконаного бажання.</>
    ));

    const handleSelectWish = async () => {
        if (!myUser) return;

        await dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
        await dispatch(selectUserId(myUser.id));
        localStorage.setItem('selectedUserId', myUser.id);
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

    useEffect(() => {
        if (isUndone) {
            setSelectedWishList(wishes.list.filter(wish => !wish.executed));
        } else {
            setSelectedWishList(wishes.list.filter(wish => wish.executed));
        }
    }, [isUndone, wishes.list]);

    return (
        <div className="wish-list">
            <div className="head">
                {myUser?.id === selectedUserId ? (
                    <Button onClick={() => handleShowEditWish(null)}>
                        Створити бажання
                    </Button>
                ) : (
                    <button className="wish-hub" type="button" onClick={handleSelectWish}>
                        <img src={WishHub} alt="Wish Hub" />
                    </button>
                )}

                <div className="title-box">
                    <div className="wishes-type">
                        <span className={isUndone ? "primary-color" : ""}>Не виконані</span>
                        <Switch
                            id="wishes-type"
                            name="wishes-type"
                            hiddenChoice
                            checked={isUndone}
                            onChange={(e) => setIsUndone(e.target.checked)}
                        />
                        <span className={isUndone ? "" : "primary-color"}>Виконані</span>
                    </div>

                    <h1 className="title">
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

            {wishes.isLoading && <Loading isLocal />}

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
                            <CloseIcon sx={{ color: StylesVariables.blackColor }} />
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
                        <CloseIcon sx={{ color: StylesVariables.blackColor }} />
                    </Action>
                </div>
            </Modal>
        </div>
    );
};

export default WishList;
