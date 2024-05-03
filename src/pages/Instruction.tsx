import React, { FC, useState, useEffect } from 'react';
import PageHeader from '@/layouts/PageHeader';
import LoginWithGoogleMobileImg from '@/assets/images/instruction/login-with-google-mobile.jpg';
import LoginWithGoogleImg from '@/assets/images/instruction/login-with-google.png';
import ChooseGoogleAccountMobileImg from '@/assets/images/instruction/choose-google-account-mobile.jpg';
import ChooseGoogleAccountImg from '@/assets/images/instruction/choose-google-account.png';
import EnterYourAccountNameMobileImg from '@/assets/images/instruction/enter-your-account-name-mobile.jpg';
import EnterYourAccountNameImg from '@/assets/images/instruction/enter-your-account-name.png';
import EnterYourPasswordMobileImg from '@/assets/images/instruction/enter-your-password-mobile.jpg';
import EnterYourPasswordImg from '@/assets/images/instruction/enter-your-password.png';
import EnteredToWishHubMobileImg from '@/assets/images/instruction/entered-to-wish-hub-mobile.jpg';
import EnteredToWishHubImg from '@/assets/images/instruction/entered-to-wish-hub.png';
import SingUpMobileImg from '@/assets/images/instruction/sing-up-mobile.jpg';
import SingUpImg from '@/assets/images/instruction/sing-up.png';
import ActivationAccountMobileImg from '@/assets/images/instruction/activation-account-mobile.jpg';
import ActivationAccountImg from '@/assets/images/instruction/activation-account.png';

const Instruction: FC = () => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="instruction-page">
            <PageHeader />

            <section className="container">
                <h1>Інструкція</h1>

                <h2>Вхід</h2>

                <p>Є кілька способів увійти або зареєструватись:</p>

                <ol className="numbered-list">
                    <li className="numbered-item">
                        <ul className="image-list">
                            <li className="image-item">
                                <p className="image-item-text">
                                    <span className="marker">1</span>
                                    Найпростіший за допомогою Google сервісу.
                                    <br />
                                    Спочатку потрібно погодитись з умовами.
                                    <br />
                                    Далі активувати відповідну кнопку Google.
                                </p>

                                <div className="image">
                                    <img
                                        src={screenWidth < 768 ? LoginWithGoogleMobileImg : LoginWithGoogleImg}
                                        alt="Вхід за допомогою Google сервісу"
                                    />
                                </div>
                            </li>

                            <li className="image-item">
                                <p className="image-item-text">
                                    У Вас вже має бути Google аккаунт. Якщо Ви авторизовані на своєму пристрої,
                                    то просто обираєте акаунт який Ви бажаєте використовувати у Wish Hub.
                                </p>

                                <div className="image">
                                    <img
                                        src={screenWidth < 768 ? ChooseGoogleAccountMobileImg : ChooseGoogleAccountImg}
                                        alt="Вибір Google аккаунту"
                                    />
                                </div>
                            </li>

                            <li className="image-item double">
                                <p className="image-item-text">
                                    Якщо Ви ще не авторизовані в пошті gmail на своєму пристрої,
                                    введіть свої дані у відповідні поля.
                                </p>

                                <div className="image-box">
                                    <div className="image first">
                                        <img
                                            src={
                                                screenWidth < 768
                                                    ? EnterYourAccountNameMobileImg
                                                    : EnterYourAccountNameImg
                                            }
                                            alt="Введіть свій аккаунт"
                                        />
                                    </div>
                                    <div className="image second">
                                        <img
                                            src={screenWidth < 768 ? EnterYourPasswordMobileImg : EnterYourPasswordImg}
                                            alt="Введіть свій пароль"
                                        />
                                    </div>
                                </div>
                            </li>

                            <li className="image-item">
                                <p className="image-item-text">
                                    Далі програма зробить все за Вас. Якщо Ви вже реєструвались, Ви просто увійдете до
                                    свого акаунта. Якщо ще ні, Ви будете автоматично зареєстровані.
                                </p>

                                <div className="image">
                                    <img
                                        src={screenWidth < 768 ? EnteredToWishHubMobileImg : EnteredToWishHubImg}
                                        alt="Увійшов до Wish Hub"
                                    />
                                </div>
                            </li>
                        </ul>
                    </li>

                    <li className="numbered-item">
                        <ul className="image-list">
                            <li className="image-item">
                                <p className="image-item-text">
                                    <span className="marker">2</span>
                                    Якщо Ви не бажаєте використовувати Google аккаунт або у Вас його немає,
                                    потрібно буде пройти верифікацію у веб додатку Wish Hub.
                                    <br />
                                    Заповніть всі поля і погодьтесь з умовами використання.
                                </p>

                                <div className="image">
                                    <img
                                        src={screenWidth < 768 ? SingUpMobileImg : SingUpImg}
                                        alt="Реєстрація"
                                    />
                                </div>
                            </li>

                            <li className="image-item">
                                <p className="image-item-text">
                                    Тепер перейдіть до своєї пошти, знайдіть відповідний лист. Якщо листа ніде немає,
                                    перевірте папку спам. Ми не використовуємо безконтрольну розсилку.
                                    Просто роботи кожного поштового сервісу по різному налаштовані й наш лист
                                    випадково може потрапити до папки спам.
                                    <br />
                                    В листі натискаєте на відповідну кнопку, або ж скопіюйте посилання,
                                    та вставте в адресну строфу браузера.
                                </p>

                                <div className="image">
                                    <img
                                        src={screenWidth < 768 ? ActivationAccountMobileImg : ActivationAccountImg}
                                        alt="Активація акаунта"
                                    />
                                </div>
                            </li>
                        </ul>
                    </li>
                </ol>

                <div className="divider"></div>

                <h2>Налаштування профілю</h2>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                </p>
            </section>
        </div>
    );
};

export default Instruction;
