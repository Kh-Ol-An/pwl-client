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
import DoneWish from '@/layouts/wish/detail-wish/DoneWish';
import BookingExpired from '@/layouts/wish/detail-wish/BookingExpired';
import showBookingExpired from '@/utils/show-booking-expired';

dayjs.extend(isSameOrBefore);

interface IProps {
    wish: IWish;
    editWish: () => void;
    close: () => void;
}

const DetailWish: FC<IProps> = ({ wish, editWish, close }) => {
    const myUser = useAppSelector((state) => state.myUser.user);

    let showCancelBookWish = myUser?.id === wish.booking?.userId // бажання належить тому хто створював його
        && dayjs(wish.booking?.start).isSameOrBefore(dayjs().add(3, 'days')) // бажання можна скасувати за 3 дні до початку
        && !dayjs(wish.booking?.end).isSameOrBefore(dayjs()); // термін виконання вже минув

    let showDoneWish = myUser?.id === wish.userId // бажання належить користувачу
        && wish.booking?.userId // бажання заброньовано
        && !dayjs(wish.booking?.end).isSameOrBefore(dayjs()); // термін виконання вже минув

    let showBookedEnd = myUser?.id === wish.booking?.userId // бажання належить тому хто забронював

    let showActions = false;
    !wish.booking?.end && (showActions = true);
    showCancelBookWish && (showActions = true);
    showDoneWish && (showActions = true);
    showBookingExpired(wish, myUser?.id) && (showActions = true);
    myUser?.id === wish.userId && !wish.booking?.end && (showActions = true);
    showBookedEnd && (showActions = true);
    wish.executed && (showActions = false);

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
                                        {showCancelBookWish && (
                                            <CancelBookWish wish={wish} userId={myUser?.id} close={close} />
                                        )}

                                        {/* Done */}
                                        {showDoneWish && (
                                            <DoneWish wish={wish} userId={myUser?.id} close={close} />
                                        )}

                                        {/* showBookedEnd */}
                                        {showBookedEnd && (
                                            <p className="detail-wish-actions-booked">
                                                Ви забронювали бажання до:
                                                <span>
                                                    {
                                                        dayjs(wish.booking?.end)
                                                            .locale('uk')
                                                            .format('DD MMMM YYYY')
                                                    }
                                                </span>
                                            </p>
                                        )}

                                        {/* Undone */}
                                        {showBookingExpired(wish, myUser?.id) && (
                                            <BookingExpired wish={wish} userId={myUser?.id} close={close} />
                                        )}

                                        {/* Booking Expired */}
                                        {myUser?.id === wish.userId && !wish.booking?.end && (
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
