import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hook';
import Logo from '@/components/Logo';
import LanguageSelection from "@/components/LanguageSelection";
import Button from '@/components/Button';

const PageHeader = () => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser);

    return (
        <div className="page-header container">
            <div className="actions">
                <Logo />

                <LanguageSelection />
            </div>

            { myUser.user === null && (
                <div className="auth-actions">
                    <Button to="/auth" variant="text">{ t('sing-in') }</Button>
                    <Button to="/auth?register">{ t('sing-up') }</Button>
                </div>
            ) }
        </div>
    );
};

export default PageHeader;
