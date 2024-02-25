import React, { FC, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material';
import Inactivated from './components/Inactivated/Inactivated';
import Loading from './components/Loading/Loading';
import { useAppDispatch, useAppSelector } from './store/hook';
import Home from './pages/Home/Home';
import Welcome from './pages/Welcome/Welcome';
import Auth from './pages/Auth';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { checkAuth } from './store/my-user/thunks';
import RoutesGuard from './utils/RoutesGuard';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App: FC = () => {
    const [ready, setReady] = useState(false);

    const myUser = useAppSelector((state) => state.myUser);
    const users = useAppSelector((state) => state.users);
    const wishes = useAppSelector((state) => state.wishes);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth())
            .then(() => setReady(true))
            .catch(() => setReady(false));
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            {myUser.user?.isActivated === false && <Inactivated />}

            {(myUser.isLoading || users.isLoading || wishes.isLoading) && <Loading />}

            {ready && (
                <Routes>
                    <Route element={<RoutesGuard guard={myUser.user !== null} redirectPath="/auth" />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route element={<RoutesGuard guard={myUser.user === null} redirectPath="/" />}>
                        <Route path="/auth" element={<Auth />} />
                    </Route>
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            )}

            <ToastContainer theme="colored" bodyClassName={() => "toast-body"} />
        </ThemeProvider>
    );
};

export default App;
