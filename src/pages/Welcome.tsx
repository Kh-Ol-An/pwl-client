//import React, { FC } from 'react';
//import Button from '@/components/Button';
//import Logo from '@/components/Logo';
//
//const Welcome: FC = () => {
//    return (
//        <div className="welcome-page">
//            <div className="welcome-page-header">
//                <Logo />
//
//                <div className="actions">
//                    <Button to="/auth" variant="text">Увійти</Button>
//                    <Button to="/auth?register">Зареєструватись</Button>
//                </div>
//            </div>
//
//            <section className="cover">
//                <div className="info-content">
//                    <p className="cover-text">
//                        Вітаю! Моє ім’я Олег. Цей застосунок створено для тебе.
//                    </p>
//                    <p className="cover-text">
//                        <span>У тебе є бажання?</span>
//                        <span>Про що ти мрієш?</span>
//                        <span>
//                            Чи не було б чудово мати особистого помічника у збиранні та втіленні всіх своїх мрій?
//                        </span>
//                        <span>Дорога та потужна техніка?</span>
//                        <span>Люксові автівки?</span>
//                        <span>Подорожі в різні кутки планети?</span>
//                    </p>
//                </div>
//
//                <div className="bg-img cover">
//                    <div className="linear-gradient top"></div>
//                    <div className="linear-gradient right"></div>
//                    <div className="linear-gradient bottom"></div>
//                    <div className="linear-gradient left"></div>
//
//                    <div className="img"></div>
//                </div>
//            </section>
//
//            <section className="info">
//                <p className="info-text">
//                    Напевно, ні для кого не секрет, що головною рушійною силою виконання бажань є думки.
//                    А задокументоване бажання виконується в кілька раз швидше. Цей застосунок допоможе тобі в цьому.
//                    Він цілком присвячений твоїм бажанням. Створені бажання ти можеш показувати тільки своїм друзям,
//                    всім користувачам або ж нікому. І найголовніше.
//                    Ідучи до когось на свято більше не потрібно випитувати "Що тобі подарувати?".
//                    Просто поділись посиланням та попроси додати кілька бажань.
//                </p>
//            </section>
//
//            <section className="end">
//                <div className="bg-img end">
//                    <div className="linear-gradient top"></div>
//                    <div className="linear-gradient right"></div>
//                    <div className="linear-gradient bottom"></div>
//                    <div className="linear-gradient left"></div>
//
//                    <div className="img"></div>
//                </div>
//
//                <div className="info-content">
//                    <p className="info-text">
//                        Напевно, ні для кого не секрет, що головною рушійною силою виконання бажань є думки.
//                        А задокументоване бажання виконується в кілька раз швидше. Цей застосунок допоможе тобі в цьому.
//                        Він цілком присвячений твоїм бажанням. Створені бажання ти можеш показувати тільки своїм друзям,
//                        всім користувачам або ж нікому. І найголовніше.
//                        Ідучи до когось на свято більше не потрібно випитувати "Що тобі подарувати?".
//                        Просто поділись посиланням та попроси додати кілька бажань.
//                    </p>
//                </div>
//            </section>
//        </div>
//    );
//};
//
//export default Welcome;

//******************************************

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

            <section className="section">
                <div className="info-content">
                    <p className="section-text">
                        Вітаю! Моє ім’я Олег. Цей застосунок створено для тебе.
                    </p>
                    <p className="section-text">
                        <span>У тебе є бажання? Про що ти мрієш?</span>
                        <span>
                            Чи не було б чудово мати особистого помічника у збиранні та втіленні всіх своїх мрій?
                        </span>
                    </p>
                </div>

                <div className="bg-img">
                    <div className="shadow bottom"></div>

                    <div className="img"></div>
                </div>
            </section>

            <section className="section">
                <div className="bg-img">
                    <div className="shadow top"></div>
                    <div className="shadow bottom"></div>

                    <div className="img second"></div>
                </div>

                <div className="info-content">
                    <p className="section-text sm">
                        Напевно, ні для кого не секрет, що головною рушійною силою виконання бажань є думки.
                        А задокументоване бажання виконується в кілька раз швидше. Цей застосунок допоможе тобі в цьому.
                        Він цілком присвячений твоїм бажанням. Створені бажання ти можеш показувати тільки своїм друзям,
                        всім користувачам або ж нікому. І найголовніше.
                        Ідучи до когось на свято більше не потрібно випитувати "Що тобі подарувати?".
                        Просто поділись посиланням та попроси додати кілька бажань.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Welcome;

