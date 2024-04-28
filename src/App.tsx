import React, { FC, createElement, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { checkAuth } from '@/store/my-user/thunks';
import RoutesGuard from '@/utils/RoutesGuard';
import Loading from '@/layouts/Loading';
import { privateRoutes, publicRoutes, unauthenticatedRoutes } from '@/pages/routes';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App: FC = () => {
    const myUser = useAppSelector((state) => state.myUser);

    const dispatch = useAppDispatch();

    const [ready, setReady] = useState(false);

    useEffect(() => {
        dispatch(checkAuth())
            .then(() => setReady(true))
            .catch(() => setReady(false));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {myUser.isLoading && <Loading />}

            {ready && (
                <Routes>
                    <Route element={<RoutesGuard guard={myUser.user !== null} redirectPath="/auth" />}>
                        {privateRoutes.map(({ path, component }) => (
                            <Route key={path} path={path} element={createElement(component)} />
                        ))}
                    </Route>
                    <Route element={<RoutesGuard guard={myUser.user === null} redirectPath="/" />}>
                        {unauthenticatedRoutes.map(({ path, component }) => (
                            <Route key={path} path={path} element={createElement(component)} />
                        ))}
                    </Route>

                    {publicRoutes.map(({ path, component }) => (
                        <Route key={path} path={path} element={createElement(component)} />
                    ))}
                </Routes>
            )}

            <ToastContainer theme="colored" bodyClassName={() => "toast-body"} />
        </ThemeProvider>
    );
};

export default App;
