import React, { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/store/hook';
import { getWish } from '@/store/wishes/thunks';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';

const Wish: FC = () => {
    const location = useLocation();

    const dispatch = useAppDispatch();

    const [wish, setWish] = useState<IWish | null>(null);
    const [userFullName, setUserFullName] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<IUser['avatar']>('');

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
            {wish?.name}
            {userFullName}
            {userAvatar}
        </div>
    );
};

export default Wish;
