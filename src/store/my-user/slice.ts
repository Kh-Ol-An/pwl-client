import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import { registration, login, logout, checkAuth, updateMyUser, addFriend, removeFriend } from './thunks';

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

const myUserSlice = createSlice({
    name: 'myUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // registration
            .addCase(registration.pending, (state) => {
                state.user = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registration.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось зареєструватись.';
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
            })
            // login
            .addCase(login.pending, (state) => {
                state.user = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось увійти на сайт.';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
            })
            // logout
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось вийти з аккаунту.';
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
                state.error = null;
            })
            // checkAuth
            .addCase(checkAuth.pending, (state) => {
                state.user = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось оновити сесію.';
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
            })
            // updateMyUser
            .addCase(updateMyUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateMyUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось оновити користувача.';
            })
            .addCase(updateMyUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            // addFriend
            .addCase(addFriend.pending, (state) => {
                state.error = null;
            })
            .addCase(addFriend.rejected, (state, action) => {
                state.error = action.error.message || 'Не вдалось додати друга.';
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            // removeFriend
            .addCase(removeFriend.pending, (state) => {
                state.error = null;
            })
            .addCase(removeFriend.rejected, (state, action) => {
                state.error = action.error.message || 'Не вдалось додати друга.';
            })
            .addCase(removeFriend.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            });
    },
});

export default myUserSlice.reducer;