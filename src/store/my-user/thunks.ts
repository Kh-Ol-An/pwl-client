import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/store/my-user/api';
import {
    IAddFriend,
    IDeleteMyUser,
    ILogin,
    IRegistration,
    IRemoveFriend,
    IUpdateMyUser,
    IChangePassword,
} from '@/store/my-user/types';
import { IAuth } from '@/models/IAuth';
import { IUser } from '@/models/IUser';

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

export const changePassword = createAsyncThunk<any, IChangePassword>(
    'myUser/changePassword',
    async (data: IChangePassword) => {
        return await api.changePassword(data);
    },
);

export const deleteMyUser = createAsyncThunk<IUser['id'], IDeleteMyUser>(
    'myUser/deleteMyUser',
    async (data: IDeleteMyUser) => {
        const result = await api.deleteMyUser(data);

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

export const removeFriend = createAsyncThunk<IUser, IRemoveFriend>(
    'myUser/removeFriend',
    async (data: IRemoveFriend) => {
        const result = await api.removeFriend(data);

        return result.data;
    },
);
