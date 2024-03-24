import React, { FC } from 'react';
import Logo from '../components/Logo';
import Button from '../components/Button';

const NotFound: FC = () => {
    return (
        <div className="page not-found-page">
            <div className="bg-img">
                <Logo />

                <div className="content">
                    <h1 className="title">Сторінку не знайдено</h1>
                    <h2 className="sub-title">404</h2>
                    <p className="text">Ой! Сторінки, яку ви шукали, не існує.</p>
                    <p className="sub-text">Можливо, ви неправильно ввели адресу сторінки.</p>
                    <br />
                    <Button to="/">На головну</Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
