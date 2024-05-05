import React from 'react';
import { useAppSelector } from '@/store/hook';
import Logo from '@/components/Logo';
import LanguageSelection from "@/components/LanguageSelection";
import Button from '@/components/Button';

const PageHeader = () => {
    const myUser = useAppSelector((state) => state.myUser);

    return (
        <div className="page-header">
            <div className="actions">
                <Logo />

                <LanguageSelection />
            </div>

            {myUser.user === null && (
                <div className="auth-actions">
                    <Button to="/auth" variant="text">Увійти</Button>
                    <Button to="/auth?register">Зареєструватись</Button>
                </div>
            )}
        </div>
    );
};

export default PageHeader;
