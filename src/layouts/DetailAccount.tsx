import React, { FC } from 'react';
import dayjs from 'dayjs';
import i18next from "i18next";
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hook';
import { IUser } from '@/models/IUser';

interface IProps {
    user: IUser;
}

const DetailAccount: FC<IProps> = ({ user }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    let language = 'en';
    i18next.language.includes('en') && (language = 'en');
    i18next.language.includes('uk') && (language = 'uk');

    let dayjsFormat = 'MMMM Do';
    i18next.language.includes('en') && (dayjsFormat = 'MMMM Do');
    i18next.language.includes('uk') && (dayjsFormat = 'DD MMMM');

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
                        <div className="detail-account-label">{t('home.mail')}</div>
                        <div className="detail-account-value" title={user.email}>
                            {user.email}
                        </div>
                    </div>
                )}

                {user.birthday && (
                    <div className="detail-account-field">
                        <div className="detail-account-label">{t('home.birthday')}</div>
                        <div className="detail-account-value">
                            {dayjs(user.birthday).locale(language).format(dayjsFormat)}
                        </div>
                    </div>
                )}

                <div className="detail-account-field">
                    <div className="detail-account-label">{t('home.fulfilled-wishes')}</div>
                    <div className={"detail-account-value" + (user.successfulWishes > 0 ? " success" : "")}>
                        {user.successfulWishes || 0}
                    </div>
                </div>

                <div className="detail-account-field">
                    <div className="detail-account-label">{t('home.unfulfilled-wishes')}</div>
                    <div className={"detail-account-value" + (user.unsuccessfulWishes > 0 ? " unsuccess" : "")}>
                        {user.unsuccessfulWishes || 0}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailAccount;
