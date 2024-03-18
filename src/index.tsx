import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import store from './store';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <App />
            </LocalizationProvider>
        </BrowserRouter>
    </Provider>
);
