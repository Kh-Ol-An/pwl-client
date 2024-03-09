import React, { FC, MouseEvent, useRef } from 'react';
import Action from './Action';
import EditIcon from '@mui/icons-material/Edit';
import { IWish } from '../models/IWish';

interface IProps {
    wish: IWish;
    showWish: () => void;
    editWish: () => void;
}

const WishCard: FC<IProps> = ({ wish, showWish, editWish }) => {
    const wishCardRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (wishCardRef.current) {
            wishCardRef.current.classList.add('hovered');
        }
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            if (wishCardRef.current)
                wishCardRef.current.classList.remove('hovered');
        }, 500);
    };

    const handleEditWish = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        editWish();
    };

    return (
        <div
            className={"wish-card" + (wish.images.length > 0 ? " can-hover" : "")}
            ref={wishCardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={showWish}
        >
            <div className="wish-card-outer-border">
                <div className="wish-card-inner-border">
                    <div className="wish-card-content">
                        <div className="wish-card-name">
                            {wish.name}
                        </div>

                        {wish.images.length > 0 && (
                            <img
                                className="wish-card-img"
                                src={wish.images[0].path}
                                alt={`wish-${wish.images[0].position}`}
                            />
                        )}
                    </div>
                </div>
            </div>

            <Action onClick={handleEditWish}>
                <EditIcon />
            </Action>
        </div>
    );
};

export default WishCard;
