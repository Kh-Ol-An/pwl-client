import { createSlice } from '@reduxjs/toolkit';
import { createWish, updateWish, deleteWish, getWishList, bookWish, cancelBookWish } from '@/store/wishes/thunks';
import { IWish } from '@/models/IWish';

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
            // create
            .addCase(createWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось створити бажання.';
            })
            .addCase(createWish.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
                state.isLoading = false;
                state.error = null;
            })
            // update
            .addCase(updateWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось оновити бажання.';
            })
            .addCase(updateWish.fulfilled, (state, action) => {
                const updatedWish = action.payload;
                const wishListWithoutUpdatedWish = state.list.filter(wish => wish.id !== updatedWish.id);
                wishListWithoutUpdatedWish.unshift(updatedWish);
                state.list = wishListWithoutUpdatedWish;
                state.isLoading = false;
                state.error = null;
            })
            // delete
            .addCase(deleteWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось видалити бажання.';
            })
            .addCase(deleteWish.fulfilled, (state, action) => {
                const deletedWishId = action.payload;
                state.list = state.list.filter(wish => wish.id !== deletedWishId);
                state.isLoading = false;
                state.error = null;
            })
            // getWishList
            .addCase(getWishList.pending, (state) => {
                state.list = [];
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getWishList.rejected, (state, action) => {
                state.list = [];
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось отримати всі бажання.';
            })
            .addCase(getWishList.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            // bookWish
            .addCase(bookWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(bookWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось отримати всі бажання.';
            })
            .addCase(bookWish.fulfilled, (state, action) => {
                // Змінити бажання та покласти його там де було
                const { id } = action.payload;
                // Знаходимо індекс бажання в списку за його ідентифікатором
                const index = state.list.findIndex(wish => wish.id === id);
                // Перевіряємо, чи було знайдено бажання
                if (index !== -1) {
                    // Оновлюємо дані бажання
                    state.list[index] = action.payload;
                }
                state.isLoading = false;
                state.error = null;
            })
            // cancelBookWish
            .addCase(cancelBookWish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(cancelBookWish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Не вдалось отримати всі бажання.';
            })
            .addCase(cancelBookWish.fulfilled, (state, action) => {
                // Змінити бажання та покласти його там де було
                const { id } = action.payload;
                // Знаходимо індекс бажання в списку за його ідентифікатором
                const index = state.list.findIndex(wish => wish.id === id);
                // Перевіряємо, чи було знайдено бажання
                if (index !== -1) {
                    // Оновлюємо дані бажання
                    state.list[index] = action.payload;
                }
                state.isLoading = false;
                state.error = null;
            });
    },
});

export default wishesSlice.reducer;