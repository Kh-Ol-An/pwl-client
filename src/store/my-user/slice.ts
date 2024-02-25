import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import { registration, login, logout, checkAuth, updateMyUser } from './thunks';
import { IAuth } from '../../models/IAuth';

interface IMyUserState {
    user: IUser | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: IMyUserState = {
    user: null,
    isLoading: false,
    error: null,
};

const authPending = (state: IMyUserState) => {
    state.user = null;
    state.isLoading = true;
    state.error = null;
};

const authRejected = (state: IMyUserState, action: any, typeAction: string) => {
    state.user = null;
    state.isLoading = false;
    state.error = action.error.message || `Не вдалось ${typeAction}.`;
};

const authFulfilled = (state: IMyUserState, action: PayloadAction<IAuth>) => {
    state.user = action.payload.user;
    state.isLoading = false;
    state.error = null;
};

const usePending = (state: IMyUserState) => {
    state.isLoading = true;
    state.error = null;
};

const useRejected = (state: IMyUserState, action: any, typeAction: string) => {
    state.isLoading = false;
    state.error = action.error.message || `Не вдалось ${typeAction}.`;
};

const useFulfilled = (state: IMyUserState, user: IUser | null) => {
    state.user = user;
    state.isLoading = false;
    state.error = null;
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
            .addCase(login.rejected, (state, action) => authRejected(state, action, 'увійти на сайт'))
            .addCase(login.fulfilled, authFulfilled)
            // logout
            .addCase(logout.pending, usePending)
            .addCase(logout.rejected, (state, action) => useRejected(state, action, 'вийти з аккаунту'))
            .addCase(logout.fulfilled, (state) => useFulfilled(state, null))
            // checkAuth
            .addCase(checkAuth.pending, authPending)
            .addCase(checkAuth.rejected, (state, action) => authRejected(state, action, 'оновити сесію'))
            .addCase(checkAuth.fulfilled, authFulfilled)
            // updateMyUser
            .addCase(updateMyUser.pending, usePending)
            .addCase(updateMyUser.rejected, (state, action) => useRejected(state, action, 'оновити користувача'))
            .addCase(updateMyUser.fulfilled, (state, action) => useFulfilled(state, action.payload));
    },
});

export default myUserSlice.reducer;