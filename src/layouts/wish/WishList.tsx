import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectUserId } from '@/store/selected-user/slice';
import { getWishList } from '@/store/wishes/thunks';
import { IWish } from '@/models/IWish';
import EditWish from '@/layouts/wish/edit-wish/EditWish';
import WishItem from '@/layouts/wish/WishItem';
import DetailWish from '@/layouts/wish/detail-wish/DetailWish';
import Loading from '@/layouts/Loading';
import Action from '@/components/Action';
import Button from '@/components/Button';
import Switch from '@/components/Switch';
import WishHub from '@/assets/images/wish-hub.png';
import StylesVariables from '@/styles/utils/variables.module.scss';
import CustomModal from '@/components/CustomModal';

const WishList = () => {
    const { t } = useTranslation();

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

    let emptyText = <>{t('main-page.you-any')}</>;
    myUser?.id !== selectedUserId && (emptyText = (
        <>{t('main-page.at-user')} <span>{selectedUser?.firstName} {lastName}</span> {t('main-page.any-wishes')}</>
    ));
    !isUndone && (emptyText = <>{t('main-page.you-fulfilled')}</>);
    !isUndone && myUser?.id !== selectedUserId && (emptyText = (
        <>{t('main-page.at-user')} <span>{selectedUser?.firstName} {lastName}</span> {t('main-page.any-fulfilled-wishes')}</>
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
                        {t('main-page.create-wish')}
                    </Button>
                ) : (
                    <button className="wish-hub" type="button" onClick={handleSelectWish}>
                        <img src={WishHub} alt="Wish Hub" />
                    </button>
                )}

                <div className="title-box">
                    <div className="wishes-type">
                        <span className={isUndone ? "primary-color" : ""}>{t('main-page.unfulfilled')}</span>
                        <Switch
                            id="wishes-type"
                            name="wishes-type"
                            hiddenChoice
                            checked={isUndone}
                            onChange={(e) => setIsUndone(e.target.checked)}
                        />
                        <span className={isUndone ? "" : "primary-color"}>{t('main-page.fulfilled')}</span>
                    </div>

                    <h1 className="title">
                        {
                            myUser?.id === selectedUserId
                                ? <>{t('main-page.personal-wishes')}</>
                                : <>{t('main-page.wishes-of-user')} <span>{selectedUser?.firstName} {lastName}</span></>
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

            {wishes.isLoading && <Loading />}

            {wishes.isLocalLoading && <Loading isLocal />}

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

            <CustomModal show={showEditWish} hide={handleHideEditWish}>
                <EditWish idOfSelectedWish={idOfSelectedWish} close={handleHideEditWish} />
            </CustomModal>
        </div>
    );
};

export default WishList;
