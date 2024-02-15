import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { privateRoutes, publicRoutes, unauthenticatedRoutes } from './pages/routes';
import Guard from './components/Guard';
import Inactivated from './components/Inactivated/Inactivated';
import Loading from './components/Loading/Loading';
import { ThemeProvider, createTheme } from '@mui/material';
import {useAppSelector} from "./store/hook";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const App: FC = () => {
    const state = useAppSelector((state) => state);

    return (
        <ThemeProvider theme={theme}>
            {state.myUser.user?.isActivated === false && <Inactivated />}

            {(state.myUser.isLoading || state.users.isLoading) && <Loading />}

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
        </ThemeProvider>
    );
};

export default App;
