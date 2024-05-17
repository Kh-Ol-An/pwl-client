import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';
import {
    registration,
    googleAuthorization,
    login,
    logout,
    checkAuth,
    changePassword,
    changeLang,
    updateMyUser,
    addFriend,
    removeFriend,
    deleteMyUser,
} from '@/store/my-user/thunks';
import { doneWish, undoneWish } from '@/store/wishes/thunks';
import { IUser } from '@/models/IUser';

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
    reducers: {
        setIsLoading(state, action: PayloadAction<Partial<boolean>>) {
            state.isLoading = action.payload;
        },
    },
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
                state.error = action.error.message || t('alerts.my-user-api.registration.error', { type: 'slice' });
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
            })
            // googleAuthorization
            .addCase(googleAuthorization.pending, (state) => {
                state.user = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(googleAuthorization.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.google-authorization.error', { type: 'slice' });
            })
            .addCase(googleAuthorization.fulfilled, (state, action) => {
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
                state.error = action.error.message || t('alerts.my-user-api.login.error', { type: 'slice' });
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
                state.error = action.error.message || t('alerts.my-user-api.logout.error', { type: 'slice' });
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
                state.error = action.error.message || t('alerts.my-user-api.refresh.error', { type: 'slice' });
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
            })
            // changePassword
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.change-password.error', { type: 'slice' });
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
                state.error = null;
            })
            // changeLang
            .addCase(changeLang.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeLang.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.change-lang.error', { type: 'slice' });
            })
            .addCase(changeLang.fulfilled, (state, action) => {
                state.user = action.payload;
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
                state.error = action.error.message || t('alerts.my-user-api.update-my-user.error', { type: 'slice' });
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
                state.error = action.error.message || t('alerts.my-user-api.add-friend.error', { type: 'slice' });
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
                state.error = action.error.message || t('alerts.my-user-api.remove-friend.error', { type: 'slice' });
            })
            .addCase(removeFriend.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            // deleteMyUser
            .addCase(deleteMyUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteMyUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.my-user-api.delete-my-user.error', { type: 'slice' });
            })
            .addCase(deleteMyUser.fulfilled, (state, action) => {
                if (state.user?.id === action.payload) {
                    state.user = null;
                    state.error = null;
                } else {
                    state.error = t('alerts.my-user-api.delete-my-user.error', { type: 'slice' });
                }
                state.isLoading = false;
            })
            // doneWish
            .addCase(doneWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(doneWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.done-wish.error', { type: 'myUser.slice' });
            })
            .addCase(doneWish.fulfilled, (state, action) => {
                const { executorUser } = action.payload;

                if (state.user?.id === executorUser.id) {
                    state.user = executorUser;
                }
                state.isLoading = false;
                state.error = null;
            })
            // undoneWish
            .addCase(undoneWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(undoneWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.undone-wish.error', { type: 'myUser.slice' });
            })
            .addCase(undoneWish.fulfilled, (state, action) => {
                const { executorUser } = action.payload;

                if (state.user?.id === executorUser.id) {
                    state.user = executorUser;
                }
                state.isLoading = false;
                state.error = null;
            });
    },
});

export const { setIsLoading } = myUserSlice.actions;

export default myUserSlice.reducer;