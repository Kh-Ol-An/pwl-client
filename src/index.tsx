import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/uk';
import store from '@/store';
import App from '@/App';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';

dayjs.extend(updateLocale)
dayjs.updateLocale('uk', {
    weekStart: 1,
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'uk'}>
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
