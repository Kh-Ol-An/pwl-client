import React, { useState, useMemo, useEffect, useRef, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Modal, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Close as CloseIcon, AddCircle as AddCircleIcon, Info as InfoIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectUserId } from '@/store/selected-user/slice';
import { setWishStatus, setWishesSort } from '@/store/wishes/slice';
import { addAllWishes, getAllWishes, getWishList, addWishList } from '@/store/wishes/thunks';
import { EWishSort, IWish, EWishStatus, EShow } from '@/models/IWish';
import EditWish from '@/layouts/wish/edit-wish/EditWish';
import WishItem from '@/layouts/wish/WishItem';
import DetailWish from '@/layouts/wish/detail-wish/DetailWish';
import Loading from '@/layouts/Loading';
import Action from '@/components/Action';
import CustomModal from '@/components/CustomModal';
import LogoIcon from "@/assets/images/logo.svg";
import StylesVariables from '@/styles/utils/variables.module.scss';
import { WISHES_PAGINATION_LIMIT } from "@/utils/constants";
import ShareButton from "@/components/ShareButton";
import { handleGetInitialAllWishes } from "@/utils/action-on-wishes";
import { Tooltip } from "react-tooltip";
import getTooltipStyles from "@/utils/get-tooltip-styles";
import SearchAndSortWishes from "@/layouts/wish/SearchAndSortWishes";
import CreateWish from "@/layouts/wish/edit-wish/CreateWish";
import { resetWishCandidate } from "@/store/wishes/slice";

const WishList: FC = () => {
    const { t } = useTranslation();

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishes = useAppSelector((state) => state.wishes);
    const users = useAppSelector((state) => state.users);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const [ firstLoad, setFirstLoad ] = useState<boolean>(true);
    const [ showWish, setShowWish ] = useState<boolean>(false);
    const [ showCreateWish, setShowCreateWish ] = useState<boolean>(false);
    const [ showEditWish, setShowEditWish ] = useState<boolean>(false);
    const [ idOfSelectedWish, setIdOfSelectedWish ] = useState<IWish['id'] | null>(null);
    const [ screenWidth, setScreenWidth ] = useState<number>(window.innerWidth);

    const wishListRef = useRef<HTMLUListElement>(null);

    const selectedUser = useMemo(
        () => users.list.find(user => user.id === selectedUserId),
        [ users.list, selectedUserId ],
    );
    const detailWish = useMemo(
        () => wishes.list.find(wish => wish.id === idOfSelectedWish),
        [ wishes.list, idOfSelectedWish ],
    );
    const wishListIncludesShowAllWish = useMemo(
        () => wishes.list.some(wish => wish.show === EShow.ALL),
        [ wishes.list ],
    );
    const lastName = selectedUser?.lastName ? selectedUser.lastName : "";

    const wishesExample = [
        {
            name: t('main-page.wishes-example.first'),
        },
        {
            name: t('main-page.wishes-example.second'),
        },
        {
            name: t('main-page.wishes-example.third'),
        },
        {
            name: t('main-page.wishes-example.fourth'),
        }
    ];

    let emptyText;
    myUser?.id !== selectedUserId && (emptyText = (
        <>
            <span>{ t('main-page.at-user') }</span>
            <span className="empty-name">{ selectedUser?.firstName } { lastName }</span>
            <span>{ t(`main-page.does_not_have_${ wishes.status === 'all' ? '' : wishes.status }`) }</span>
        </>
    ));
    !selectedUserId && (emptyText = <span>{ t('main-page.no_wishes_found') }</span>);

    const handleChangeWishStatus = async (event: SelectChangeEvent) => {
        const value = event.target.value as EWishStatus;
        await dispatch(setWishStatus(value));

        if (!myUser || !selectedUserId) return;

        dispatch(getWishList({
            myId: myUser.id,
            userId: selectedUserId,
            status: value,
            page: 1,
            limit: WISHES_PAGINATION_LIMIT,
            search: wishes.search,
            sort: wishes.sort,
        }));

        if (!wishListRef.current) return;

        wishListRef.current.scrollTo(0, 0);
    };

    const handleShowWish = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setShowWish(true);
    };
    const handleHideWish = () => {
        setShowWish(false);
    };

    const handleShowCreateWish = () => {
        setShowCreateWish(true);
    };
    const handleHideCreateWish = () => {
        setShowCreateWish(false);
        dispatch(resetWishCandidate(null));
    };

    const handleShowEditWish = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setShowEditWish(true);
    };
    const handleHideEditWish = () => {
        setShowEditWish(false);
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || wishes.stopRequests) return;

        if (selectedUserId) {
            dispatch(addWishList({
                myId: myUser?.id,
                userId: selectedUserId,
                status: wishes.status,
                page: wishes.page,
                limit: WISHES_PAGINATION_LIMIT,
                search: wishes.search,
                sort: wishes.sort,
            }));
        } else {
            dispatch(addAllWishes({
                page: wishes.page,
                limit: WISHES_PAGINATION_LIMIT,
                search: wishes.search,
                sort: wishes.sort,
            }));
        }
    }, [ inView ]);

    useEffect(() => {
        if (myUser) {
            dispatch(getWishList({
                myId: myUser.id,
                userId: myUser.id,
                status: wishes.status,
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search: wishes.search,
                sort: wishes.sort,
            }));
            dispatch(selectUserId(myUser.id));
            localStorage.setItem('selectedUserId', myUser.id);
        } else {
            dispatch(getAllWishes({
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search: wishes.search,
                sort: EWishSort.POPULAR,
            }));
            dispatch(setWishesSort(EWishSort.POPULAR));
        }

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="wish-list-block">
            <div className="head">
                <button className="wish-hub" type="button" onClick={ () => handleGetInitialAllWishes(dispatch) }>
                    <span className="logo-name">Wish Hub</span>
                </button>

                <div className="head-top">
                    { myUser && selectedUserId && (
                        <div className="title-box">
                            <div className="wish-list-type">
                                <Select
                                    id="wish-list-type"
                                    variant="standard"
                                    sx={ { fontSize: screenWidth < 1024 ? 20 : 24 } }
                                    value={ wishes.status }
                                    onChange={ handleChangeWishStatus }
                                >
                                    <MenuItem value="all">{ t('main-page.all') }</MenuItem>
                                    <MenuItem value="unfulfilled">{ t('main-page.unfulfilled') }</MenuItem>
                                    <MenuItem value="fulfilled">{ t('main-page.fulfilled.plural') }</MenuItem>
                                </Select>
                            </div>

                            {
                                myUser.id === selectedUserId
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
                    ) }

                    { myUser?.id === selectedUserId && (
                        <div className="head-share">
                            <span
                                className="tooltip"
                                data-tooltip-id="share-wishes"
                                data-tooltip-content={ t(`main-page.can-see.${ wishListIncludesShowAllWish ? '' : 'inactive-' }share-tooltip`) }
                            >
                                <InfoIcon sx={ { color: StylesVariables.specialColor } } />
                            </span>
                            <Tooltip
                                id="share-wishes"
                                place="bottom"
                                style={ getTooltipStyles(screenWidth) }
                            />

                            <div className={ wishListIncludesShowAllWish ? '' : ' inactive' }>
                                <ShareButton link={ `wish-list/${ selectedUserId }` }>
                                    <span className="head-share-text">{ t('main-page.share-wishes') }</span>
                                </ShareButton>
                            </div>
                        </div>
                    ) }
                </div>

                <SearchAndSortWishes wishListRefCurrent={wishListRef.current} />
            </div>

            { (myUser?.id === selectedUserId || wishes.list.length > 0) ? (
                <ul className="wish-list" ref={ wishListRef }>
                    { myUser?.id === selectedUserId && (
                        <li className="create-wish">
                            <button
                                className="create-wish-action"
                                type="button"
                                onClick={ handleShowCreateWish }
                            >
                                <AddCircleIcon className="create-wish-plus" />
                            </button>
                        </li>
                    ) }

                    { wishes.list.length > 0 && wishes.list.map((wish, idx) => (
                        <WishItem
                            key={ wish.id + idx }
                            wish={ wish }
                            editWish={ () => handleShowEditWish(wish.id) }
                            showWish={ () => handleShowWish(wish.id) }
                        />
                    )) }

                    { wishesExample.map((wish, idx) => {
                        if (wishes.list.length > idx) return null;

                        return (
                            <li
                                key={ idx }
                                className={
                                    "wish-item"
                                    + (myUser?.id !== selectedUserId ? " opacity" : ` example_${ idx }`)
                                }
                                onClick={ () => handleShowEditWish(null) }
                            >
                                <div className="wish-box">
                                    <div className="wish-item-img">
                                        <img
                                            className="wish-item-img-icon"
                                            src={ LogoIcon }
                                            alt="Wish Hub Logo"
                                        />
                                    </div>

                                    <div className="wish-item-data">
                                        <div className="wish-item-name">
                                            { wish.name }
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    }) }

                    <div
                        className="observable-element"
                        style={ { display: users.stopRequests ? 'none' : 'block' } }
                        ref={ ref }
                    ></div>
                </ul>
            ) : (
                <div className="empty-box">
                    <p className="empty-text">{ emptyText }</p>
                </div>
            ) }

            {/* TODO: розбирись з цим, чому тут два прелоадери */ }
            { wishes.isLoading && <Loading /> }
            { wishes.isLocalLoading && <Loading isLocal /> }
            {/* TODO: розбирись з цим, чому тут два прелоадери */ }

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

            <CustomModal show={ showCreateWish } hide={ handleHideCreateWish }>
                <CreateWish close={ handleHideCreateWish } />
            </CustomModal>

            <CustomModal show={ showEditWish } hide={ handleHideEditWish }>
                <EditWish idOfSelectedWish={ idOfSelectedWish } close={ handleHideEditWish } />
            </CustomModal>
        </div>
    );
};

export default WishList;
