import React, { FC } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hook';
import { getLang, getMonthWithDate } from "@/utils/lang-action";
import { IUser } from '@/models/IUser';

interface IProps {
    user: IUser;
}

const DetailAccount: FC<IProps> = ({ user }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    let successfulWishes = 0;
    user.successfulWishes > 0 && (successfulWishes = user.successfulWishes);

    let unsuccessfulWishes = 0;
    user.unsuccessfulWishes > 0 && (unsuccessfulWishes = user.unsuccessfulWishes);

    let tWishSuccess = 'wishes';
    successfulWishes === 1 && (tWishSuccess = 'wish');
    (successfulWishes === 2 || successfulWishes === 3 || successfulWishes === 4) && (tWishSuccess = 'wish_2_3_4');

    let tWishUnsuccess = 'wishes';
    unsuccessfulWishes === 1 && (tWishUnsuccess = 'wish');
    (unsuccessfulWishes === 2 || unsuccessfulWishes === 3 || unsuccessfulWishes === 4) && (tWishUnsuccess = 'wish_2_3_4');

    return (
        <div className="detail-account">
            {user.avatar && (
                <div className="detail-account-avatar">
                    <img src={user.avatar} alt={`${user.firstName} ${user.lastName ? user.lastName : ''}`} />
                </div>
            )}

            <div className="detail-account-info">
                <h2 className="detail-account-title" title={`${user.firstName} ${user.lastName}`}>
                    {user.firstName} {user.lastName}
                </h2>

                {myUser?.id === user.id && (
                    <div className="detail-account-field">
                        <div className="detail-account-label">{t('main-page.mail')}</div>
                        <div className="detail-account-value" title={user.email}>
                            {user.email}
                        </div>
                    </div>
                )}

                {user.deliveryAddress && (
                    <div className="detail-account-field delivery-address">
                        <div className="detail-account-label">{t('main-page.delivery-address')}:</div>
                        <div className="detail-account-value" title={ user.deliveryAddress }>
                            { user.deliveryAddress }
                        </div>
                    </div>
                )}

                {user.birthday && (
                    <div className="detail-account-field">
                        <div className="detail-account-label">{t('main-page.birthday')}</div>
                        <div className="detail-account-value">
                            {dayjs(user.birthday).locale(getLang()).format(getMonthWithDate())}
                        </div>
                    </div>
                )}

                <div className="detail-account-field">
                    <div className="detail-account-label">{ t('main-page.i_have_fulfilled') }</div>

                    <div className={ "detail-account-value" + (successfulWishes > 0 ? " success" : "") }>
                        { successfulWishes }
                    </div>

                    <div className="detail-account-label">{ t(`main-page.${tWishSuccess}`) }</div>
                </div>

                <div className="detail-account-field">
                    <div className="detail-account-label">{ t('main-page.i_did_not_fulfill') }</div>

                    <div className={ "detail-account-value" + (unsuccessfulWishes > 0 ? " unsuccess" : "") }>
                        { unsuccessfulWishes }
                    </div>

                    <div className="detail-account-label">{ t(`main-page.${tWishUnsuccess}`) }</div>
                </div>
            </div>
        </div>
    );
};

export default DetailAccount;
