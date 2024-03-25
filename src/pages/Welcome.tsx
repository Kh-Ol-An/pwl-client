import React, { FC } from 'react';
import Button from '../components/Button';
import Logo from '../components/Logo';

const Welcome: FC = () => {
    return (
        <div className="welcome-page">
            <div className="welcome-page-header">
                <Logo />

                <div className="actions">
                    <Button to="/auth" variant="text">Увійти</Button>
                    <Button to="/auth">Зареєструватись</Button>
                </div>
            </div>
            <h1 className="title">Welcome test</h1>
        </div>
    );
};

export default Welcome;
