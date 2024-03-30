import React, { FC, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { checkAuth } from '@/store/my-user/thunks';
import RoutesGuard from '@/utils/RoutesGuard';
import Home from '@/pages/Home';
import Welcome from '@/pages/Welcome';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import ActivationLinkExpired from '@/pages/ActivationLinkExpired';
import Loading from '@/layouts/Loading';

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
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            {myUser.isLoading && <Loading />}

            {ready && (
                <Routes>
                    <Route element={<RoutesGuard guard={myUser.user !== null} redirectPath="/auth" />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/activation-link-expired" element={<ActivationLinkExpired />} />
                    </Route>
                    <Route element={<RoutesGuard guard={myUser.user === null} redirectPath="/" />}>
                        <Route path="/auth" element={<Auth />} />
                    </Route>
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            )}

            <ToastContainer theme="colored" bodyClassName={() => "toast-body"} />
        </ThemeProvider>
    );
};

export default App;
