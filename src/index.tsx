import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import i18next from 'i18next';
import '@/i18n/config';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/uk';
import store from '@/store';
import App from '@/App';
import { getLang } from "@/utils/lang-action";
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';

dayjs.extend(updateLocale);
dayjs.extend(advancedFormat);
dayjs.updateLocale(getLang(), {
    weekStart: i18next.language.includes('uk') && 1,
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={ store }>
        <BrowserRouter>
            <LocalizationProvider dateAdapter={ AdapterDayjs } adapterLocale={ getLang() }>
                <GoogleOAuthProvider
                    clientId={
                        process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID ? process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID : ''
                    }
                >
                    <App />
                </GoogleOAuthProvider>
            </LocalizationProvider>
        </BrowserRouter>
    </Provider>
);

// TODO: text
// TODO: Додати кнопку "Встановити додаток"
// TODO: робота над помилками
// TODO: Додати інструкцію як встановлювати додаток на компьютер
// TODO: Додати інструкцію про шифрування даних
// TODO: Додати інструкцію про лічильник виконаних та невиконаних бажань
// TODO: Вибір полу і якщо жінка то можливість обрати улюблені квіти
// TODO: Запустити рекламу в Україні і Америці та залучити близько 1000 користувачів
// TODO: кнопка назад на телефоні (свайп з краю екрана)
// TODO: в акаунті треба додати поле з адресою куди доставляти бажання
// TODO: в акаунті треба додати свята які він святкує
// TODO: в акаунті треба додати телефон та різні форми зв'язку такі як скайп, телеграм тощо
// TODO: Лайки для бажань
// TODO: Інфініті скролл для бажань
// TODO: Фільтрація бажань
// TODO: Сортування бажань
// TODO: Фільтрація юзерів
// TODO: Сортування юзерів
// TODO: Пошук бажань
// TODO: Доробити авторизацію для додатка
// TODO: Кнопка авторизації facebook
// TODO: Кнопка авторизації apple
// TODO: README.md які технології та який функціонал додатка
// TODO: можливість створювати групи для користувачів
// TODO: можливість часткового фінансування бажання (скинутись на подарунок)
// TODO: створити різні цінові категорії, перевіряти чи є бажання в кожній ціновій категорії і якщо немає, то радити створити бажання для цієї цінової категорії
// TODO: Створити розклад який би ти бажав
