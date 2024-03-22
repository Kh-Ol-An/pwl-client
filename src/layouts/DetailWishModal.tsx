import React, { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useAppSelector } from '../store/hook';
import { IWish } from '../models/IWish';
import { addingWhiteSpaces } from '../utils/formating-value';
import Button from '../components/Button';
import stylesVariables from '../styles/utils/variables.module.scss';

interface IProps {
    wish?: IWish;
    editWish: () => void;
    close: () => void;
}

const DetailWishModal: FC<IProps> = ({ wish, editWish, close }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    const myUser = useAppSelector((state) => state.myUser.user);

    let show = (
        <>
            Ваше бажання бачать <span className="accent">всі</span> користувачі.
        </>
    );
    wish?.show === 'friends' && (
        show = (
            <>
                Ваше бажання бачать тільки <span className="accent">друзі</span>.
            </>
        )
    );
    wish?.show === 'nobody' && (
        show = (
            <>
                Ваше бажання <span className="accent">ніхто</span> не баче.
            </>
        )
    );

    let slidesPerView = 3;
    screenWidth >= 390 && (slidesPerView = 4);
    screenWidth >= 600 && (slidesPerView = 5);

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
                                    {wish?.name}
                                </div>

                                <div className="detail-wish-row">
                                    {myUser?.id === wish?.user && (
                                        <p className="detail-wish-label">{show}</p>
                                    )}

                                    {wish?.price && (
                                        <div className="detail-wish-box">
                                            <span className="detail-wish-label">Ціна:</span>
                                            <span className="detail-wish-data">{addingWhiteSpaces(wish?.price)} грн.</span>
                                        </div>
                                    )}
                                </div>

                                {wish?.address && (
                                    <p className="detail-wish-description">
                                        <span className="label">Де можна придбати:</span>
                                        {wish?.address}
                                    </p>
                                )}

                                {wish?.description && (
                                    <p className="detail-wish-description">
                                        <span className="label">Опис:</span>
                                        {wish?.description}
                                    </p>
                                )}

                                {myUser?.id === wish?.user && (
                                    <div className="detail-wish-action">
                                        <Button type="button" onClick={handleEditWish}>
                                            Редагувати бажання
                                        </Button>
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
