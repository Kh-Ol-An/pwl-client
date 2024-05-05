import React, { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getWish } from '@/store/wishes/thunks';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';
import { unencryptedData } from "@/utils/encryption-data";
import { addingWhiteSpaces } from '@/utils/formating-value';
import WishSwiper from '@/layouts/wish/detail-wish/WishSwiper';
import PageHeader from "@/layouts/PageHeader";

const Wish: FC = () => {
    const myUser = useAppSelector((state) => state.myUser);

    const location = useLocation();

    const dispatch = useAppDispatch();

    const [wish, setWish] = useState<IWish | null>(null);
    const [userFullName, setUserFullName] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<IUser['avatar']>('');

    const unencryptedAddress = wish?.address ? unencryptedData(wish.address, wish.show) : '';

    const isURL = (str: string) => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        dispatch(getWish({ wishId: location.pathname.split('/')[2] }))
            .then((response: any) => {
                if (!response.payload) return;

                setWish(response.payload.wish);
                setUserFullName(`${response.payload.userFirstName} ${response.payload.userLastName}`);
                setUserAvatar(response.payload.userAvatar);
            });
    }, []);

    return (
        <div className={"wish" + (myUser.user === null ? " logged-out" : "")}>
            <PageHeader />

            {wish ? (
                <>
                    <div className="wish-head">
                        Бажання створено користувачем:
                        <div className="wish-head-user">
                            <Avatar alt={userFullName} src={userAvatar} sx={{ width: 56, height: 56 }} />
                            <span className="wish-head-user-name">{userFullName}</span>
                        </div>
                    </div>

                    <h1 className="wish-title">{unencryptedData(wish.name, wish.show)}</h1>

                    <div className="wish-content">
                        {wish.images.length > 0 && <WishSwiper wish={wish} />}

                        <div className={"wish-wrap" + (wish.images.length > 1 ? " with-top" : "")}>
                            {wish.price && (
                                <div className="wish-box">
                                    <span className="wish-label">Ціна:</span>
                                    <span className="wish-data">
                                        {
                                            addingWhiteSpaces(unencryptedData(wish.price, wish.show))
                                        } {
                                            unencryptedData(wish.currency, wish.show) || 'UAH'
                                        }
                                    </span>
                                </div>
                            )}

                            {wish.address && (
                                <p className="wish-description">
                                    <span className="label">Де можна придбати:</span>
                                    {isURL(unencryptedAddress) ? (
                                        <a
                                            className="link"
                                            href={unencryptedAddress}
                                            title={unencryptedAddress}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {unencryptedAddress}
                                        </a>
                                    ) : (<>{unencryptedAddress}</>)}
                                </p>
                            )}

                            {wish.description && (
                                <p className="wish-description">
                                    <span className="label">Опис:</span>
                                    <span className="value">{unencryptedData(wish.description, wish.show)}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p className="wish-empty">
                    Цього бажання не існує. Можливо, воно було видалено користувачем.
                </p>
            )}
        </div>
    );
};

export default Wish;
