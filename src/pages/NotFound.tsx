import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import LanguageSelection from "@/components/LanguageSelection";

const NotFound: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="page not-found-page">
            <div className="bg-img">
                <div className="not-found-page-header">
                    <Logo />

                    <LanguageSelection />
                </div>

                <div className="content">
                    <h1 className="title">{ t('not-found-page.title') }</h1>
                    <h2 className="sub-title">404</h2>
                    <p className="text">{ t('not-found-page.text') }</p>
                    <p className="sub-text">{ t('not-found-page.sub-text') }</p>
                    <br />
                    <Button to="/">{ t('not-found-page.to-main') }</Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
