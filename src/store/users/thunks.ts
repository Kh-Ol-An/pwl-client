import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/store/users/api';
import { IUser } from '@/models/IUser';
import { IGetUser } from '@/store/users/types';

export const getUsers = createAsyncThunk<IUser[], IGetUser>(
    'users/getUsers',
    async (params) => {
        const result = await api.getUsers(params);

        return result.data;
    },
);

export const addUsers = createAsyncThunk<IUser[], IGetUser>(
    'users/addUsers',
    async (params) => {
        const result = await api.getUsers(params);

        return result.data;
    },
);
