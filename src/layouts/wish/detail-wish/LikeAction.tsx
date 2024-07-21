import React, { FC, MouseEvent, useState } from 'react';
import { Avatar } from "@mui/material";
import { ThumbUpAlt as ThumbUpAltIcon, ThumbUpOffAlt as ThumbUpOffAltIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { dislikeWish, likeWish } from "@/store/wishes/thunks";
import Popup from "@/components/Popup";
import { IWish } from "@/models/IWish";
import { IUser } from "@/models/IUser";
import { handleGetInitialWishList } from "@/utils/action-on-wishes";

interface IProps {
    wish: IWish;
    type: 'likes' | 'dislikes';
    close?: () => void;
}

const LikeAction: FC<IProps> = ({ wish, type, close }) => {
    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const [ anchor, setAnchor ] = useState<HTMLButtonElement | null>(null);

    const handleAction = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!myUser) return;
        type === 'likes' && dispatch(likeWish({ userId: myUser.id, wishId: wish.id }));
        type === 'dislikes' && dispatch(dislikeWish({ userId: myUser.id, wishId: wish.id }));
    };

    const handleSelectWish = async (e: MouseEvent<HTMLButtonElement>, userId: IUser['id']) => {
        e.stopPropagation();
        if (!myUser) return;

        await handleGetInitialWishList(dispatch, myUser.id, userId);
        setAnchor(null);
        close && close();
    };

    return (
        <>
            <button
                type="button"
                className={ `wish-${ type }-action` }
                onClick={ handleAction }
            >
                { wish[type]?.some(like => like.userId === myUser?.id) ? (
                    <ThumbUpAltIcon className="wish-likes-icon liked" />
                ) : (
                    <ThumbUpOffAltIcon className="wish-likes-icon" />
                ) }
            </button>

            { wish[type]?.length > 0 && (
                <Popup
                    anchor={ anchor }
                    setAnchor={ setAnchor }
                    actionIcon={ <span className="wish-likes-count">{ wish[type].length }</span> }
                    isTopPosition
                >
                    <div className="popup">
                        <ul className="wish-likes_user-list">
                            { wish[type].map((like) => (
                                <li key={ like.userId }>
                                    <button
                                        className="wish-likes_user-item"
                                        type="button"
                                        onClick={ (e) => handleSelectWish(e, like.userId) }
                                    >
                                        <Avatar
                                            src={ like.userAvatar }
                                            alt={ like.userFullName }
                                            sx={ { width: 24, height: 24 } }
                                        />

                                        <span className="wish-likes_user-name">
                                            { like.userFullName }
                                        </span>
                                    </button>
                                </li>
                            )) }
                        </ul>
                    </div>
                </Popup>
            ) }
        </>
    );
};

export default LikeAction;
