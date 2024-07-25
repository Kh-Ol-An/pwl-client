import React, { FC, useMemo } from 'react';
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import { getLang, getMonthWithDate } from "@/utils/lang-action";
import { useTranslation } from "react-i18next";
import { IUser } from "@/models/IUser";
import { useAppSelector } from "@/store/hook";
import { EShow } from "@/models/IWish";

interface IProps {
    creator: IUser | null;
}

const DetailProfile: FC<IProps> = ({ creator }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const creatorFullName = creator?.firstName + (creator?.lastName ? ` ${ creator.lastName }` : '');
    const showEmail = creator?.id === myUser?.id || creator?.showEmail === EShow.ALL || (creator?.showEmail === EShow.FRIENDS && myUser?.friends.includes(creator.id));
    const showDeliveryAddress = creator?.id === myUser?.id || creator?.showDeliveryAddress === EShow.ALL || (creator?.showDeliveryAddress === EShow.FRIENDS && myUser?.friends.includes(creator.id));
    const showBirthday = creator?.id === myUser?.id || creator?.showBirthday === EShow.ALL || (creator?.showBirthday === EShow.FRIENDS && myUser?.friends.includes(creator.id));
    const successfulWishes = (creator && creator.successfulWishes > 0) ? creator.successfulWishes : 0;
    const unsuccessfulWishes = (creator && creator.unsuccessfulWishes > 0) ? creator.unsuccessfulWishes : 0;
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
                        src={ creator?.avatar }
                        sx={ { width: '100%', height: '100%' } }
                    />
                </div>

                <div className="detail-profile-main-data-content">
                    <div className="detail-profile-name">
                        { creatorFullName }
                    </div>

                    { showEmail && (
                        <div className="detail-profile-email">
                            { creator?.email }
                        </div>
                    ) }
                </div>
            </div>

            <div className="detail-profile-data">
                <div className="detail-profile-data-label">
                    { t('profile-page.delivery-address') }:
                </div>

                <div className="detail-profile-data-value">
                    {
                        showDeliveryAddress
                            ? creator?.deliveryAddress
                            : <>{ t('profile-page.unknown') }</>
                    }
                </div>
            </div>

            <div className="detail-profile-data">
                <div className="detail-profile-data-label">
                    { t('profile-page.birthday') }:
                </div>

                <div className="detail-profile-data-value">
                    {
                        showBirthday
                            ? dayjs(creator?.birthday).locale(getLang()).format(getMonthWithDate())
                            : <>{ t('profile-page.unknown') }</>
                    }
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
