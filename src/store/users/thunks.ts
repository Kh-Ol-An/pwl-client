import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/store/users/api';
import { ISendUsersParams, IGetUsers } from '@/store/users/types';

export const getUsers = createAsyncThunk<IGetUsers, ISendUsersParams>(
    'users/getUsers',
    async (params) => {
        const result = await api.getUsers(params);

        return result.data;
    },
);

export const addUsers = createAsyncThunk<IGetUsers, ISendUsersParams>(
    'users/addUsers',
    async (params) => {
        const result = await api.getUsers(params);

        return result.data;
    },
);
