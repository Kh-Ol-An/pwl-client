import React, { FC, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import { privateRoutes, publicRoutes, unauthenticatedRoutes } from './pages/routes';
import Guard from './components/Guard';
import Inactivated from './components/Inactivated/Inactivated';
import Loading from './components/Loading/Loading';
import { StoreContext } from './index';

const App: FC = () => {
    const { store } = useContext(StoreContext);

    return (
        <>
            {store?.user?.isActivated === false && <Inactivated />}

            {store?.isLoading === true && <Loading />}

            <Routes>
                {publicRoutes.map(({ path, component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Guard type="all">
                                {React.createElement(component)}
                            </Guard>
                        }
                    />
                ))}

                {privateRoutes.map(({ path, component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Guard type="private">
                                {React.createElement(component)}
                            </Guard>
                        }
                    />
                ))}

                {unauthenticatedRoutes.map(({ path, component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Guard type="unauthenticated">
                                {React.createElement(component)}
                            </Guard>
                        }
                    />
                ))}
            </Routes>

            <ToastContainer theme="colored" bodyClassName={() => "toast-body"} />
        </>
    );
};

export default observer(App);
