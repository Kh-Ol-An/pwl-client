import React, { FC } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useAppSelector } from '@/store/hook';
import { IWish } from '@/models/IWish';
import WishSwiper from '@/layouts/wish/detail-wish/WishSwiper';
import WishContent from '@/layouts/wish/detail-wish/WishContent';
import BookWish from '@/layouts/wish/detail-wish/BookWish';
import CancelBookWish from '@/layouts/wish/detail-wish/CancelBookWish';
import DoneWish from '@/layouts/wish/detail-wish/DoneWish';
import BookingExpired from '@/layouts/wish/detail-wish/BookingExpired';
import Button from '@/components/Button';
import showBookingExpired from '@/utils/show-booking-expired';

dayjs.extend(isSameOrBefore);

interface IProps {
    wish: IWish;
    editWish: () => void;
    close: () => void;
}

const DetailWish: FC<IProps> = ({ wish, editWish, close }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    let language = 'en';
    i18next.language.includes('en') && (language = 'en');
    i18next.language.includes('uk') && (language = 'uk');

    let dateFormat = 'MMMM DD, YYYY';
    i18next.language.includes('en') && (dateFormat = 'MMMM DD, YYYY');
    i18next.language.includes('uk') && (dateFormat = 'DD MMMM YYYY');

    let showDoneMyWish = myUser?.id === wish.userId && !showBookingExpired(wish, myUser?.id); // бажання належить користувачу

    let showBookWish = !wish.booking?.end && myUser?.id !== wish.userId; // бажання не заброньовано і не належить користувачу

    let showCancelBookWish = myUser?.id === wish.booking?.userId // бажання належить тому хто створював його
        && dayjs(wish.booking?.start).isSameOrBefore(dayjs().add(3, 'days')) // бажання можна скасувати за 3 дні до початку
        && !dayjs(wish.booking?.end).isSameOrBefore(dayjs()); // термін виконання вже минув

    let showDoneWish = myUser?.id === wish.userId // бажання належить користувачу
        && wish.booking?.userId // бажання заброньовано
        && !dayjs(wish.booking?.end).isSameOrBefore(dayjs()); // термін виконання вже минув

    let showEditWish = myUser?.id === wish.userId && !wish.booking?.end // бажання належить користувачу і не заброньовано

    // МОЖЛИВІ КЕЙСИ
    // Моє бажання / не моє
    //// виконане / не виконане
    //// заброньоване / не заброньоване
    ////// перші 3 дні минули / не минули
    ////// термін виконання минув / не минув

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

                                <div className="detail-wish-actions">
                                    {wish.booking?.end && (
                                        <p className="detail-wish-actions-booked">
                                            {(myUser?.id === wish.booking?.userId || myUser?.id === wish.userId) ? (
                                                <>
                                                    {
                                                        myUser?.id === wish.booking?.userId
                                                            ? t('main.you-must')
                                                            : t('main.wish-must')
                                                    }
                                                    <span>
                                                        {
                                                            dayjs(wish.booking?.end)
                                                                .locale(language)
                                                                .format(dateFormat)
                                                        }
                                                    </span>
                                                </>
                                            ) : (<>{t('main.coming-true')}</>)}
                                        </p>
                                    )}

                                    {/* Done my wish */}
                                    {showDoneMyWish && (
                                        <DoneWish
                                            wish={wish}
                                            userId={myUser?.id}
                                            whoseWish="my"
                                            actionText={t('main.wish-fulfilled')}
                                            close={close}
                                        />
                                    )}

                                    {/* Book */}
                                    {showBookWish && <BookWish wish={wish} close={close} />}

                                    {/* Cancel Book */}
                                    {showCancelBookWish && (
                                        <CancelBookWish wish={wish} userId={myUser?.id} close={close} />
                                    )}

                                    {/* Done */}
                                    {showDoneWish && (
                                        <DoneWish wish={wish} userId={myUser?.id} whoseWish="someone" close={close} />
                                    )}

                                    {/* Booking Expired */}
                                    {showBookingExpired(wish, myUser?.id) && (
                                        <BookingExpired
                                            wish={wish}
                                            userId={myUser?.id}
                                            whoseWish={myUser?.id === wish.booking?.userId ? 'my' : 'someone'}
                                            close={close}
                                        />
                                    )}

                                    {/* Edit Wish */}
                                    {showEditWish && (
                                        <Button type="button" onClick={handleEditWish}>
                                            {t('main.edit-wish')}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailWish;
