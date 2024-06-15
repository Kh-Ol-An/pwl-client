import React, { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useTranslation } from "react-i18next";
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import getMobileOperatingSystem from "@/utils/get-mobile-operating-system";
import Button from '@/components/Button';
import OpenChromeMenuImg from "@/assets/images/instruction/app/open-chrome-menu.jpg";
import SafariShareImg from "@/assets/images/instruction/app/safari-share.jpg";
import AddAppToAndroidScreenImg from "@/assets/images/instruction/app/add-app-to-android-screen.jpg";
import AddAppToIosScreenImg from "@/assets/images/instruction/app/add-app-to-ios-screen.jpg";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { changeShowedInfo } from "@/store/my-user/thunks";

const InstallAppInstruction: FC = () => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const [ os, setOs ] = useState<string>('');

    const handleHid = () => {
        console.log('handleHid');
        if (!myUser) return;
        dispatch(changeShowedInfo({ userId: myUser.id }))
    };

    useEffect(() => {
        const mobileOs = getMobileOperatingSystem();
        setOs(mobileOs);
    }, []);

    return (
        <div className="install-app-instruction">
            <Swiper
                className="swiper-cube"
                effect="creative"
                grabCursor={true}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ['100%', 0, 120],
                    },
                }}
                pagination={true}
                modules={[EffectCreative, Pagination, FreeMode]}
            >
                <SwiperSlide>
                    <h2 className="install-app-instruction_title">{ t('instruction-page.app.second-title') }</h2>
                    <div className="install-app-instruction_img">
                        <img
                            src={ os === 'iOS' ? SafariShareImg : OpenChromeMenuImg }
                            alt={ t('instruction-page.app.menu.img') }
                        />

                        <SwipeLeftIcon />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="install-app-instruction_img">
                        <img
                            src={ os === 'iOS' ? AddAppToIosScreenImg : AddAppToAndroidScreenImg }
                            alt={ t('instruction-page.app.menu.img') }
                        />
                    </div>
                </SwiperSlide>
            </Swiper>

            <Button variant="text" color="primary-color" type="button" onClick={handleHid}>
                {t('instruction-page.app.not_again')}
            </Button>
        </div>
    );
};

export default InstallAppInstruction;
