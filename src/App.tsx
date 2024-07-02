import React, { FC, createElement, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import i18next from "i18next";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { checkAuth } from '@/store/my-user/thunks';
import { IUser } from "@/models/IUser";
import RoutesGuard from '@/utils/RoutesGuard';
import { checkNotificationSubscription, requestNotificationPermission } from "@/utils/notification-manager";
import Loading from '@/layouts/Loading';
import { privateRoutes, publicRoutes, unauthenticatedRoutes } from '@/pages/routes';
import StylesVariables from '@/styles/utils/variables.module.scss';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: StylesVariables.primaryFontFamily,
    },
});

const App: FC = () => {
    const myUser = useAppSelector((state) => state.myUser);

    const dispatch = useAppDispatch();

    const [ready, setReady] = useState<boolean>(false);

    let lang: IUser['lang'] = 'en';
    i18next.language.includes('en') && (lang = 'en');
    i18next.language.includes('uk') && (lang = 'uk');

    useEffect(() => {
        const action = async () => {
            if ('getInstalledRelatedApps' in navigator) {
                const installed = await (navigator as any).getInstalledRelatedApps();
                console.log('installed: ', installed);
            }
        };
        action();

        dispatch(checkAuth())
            .then(() => setReady(true))
            .catch(() => setReady(false));
    }, []);

    useEffect(() => {
        const setSettings = async () => {
            if (!myUser.user) return;

            const myUserLang = myUser.user.lang;
            const myUserId = myUser.user.id;
            if (lang !== myUserLang) {
                await i18next.changeLanguage(myUserLang);
            }
            await checkNotificationSubscription(myUserId);
            await requestNotificationPermission(myUserId);
        };
        setSettings();
    }, [myUser.user]);

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

            <ToastContainer theme="dark" bodyClassName={() => "toast-body"} />
        </ThemeProvider>
    );
};

export default App;
