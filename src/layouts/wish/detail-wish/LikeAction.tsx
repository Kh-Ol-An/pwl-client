import React, { FC, useState } from 'react';
import { Avatar } from "@mui/material";
import { ThumbUpAlt as ThumbUpAltIcon, ThumbUpOffAlt as ThumbUpOffAltIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectUserId } from "@/store/selected-user/slice";
import { dislikeWish, getWishList, likeWish } from "@/store/wishes/thunks";
import Popup from "@/components/Popup";
import { IWish } from "@/models/IWish";
import { IUser } from "@/models/IUser";

interface IProps {
    wish: IWish;
    type: 'likes' | 'dislikes';
    close: () => void;
}

const LikeAction: FC<IProps> = ({ wish, type, close }) => {
    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const [ anchor, setAnchor ] = useState<HTMLButtonElement | null>(null);

    const handleAction = () => {
        if (!myUser) return;
        type === 'likes' && dispatch(likeWish({ userId: myUser.id, wishId: wish.id }));
        type === 'dislikes' && dispatch(dislikeWish({ userId: myUser.id, wishId: wish.id }));
    };

    const handleSelectWish = async (userId: IUser['id']) => {
        if (!myUser) return;

        await dispatch(getWishList({ myId: myUser.id, userId }));
        await dispatch(selectUserId(userId));
        localStorage.setItem('selectedUserId', userId);
        setAnchor(null);
        close();
    };

    return (
        <>
            <button
                type="button"
                className={ `detail-wish-${ type }` }
                onClick={ handleAction }
            >
                { wish[type].some(like => like.userId === myUser?.id) ? (
                    <ThumbUpAltIcon className="detail-wish-likes-icon liked" />
                ) : (
                    <ThumbUpOffAltIcon className="detail-wish-likes-icon" />
                ) }
            </button>

            { wish[type].length > 0 && (
                <Popup
                    anchor={ anchor }
                    setAnchor={ setAnchor }
                    actionIcon={ <span className="detail-wish-count">{ wish[type].length }</span> }
                    isTopPosition
                >
                    <ul className="detail-wish-likes_user-list">
                        { wish[type].map((like) => (
                            <li key={ like.userId }>
                                <button
                                    className="detail-wish-likes_user-item"
                                    type="button"
                                    onClick={ () => handleSelectWish(like.userId) }
                                >
                                    <Avatar
                                        src={ like.userAvatar }
                                        alt={ like.userFullName }
                                        sx={ { width: 24, height: 24 } }
                                    />

                                    <span className="detail-wish-likes_user-name">
                                        { like.userFullName }
                                    </span>
                                </button>
                            </li>
                        )) }
                    </ul>
                </Popup>
            ) }
        </>
    );
};

export default LikeAction;
