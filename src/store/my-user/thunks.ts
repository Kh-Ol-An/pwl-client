import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { IAuth } from '../../models/IAuth';
import { IUser } from '../../models/IUser';
import {ILogin, IRegistration, IUpdateUser} from './types';

export const registration = createAsyncThunk<IAuth, IRegistration>(
    'myUser/registration',
    async ({ name, email, password }) => {
        const result = await api.post(
            '/registration',
            {
                name,
                email,
                password,
            },
        );

        return result.data;
    },
);

export const login = createAsyncThunk<IAuth, ILogin>(
    'myUser/login',
    async ({ email, password }) => {
        const result = await api.post(
            '/login',
            {
                email,
                password,
            },
        );

        return result.data;
    },
);

export const logout = createAsyncThunk<any, void>(
    'myUser/logout',
    async () => {
        const result = await api.post('/logout');

        console.log('result: ', result); // TODO change any type
        return result.data;
    },
);

export const checkAuth = createAsyncThunk<IAuth, void>(
    'myUser/checkAuth',
    async () => {
        const result = await api.get(
            `${process.env.REACT_APP_API_URL}/refresh`,
            { withCredentials: true },
        );

        return result.data;
    },
);

export const updateUser = createAsyncThunk<IUser, IUpdateUser>(
    'myUser/updateUser',
    async ({ id, name, birthday, avatar }) => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('birthday', birthday);
        formData.append('deleteAvatar', avatar === null ? 'true' : 'false');
        if (avatar) {
            formData.append('avatar', avatar);
        }

        const result = await api.post(
            '/user',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );

        return result.data;
    },
);