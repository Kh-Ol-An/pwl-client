import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from "@/components/Logo";
import LanguageSelection from "@/components/LanguageSelection";
import Button from "@/components/Button";
import ActionBlockGiftBigImg from "@/assets/images/welcome/action-block-gift-big.png";
import ActionBlockGiftSmallImg from "@/assets/images/welcome/action-block-gift-small.png";

const Welcome: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="welcome-page">
            <section className="cover">
                <div className="container">
                    <div className="head">
                        <Logo />

                        <div className="actions">
                            <LanguageSelection/>

                            <div className="auth-actions">
                                <Button to="/auth" variant="text">{t('sing-in')}</Button>
                                <Button to="/auth?register">{t('sing-up')}</Button>
                            </div>
                        </div>
                    </div>

                    <div className="cover-content">
                        <div className="text-block">
                            <h1>{t('welcome.solve_the_problem')}</h1>

                            <p>{t('welcome.unique_platform')}</p>
                        </div>

                        <div className="cover-figure"></div>

                        <div className="action-block">
                            <h3>{t('welcome.special_celebrations')}</h3>

                            <p>{t('welcome.create_wish_lists')}</p>

                            <Button to="/auth?register">{t('sing-up')}</Button>

                            <img className="action-block_gift-big" src={ActionBlockGiftBigImg} alt="bigger gift"/>

                            <img className="action-block_gift-small" src={ActionBlockGiftSmallImg} alt="smaller gift"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Welcome;
