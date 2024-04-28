import React, { FC } from 'react';
import PageHeader from '@/layouts/PageHeader';

const Welcome: FC = () => {
    return (
        <div className="welcome-page">
            <PageHeader />

            <section className="section">
                <p className="section-text">
                    Вітаю!
                    <br />
                    Я твій особистий помічник у здійсненні бажань!
                    <br />
                    Про що ти мрієш?
                </p>

                <p className="section-text sm">
                    Ти, мабуть, знаєш, що думки матеріальні. А записані бажання виконуються набагато швидше.
                    Запиши сюди всі свої великі мрії і маленькі хотілочки.
                    Ти можеш ділитися ними зі своїми друзями або залишити їх лише для себе)
                    І найважливіше - ідучи до когось на свято не потрібно ламати голову над подарунками
                    - ти тут зможеш знайти список того чого хоче твій друг)
                </p>
            </section>
        </div>
    );
};

export default Welcome;
