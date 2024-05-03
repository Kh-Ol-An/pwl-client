import React from 'react';
import i18next from 'i18next';
import { useAppSelector } from '@/store/hook';
import Logo from '@/components/Logo';
import Button from '@/components/Button';

const PageHeader = () => {
    const myUser = useAppSelector((state) => state.myUser);

    return (
        <div className="page-header">
            <Logo />

            <div className="actions">
                <div className="actions">
                    <Button
                        variant="text"
                        disabled={i18next.language === 'uk'}
                        onClick={() => i18next.changeLanguage('uk')}
                    >
                        Українська
                    </Button>
                    <Button
                        variant="text"
                        disabled={i18next.language === 'en'}
                        onClick={() => i18next.changeLanguage('en')}
                    >
                        English
                    </Button>
                </div>

                {myUser.user === null && (
                    <div className="actions">
                        <Button to="/auth" variant="text">Увійти</Button>
                        <Button to="/auth?register">Зареєструватись</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
