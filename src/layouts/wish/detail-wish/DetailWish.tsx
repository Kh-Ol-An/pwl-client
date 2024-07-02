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

    let lang = 'en';
    i18next.language.includes('en') && (lang = 'en');
    i18next.language.includes('uk') && (lang = 'uk');

    let dateFormat = 'MMMM DD, YYYY';
    i18next.language.includes('en') && (dateFormat = 'MMMM DD, YYYY');
    i18next.language.includes('uk') && (dateFormat = 'DD MMMM YYYY');

    let showBookWish = !wish.booking?.end && myUser?.id !== wish.userId; // бажання не заброньовано і не належить користувачу

    let showCancelBookWish = myUser?.id === wish.booking?.userId // бажання належить тому хто створював його
        && !dayjs().isAfter(dayjs(wish.booking?.start).add(3, 'days')) // бажання можна скасувати за 3 дні до початку
        && !dayjs(wish.booking?.end).isSameOrBefore(dayjs()); // термін виконання ще не минув

    let showDoneWish = myUser?.id === wish.userId // бажання належить користувачу
        && !wish.executed // бажання не виконане
        && !showBookingExpired(wish, myUser?.id); // термін виконання ще не минув

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
                                                            ? t('main-page.you-must')
                                                            : t('main-page.wish-must')
                                                    }
                                                    <span>
                                                        {
                                                            dayjs(wish.booking?.end)
                                                                .locale(lang)
                                                                .format(dateFormat)
                                                        }
                                                    </span>
                                                </>
                                            ) : (<>{t('main-page.coming-true')}</>)}
                                        </p>
                                    )}

                                    {/* Book */}
                                    {showBookWish && <BookWish wish={wish} close={close} />}

                                    {/* Cancel Book */}
                                    {showCancelBookWish && (
                                        <CancelBookWish wish={wish} userId={myUser?.id} close={close} />
                                    )}

                                    {/* Done */}
                                    {showDoneWish && (
                                        <DoneWish
                                            wish={wish}
                                            userId={myUser?.id}
                                            whoseWish={wish.booking?.userId ? 'someone' : 'my'}
                                            close={close}
                                        />
                                    )}

                                    {/* Booking Expired */}
                                    {showBookingExpired(wish, myUser?.id) && (
                                        <BookingExpired
                                            wish={wish}
                                            userId={myUser?.id}
                                            whoseWish={wish.booking?.userId ? 'someone' : 'my'}
                                            close={close}
                                        />
                                    )}

                                    {/* Edit Wish */}
                                    {showEditWish && (
                                        <Button type="button" onClick={handleEditWish}>
                                            {t('main-page.edit-wish')}
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
