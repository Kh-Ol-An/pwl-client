import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/store/users/api';
import { ISendUsersParams, IGetUsers, ISendAllUsersParams } from '@/store/users/types';
import { IUser } from "@/models/IUser";

export const getUsers = createAsyncThunk<IGetUsers, ISendUsersParams>(
    'users/getUsers',
    async (params) => {
        const result = await api.getUsers(params);

        return result.data;
    },
);

// Додавання нових користувачів під час infinity scroll
export const addUsers = createAsyncThunk<IGetUsers, ISendUsersParams>(
    'users/addUsers',
    async (params) => {
        const result = await api.getUsers(params);

        return result.data;
    },
);

export const getAllUsers = createAsyncThunk<IUser[], ISendAllUsersParams>(
    'users/getAllUsers',
    async (params) => {
        const result = await api.getAllUsers(params);

        return result.data;
    },
);

// Додавання нових користувачів під час infinity scroll
export const addAllUsers = createAsyncThunk<IUser[], ISendAllUsersParams>(
    'users/addAllUsers',
    async (params) => {
        const result = await api.getAllUsers(params);

        return result.data;
    },
);
