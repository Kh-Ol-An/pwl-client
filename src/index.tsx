import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './styles/reset.css';
import './styles/fonts.css';
import './styles/base.css';
import './styles/toast.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import Store from './store/store';

interface IStoreContext {
    store: Store;
}

const store = new Store();

export const StoreContext = React.createContext<IStoreContext>({ store });

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <StoreContext.Provider value={{ store }}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            <ToastContainer theme="colored" bodyClassName={() => "toast-body"} />
        </StoreContext.Provider>
    </React.StrictMode>
);
