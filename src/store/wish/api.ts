import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { IWish } from '../../models/IUser';
import { ICreateWish } from './types';

const createWish = async ({ userId, name, price, description }: ICreateWish): Promise<AxiosResponse<IWish>> => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
//    formData.append('deleteAvatar', avatar === null ? 'true' : 'false');
//    if (avatar) {
//        formData.append('avatar', avatar);
//    }

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

const wishApi = {
    createWish,
};

export default wishApi;
