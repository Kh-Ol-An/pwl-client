import { createSlice } from '@reduxjs/toolkit';
import { IWish } from '../../models/IUser';
import { createWish } from './thunks';

interface IState {
    wish: IWish | null
    isLoading: boolean;
    error: string | null;
}

const initialState: IState = {
    wish: null,
    isLoading: false,
    error: null,
};

const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createWish.pending, (state) => {
                state.wish = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createWish.rejected, (state, action) => {
                state.wish = null;
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось створити бажання.';
            })
            .addCase(createWish.fulfilled, (state, action) => {
                state.wish = action.payload;
                state.isLoading = false;
                state.error = null;
            });
    },
});

export default wishListSlice.reducer;