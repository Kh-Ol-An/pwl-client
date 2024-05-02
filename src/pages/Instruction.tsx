import React, { FC } from 'react';
import PageHeader from '@/layouts/PageHeader';
import LoginWithGoogleImg from '@/assets/images/login-with-google.png';
import ChooseGoogleAccountImg from '@/assets/images/choose-google-account.png';
import EnterYourAccountNameImg from '@/assets/images/enter-your-account-name.png';
import EnterYourPasswordImg from '@/assets/images/enter-your-password.png';
import EnteredToWishHubImg from '@/assets/images/entered-to-wish-hub.png';
import SingUpImg from '@/assets/images/sing-up.png';
import ActivationAccountImg from '@/assets/images/activation-account.png';

const Instruction: FC = () => {
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
                                    Найпростіший за допомогою Google сервісу.
                                    <br />
                                    Спочатку потрібно погодитись з умовами.
                                    <br />
                                    Далі активувати відповідну кнопку Google.
                                </p>

                                <div className="image">
                                    <img src={LoginWithGoogleImg} alt="Вхід за допомогою Google сервісу" />
                                </div>
                            </li>

                            <li className="image-item">
                                <p className="image-item-text">
                                    У Вас вже має бути Google аккаунт. Якщо Ви авторизовані на своєму пристрої,
                                    то просто обираєте акаунт який Ви бажаєте використовувати у Wish Hub.
                                </p>

                                <div className="image">
                                    <img src={ChooseGoogleAccountImg} alt="Вибір Google аккаунту" />
                                </div>
                            </li>

                            <li className="image-item">
                                <p className="image-item-text">
                                    Якщо Ви ще не авторизовані в пошті gmail на своєму пристрої,
                                    введіть свої дані у відповідні поля.
                                </p>

                                <div className="image-box">
                                    <div className="image first">
                                        <img src={EnterYourAccountNameImg} alt="Введіть свій аккаунт" />
                                    </div>
                                    <div className="image second">
                                        <img src={EnterYourPasswordImg} alt="Введіть свій пароль" />
                                    </div>
                                </div>
                            </li>

                            <li className="image-item">
                                <p className="image-item-text">
                                    Далі програма зробить все за Вас. Якщо Ви вже реєструвались, Ви просто увійдете до
                                    свого акаунта. Якщо ще ні, Ви будете автоматично зареєстровані.
                                </p>

                                <div className="image">
                                    <img src={EnteredToWishHubImg} alt="Увійшов до Wish Hub" />
                                </div>
                            </li>
                        </ul>
                    </li>

                    <li className="numbered-item">
                        <ul className="image-list">
                            <li className="image-item">
                                <p className="image-item-text">
                                    Якщо Ви не бажаєте використовувати Google аккаунт або у Вас його немає,
                                    потрібно буде пройти верифікацію у веб додатку Wish Hub.
                                    <br />
                                    Заповніть всі поля і погодьтесь з умовами використання.
                                </p>

                                <div className="image">
                                    <img src={SingUpImg} alt="Реєстрація" />
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
                                    <img src={ActivationAccountImg} alt="Активація акаунта" />
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
