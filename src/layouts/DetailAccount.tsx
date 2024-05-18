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

    let lang = 'en';
    i18next.language.includes('en') && (lang = 'en');
    i18next.language.includes('uk') && (lang = 'uk');

    let dateFormat = 'MMMM Do';
    i18next.language.includes('en') && (dateFormat = 'MMMM Do');
    i18next.language.includes('uk') && (dateFormat = 'DD MMMM');

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
                        <div className="detail-account-label">{t('main.mail')}</div>
                        <div className="detail-account-value" title={user.email}>
                            {user.email}
                        </div>
                    </div>
                )}

                {user.birthday && (
                    <div className="detail-account-field">
                        <div className="detail-account-label">{t('main.birthday')}</div>
                        <div className="detail-account-value">
                            {dayjs(user.birthday).locale(lang).format(dateFormat)}
                        </div>
                    </div>
                )}

                <div className="detail-account-field">
                    <div className="detail-account-label">{t('main.fulfilled-wishes')}</div>
                    <div className={"detail-account-value" + (user.successfulWishes > 0 ? " success" : "")}>
                        {user.successfulWishes || 0}
                    </div>
                </div>

                <div className="detail-account-field">
                    <div className="detail-account-label">{t('main.unfulfilled-wishes')}</div>
                    <div className={"detail-account-value" + (user.unsuccessfulWishes > 0 ? " unsuccess" : "")}>
                        {user.unsuccessfulWishes || 0}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailAccount;
