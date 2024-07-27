import React, { FC, useMemo } from 'react';
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import { getLang, getMonthWithDate } from "@/utils/lang-action";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store/hook";
import { EShow } from "@/models/IWish";

const DetailProfile: FC = () => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishesCreator = useAppSelector((state) => state.wishes.creator);

    const creatorFullName = wishesCreator?.firstName + (wishesCreator?.lastName ? ` ${ wishesCreator.lastName }` : '');

    const isMyFriend = useMemo(
        () => wishesCreator && myUser?.friends.includes(wishesCreator.id),
        [ wishesCreator, myUser ],
    );
    const showEmail = useMemo(
        () => {
            const showAll = wishesCreator?.showEmail === EShow.ALL
            const showMyFriend = wishesCreator?.showEmail === EShow.FRIENDS && isMyFriend;
            return wishesCreator?.email && (wishesCreator?.id === myUser?.id || showAll || showMyFriend);
        },
        [ wishesCreator, myUser ],
    );
    const email = useMemo(
        () => {
            if (showEmail && myUser && wishesCreator) {
                return myUser?.id === wishesCreator?.id ? myUser.email : wishesCreator.email;
            }
            return t('profile-page.unknown');
        },
        [ showEmail, wishesCreator, myUser ],
    );

    const showDeliveryAddress = useMemo(
        () => {
            const showAll = wishesCreator?.showDeliveryAddress === EShow.ALL
            const showMyFriend = wishesCreator?.showDeliveryAddress === EShow.FRIENDS && isMyFriend;
            return wishesCreator?.deliveryAddress && (wishesCreator?.id === myUser?.id || showAll || showMyFriend);
        },
        [ wishesCreator, myUser ],
    );
    const deliveryAddress = useMemo(
        () => {
            if (showDeliveryAddress && myUser && wishesCreator) {
                return myUser?.id === wishesCreator?.id ? myUser.deliveryAddress : wishesCreator.deliveryAddress;
            }
            return t('profile-page.unknown');
        },
        [ showDeliveryAddress, wishesCreator, myUser ],
    );

    const showBirthday = useMemo(
        () => {
            const showAll = wishesCreator?.showBirthday === EShow.ALL
            const showMyFriend = wishesCreator?.showBirthday === EShow.FRIENDS && isMyFriend;
            return wishesCreator?.birthday && (wishesCreator?.id === myUser?.id || showAll || showMyFriend);
        },
        [ wishesCreator, myUser ],
    );
    const birthday = useMemo(
        () => {
            if (showBirthday && myUser && wishesCreator) {
                return myUser?.id === wishesCreator?.id
                    ? dayjs(myUser?.birthday).locale(getLang()).format(getMonthWithDate())
                    : dayjs(wishesCreator?.birthday).locale(getLang()).format(getMonthWithDate());
            }
            return t('profile-page.unknown');
        },
        [ showBirthday, wishesCreator, myUser ],
    );

    const successfulWishes = (wishesCreator && wishesCreator.successfulWishes > 0) ? wishesCreator.successfulWishes : 0;
    const unsuccessfulWishes = (wishesCreator && wishesCreator.unsuccessfulWishes > 0) ? wishesCreator.unsuccessfulWishes : 0;
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

    return (
        <>
            <div className="detail-profile-main-data">
                <div className="detail-profile-avatar">
                    <Avatar
                        alt={ creatorFullName }
                        src={ wishesCreator?.avatar }
                        sx={ { width: '100%', height: '100%' } }
                    />
                </div>

                <div className="detail-profile-main-data-content">
                    <div className="detail-profile-name">
                        { creatorFullName }
                    </div>

                    { showEmail && (
                        <div className="detail-profile-email">
                            { email }
                        </div>
                    ) }
                </div>
            </div>

            <div className="detail-profile-data">
                <div className="detail-profile-data-label">
                    { t('profile-page.delivery-address') }:
                </div>

                <div className="detail-profile-data-value">
                    { deliveryAddress }
                </div>
            </div>

            <div className="detail-profile-data">
                <div className="detail-profile-data-label">
                    { t('profile-page.birthday') }:
                </div>

                <div className="detail-profile-data-value">
                    { birthday }
                </div>
            </div>

            <div className="detail-profile-data-field">
                <div className="detail-profile-data-field-label">
                    { t('profile-page.i_have_fulfilled') }
                </div>

                <div className={ "profile-data-field-value" + (successfulWishes > 0 ? " success" : "") }>
                    { successfulWishes }
                </div>

                <div className="detail-profile-data-field-label">
                    { t(`profile-page.${ tWishSuccess }`) }
                </div>
            </div>

            <div className="detail-profile-data-field">
                <div className="detail-profile-data-field-label">
                    { t('profile-page.i_did_not_fulfill') }
                </div>

                <div className={ "profile-data-field-value" + (unsuccessfulWishes > 0 ? " unsuccess" : "") }>
                    { unsuccessfulWishes }
                </div>

                <div className="detail-profile-data-field-label">
                    { t(`profile-page.${ tWishUnsuccess }`) }
                </div>
            </div>
        </>
    );
};

export default DetailProfile;
