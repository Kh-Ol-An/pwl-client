import axios, { AxiosResponse } from 'axios';
import api from '../../utils/api';
import { IAuth } from '../../models/IAuth';
import { IUser } from '../../models/IUser';
import { ILogin, IRegistration, IUpdateMyUser } from './types';

const registration = async (data: IRegistration): Promise<AxiosResponse<IAuth>> => {
    return api.post('/registration', data);
}

const login = async (data: ILogin): Promise<AxiosResponse<IAuth>> => {
    return api.post('/login', data);
}

const logout = async (): Promise<void> => {
    return api.post('/logout');
}

const refresh = async (): Promise<AxiosResponse<IAuth>> => {
    return axios.get(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true });
}

const updateMyUser = async ({ id, name, birthday, avatar }: IUpdateMyUser): Promise<AxiosResponse<IUser>> => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('birthday', birthday);
    formData.append('deleteAvatar', avatar === null ? 'true' : 'false');
    if (avatar) {
        formData.append('avatar', avatar);
    }

    return api.post(
        '/user',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },);
}

const myUserApi = {
    registration,
    login,
    logout,
    refresh,
    updateMyUser,
};

export default myUserApi;
