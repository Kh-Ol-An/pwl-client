import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
import CustomModal from '@/components/CustomModal';
import StylesVariables from '@/styles/utils/variables.module.scss';

type TWishType = 'all' | 'unfulfilled' | 'fulfilled';

const WishList = () => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishes = useAppSelector((state) => state.wishes);
    const userList = useAppSelector((state) => state.users.list);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const [ wishType, setWishType ] = useState<TWishType>('all');
    const [ showWish, setShowWish ] = useState<boolean>(false);
    const [ showEditWish, setShowEditWish ] = useState<boolean>(false);
    const [ idOfSelectedWish, setIdOfSelectedWish ] = useState<IWish['id'] | null>(null);
    const [ selectedWishList, setSelectedWishList ] = useState<IWish[]>(wishes.list);
    const [ screenWidth, setScreenWidth ] = useState<number>(window.innerWidth);

    const wishListRef = useRef<HTMLUListElement>(null);

    const selectedUser = userList.find(user => user.id === selectedUserId);
    const lastName = selectedUser?.lastName ? selectedUser.lastName : "";
    const detailWish = wishes.list.find(wish => wish.id === idOfSelectedWish);

    let emptyText = <>{ t('main-page.you_have_any') }</>;
    myUser?.id === selectedUserId && wishType !== 'all' && (emptyText = <>{ t(`main-page.you_have_${ wishType }`) }</>);
    myUser?.id !== selectedUserId && (emptyText = (
        <>
            <span>{ t('main-page.at-user') }</span>
            <span className="empty-name">{ selectedUser?.firstName } { lastName }</span>
            <span>{ t(`main-page.does_not_have_${ wishType === 'all' ? '' : wishType }`) }</span>
        </>
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

    const handleChangeWishType = (event: SelectChangeEvent) => {
        const value = event.target.value as TWishType;
        setWishType(value);

        if (!wishListRef.current) return;

        wishListRef.current.scrollTo(0, 0);
    };

    useEffect(() => {
        if (wishType === 'all') {
            setSelectedWishList(wishes.list);
        }

        if (wishType === 'fulfilled') {
            setSelectedWishList(wishes.list.filter(wish => wish.executed));
        }

        if (wishType === 'unfulfilled') {
            setSelectedWishList(wishes.list.filter(wish => !wish.executed));
        }
    }, [ wishType, wishes.list ]);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="wish-list">
            <div className="head">
                { myUser?.id === selectedUserId ? (
                    <Button onClick={ () => handleShowEditWish(null) }>
                        { t('main-page.create-wish') }
                    </Button>
                ) : (
                    <button className="wish-hub" type="button" onClick={ handleSelectWish }>
                        <span className="logo-name">Wish Hub</span>
                    </button>
                ) }

                <div className="title-box">
                    <div className="wish-list-type">
                        <Select
                            id="wish-list-type"
                            variant="standard"
                            sx={ { fontSize: screenWidth < 1024 ? 20 : 24 } }
                            value={ wishType }
                            onChange={ handleChangeWishType }
                        >
                            <MenuItem value="all">{ t('main-page.all') }</MenuItem>
                            <MenuItem value="unfulfilled">{ t('main-page.unfulfilled') }</MenuItem>
                            <MenuItem value="fulfilled">{ t('main-page.fulfilled.plural') }</MenuItem>
                        </Select>
                    </div>

                    {
                        myUser?.id === selectedUserId
                            ? <>
                                <h2 className="title">{ t('main-page.title-personal') }</h2>
                                <h2 className="title">{ t('main-page.title-wishes') }</h2>
                            </>
                            : <>
                                <h2 className="title">{ t('main-page.title-wishes') }</h2>
                                <h2 className="title">{ t('main-page.of-user') }</h2>
                                <h2 className="title title-name">{ selectedUser?.firstName }</h2>
                                <h2 className="title title-name">{ lastName }</h2>
                            </>
                    }
                </div>
            </div>

            { selectedWishList.length > 0 ? (
                <ul className="list" ref={ wishListRef }>
                    { selectedWishList.map((wish) => (
                        <WishItem
                            key={ wish.id }
                            wish={ wish }
                            selectedWishListLength={ selectedWishList.length }
                            showWish={ () => handleShowWish(wish.id) }
                            editWish={ () => handleShowEditWish(wish.id) }
                        />
                    )) }
                </ul>
            ) : (
                <div className="empty-box">
                    <p className="empty-text">{ emptyText }</p>
                </div>
            ) }

            {/* TODO: розбирись з цим, чому тут два прелоадери */}
            { wishes.isLoading && <Loading /> }
            { wishes.isLocalLoading && <Loading isLocal /> }
            {/* TODO: розбирись з цим, чому тут два прелоадери */}

            { detailWish && (
                <Modal
                    open={ showWish }
                    onClose={ handleHideWish }
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="modal modal-lg">
                        <DetailWish
                            wish={ detailWish }
                            selectedUser={ selectedUser }
                            editWish={ () => handleShowEditWish(idOfSelectedWish) }
                            close={ handleHideWish }
                        />

                        <Action onClick={ handleHideWish }>
                            <CloseIcon sx={ { color: StylesVariables.blackColor } } />
                        </Action>
                    </div>
                </Modal>
            ) }

            <CustomModal show={ showEditWish } hide={ handleHideEditWish }>
                <EditWish idOfSelectedWish={ idOfSelectedWish } close={ handleHideEditWish } />
            </CustomModal>
        </div>
    );
};

export default WishList;
