import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import getMobileOperatingSystem from "@/utils/get-mobile-operating-system";
import CustomModal from "@/components/CustomModal";
import GoogleChromeIcon from "@/assets/images/instruction/google-chrome-icon.svg";
import SafariIcon from "@/assets/images/instruction/safari-icon.svg";
import OpenChromeMenuImg from "@/assets/images/instruction/app/open-chrome-menu.jpg";
import SafariShareImg from "@/assets/images/instruction/app/safari-share.jpg";
import AddAppToAndroidScreenImg from "@/assets/images/instruction/app/add-app-to-android-screen.jpg";
import AddAppToIosScreenImg from "@/assets/images/instruction/app/add-app-to-ios-screen.jpg";
import InstallImg from "@/assets/images/instruction/app/install.jpg";
import AddImg from "@/assets/images/instruction/app/add.jpg";
import AppOnAndroidScreenImg from "@/assets/images/instruction/app/app-on-android-screen.jpg";
import AppOnIosScreenImg from "@/assets/images/instruction/app/app-on-ios-screen.jpg";

const App: FC = () => {
    const { t } = useTranslation();

    const [ imageData, setImageData ] = useState<{ src: string, alt: string } | null>(null);
    const [ os, setOs ] = useState<string>('');

    const handleShowImage = (src: string, alt: string) => {
        setImageData({ src, alt });
    };

    useEffect(() => {
        const mobileOs = getMobileOperatingSystem();
        setOs(mobileOs);
    }, []);

    return (
        <div className="instruction-app">
            <div className="browser">
                <p>{ t('instruction-page.app.browser', { browser: os === 'iOS' ? 'Safari' : 'Google Chrome' }) }</p>
                <img
                    src={ os === 'iOS' ? SafariIcon : GoogleChromeIcon }
                    alt={ t('instruction-page.app.browser_icon', { icon: os === 'iOS' ? 'Safari' : 'Google Chrome' }) }
                />
            </div>

            <ul className="image-list">
                {/* menu */}
                <li className="image-item">
                    <p className="image-item-text">
                        { t(`instruction-page.app.menu.${ os }`) }
                    </p>

                    <div
                        className="image"
                        onClick={
                            () => handleShowImage(
                                os === 'iOS' ? SafariShareImg : OpenChromeMenuImg,
                                t('instruction-page.app.menu.img'),
                            )
                        }
                    >
                        <img
                            src={ os === 'iOS' ? SafariShareImg : OpenChromeMenuImg }
                            alt={ t('instruction-page.app.menu.img') }
                        />
                    </div>
                </li>

                {/* add */}
                <li className="image-item">
                    <p className="image-item-text">
                        { t(`instruction-page.app.add.${ os }`) }
                    </p>

                    <div
                        className="image"
                        onClick={
                            () => handleShowImage(
                                os === 'iOS' ? AddAppToIosScreenImg : AddAppToAndroidScreenImg,
                                t('instruction-page.app.add.img'),
                            )
                        }
                    >
                        <img
                            src={ os === 'iOS' ? AddAppToIosScreenImg : AddAppToAndroidScreenImg }
                            alt={ t('instruction-page.app.add.img') }
                        />
                    </div>
                </li>

                {/* install */}
                <li className="image-item">
                    <p className="image-item-text">
                        { t(`instruction-page.app.install.${ os }`) }
                    </p>

                    <div
                        className="image"
                        onClick={
                            () => handleShowImage(
                                os === 'iOS' ? AddImg : InstallImg,
                                t('instruction-page.app.install.img'),
                            )
                        }
                    >
                        <img
                            src={ os === 'iOS' ? AddImg : InstallImg }
                            alt={ t('instruction-page.app.install.img') }
                        />
                    </div>
                </li>

                {/* done */}
                <li className="image-item">
                    <p className="image-item-text">
                        { t('instruction-page.app.done.text') }
                    </p>

                    <div
                        className="image"
                        onClick={
                            () => handleShowImage(
                                os === 'iOS' ? AppOnIosScreenImg : AppOnAndroidScreenImg,
                                t('instruction-page.app.done.img'),
                            )
                        }
                    >
                        <img
                            src={ os === 'iOS' ? AppOnIosScreenImg : AppOnAndroidScreenImg }
                            alt={ t('instruction-page.app.done.img') }
                        />
                    </div>
                </li>
            </ul>

            <CustomModal show={ !!imageData } hide={ () => setImageData(null) } classes="modal full">
                { !!imageData && (
                    <img className="instruction-full-image" src={ imageData.src } alt={ imageData.alt } />
                ) }
            </CustomModal>
        </div>
    );
};

export default App;
