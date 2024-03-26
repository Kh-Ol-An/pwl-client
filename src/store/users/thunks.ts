import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';
import { IUser } from '@/models/IUser';

export const getUsers = createAsyncThunk<IUser[], void>(
    'users/getUsers',
    async () => {
        const result = await api.get('/users');

        return result.data;
    },
);
