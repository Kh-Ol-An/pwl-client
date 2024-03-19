import React, { FC } from 'react';
import { Avatar } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { getWishList } from '../store/wishes/thunks';
import { selectUserId } from '../store/selected-user/slice';
import { useAppDispatch, useAppSelector } from '../store/hook';

interface IProps {
    close?: () => void;
}

const MyUserAction: FC<IProps> = ({ close }) => {
    const myUser = useAppSelector((state) => state.myUser.user);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);

    const dispatch = useAppDispatch();

    const handleSelectWish = async () => {
        if (!myUser) return;

        await dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
        await dispatch(selectUserId(myUser.id));
        localStorage.setItem('selectedUserId', myUser.id);
        close && close();
    };

    return (
        <button className="my-user-action" type="button" onClick={handleSelectWish}>
            <Avatar alt={myUser?.firstName} src={myUser?.avatar} />

            <div className="content">
                <span className={"name" + (myUser?.id === selectedUserId ? " selected" : "")}>
                    {myUser?.firstName} {myUser?.lastName}
                </span>

                <span className="params">
                    {
                        myUser?.birthday
                            ? dayjs(myUser?.birthday).locale('uk').format('DD MMMM')
                            : myUser?.email
                    }
                </span>
            </div>
        </button>
    );
};

export default MyUserAction;
