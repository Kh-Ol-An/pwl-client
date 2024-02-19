import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { IWish } from '../../models/IUser';
import { ICreateWish } from './types';

export const createWish = createAsyncThunk<IWish, ICreateWish>(
    'wish/createWish',
    async (data) => {
        const result = await api.createWish(data);

        return result.data;
    },
);
