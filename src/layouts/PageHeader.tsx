import React from 'react';
import { useAppSelector } from '@/store/hook';
import Logo from '@/components/Logo';
import Button from '@/components/Button';

const PageHeader = () => {
    const myUser = useAppSelector((state) => state.myUser);

    return (
        <div className="page-header">
            <Logo />

            {myUser.user === null && (
                <div className="actions">
                    <Button to="/auth" variant="text">Увійти</Button>
                    <Button to="/auth?register">Зареєструватись</Button>
                </div>
            )}
        </div>
    );
};

export default PageHeader;
