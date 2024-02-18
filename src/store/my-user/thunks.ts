import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { IAuth } from '../../models/IAuth';
import { IUser } from '../../models/IUser';
import {ILogin, IRegistration, IUpdateMyUser} from './types';

export const registration = createAsyncThunk<IAuth, IRegistration>(
    'myUser/registration',
    async (data) => {
        try {
            const result = await api.registration(data);
            localStorage.setItem('token', result.data.accessToken);

            return result.data;
        } catch (error: any) {
            console.log('error: ', error);
            localStorage.removeItem('token');
            throw error;
        }
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
        const result = await api.logout();

        console.log('result: ', result); // TODO change any type
        return result;
    },
);

export const checkAuth = createAsyncThunk<IAuth, void>(
    'myUser/checkAuth',
    async () => {
        try {
            const result = await api.refresh();

            localStorage.setItem('token', result.data.accessToken);

            return result.data;
        } catch (error: any) {
            console.log('error: ', error);
            localStorage.removeItem('token');
            throw error;
        }
    },
);

export const updateMyUser = createAsyncThunk<IUser, IUpdateMyUser>(
    'myUser/updateMyUser',
    async (data: IUpdateMyUser) => {
        const result = await api.updateMyUser(data);

        return result.data;
    },
);