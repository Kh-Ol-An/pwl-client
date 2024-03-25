import React, { FC, useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateValidationError } from '@mui/x-date-pickers/models';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Tooltip } from 'react-tooltip';
import { Info as InfoIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { bookWish } from '../store/wishes/thunks';
import { IWish } from '../models/IWish';
import { addingWhiteSpaces } from '../utils/formating-value';
import ConfirmModal from './ConfirmModal';
import Button from '../components/Button';
import stylesVariables from '../styles/utils/variables.module.scss';

dayjs.extend(isSameOrBefore);

interface IProps {
    wish: IWish;
    editWish: () => void;
    close: () => void;
}

const DetailWishModal: FC<IProps> = ({ wish, editWish, close }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [showBookModal, setShowBookModal] = useState<boolean>(false);
    const [showCancelBookModal, setShowCancelBookModal] = useState<boolean>(false);
    const [showConfirmBookModal, setShowConfirmBookModal] = useState<boolean>(false);
    const [bookEnd, setBookEnd] = useState<Dayjs | null>(null);
    const [bookEndError, setBookEndError] = useState<DateValidationError | null>(null);
    const [clickedOnBookWish, setClickedOnBookWish] = useState<boolean>(false);

    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    let show = (
        <>
            Ваше бажання бачать <span className="accent">всі</span> користувачі.
        </>
    );
    wish.show === 'friends' && (
        show = (
            <>
                Ваше бажання бачать тільки <span className="accent">друзі</span>.
            </>
        )
    );
    wish.show === 'nobody' && (
        show = (
            <>
                Ваше бажання <span className="accent">ніхто</span> не баче.
            </>
        )
    );

    let slidesPerView = 3;
    screenWidth >= 390 && (slidesPerView = 4);
    screenWidth >= 600 && (slidesPerView = 5);

    let showRow = false;
    myUser?.id === wish.userId && (showRow = true);
    wish.price && (showRow = true);

    let showCancelExecution = wish.booking
        && myUser?.id === wish.booking.userId
        && dayjs(wish.booking.start).isSameOrBefore(dayjs().add(1, 'day'));

    let showConfirmExecution = myUser?.id === wish.userId && wish.booking?.end;

    let showActions = false;
    !wish.booking?.end && (showActions = true);
    showCancelExecution && (showActions = true);
    showConfirmExecution && (showActions = true);
    myUser?.id === wish.userId && (showActions = true);

    const birthdayErrorMessage = useMemo(() => {
        if (!clickedOnBookWish) return;

        switch (bookEndError) {
            case 'disablePast': {
                return 'Неможливо виконати завдання в минулому.';
            }
            case 'maxDate': {
                return 'Вважаєте розумним обіцяти виконати бажання більш ніж через рік.';
            }
            case 'invalidDate': {
                return 'Введена дата недійсна.';
            }
            default: {
                return '';
            }
        }
    }, [clickedOnBookWish, bookEndError]);

    const handleBookWish = async () => {
        setClickedOnBookWish(true);
        if (!myUser || !bookEnd || (bookEndError && bookEndError.length > 0)) return;

        console.log('handleBookWish', bookEnd);
        await dispatch(bookWish({ userId: myUser.id, wishId: wish.id, end: bookEnd.format() }));
        close();
    };

    const handleCancelBookWish = () => {
        console.log('handleCancelBookWish');
        close();
    };

    const handleConfirmBookWish = () => {
        console.log('handleConfirmBookWish');
        close();
    };

    const handleEditWish = () => {
        editWish();
        close();
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="detail-wish-modal">
            <div className="detail-wish-outer-border">
                <div className="detail-wish-inner-border">
                    <div className="detail-wish-content">
                        <div className={"detail-wish-scroll" + (wish && wish.images.length > 1 ? " min-height" : "")}>
                            {wish && wish.images.length > 0 && (
                                <div className="detail-wish-swiper">
                                    <Swiper
                                        className="swiper-cube"
                                        style={{
                                            '--swiper-navigation-color': stylesVariables.primaryColor,
                                        }}
                                        effect={wish.images.length > 1 && 'cube'}
                                        grabCursor={true}
                                        cubeEffect={{
                                            shadow: screenWidth >= 768,
                                            slideShadows: true,
                                            shadowOffset: 20,
                                            shadowScale: 0.94,
                                        }}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        navigation={wish.images.length > 1}
                                        modules={[EffectCube, FreeMode, Navigation, Thumbs]}
                                    >
                                        {wish.images.map((image) => (
                                            <SwiperSlide key={image.id}>
                                                <img
                                                    src={image.path}
                                                    alt={`wish-${image.position}`}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {wish.images.length > 1 && (
                                        <Swiper
                                            className="swiper-nav"
                                            style={{
                                                '--swiper-navigation-color': stylesVariables.primaryColor,
                                            }}
                                            spaceBetween={8}
                                            slidesPerView={slidesPerView}
                                            watchSlidesProgress={true}
                                            navigation={true}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            onSwiper={setThumbsSwiper}
                                        >
                                            {wish.images.map((image) => (
                                                <SwiperSlide key={image.id}>
                                                    <img
                                                        src={image.path}
                                                        alt={`wish-${image.position}`}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    )}
                                </div>
                            )}

                            <div className={"detail-wish-wrap" + (wish && wish.images.length > 1 ? " with-top" : "")}>
                                <div className="detail-wish-name">
                                    {wish.name}
                                </div>

                                {showRow && (
                                    <div className="detail-wish-row">
                                        {myUser?.id === wish.userId && (
                                            <p className="detail-wish-label">{show}</p>
                                        )}

                                        {wish.price && (
                                            <div className="detail-wish-box">
                                                <span className="detail-wish-label">Ціна:</span>
                                                <span className="detail-wish-data">
                                                    {addingWhiteSpaces(wish.price)} грн.
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {wish.address && (
                                    <p className="detail-wish-description">
                                        <span className="label">Де можна придбати:</span>
                                        {wish.address}
                                    </p>
                                )}

                                {wish.description && (
                                    <p className="detail-wish-description">
                                        <span className="label">Опис:</span>
                                        {wish.description}
                                    </p>
                                )}

                                {showActions && (
                                    <div className="detail-wish-actions">
                                        {/* Book */}
                                        {!wish.booking?.end && (
                                            <>
                                                <Button
                                                    type="button"
                                                    variant="text"
                                                    onClick={() => setShowBookModal(true)}
                                                >
                                                    Виконати бажання
                                                </Button>

                                                <ConfirmModal
                                                    show={showBookModal}
                                                    confirmText="Підтвердити намір"
                                                    close={() => setShowBookModal(false)}
                                                    confirm={handleBookWish}
                                                >
                                                    <p className="text-lg">
                                                        Я маю намір виконати бажання "{wish.name}" до:
                                                    </p>

                                                    <div
                                                        className={
                                                            "date-picker"
                                                            + (clickedOnBookWish ? " clicked-on-submit" : "")
                                                        }
                                                    >
                                                        <DemoContainer components={['DatePicker']}>
                                                            <DatePicker
                                                                label="включно*"
                                                                format="DD.MM.YYYY"
                                                                value={bookEnd}
                                                                disablePast
                                                                maxDate={dayjs().add(1, 'year')} // Дозволити вибір дати тільки на рік вперед
                                                                onError={(newError) => setBookEndError(newError)}
                                                                slotProps={{
                                                                    textField: {
                                                                        helperText: birthdayErrorMessage,
                                                                    },
                                                                }}
                                                                onChange={(value) => setBookEnd(value)}
                                                            />
                                                        </DemoContainer>
                                                    </div>

                                                    <p className="text">
                                                        Після того як Ви підтвердите свій намір,
                                                        ніхто з користувачів не зможе забронювати це бажання.
                                                        У Вас буде можливість скасувати свій намір виконати бажання впродовж доби.
                                                        <span
                                                            className="tooltip detail-wish-book-tooltip"
                                                            data-tooltip-id="book-wish"
                                                            data-tooltip-content="
                                                                Декларуючи свій намір виконати бажання,
                                                                Ви берете на себе відповідальність за його виконання.
                                                                Всесвіт покладається на Вас :)
                                                                Постійна зміна рішень може погіршити Ваші відносини зі Всесвітом.
                                                                Кожне невиконане бажання буде позначене відповідним кольором на вашій аватарці.
                                                                Червона рамка та напівпрозора аватарка - три невиконаних бажання.
                                                                Червона рамка - два невиконаних бажання.
                                                                Жовта рамка - одне невиконане бажання.
                                                                Сіра рамка - жодного наміру виконати бажання.
                                                                Синя рамка - одне виконане бажання.
                                                                Зелена рамка - два і більше виконаних бажання.
                                                            "
                                                        >
                                                            <InfoIcon sx={{ color: stylesVariables.specialColor }} />
                                                        </span>
                                                    </p>

                                                    <Tooltip
                                                        id="book-wish"
                                                        opacity={1}
                                                        style={{
                                                            backgroundColor: stylesVariables.blackColor,
                                                            color: stylesVariables.lightColor,
                                                            width: screenWidth > 411 ? '300px' : '200px',
                                                            fontSize: '14px',
                                                            zIndex: 9,
                                                        }}
                                                    />
                                                </ConfirmModal>
                                            </>
                                        )}

                                        {/* Cancel */}
                                        {showCancelExecution && (
                                            <>
                                                <Button
                                                    type="button"
                                                    variant="text"
                                                    onClick={() => setShowCancelBookModal(true)}
                                                >
                                                    Скасувати виконання
                                                </Button>

                                                <ConfirmModal
                                                    show={showCancelBookModal}
                                                    confirmText="Скасувати мій намір"
                                                    close={() => setShowCancelBookModal(false)}
                                                    confirm={handleCancelBookWish}
                                                >
                                                    <p className="text-lg">
                                                        Ви впевнені,
                                                        що хочете скасувати свій намір виконати бажання "{wish.name}"?
                                                    </p>
                                                </ConfirmModal>
                                            </>
                                        )}

                                        {/* Confirm */}
                                        {showConfirmExecution && (
                                            <>
                                                <Button
                                                    type="button"
                                                    variant="text"
                                                    onClick={() => setShowConfirmBookModal(true)}
                                                >
                                                    Підтвердити виконання
                                                </Button>

                                                <ConfirmModal
                                                    show={showConfirmBookModal}
                                                    confirmText="Бажання виконано"
                                                    close={() => setShowConfirmBookModal(false)}
                                                    confirm={handleConfirmBookWish}
                                                >
                                                    <p className="text-lg">
                                                        Ви впевнені, що бажання "{wish.name}" виконано?
                                                    </p>
                                                </ConfirmModal>
                                            </>
                                        )}

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

export default DetailWishModal;
