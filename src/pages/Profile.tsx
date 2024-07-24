import React, { FC, useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';
import { Avatar, Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { IWish } from '@/models/IWish';
import { handleGetInitialWishList } from "@/utils/action-on-wishes";
import { Close as CloseIcon, Edit as EditIcon } from "@mui/icons-material";
import WishItem from "@/layouts/wish/WishItem";
import DetailWish from "@/layouts/wish/detail-wish/DetailWish";
import Action from "@/components/Action";
import StylesVariables from "@/styles/utils/variables.module.scss";
import HeaderSettings from "@/layouts/header/HeaderSettings";
import Logo from "@/components/Logo";
import SearchAndSortWishes from "@/layouts/wish/SearchAndSortWishes";
import { addWishList } from "@/store/wishes/thunks";
import { WISHES_PAGINATION_LIMIT } from "@/utils/constants";
import { getLang, getMonthWithDate } from "@/utils/lang-action";
import DeleteMyUserConfirmModal from "@/layouts/profile/DeleteMyUserConfirmModal";
import Button from "@/components/Button";
import CustomAccordion from "@/components/CustomAccordion";
import EditAccount from "@/layouts/EditAccount";
import ChangePassword from "@/layouts/header/ChangePassword";

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

    const [ showEdit, setShowEdit ] = useState<boolean>(false);
    const [ firstLoad, setFirstLoad ] = useState<boolean>(true);
    const [ showWish, setShowWish ] = useState<boolean>(false);
    const [ idOfSelectedWish, setIdOfSelectedWish ] = useState<IWish['id'] | null>(null);
    const [ showConfirmDeleteMyUser, setShowConfirmDeleteMyUser ] = useState<boolean>(false);

    const wishListRef = useRef<HTMLUListElement>(null);

    const profileId = useMemo(
        () => location.pathname.split('/')[2],
        [ location.pathname ],
    );
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
    const successfulWishes = useMemo(
        () => {
            if (wishes.creator && wishes.creator.successfulWishes > 0) {
                return wishes.creator.successfulWishes;
            }

            return 0;
        },
        [ wishes.creator ],
    );
    const unsuccessfulWishes = useMemo(
        () => {
            if (wishes.creator && wishes.creator.unsuccessfulWishes > 0) {
                return wishes.creator.unsuccessfulWishes;
            }

            return 0;
        },
        [ wishes.creator ],
    );
    const tWishSuccess = useMemo(
        () => {
            if (successfulWishes === 1) {
                return 'wish';
            }

            if (successfulWishes === 2 || successfulWishes === 3 || successfulWishes === 4) {
                return 'wish_2_3_4';
            }

            return 'wishes';
        },
        [ successfulWishes ],
    );
    const tWishUnsuccess = useMemo(
        () => {
            if (unsuccessfulWishes === 1) {
                return 'wish';
            }

            if (unsuccessfulWishes === 2 || unsuccessfulWishes === 3 || unsuccessfulWishes === 4) {
                return 'wish_2_3_4';
            }

            return 'wishes';
        },
        [ unsuccessfulWishes ],
    );

    const handleEditAccount = () => {
        setShowEdit(true);
    };

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

        dispatch(addWishList({
            myId: myUser?.id,
            userId: profileId,
            status: wishes.status,
            page: wishes.page,
            limit: WISHES_PAGINATION_LIMIT,
            search: wishes.search,
            sort: wishes.sort,
        }));
    }, [ inView ]);

    useEffect(() => {
        handleGetInitialWishList(dispatch, myUser?.id, profileId);
    }, [ profileId ]);

    return (
        <div className="profile-page container">
            <div className="profile-header container">
                <Logo />

                <HeaderSettings logoutWithoutUpdate />
            </div>

            <div className="profile-body">
                <div className="profile-content">
                    <div className="profile-title">
                        <h1>
                            { t(`profile-page.${ profileId === myUser?.id ? 'my-profile' : 'user-profile' }`) }
                        </h1>

                        { !showEdit && (
                            <button
                                className="profile-edit"
                                type="button"
                                onClick={ handleEditAccount }
                            >
                                { t('profile-page.edit') }

                                <EditIcon sx={ { color: StylesVariables.specialColor } } />
                            </button>
                        ) }
                    </div>

                    { showEdit ? (
                        <EditAccount cancel={() => setShowEdit(false)} />
                    ) : (
                        <>
                            <div className="profile-main-data">
                                <div className="profile-avatar">
                                    <Avatar
                                        alt={ creatorFullName }
                                        src={ wishes.creator?.avatar }
                                        sx={ { width: '100%', height: '100%' } }
                                    />
                                </div>

                                <div className="profile-main-data-content">
                                    <div className="profile-name">
                                        { creatorFullName }
                                    </div>

                                    <div className="profile-email">
                                        { wishes.creator?.email }
                                    </div>
                                </div>
                            </div>

                            <div className="profile-data">
                                <div className="profile-data-label">
                                    { t('profile-page.delivery-address') }:
                                </div>

                                <div className="profile-data-value">
                                    {
                                        wishes.creator?.deliveryAddress
                                            ? wishes.creator?.deliveryAddress
                                            : <>{ t('profile-page.not-specified') }</>
                                    }
                                </div>
                            </div>

                            <div className="profile-data">
                                <div className="profile-data-label">
                                    { t('profile-page.birthday') }:
                                </div>

                                <div className="profile-data-value">
                                    {
                                        wishes.creator?.birthday
                                            ? dayjs(wishes.creator.birthday).locale(getLang()).format(getMonthWithDate())
                                            : <>{ t('profile-page.not-specified') }</>
                                    }
                                </div>
                            </div>

                            <div className="profile-data-field">
                                <div className="profile-data-field-label">{ t('profile-page.i_have_fulfilled') }</div>

                                <div className={ "profile-data-field-value" + (successfulWishes > 0 ? " success" : "") }>
                                    { successfulWishes }
                                </div>

                                <div className="profile-data-field-label">{ t(`profile-page.${ tWishSuccess }`) }</div>
                            </div>

                            <div className="profile-data-field">
                                <div className="profile-data-field-label">{ t('profile-page.i_did_not_fulfill') }</div>

                                <div className={ "profile-data-field-value" + (unsuccessfulWishes > 0 ? " unsuccess" : "") }>
                                    { unsuccessfulWishes }
                                </div>

                                <div className="profile-data-field-label">{ t(`profile-page.${ tWishUnsuccess }`) }</div>
                            </div>
                        </>
                    ) }

                    <CustomAccordion
                        ariaControls="profile-change-password-content"
                        titleId="profile-change-password-header"
                        title={ t('profile-page.change-password-title') }
                        contentId="profile-change-password-content"
                    >
                        <ChangePassword userId={ myUser?.id } />
                    </CustomAccordion>
                </div>

                { !showEdit && (
                    <>
                        <SearchAndSortWishes wishListRefCurrent={ wishListRef.current } />

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
                            <p className="profile-wishes-empty">{ t('profile-page.wishes-empty') }</p>
                        ) }
                    </>
                ) }

                <div className="profile-delete">
                    <Button
                        type="button"
                        variant="text"
                        color="action-color"
                        onClick={ () => setShowConfirmDeleteMyUser(true) }
                    >
                        { t('profile-page.delete-account') }
                    </Button>
                </div>
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

            {/* Confirm Delete My User */ }
            <DeleteMyUserConfirmModal
                show={ showConfirmDeleteMyUser }
                hid={ () => setShowConfirmDeleteMyUser(false) }
            />
        </div>
    );
};

export default Wish;
