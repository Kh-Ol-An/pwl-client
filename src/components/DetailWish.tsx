import React, { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { EffectCube, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Button from './Button';
import { IWish } from '../models/IWish';
import { addingWhiteSpaces } from '../utils/formating-value';
import stylesVariables from '../styles/utils/variables.module.scss';

interface IProps {
    wish?: IWish;
    editWish: () => void;
    close: () => void;
}

const WishCard: FC<IProps> = ({ wish, editWish, close }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

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

    const handleEditWish = () => {
        editWish();
        close();
    };

    // TODO: Add a link of the wish
    return (
        <div className="detail-wish">
            <div className="detail-wish-outer-border">
                <div className="detail-wish-inner-border">
                    <div className={"detail-wish-content" + (wish && wish.images.length > 0 ? " min-height" : "")}>
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
                                        shadow: true,
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
                                        slidesPerView={5}
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

                        <div className="detail-wish-wrap">
                            <div className="detail-wish-name">
                                {wish?.name}
                            </div>

                            <div className="detail-wish-row">
                                {wish?.price && (
                                    <div className="detail-wish-box">
                                        <span className="detail-wish-label">Ціна:</span>
                                        <span className="detail-wish-data">{addingWhiteSpaces(wish?.price)} грн.</span>
                                    </div>
                                )}

                                <p className="detail-wish-label">{show}</p>
                            </div>

                            {wish?.description && (
                                <p className="detail-wish-description">
                                    <span className="label">Опис:</span>
                                    {wish?.description}
                                </p>
                            )}

                            <div className="detail-wish-action">
                                <Button type="button" onClick={handleEditWish}>
                                    Редагувати бажання
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishCard;
