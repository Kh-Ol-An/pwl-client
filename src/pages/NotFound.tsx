import React, { FC } from 'react';
import Button from '../components/Button';

const NotFound: FC = () => {
    return (
        <div className="page not-found-page">
            <h1 className="title">Сторінку не знайдено</h1>
            <h2 className="sub-title">404</h2>
            <p className="text">Ой! Сторінки, яку ви шукали, не існує.</p>
            <p className="sub-text">Можливо, ви неправильно ввели адресу сторінки.</p>
            <br />
            <Button to="/">На головну</Button>
        </div>
    );
};

export default NotFound;
