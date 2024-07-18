import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    addWishList,
    getAllWishes,
    addAllWishes,
} from '@/store/wishes/thunks';
import { IWish, TWishStatus } from '@/models/IWish';
import { WISHES_PAGINATION_LIMIT } from "@/utils/constants";

const changeWish = (state: IState, newWish: IWish) => {
    // Змінити бажання та покласти його там де було
    // Знаходимо індекс бажання в списку за його ідентифікатором
    const index = state.list.findIndex(currentWish => currentWish.id === newWish.id);
    // Перевіряємо, чи було знайдено бажання
    if (index !== -1) {
        // Оновлюємо дані бажання
        state.list[index] = newWish;
    }
};

interface IState {
    list: IWish[];
    status: 'all' | 'unfulfilled' | 'fulfilled';
    search: string;
    page: number;
    stopRequests: boolean;
    isLoading: boolean;
    isLocalLoading: boolean;
    error: string | null;
}

const initialState: IState = {
    list: [],
    status: 'all',
    search: '',
    page: 1,
    stopRequests: false,
    isLoading: false,
    isLocalLoading: false,
    error: null,
};

const wishesSlice = createSlice({
    name: 'wishes',
    initialState,
    reducers: {
        setWishStatus(state, action: PayloadAction<Partial<TWishStatus>>) {
            state.status = action.payload;
        },
        setWishSearch(state, action: PayloadAction<Partial<string>>) {
            state.search = action.payload;
        },
    },
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
                changeWish(state, action.payload);
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
                changeWish(state, action.payload.wish);
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
                changeWish(state, action.payload);
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
                changeWish(state, action.payload.bookedWish);
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
                changeWish(state, action.payload.bookedWish);
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
                changeWish(state, action.payload);
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
                changeWish(state, action.payload);
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
                state.stopRequests = true;
                state.isLoading = false;
                state.isLocalLoading = true;
                state.error = null;
            })
            .addCase(getWishList.rejected, (state, action) => {
                state.list = [];
                state.stopRequests = false;
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.get-wish-list.error', { type: 'slice' });
            })
            .addCase(getWishList.fulfilled, (state, action) => {
                state.list = action.payload;
                state.page = 2;
                action.payload.length === WISHES_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = null;
            })
            // addWishList
            .addCase(addWishList.pending, (state) => {
                state.list = [];
                state.stopRequests = true;
                state.isLoading = false;
                state.isLocalLoading = true;
                state.error = null;
            })
            .addCase(addWishList.rejected, (state, action) => {
                state.list = [];
                state.stopRequests = false;
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.get-wish-list.error', { type: 'slice' });
            })
            .addCase(addWishList.fulfilled, (state, action) => {
                state.list.push(...action.payload);
                state.page += 1;
                action.payload.length === WISHES_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = null;
            })
            // getAllWishes
            .addCase(getAllWishes.pending, (state) => {
                state.list = [];
                state.stopRequests = true;
                state.isLoading = false;
                state.isLocalLoading = true;
                state.error = null;
            })
            .addCase(getAllWishes.rejected, (state, action) => {
                state.list = [];
                state.stopRequests = false;
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.get-all-wishes.error', { type: 'slice' });
            })
            .addCase(getAllWishes.fulfilled, (state, action) => {
                state.list = action.payload;
                state.page = 2;
                action.payload.length === WISHES_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = null;
            })
            // addAllWishes
            .addCase(addAllWishes.pending, (state) => {
                state.list = [];
                state.stopRequests = true;
                state.isLoading = false;
                state.isLocalLoading = true;
                state.error = null;
            })
            .addCase(addAllWishes.rejected, (state, action) => {
                state.list = [];
                state.stopRequests = false;
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = action.error.message || t('alerts.wishes-api.get-all-wishes.error', { type: 'slice' });
            })
            .addCase(addAllWishes.fulfilled, (state, action) => {
                state.list.push(...action.payload);
                state.page += 1;
                action.payload.length === WISHES_PAGINATION_LIMIT && (state.stopRequests = false);
                state.isLoading = false;
                state.isLocalLoading = false;
                state.error = null;
            });
    },
});

export const { setWishStatus, setWishSearch } = wishesSlice.actions;

export default wishesSlice.reducer;