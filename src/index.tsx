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
import { ELang } from "@/models/IUser";

dayjs.extend(updateLocale);
dayjs.extend(advancedFormat);
dayjs.updateLocale(getLang(), {
    weekStart: i18next.language.includes(ELang.UK) && 1,
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
