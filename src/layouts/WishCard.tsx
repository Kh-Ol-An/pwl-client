import React, { FC, MouseEvent } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../store/hook';
import { IWish } from '../models/IWish';
import { addingWhiteSpaces } from '../utils/formating-value';
import Action from '../components/Action';

interface IProps {
    wish: IWish;
    showWish: () => void;
    editWish: () => void;
}

const WishCard: FC<IProps> = ({ wish, showWish, editWish }) => {
    const myUser = useAppSelector((state) => state.myUser.user);

    const handleEditWish = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        editWish();
    };

    return (
        <div className={"wish-card" + (wish.images.length > 0 ? " can-hover" : "")} onClick={showWish}>
            <div className="wish-card-outer-border">
                <div className="wish-card-inner-border">
                    <div className="wish-card-content">
                        <div className="wish-card-name">
                            {wish.name}
                        </div>

                        <div className="wish-card-data">
                            {wish.images.length > 0 && (
                                <img
                                    className="wish-card-img"
                                    src={wish.images[0].path}
                                    alt={`wish-${wish.images[0].position}`}
                                />
                            )}
                            {wish.price && (
                                <div className="wish-card-price">
                                    {addingWhiteSpaces(wish.price)} грн.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {myUser?.id === wish.user && (
                <Action onClick={handleEditWish}>
                    <EditIcon />
                </Action>
            )}
        </div>
    );
};

export default WishCard;
