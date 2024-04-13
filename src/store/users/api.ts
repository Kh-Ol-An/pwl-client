import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import api from '@/utils/api';
import { IGetUsers, ISendUsersParams } from '@/store/users/types';

const getUsers = async (params: ISendUsersParams): Promise<AxiosResponse<IGetUsers>> => {
    try {
        return await api.get('/users', { params });
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось отримати користувачів.', { type: 'error' })
        throw error;
    }
}

const usersApi = {
    getUsers,
};

export default usersApi;
