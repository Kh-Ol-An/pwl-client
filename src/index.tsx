import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import store from './store';
import App from './App';
import './styles/reset.css';
import './styles/fonts.css';
import './styles/base.css';
import './styles/toast.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <App />
                </LocalizationProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
