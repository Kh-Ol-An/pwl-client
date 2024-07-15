import { AxiosResponse } from 'axios';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import api from '@/utils/api';
import { IGetUsers, ISendAllUsersParams, ISendUsersParams } from '@/store/users/types';
import { IUser } from "@/models/IUser";

const getUsers = async (params: ISendUsersParams): Promise<AxiosResponse<IGetUsers>> => {
    try {
        return await api.get('/users', { params });
    } catch (error: any) {
        toast(error.response?.data?.message || t('alerts.users-api.get-users.error', { type: 'api.getUsers' }), { type: 'error' })
        throw error;
    }
}

const getAllUsers = async (params: ISendAllUsersParams): Promise<AxiosResponse<IUser[]>> => {
    try {
        return await api.get('/all-users', { params });
    } catch (error: any) {
        toast(error.response?.data?.message || t('alerts.users-api.get-all-users.error', { type: 'api.getAllUsers' }), { type: 'error' })
        throw error;
    }
}

const usersApi = {
    getUsers,
    getAllUsers,
};

export default usersApi;
