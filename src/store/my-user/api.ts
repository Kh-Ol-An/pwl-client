import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { IAuth } from '../../models/IAuth';
import { IUser } from '../../models/IUser';
import { IAddFriend, ILogin, IRegistration, IRemoveFriend, IUpdateMyUser } from './types';

const registration = async (data: IRegistration): Promise<AxiosResponse<IAuth>> => {
    try {
        const response = await api.post('/registration', data);
        await localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось зареєструватись.', { type: 'error' });
        throw error;
    }
};

const login = async (data: ILogin): Promise<AxiosResponse<IAuth>> => {
    try {
        const response = await api.post('/login', data);
        await localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось увійти на сайт.', { type: 'error' });
        throw error;
    }
};

const logout = async (): Promise<void> => {
    try {
        await api.post('/logout');
        await localStorage.clear();
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось вийти з аккаунту.', { type: 'error' });
        throw error;
    }
};

const refresh = async (): Promise<AxiosResponse<IAuth>> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true });
        await localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
//        toast(error.response?.data?.message || 'Не вдалось оновити сесію.', { type: 'error' });
        console.log('myUserApi refresh error: ', error.response?.data?.message || 'Не вдалось оновити сесію.');
        await localStorage.removeItem('token');
        throw error;
    }
};

const updateMyUser = async ({
    id,
    firstName,
    lastName,
    birthday,
    avatar,
}: IUpdateMyUser): Promise<AxiosResponse<IUser>> => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('firstName', firstName);
    lastName && formData.append('lastName', lastName);
    birthday && formData.append('birthday', birthday);
    formData.append('avatar', avatar);

    try {
        return await api.put(
            '/user',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось оновити користувача.', { type: 'error' });
        throw error;
    }
};

const addFriend = async (data: IAddFriend): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.post('/friend', data);
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось додати друга.', { type: 'error' });
        throw error;
    }
};

const removeFriend = async (data: IRemoveFriend): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.delete('/friend', { data });
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось видалити друга.', { type: 'error' });
        throw error;
    }
};

const myUserApi = {
    registration,
    login,
    logout,
    refresh,
    updateMyUser,
    addFriend,
    removeFriend,
};

export default myUserApi;
