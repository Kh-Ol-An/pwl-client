import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { IWish, IUser } from '../../models/IUser';
import { ICreateWish } from './types';

export const createWish = createAsyncThunk<IWish, ICreateWish>(
    'wishes/createWish',
    async (data) => {
        const result = await api.createWish(data);

        return result.data;
    },
);

export const getWishList = createAsyncThunk<IWish, IUser['id']>(
    'wishes/getWishList',
    async (userId) => {
        const result = await api.getWishList(userId);

        return result.data;
    },
);
