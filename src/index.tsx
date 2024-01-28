import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
            <App />
        </StoreContext.Provider>
    </React.StrictMode>
);
