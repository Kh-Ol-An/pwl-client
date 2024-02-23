import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { IUser } from '../../models/IUser';
import { IWish } from '../../models/IWish';
import { ICreateWish } from './types';

const createWish = async ({ userId, name, price, description, images }: ICreateWish): Promise<AxiosResponse<IWish>> => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);

    if (images && Array.isArray(images)) {
        images.forEach((image, index) => {
            if (image instanceof File) {
                formData.append(`image${index + 1}`, image);
            }
        });
    }

    try {
        return await api.post(
            '/wish',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось додати бажання.', { type: 'error' });
        throw error;
    }
}

const getWishList = async (userId: IUser['id']): Promise<AxiosResponse<IWish[]>> => {
    try {
        return await api.get(
            '/wishes',
            {
                params: {
                    userId
                }
            }
        );
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось отримати всі бажання.', { type: 'error' })
        throw error;
    }
}

const wishApi = {
    createWish,
    getWishList,
};

export default wishApi;
