import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/store/wishes/api';
import {
    ICreateWish,
    IWishWithQuote,
    IUpdateWish,
    IGetWish,
    ISendWish,
    IDoneWish,
    IActionWish,
    IBookWish,
    ISendWishList,
} from '@/store/wishes/types';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';

export const createWish = createAsyncThunk<IWishWithQuote, ICreateWish>(
    'wishes/createWish',
    async (data) => {
        const result = await api.createWish(data);

        return result.data;
    },
);

export const updateWish = createAsyncThunk<IWish, IUpdateWish>(
    'wishes/updateWish',
    async (data) => {
        const result = await api.updateWish(data);

        return result.data;
    },
);

export const getWish = createAsyncThunk<IGetWish, ISendWish>(
    'wishes/getWish',
    async (params) => {
        const result = await api.getWish(params);

        return result.data;
    },
);

export const doneWish = createAsyncThunk<{ executorUser: IUser, bookedWish: IWish }, IDoneWish>(
    'wishes/doneWish',
    async (data) => {
        const result = await api.doneWish(data);

        return result.data;
    },
);

export const undoneWish = createAsyncThunk<{ executorUser: IUser, bookedWish: IWish }, IActionWish>(
    'wishes/undoneWish',
    async (data) => {
        const result = await api.undoneWish(data);

        return result.data;
    },
);

export const bookWish = createAsyncThunk<IWishWithQuote, IBookWish>(
    'wishes/bookWish',
    async (data) => {
        const result = await api.bookWish(data);

        return result.data;
    },
);

export const cancelBookWish = createAsyncThunk<IWish, IActionWish>(
    'wishes/cancelBookWish',
    async (data) => {
        const result = await api.cancelBookWish(data);

        return result.data;
    },
);

export const deleteWish = createAsyncThunk<IWish['id'], [IUser['id'], IWish['id']]>(
    'wishes/deleteWish',
    async ([userId, wishId]) => {
        const result = await api.deleteWish(userId, wishId);

        return result.data;
    },
);

export const getWishList = createAsyncThunk<IWish[], ISendWishList>(
    'wishes/getWishList',
    async (params) => {
        const result = await api.getWishList(params);

        return result.data;
    },
);
