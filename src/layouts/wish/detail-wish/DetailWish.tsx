import React, { FC } from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useAppSelector } from '@/store/hook';
import { IWish } from '@/models/IWish';
import WishSwiper from '@/layouts/wish/detail-wish/WishSwiper';
import Button from '@/components/Button';
import WishContent from '@/layouts/wish/detail-wish/WishContent';
import BookWish from '@/layouts/wish/detail-wish/BookWish';
import CancelBookWish from '@/layouts/wish/detail-wish/CancelBookWish';
import ConfirmBookWish from '@/layouts/wish/detail-wish/ConfirmBookWish';

dayjs.extend(isSameOrBefore);

interface IProps {
    wish: IWish;
    editWish: () => void;
    close: () => void;
}

const DetailWish: FC<IProps> = ({ wish, editWish, close }) => {
    const myUser = useAppSelector((state) => state.myUser.user);

    let showCancelExecution = wish.booking
        && myUser?.id === wish.booking.userId
        && dayjs(wish.booking.start).isSameOrBefore(dayjs().add(3, 'days'));

    let showConfirmExecution = myUser?.id === wish.userId && wish.booking?.end;

    let showActions = false;
    !wish.booking?.end && (showActions = true);
    showCancelExecution && (showActions = true);
    showConfirmExecution && (showActions = true);
    myUser?.id === wish.userId && (showActions = true);

    const handleEditWish = () => {
        editWish();
        close();
    };

    return (
        <div className="detail-wish">
            <div className="detail-wish-outer-border">
                <div className="detail-wish-inner-border">
                    <div className="detail-wish-content">
                        <div className={"detail-wish-scroll" + (wish.images.length > 1 ? " min-height" : "")}>
                            {wish.images.length > 0 && <WishSwiper wish={wish} />}

                            <div className={"detail-wish-wrap" + (wish.images.length > 1 ? " with-top" : "")}>
                                <WishContent wish={wish} myUserId={myUser?.id} />

                                {showActions && (
                                    <div className="detail-wish-actions">
                                        {/* Book */}
                                        {!wish.booking?.end && <BookWish wish={wish} close={close} />}

                                        {/* Cancel Book */}
                                        {showCancelExecution && <CancelBookWish wishName={wish.name} close={close} />}

                                        {/* Confirm Book */}
                                        {showConfirmExecution && <ConfirmBookWish wishName={wish.name} close={close} />}

                                        {/* Поскаржитись на невиконання */}

                                        {/* Edit */}
                                        {myUser?.id === wish.userId && (
                                            <Button type="button" onClick={handleEditWish}>
                                                Редагувати бажання
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailWish;
