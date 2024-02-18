import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { IUser } from '../../models/IUser';

const getUsers = async (): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.get('/users');
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось отримати всіх користувачів.', { type: 'error' })
        throw error;
    }
}

const usersApi = {
    getUsers,
};

export default usersApi;
