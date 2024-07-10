import { createSlice } from '@reduxjs/toolkit';
import { t } from 'i18next';
import {
    createWish,
    updateWish,
    bookWish,
    cancelBookWish,
    doneWish,
    undoneWish,
    likeWish,
    dislikeWish,
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
                state.error = action.error.message || t('alerts.wishes-api.create-wish.error', { type: 'slice' });
            })
            .addCase(createWish.fulfilled, (state, action) => {
                state.list.unshift(action.payload.wish);
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
                state.error = action.error.message || t('alerts.wishes-api.update-wish.error', { type: 'slice' });
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
            // bookWish
            .addCase(bookWish.pending, (state) => {
                state.isLoading = true;
                state.isLocalLoading = false;
                state.error = null;
            })
            .addCase(bookWish.rejected, (state, action) => {
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.book-wish.error', { type: 'slice' });
            })
            .addCase(bookWish.fulfilled, (state, action) => {
                // Змінити бажання та покласти його там де було
                const { id } = action.payload.wish;
                // Знаходимо індекс бажання в списку за його ідентифікатором
                const index = state.list.findIndex(wish => wish.id === id);
                // Перевіряємо, чи було знайдено бажання
                if (index !== -1) {
                    // Оновлюємо дані бажання
                    state.list[index] = action.payload.wish;
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
                state.error = action.error.message || t('alerts.wishes-api.cancel-book-wish.error', { type: 'slice' });
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
            // doneWish
            .addCase(doneWish.pending, (state) => {
                state.isLoading = true;
                state.isLocalLoading = false;
                state.error = null;
            })
            .addCase(doneWish.rejected, (state, action) => {
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.done-wish.error', { type: 'wishes.slice' });
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
                state.error = action.error.message || t('alerts.wishes-api.undone-wish.error', { type: 'wishes.slice' });
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
            // likeWish
            .addCase(likeWish.pending, (state) => {
                state.isLoading = true;
                state.isLocalLoading = false;
                state.error = null;
            })
            .addCase(likeWish.rejected, (state, action) => {
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.like-wish.error', { type: 'wishes.slice' });
            })
            .addCase(likeWish.fulfilled, (state, action) => {
                // Змінити бажання та покласти його там де було
                // Знаходимо індекс бажання в списку за його ідентифікатором
                const index = state.list.findIndex(wish => wish.id === action.payload.id);
                // Перевіряємо, чи було знайдено бажання
                if (index !== -1) {
                    // Оновлюємо дані бажання
                    state.list[index] = action.payload;
                }
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = null;
            })
            // dislikeWish
            .addCase(dislikeWish.pending, (state) => {
                state.isLoading = true;
                state.isLocalLoading = false;
                state.error = null;
            })
            .addCase(dislikeWish.rejected, (state, action) => {
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.dislike-wish.error', { type: 'wishes.slice' });
            })
            .addCase(dislikeWish.fulfilled, (state, action) => {
                // Змінити бажання та покласти його там де було
                // Знаходимо індекс бажання в списку за його ідентифікатором
                const index = state.list.findIndex(wish => wish.id === action.payload.id);
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
                state.error = action.error.message || t('alerts.wishes-api.delete-wish.error', { type: 'slice' });
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
                state.error = action.error.message || t('alerts.wishes-api.get-wish-list.error', { type: 'slice' });
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