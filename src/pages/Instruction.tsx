import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from "@/store/hook";
import getMobileOperatingSystem from "@/utils/get-mobile-operating-system";
import PageHeader from '@/layouts/PageHeader';
import CustomAccordion from '@/components/CustomAccordion';
import CustomModal from '@/components/CustomModal';
import LoginWithGoogleMobileImg from '@/assets/images/instruction/login-with-google-mobile.jpg';
import LoginWithGoogleImg from '@/assets/images/instruction/login-with-google.png';
import ChooseGoogleAccountMobileImg from '@/assets/images/instruction/choose-google-account-mobile.jpg';
import ChooseGoogleAccountImg from '@/assets/images/instruction/choose-google-account.png';
import EnterYourAccountNameMobileImg from '@/assets/images/instruction/enter-your-account-name-mobile.jpg';
import EnterYourAccountNameImg from '@/assets/images/instruction/enter-your-account-name.png';
import EnterYourPasswordMobileImg from '@/assets/images/instruction/enter-your-password-mobile.jpg';
import EnterYourPasswordImg from '@/assets/images/instruction/enter-your-password.png';
import LoggedToWishHubMobileImg from '@/assets/images/instruction/logged-to-wish-hub-mobile.jpg';
import LoggedToWishHubImg from '@/assets/images/instruction/logged-to-wish-hub.png';
import SingUpMobileImg from '@/assets/images/instruction/sing-up-mobile.jpg';
import SingUpImg from '@/assets/images/instruction/sing-up.png';
import ActivationAccountMobileImg from '@/assets/images/instruction/activation-account-mobile.jpg';
import ActivationAccountImg from '@/assets/images/instruction/activation-account.png';

const Instruction: FC = () => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser);

    const [imageData, setImageData] = useState<{ src: string, alt: string } | null>(null);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [os, setOs] = useState<string>('');

    const handleShowImage = (src: string, alt: string) => {
        setImageData({ src, alt });
    };

    useEffect(() => {
        const mobileOs = getMobileOperatingSystem();
        setOs(mobileOs);

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="instruction-page">
            <div className="container">
                <PageHeader />
            </div>

            <section className={"container" + (myUser.user === null ? " logged-out" : "")}>
                <h1>{t('instruction-page.title')}</h1>

                <div>
                    <CustomAccordion
                        ariaControls="app-content"
                        titleId="app-header"
                        title={t('instruction-page.app.title')}
                        contentId="app-content"
                    >
                        <p>
                            Your OS: {os}
                        </p>
                    </CustomAccordion>

                    <CustomAccordion
                        ariaControls="auth-content"
                        titleId="auth-header"
                        title={t('instruction-page.auth.title')}
                        contentId="auth-content"
                    >
                        <p>{t('instruction-page.auth.intro')}</p>

                        <ol className="numbered-list">
                            <li className="numbered-item">
                                <ul className="image-list">
                                    <li className="image-item">
                                        <p className="image-item-text">
                                            <span className="marker">1</span>
                                            {t('instruction-page.auth.google.text-1')}
                                            <br />
                                            {t('instruction-page.auth.google.text-2')}
                                            <br />
                                            {t('instruction-page.auth.google.text-3')}
                                        </p>

                                        <div
                                            className="image"
                                            onClick={
                                                () =>
                                                    handleShowImage(
                                                        screenWidth < 768
                                                            ? LoginWithGoogleMobileImg
                                                            : LoginWithGoogleImg,
                                                        t('instruction-page.auth.google.img'),
                                                    )
                                            }
                                        >
                                            <img
                                                src={screenWidth < 768 ? LoginWithGoogleMobileImg : LoginWithGoogleImg}
                                                alt={t('instruction-page.auth.google.img')}
                                            />
                                        </div>
                                    </li>

                                    <li className="image-item">
                                        <p className="image-item-text">
                                            {t('instruction-page.auth.account.text')}
                                        </p>

                                        <div
                                            className="image"
                                            onClick={
                                                () =>
                                                    handleShowImage(
                                                        screenWidth < 768
                                                            ? ChooseGoogleAccountMobileImg
                                                            : ChooseGoogleAccountImg,
                                                        t('instruction-page.auth.account.img'),
                                                    )
                                            }
                                        >
                                            <img
                                                src={screenWidth < 768
                                                    ? ChooseGoogleAccountMobileImg
                                                    : ChooseGoogleAccountImg}
                                                alt={t('instruction-page.auth.account.img')}
                                            />
                                        </div>
                                    </li>

                                    <li className="image-item double">
                                        <p className="image-item-text">
                                            {t('instruction-page.auth.data.text')}
                                        </p>

                                        <div className="image-box">
                                            <div
                                                className="image first"
                                                onClick={
                                                    () =>
                                                        handleShowImage(
                                                            screenWidth < 768
                                                                ? EnterYourAccountNameMobileImg
                                                                : EnterYourAccountNameImg,
                                                            t('instruction-page.auth.data.account-img'),
                                                        )
                                                }
                                            >
                                                <img
                                                    src={
                                                        screenWidth < 768
                                                            ? EnterYourAccountNameMobileImg
                                                            : EnterYourAccountNameImg
                                                    }
                                                    alt={t('instruction-page.auth.data.account-img')}
                                                />
                                            </div>
                                            <div
                                                className="image second"
                                                onClick={
                                                    () =>
                                                        handleShowImage(
                                                            screenWidth < 768
                                                                ? EnterYourPasswordMobileImg
                                                                : EnterYourPasswordImg,
                                                            t('instruction-page.auth.data.password-img'),
                                                        )
                                                }
                                            >
                                                <img
                                                    src={screenWidth < 768
                                                        ? EnterYourPasswordMobileImg
                                                        : EnterYourPasswordImg}
                                                    alt={t('instruction-page.auth.data.password-img')}
                                                />
                                            </div>
                                        </div>
                                    </li>

                                    <li className="image-item">
                                        <p className="image-item-text">
                                            {t('instruction-page.auth.logged.text')}
                                        </p>

                                        <div
                                            className="image"
                                            onClick={
                                                () =>
                                                    handleShowImage(
                                                        screenWidth < 768
                                                            ? LoggedToWishHubMobileImg
                                                            : LoggedToWishHubImg,
                                                        t('instruction-page.auth.logged.img'),
                                                    )
                                            }
                                        >
                                            <img
                                                src={screenWidth < 768 ? LoggedToWishHubMobileImg : LoggedToWishHubImg}
                                                alt={t('instruction-page.auth.logged.img')}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </li>

                            <li className="numbered-item">
                                <ul className="image-list">
                                    <li className="image-item">
                                        <p className="image-item-text">
                                            <span className="marker">2</span>
                                            {t('instruction-page.auth.sing-up.text-1')}
                                            <br />
                                            {t('instruction-page.auth.sing-up.text-2')}
                                        </p>

                                        <div
                                            className="image"
                                            onClick={
                                                () =>
                                                    handleShowImage(
                                                        screenWidth < 768 ? SingUpMobileImg : SingUpImg,
                                                        t('instruction-page.auth.sing-up.img'),
                                                    )
                                            }
                                        >
                                            <img
                                                src={screenWidth < 768 ? SingUpMobileImg : SingUpImg}
                                                alt={t('instruction-page.auth.sing-up.img')}
                                            />
                                        </div>
                                    </li>

                                    <li className="image-item">
                                        <p className="image-item-text">
                                            {t('instruction-page.auth.activation.text-1')}
                                            <br />
                                            {t('instruction-page.auth.activation.text-2')}
                                        </p>

                                        <div
                                            className="image"
                                            onClick={
                                                () =>
                                                    handleShowImage(
                                                        screenWidth < 768
                                                            ? ActivationAccountMobileImg
                                                            : ActivationAccountImg,
                                                        t('instruction-page.auth.activation.img'),
                                                    )
                                            }
                                        >
                                            <img
                                                src={screenWidth < 768
                                                    ? ActivationAccountMobileImg
                                                    : ActivationAccountImg}
                                                alt={t('instruction-page.auth.activation.img')}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </CustomAccordion>

                    <CustomAccordion
                        ariaControls="next-content"
                        titleId="next-header"
                        title={t('instruction-page.next.title')}
                        contentId="next-content"
                    >
                        <p>
                            {t('instruction-page.next.text')}
                        </p>
                    </CustomAccordion>
                </div>
            </section>

            <CustomModal show={!!imageData} hide={() => setImageData(null)} classes="modal full">
                {!!imageData && (
                    <img className="instruction-full-image" src={imageData.src} alt={imageData.alt} />
                )}
            </CustomModal>
        </div>
    );
};

export default Instruction;
