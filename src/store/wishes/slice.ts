import { createSlice } from '@reduxjs/toolkit';
import {
    createWish,
    updateWish,
    doneWish,
    undoneWish,
    bookWish,
    cancelBookWish,
    deleteWish,
    getWishList,
} from '@/store/wishes/thunks';
import { IWish } from '@/models/IWish';

interface IState {
    list: IWish[];
    isLoading: boolean;
    isLocalLoading: boolean;
    error: string | null;
}

const initialState: IState = {
    list: [],
    isLoading: false,
    isLocalLoading: false,
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
                state.isLocalLoading = false;
                state.error = null;
            })
            .addCase(createWish.rejected, (state, action) => {
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || 'Не вдалось створити бажання.';
            })
            .addCase(createWish.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = null;
            })
            // update
            .addCase(updateWish.pending, (state) => {
                state.isLoading = true;
                state.isLocalLoading = false;
                state.error = null;
            })
            .addCase(updateWish.rejected, (state, action) => {
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || 'Не вдалось оновити бажання.';
            })
            .addCase(updateWish.fulfilled, (state, action) => {
                const updatedWish = action.payload;
                const wishListWithoutUpdatedWish = state.list.filter(wish => wish.id !== updatedWish.id);
                wishListWithoutUpdatedWish.unshift(updatedWish);
                state.list = wishListWithoutUpdatedWish;
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = null;
            })
            // doneWish
            .addCase(doneWish.pending, (state) => {
                state.isLoading = true;
                state.isLocalLoading = false;
                state.error = null;
            })
            .addCase(doneWish.rejected, (state, action) => {
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || 'Не вдалось позначити бажання виконаним.';
            })
            .addCase(doneWish.fulfilled, (state, action) => {
                // Змінити бажання та покласти його там де було
                const { bookedWish } = action.payload;
                // Знаходимо індекс бажання в списку за його ідентифікатором
                const index = state.list.findIndex(wish => wish.id === bookedWish.id);
                // Перевіряємо, чи було знайдено бажання
                if (index !== -1) {
                    // Оновлюємо дані бажання
                    state.list[index] = bookedWish;
                }
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = null;
            })
            // undoneWish
            .addCase(undoneWish.pending, (state) => {
                state.isLoading = true;
                state.isLocalLoading = false;
                state.error = null;
            })
            .addCase(undoneWish.rejected, (state, action) => {
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || 'Не вдалось позначити бажання не виконаним.';
            })
            .addCase(undoneWish.fulfilled, (state, action) => {
                // Змінити бажання та покласти його там де було
                const { bookedWish } = action.payload;
                // Знаходимо індекс бажання в списку за його ідентифікатором
                const index = state.list.findIndex(wish => wish.id === bookedWish.id);
                // Перевіряємо, чи було знайдено бажання
                if (index !== -1) {
                    // Оновлюємо дані бажання
                    state.list[index] = bookedWish;
                }
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = null;
            })
            // bookWish
            .addCase(bookWish.pending, (state) => {
                state.isLoading = true;
                state.isLocalLoading = false;
                state.error = null;
            })
            .addCase(bookWish.rejected, (state, action) => {
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || 'Не вдалось забронювати бажання.';
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
                state.isLocalLoading = false;
                state.error = null;
            })
            // cancelBookWish
            .addCase(cancelBookWish.pending, (state) => {
                state.isLoading = true;
                state.isLocalLoading = false;
                state.error = null;
            })
            .addCase(cancelBookWish.rejected, (state, action) => {
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || 'Не вдалось скасувати бронювання бажання.';
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
                state.isLocalLoading = false;
                state.error = null;
            })
            // delete
            .addCase(deleteWish.pending, (state) => {
                state.isLoading = true;
                state.isLocalLoading = false;
                state.error = null;
            })
            .addCase(deleteWish.rejected, (state, action) => {
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || 'Не вдалось видалити бажання.';
            })
            .addCase(deleteWish.fulfilled, (state, action) => {
                const deletedWishId = action.payload;
                state.list = state.list.filter(wish => wish.id !== deletedWishId);
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = null;
            })
            // getWishList
            .addCase(getWishList.pending, (state) => {
                state.list = [];
                state.isLoading = false;
                state.isLocalLoading = true;
                state.error = null;
            })
            .addCase(getWishList.rejected, (state, action) => {
                state.list = [];
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || 'Не вдалось отримати всі бажання.';
            })
            .addCase(getWishList.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = null;
            });
    },
});

export default wishesSlice.reducer;