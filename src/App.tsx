import React, { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Inactivated from './components/Inactivated/Inactivated';
import Loading from './components/Loading/Loading';
import { ThemeProvider, createTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from "./store/hook";
import Home from './pages/Home/Home';
import Welcome from './pages/Welcome/Welcome';
import Auth from './pages/Auth/Auth';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { checkAuth } from './store/my-user/thunks';
import RoutesGuard from './utils/RoutesGuard';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const App: FC = () => {
    const state = useAppSelector((state) => state);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (state.myUser.isLoading || state.users.isLoading) {
        return <Loading />;
    }

    return (
        <ThemeProvider theme={theme}>
            {state.myUser.user?.isActivated === false && <Inactivated />}

            <Routes>
                <Route element={<RoutesGuard isAuth={state.myUser.isAuth} />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>

            <ToastContainer theme="colored" bodyClassName={() => "toast-body"} />
        </ThemeProvider>
    );
};

export default App;
