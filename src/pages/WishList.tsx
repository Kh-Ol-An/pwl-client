import React, { FC, useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Avatar, Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { IWish } from '@/models/IWish';
import { handleGetInitialWishList } from "@/utils/action-on-wishes";
import { Close as CloseIcon } from "@mui/icons-material";
import WishItem from "@/layouts/wish/WishItem";
import DetailWish from "@/layouts/wish/detail-wish/DetailWish";
import Action from "@/components/Action";
import StylesVariables from "@/styles/utils/variables.module.scss";
import HeaderSettings from "@/layouts/header/HeaderSettings";
import Logo from "@/components/Logo";
import SearchAndSortWishes from "@/layouts/wish/SearchAndSortWishes";
import { addWishList } from "@/store/wishes/thunks";
import { WISHES_PAGINATION_LIMIT } from "@/utils/constants";

const Wish: FC = () => {
    const { t } = useTranslation();

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishes = useAppSelector((state) => state.wishes);
    const users = useAppSelector((state) => state.users);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const location = useLocation();

    const dispatch = useAppDispatch();

    const [ firstLoad, setFirstLoad ] = useState<boolean>(true);
    const [ showWish, setShowWish ] = useState<boolean>(false);
    const [ idOfSelectedWish, setIdOfSelectedWish ] = useState<IWish['id'] | null>(null);

    const wishListRef = useRef<HTMLUListElement>(null);

    const selectedUser = useMemo(
        () => users.list.find(user => user.id === selectedUserId),
        [ users.list, selectedUserId ],
    );
    const detailWish = useMemo(
        () => wishes.list.find(wish => wish.id === idOfSelectedWish),
        [ wishes.list, idOfSelectedWish ],
    );
    const creatorFullName = useMemo(
        () => wishes.creator?.firstName + (wishes.creator?.lastName ? ` ${ wishes.creator.lastName }` : ''),
        [ wishes.creator ],
    );

    const handleShowWish = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setShowWish(true);
    };

    const handleHideWish = () => {
        setShowWish(false);
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || wishes.stopRequests) return;

        const creatorId = location.pathname.split('/')[2];
        dispatch(addWishList({
            myId: myUser?.id,
            userId: creatorId,
            status: wishes.status,
            page: wishes.page,
            limit: WISHES_PAGINATION_LIMIT,
            search: wishes.search,
            sort: wishes.sort,
        }));
    }, [ inView ]);

    useEffect(() => {
        const creatorId = location.pathname.split('/')[2];
        handleGetInitialWishList(dispatch, myUser?.id, creatorId);
    }, []);

    return (
        <div className="wish-list-page container">
            <div className="wish-list-page-header container">
                <Logo />

                <HeaderSettings logoutWithoutUpdate />
            </div>

            <div className="wish-list-page-content">
                <div className="wish-list-page-head">
                    { t('wish-list-page.title') }

                    <div className="wish-list-page-head-user">
                        <div className="wish-list-page-head-avatar">
                            <Avatar
                                alt={ creatorFullName }
                                src={ wishes.creator?.avatar }
                                sx={ { width: '100%', height: '100%' } }
                            />
                        </div>

                        <span className="wish-list-page-head-name">
                            { creatorFullName }
                        </span>
                    </div>
                </div>

                <SearchAndSortWishes wishListRefCurrent={wishListRef.current} />

                { wishes.list.length > 0 ? (
                    <ul className="wish-list" ref={ wishListRef }>
                        { wishes.list.map((wish, idx) => (
                            <WishItem
                                key={ wish.id + idx }
                                wish={ wish }
                                showWish={ () => handleShowWish(wish.id) }
                            />
                        )) }

                        <div
                            className="observable-element"
                            style={ { display: users.stopRequests ? 'none' : 'block' } }
                            ref={ ref }
                        ></div>
                    </ul>
                ) : (
                    <p className="wish-empty">{ t('wish-page.empty') }</p>
                ) }
            </div>

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
                            close={ handleHideWish }
                        />

                        <Action onClick={ handleHideWish }>
                            <CloseIcon sx={ { color: StylesVariables.blackColor } } />
                        </Action>
                    </div>
                </Modal>
            ) }
        </div>
    );
};

export default Wish;
