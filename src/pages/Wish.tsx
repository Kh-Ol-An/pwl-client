import React, { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useAppDispatch } from '@/store/hook';
import { getWish } from '@/store/wishes/thunks';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';
import WishSwiper from '@/layouts/wish/detail-wish/WishSwiper';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import { addingWhiteSpaces } from '@/utils/formating-value';

const Wish: FC = () => {
    const location = useLocation();

    const dispatch = useAppDispatch();

    const [wish, setWish] = useState<IWish | null>(null);
    const [userFullName, setUserFullName] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<IUser['avatar']>('');

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
                setWish(response.payload.wish);
                setUserFullName(`${response.payload.userFirstName} ${response.payload.userLastName}`);
                setUserAvatar(response.payload.userAvatar);
            });
    }, []);

    return (
        <div className="wish">
            <div className="wish-header">
                <Logo />

                <div className="actions">
                    <Button to="/auth" variant="text">Увійти</Button>
                    <Button to="/auth?register">Зареєструватись</Button>
                </div>
            </div>

            <div className="wish-head">
                Бажання створено користувачем:
                <div className="wish-head-user">
                    <Avatar alt={userFullName} src={userAvatar} sx={{ width: 56, height: 56 }} />
                    <span className="wish-head-user-name">{userFullName}</span>
                </div>
            </div>

            {wish && (
                <>
                    <h1 className="wish-title">{wish.name}</h1>

                    <div className="wish-content">
                        {wish.images.length > 0 && <WishSwiper wish={wish} />}

                        <div className={"wish-wrap" + (wish.images.length > 1 ? " with-top" : "")}>
                            {wish.price && (
                                <div className="wish-box">
                                    <span className="wish-label">Ціна:</span>
                                    <span className="wish-data">
                                        {addingWhiteSpaces(wish.price)} {wish.currency || 'UAH'}
                                    </span>
                                </div>
                            )}

                            {wish.address && (
                                <p className="wish-description">
                                    <span className="label">Де можна придбати:</span>
                                    {isURL(wish.address) ? (
                                        <a
                                            className="link"
                                            href={wish.address}
                                            title={wish.address}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {wish.address}
                                        </a>
                                    ) : (<>{wish.address}</>)}
                                </p>
                            )}

                            {wish.description && (
                                <p className="wish-description">
                                    <span className="label">Опис:</span>
                                    <span className="value">{wish.description}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Wish;
