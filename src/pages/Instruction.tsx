import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from "@/store/hook";
import PageHeader from '@/layouts/PageHeader';
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
    const myUser = useAppSelector((state) => state.myUser);

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    const { t } = useTranslation();

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
        <div className="instruction-page">
            <PageHeader />

            <section className={"container" + (myUser.user === null ? " logged-out" : "")}>
                <h1>{t('instruction.title')}</h1>

                <h2>{t('instruction.auth.title')}</h2>

                <p>{t('instruction.auth.intro')}</p>

                <ol className="numbered-list">
                    <li className="numbered-item">
                        <ul className="image-list">
                            <li className="image-item">
                                <p className="image-item-text">
                                    <span className="marker">1</span>
                                    {t('instruction.auth.google.text-1')}
                                    <br />
                                    {t('instruction.auth.google.text-2')}
                                    <br />
                                    {t('instruction.auth.google.text-3')}
                                </p>

                                <div className="image">
                                    <img
                                        src={screenWidth < 768 ? LoginWithGoogleMobileImg : LoginWithGoogleImg}
                                        alt={t('instruction.auth.google.img')}
                                    />
                                </div>
                            </li>

                            <li className="image-item">
                                <p className="image-item-text">
                                    {t('instruction.auth.account.text')}
                                </p>

                                <div className="image">
                                    <img
                                        src={screenWidth < 768 ? ChooseGoogleAccountMobileImg : ChooseGoogleAccountImg}
                                        alt={t('instruction.auth.account.img')}
                                    />
                                </div>
                            </li>

                            <li className="image-item double">
                                <p className="image-item-text">
                                    {t('instruction.auth.data.text')}
                                </p>

                                <div className="image-box">
                                    <div className="image first">
                                        <img
                                            src={
                                                screenWidth < 768
                                                    ? EnterYourAccountNameMobileImg
                                                    : EnterYourAccountNameImg
                                            }
                                            alt={t('instruction.auth.data.account-img')}
                                        />
                                    </div>
                                    <div className="image second">
                                        <img
                                            src={screenWidth < 768 ? EnterYourPasswordMobileImg : EnterYourPasswordImg}
                                            alt={t('instruction.auth.data.password-img')}
                                        />
                                    </div>
                                </div>
                            </li>

                            <li className="image-item">
                                <p className="image-item-text">
                                    {t('instruction.auth.logged.text')}
                                </p>

                                <div className="image">
                                    <img
                                        src={screenWidth < 768 ? LoggedToWishHubMobileImg : LoggedToWishHubImg}
                                        alt={t('instruction.auth.logged.img')}
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
                                    {t('instruction.auth.sing-up.text-1')}
                                    <br />
                                    {t('instruction.auth.sing-up.text-2')}
                                </p>

                                <div className="image">
                                    <img
                                        src={screenWidth < 768 ? SingUpMobileImg : SingUpImg}
                                        alt={t('instruction.auth.sing-up.img')}
                                    />
                                </div>
                            </li>

                            <li className="image-item">
                                <p className="image-item-text">
                                    {t('instruction.auth.activation.text-1')}
                                    <br />
                                    {t('instruction.auth.activation.text-2')}
                                </p>

                                <div className="image">
                                    <img
                                        src={screenWidth < 768 ? ActivationAccountMobileImg : ActivationAccountImg}
                                        alt={t('instruction.auth.activation.img')}
                                    />
                                </div>
                            </li>
                        </ul>
                    </li>
                </ol>

                <div className="divider"></div>

                <h2>{t('instruction.next.title')}</h2>

                <p>
                    {t('instruction.next.text')}
                </p>
            </section>
        </div>
    );
};

export default Instruction;
