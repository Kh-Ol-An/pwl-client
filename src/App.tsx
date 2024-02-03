import React, { FC, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes, unauthenticatedRoutes } from './pages/routes';
import PrivateRoutes from './components/Guards/PrivateRoutes';
import UnauthenticatedRoutes from './components/Guards/UnauthentificatedRoutes';
import { ToastContainer } from 'react-toastify';
import Inactivated from './components/Inactivated/Inactivated';
import { observer } from 'mobx-react-lite';
import { StoreContext } from './index';

const App: FC = () => {
    const { store } = useContext(StoreContext);

    return (
        <>
            {!store?.user?.isActivated && <Inactivated />}

            <Routes>
                {publicRoutes.map(({ path, component }) => (
                    <Route key={path} path={path} element={React.createElement(component)} />
                ))}

                {privateRoutes.map(({ path, component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <PrivateRoutes>
                                {React.createElement(component)}
                            </PrivateRoutes>
                        }
                    />
                ))}

                {unauthenticatedRoutes.map(({ path, component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <UnauthenticatedRoutes>
                                {React.createElement(component)}
                            </UnauthenticatedRoutes>
                        }
                    />
                ))}
            </Routes>

            <ToastContainer theme="colored" bodyClassName={() => "toast-body"} />
        </>
    );
};

export default observer(App);
