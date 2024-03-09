import React, { FC } from 'react';
import { IWish } from '../models/IWish';

interface IProps {
    wish?: IWish;
}

const WishCard: FC<IProps> = ({ wish }) => {
    return (
        <div className="detail-wish">
            <div className="detail-wish-outer-border">
                <div className="detail-wish-inner-border">
                    <div className="detail-wish-content">
                        <div className="detail-wish-name">
                            {wish?.name}
                        </div>

                        {wish && wish.images.length > 0 && (
                            <img
                                className="detail-wish-img"
                                src={wish.images[0].path}
                                alt={`wish-${wish.images[0].position}`}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishCard;
