import React, { FC } from 'react';
import Button from '@/components/Button';
import Logo from '@/components/Logo';

const Welcome: FC = () => {
    return (
        <div className="welcome-page">
            <div className="welcome-page-header">
                <Logo />

                <div className="actions">
                    <Button to="/auth" variant="text">Увійти</Button>
                    <Button to="/auth?register">Зареєструватись</Button>
                </div>
            </div>

            <div className="cover">
                <div className="cover-content">
                    <p className="cover-text">
                        Вітаю! Моє ім’я Олег. Цей застосунок створено для тебе.
                    </p>
                    <p className="cover-text">
                        <span>У тебе є бажання?</span>
                        <span>Про що ти мрієш?</span>
                        <span>Брендовий одяг?</span>
                        <span>Дорога та потужна техніка?</span>
                        <span>Люксові автівки?</span>
                        <span>Подорожі в різні кутки планети?</span>
                    </p>
                </div>

                <div className="cover-img">
                    <div className="linear-gradient top"></div>
                    <div className="linear-gradient right"></div>
                    <div className="linear-gradient bottom"></div>
                    <div className="linear-gradient left"></div>
                    <div className="image"></div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
