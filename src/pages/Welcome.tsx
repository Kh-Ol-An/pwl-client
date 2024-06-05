import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from "@/components/Logo";
import LanguageSelection from "@/components/LanguageSelection";
import Button from "@/components/Button";

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

                    <p className="section-text">
                        {t('welcome.solve_the_problem')}
                        <br/>
                        {t('welcome.statement')}
                        <br />
                        {t('welcome.question')}
                    </p>

                    <p className="section-text sm">
                        {t('welcome.text')}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Welcome;
