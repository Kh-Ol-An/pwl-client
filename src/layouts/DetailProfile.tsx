import React, { FC, useMemo } from 'react';
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import { getLang, getMonthWithDate } from "@/utils/lang-action";
import { useTranslation } from "react-i18next";
import { IUser } from "@/models/IUser";

interface IProps {
    creator: IUser | null;
}

const DetailProfile: FC<IProps> = ({ creator }) => {
    const { t } = useTranslation();

    const creatorFullName = useMemo(
        () => creator?.firstName + (creator?.lastName ? ` ${ creator.lastName }` : ''),
        [ creator ],
    );
    const successfulWishes = useMemo(
        () => {
            if (creator && creator.successfulWishes > 0) {
                return creator.successfulWishes;
            }

            return 0;
        },
        [ creator ],
    );
    const unsuccessfulWishes = useMemo(
        () => {
            if (creator && creator.unsuccessfulWishes > 0) {
                return creator.unsuccessfulWishes;
            }

            return 0;
        },
        [ creator ],
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

                    <div className="detail-profile-email">
                        { creator?.email }
                    </div>
                </div>
            </div>

            <div className="detail-profile-data">
                <div className="detail-profile-data-label">
                    { t('profile-page.delivery-address') }:
                </div>

                <div className="detail-profile-data-value">
                    {
                        creator?.deliveryAddress
                            ? creator?.deliveryAddress
                            : <>{ t('profile-page.not-specified') }</>
                    }
                </div>
            </div>

            <div className="detail-profile-data">
                <div className="detail-profile-data-label">
                    { t('profile-page.birthday') }:
                </div>

                <div className="detail-profile-data-value">
                    {
                        creator?.birthday
                            ? dayjs(creator.birthday).locale(getLang()).format(getMonthWithDate())
                            : <>{ t('profile-page.not-specified') }</>
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
