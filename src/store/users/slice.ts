import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import { getUsers } from './thunks';

interface IUsersState {
    list: IUser[]
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
            });
    },
});

export default usersSlice.reducer;