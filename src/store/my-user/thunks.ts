import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { IAuth } from '../../models/IAuth';
import { IUser } from '../../models/IUser';
import { IAddFriend, ILogin, IRegistration, IUpdateMyUser } from './types';

export const registration = createAsyncThunk<IAuth, IRegistration>(
    'myUser/registration',
    async (data) => {
        const result = await api.registration(data);

        return result.data;
    },
);

export const login = createAsyncThunk<IAuth, ILogin>(
    'myUser/login',
    async (data) => {
        const result = await api.login(data);

        return result.data;
    },
);

export const logout = createAsyncThunk<any, void>(
    'myUser/logout',
    async () => {
        return await api.logout();
    },
);

export const checkAuth = createAsyncThunk<IAuth, void>(
    'myUser/checkAuth',
    async () => {
        const result = await api.refresh();

        return result.data;
    },
);

export const updateMyUser = createAsyncThunk<IUser, IUpdateMyUser>(
    'myUser/updateMyUser',
    async (data: IUpdateMyUser) => {
        const result = await api.updateMyUser(data);

        return result.data;
    },
);

export const addFriend = createAsyncThunk<IUser, IAddFriend>(
    'myUser/addFriend',
    async (data: IAddFriend) => {
        const result = await api.addFriend(data);

        return result.data;
    },
);
