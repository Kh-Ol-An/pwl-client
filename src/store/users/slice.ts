import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from '@/store/users/thunks';
import { doneWish } from '@/store/wishes/thunks';
import { IUser } from '@/models/IUser';

interface IUsersState {
    list: IUser[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IUsersState = {
    list: [],
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
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось отримати всіх юзерів.';
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.list = action.payload;
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
                state.error = action.error.message || 'Не вдалось позначити бажання виконаним.';
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
            });
    },
});

export default usersSlice.reducer;