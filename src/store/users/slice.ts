import { createSlice } from '@reduxjs/toolkit';
import { t } from 'i18next';
import { getUsers, addUsers, getAllUsers, addAllUsers } from '@/store/users/thunks';
import { doneWish, undoneWish } from '@/store/wishes/thunks';
import { IUser } from '@/models/IUser';
import { USERS_PAGINATION_LIMIT } from '@/utils/constants';

interface IUsersState {
    list: IUser[];
    followFromCount: number;
    page: number;
    stopRequests: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: IUsersState = {
    list: [],
    followFromCount: 0,
    page: 1,
    stopRequests: false,
    isLoading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getUsers
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.stopRequests = true;
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.stopRequests = false;
                state.error = action.error.message || t('alerts.users-api.get-users.error', { type: 'slice.getUsers' });
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.list = action.payload.users;
                state.followFromCount = action.payload.followFromCount;
                state.page = 2;
                action.payload.users.length === USERS_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.error = null;
            })
            // addUsers
            .addCase(addUsers.pending, (state) => {
                state.isLoading = true;
                state.stopRequests = true;
                state.error = null;
            })
            .addCase(addUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.stopRequests = false;
                state.error = action.error.message || t('alerts.users-api.get-users.error', { type: 'slice.addUsers' });
            })
            .addCase(addUsers.fulfilled, (state, action) => {
                state.list.push(...action.payload.users);
                state.followFromCount = action.payload.followFromCount;
                state.page += 1;
                action.payload.users.length === USERS_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.error = null;
            })
            // getAllUsers
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.stopRequests = true;
                state.error = null;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.stopRequests = false;
                state.error = action.error.message || t('alerts.users-api.get-all-users.error', { type: 'slice.getAllUsers' });
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.page = 2;
                action.payload.length === USERS_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.error = null;
            })
            // addAllUsers
            .addCase(addAllUsers.pending, (state) => {
                state.isLoading = true;
                state.stopRequests = true;
                state.error = null;
            })
            .addCase(addAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.stopRequests = false;
                state.error = action.error.message || t('alerts.users-api.get-users.error', { type: 'slice.addUsers' });
            })
            .addCase(addAllUsers.fulfilled, (state, action) => {
                state.list.push(...action.payload);
                state.page += 1;
                action.payload.length === USERS_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.error = null;
            })
            // doneWish
            .addCase(doneWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(doneWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.done-wish.error', { type: 'users.slice' });
            })
            .addCase(doneWish.fulfilled, (state, action) => {
                // Змінити користувача та покласти його там де був
                const { executorUser } = action.payload;

                const index = state.list.findIndex(user => user.id === executorUser.id);

                if (index !== -1) {
                    state.list[index] = executorUser;
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
                state.error = action.error.message || t('alerts.wishes-api.undone-wish.error', { type: 'users.slice' });
            })
            .addCase(undoneWish.fulfilled, (state, action) => {
                // Змінити користувача та покласти його там де був
                const { executorUser } = action.payload;

                const index = state.list.findIndex(user => user.id === executorUser.id);

                if (index !== -1) {
                    state.list[index] = executorUser;
                }
                state.isLoading = false;
                state.error = null;
            });
    },
});

export default usersSlice.reducer;