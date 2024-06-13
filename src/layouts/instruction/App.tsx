import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import getMobileOperatingSystem from "@/utils/get-mobile-operating-system";
import CustomModal from "@/components/CustomModal";
import GoogleChromeIcon from "@/assets/images/instruction/google-chrome-icon.svg";
import SafariIcon from "@/assets/images/instruction/safari-icon.svg";

const App: FC = () => {
    const { t } = useTranslation();

    const [imageData, setImageData] = useState<{ src: string, alt: string } | null>(null);
    const [os, setOs] = useState<string>('');

    const handleShowImage = (src: string, alt: string) => {
        setImageData({ src, alt });
    };

    useEffect(() => {
        const mobileOs = getMobileOperatingSystem();
        setOs(mobileOs);
    }, []);

    return (
        <>
            <div className="instruction-app_browser">
                <p>{ t('instruction-page.app.browser', { browser: os === 'iOS' ? 'Safari' : 'Google Chrome' }) }</p>
                <img
                    src={ os === 'iOS' ? SafariIcon : GoogleChromeIcon }
                    alt={ t('instruction-page.app.browser_icon', { icon: os === 'iOS' ? 'Safari' : 'Google Chrome' }) }
                />
            </div>

            <CustomModal show={ !!imageData } hide={ () => setImageData(null)} classes="modal full">
                {!!imageData && (
                    <img className="instruction-full-image" src={imageData.src} alt={imageData.alt} />
                )}
            </CustomModal>
        </>
    );
};

export default App;
