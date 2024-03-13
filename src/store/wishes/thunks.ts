import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { IUser } from '../../models/IUser';
import { IWish } from '../../models/IWish';
import { ICreateWish, IGetWish, IUpdateWish } from './types';

export const createWish = createAsyncThunk<IWish, ICreateWish>(
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

export const deleteWish = createAsyncThunk<IWish['id'], [IUser['id'], IWish['id']]>(
    'wishes/deleteWish',
    async ([userId, wishId]) => {
        const result = await api.deleteWish(userId, wishId);

        return result.data;
    },
);

export const getWishList = createAsyncThunk<IWish[], IGetWish>(
    'wishes/getWishList',
    async (params) => {
        const result = await api.getWishList(params);

        return result.data;
    },
);
