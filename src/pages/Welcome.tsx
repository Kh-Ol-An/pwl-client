import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/layouts/PageHeader';

const Welcome: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="welcome-page">
            <PageHeader />

            <section className="section">
                <p className="section-text">
                    {t('welcome.intro')}
                    <br />
                    {t('welcome.statement')}
                    <br />
                    {t('welcome.question')}
                </p>

                <p className="section-text sm">
                    {t('welcome.text')}
                </p>
            </section>
        </div>
    );
};

export default Welcome;
