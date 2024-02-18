import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IUser } from '../../models/IUser';
import { registration, login, logout, checkAuth, updateMyUser } from './thunks';
import {IAuth} from "../../models/IAuth";

interface IMyUserState {
    user: IUser | null
    isAuth: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: IMyUserState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,
};

const authPending = (state: IMyUserState) => {
    state.user = null;
    state.isAuth = false;
    state.isLoading = true;
    state.error = null;
    localStorage.removeItem('token');
};

const authRejected = (state: IMyUserState, action: any, typeAction: string) => {
    state.user = null;
    state.isAuth = false;
    state.isLoading = false;
    state.error = action.error.message || `Не вдалось ${typeAction}.`;
    toast(action.error.message || `Не вдалось ${typeAction}.`, { type: 'error' });
    localStorage.removeItem('token');
};

const authFulfilled = (state: IMyUserState, action: PayloadAction<IAuth>) => {
    state.user = action.payload.user;
    state.isAuth = true;
    state.isLoading = false;
    state.error = null;
    localStorage.setItem('token', action.payload.accessToken);
    // window.location.href = '/';
};

const usePending = (state: IMyUserState) => {
    state.isLoading = true;
    state.error = null;
};

const useRejected = (state: IMyUserState, action: any, typeAction: string) => {
    state.isLoading = false;
    state.error = action.error.message || `Не вдалось ${typeAction}.`;
    toast(action.error.message || `Не вдалось ${typeAction}.`, { type: 'error' });
};

const myUserSlice = createSlice({
    name: 'myUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // registration
            .addCase(registration.pending, authPending)
            .addCase(registration.rejected, (state, action) => authRejected(state, action, 'зареєструватись'))
            .addCase(registration.fulfilled, authFulfilled)
            // login
            .addCase(login.pending, authPending)
            .addCase(login.rejected, (state, action) => authRejected(state, action, 'авторизуватись'))
            .addCase(login.fulfilled, authFulfilled)
            // logout
            .addCase(logout.pending, usePending)
            .addCase(logout.rejected, (state, action) => useRejected(state, action, 'вийти'))
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuth = false;
                state.isLoading = false;
                state.error = null;
                localStorage.removeItem('token');
            })
            // checkAuth
            .addCase(checkAuth.pending, authPending)
            .addCase(checkAuth.rejected, (state, action) => authRejected(state, action, 'оновити сесію'))
            .addCase(checkAuth.fulfilled, authFulfilled)
            // updateMyUser
            .addCase(updateMyUser.pending, usePending)
            .addCase(updateMyUser.rejected, (state, action) => useRejected(state, action, 'зберегти твої дані'))
            .addCase(updateMyUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = null;
            });
    },
});

export default myUserSlice.reducer;