import React, { FC } from 'react';
import dayjs from 'dayjs';
import { useAppSelector } from '@/store/hook';
import { IUser } from '@/models/IUser';

interface IProps {
    user: IUser;
}

const DetailAccount: FC<IProps> = ({ user }) => {
    const myUser = useAppSelector((state) => state.myUser.user);

    return (
        <div className="detail-account">
            {user.avatar && (
                <div className="detail-account-avatar">
                    <img src={user.avatar} alt={`${user.firstName} ${user.lastName ? user.lastName : ''}`} />
                </div>
            )}

            <div className="detail-account-info">
                <h2 className="detail-account-title">
                    {user.firstName} {user.lastName}
                </h2>

                {myUser?.id === user.id && (
                    <div className="detail-account-field">
                        <div className="detail-account-label">Ваша пошта:</div>
                        <div className="detail-account-value" title={user.email}>
                            {user.email}
                        </div>
                    </div>
                )}

                {user.birthday && (
                    <div className="detail-account-field">
                        <div className="detail-account-label">День народження:</div>
                        <div className="detail-account-value">
                            {dayjs(user.birthday).locale('uk').format('DD MMMM')}
                        </div>
                    </div>
                )}

                <div className="detail-account-field">
                    <div className="detail-account-label">Виконані бажання:</div>
                    <div className={"detail-account-value" + (user.successfulWishes > 0 ? " success" : "")}>
                        {user.successfulWishes || 0}
                    </div>
                </div>

                <div className="detail-account-field">
                    <div className="detail-account-label">Не виконані бажання:</div>
                    <div className={"detail-account-value" + (user.unsuccessfulWishes > 0 ? " unsuccess" : "")}>
                        {user.unsuccessfulWishes || 0}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailAccount;
