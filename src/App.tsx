import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes, unauthenticatedRoutes } from './pages/routes';
import PrivateRoutes from './components/Guards/PrivateRoutes';
import UnauthenticatedRoutes from './components/Guards/UnauthentificatedRoutes';

const App: FC = () => {
    return (
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
    );
};

export default App;
