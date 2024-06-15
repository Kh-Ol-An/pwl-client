import React, { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useTranslation } from 'react-i18next';
import { IWish } from '@/models/IWish';
import { unencryptedData } from '@/utils/encryption-data';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    wish: IWish;
}

const WishSwiper: FC<IProps> = ({ wish }) => {
    const { t } = useTranslation();

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    let slidesPerView = 3;
    screenWidth >= 390 && (slidesPerView = 4);
    screenWidth >= 600 && (slidesPerView = 5);

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
        <div className="wish-swiper">
            <Swiper
                className="swiper-cube"
                style={{
                    '--swiper-navigation-color': StylesVariables.primaryColor,
                }}
                effect={wish.images.length > 1 && 'cube'}
                grabCursor={true}
                cubeEffect={{
                    shadow: screenWidth >= 768,
                    slideShadows: false,
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
                            src={unencryptedData(image.path, wish.show)}
                            alt={`${t('wish')} ${image.position}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {wish.images.length > 1 && (
                <Swiper
                    className="swiper-nav"
                    style={{
                        '--swiper-navigation-color': StylesVariables.primaryColor,
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
                                src={unencryptedData(image.path, wish.show)}
                                alt={`${t('wish')} ${image.position}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default WishSwiper;
