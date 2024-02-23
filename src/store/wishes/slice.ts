import { createSlice } from '@reduxjs/toolkit';
import { IWish } from '../../models/IUser';
import { createWish, getWishList } from './thunks';

interface IState {
    list: IWish[]
    isLoading: boolean;
    error: string | null;
}

const initialState: IState = {
    list: [],
    isLoading: false,
    error: null,
};

const wishesSlice = createSlice({
    name: 'wishes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось створити бажання.';
            })
            .addCase(createWish.fulfilled, (state, action) => {
                state.list.push(action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getWishList.pending, (state) => {
                state.list = [];
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getWishList.rejected, (state, action) => {
                state.list = [];
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось створити бажання.';
            })
            .addCase(getWishList.fulfilled, (state, action) => {
//                state.list = action.payload;
                state.isLoading = false;
                state.error = null;
            });
    },
});

export default wishesSlice.reducer;