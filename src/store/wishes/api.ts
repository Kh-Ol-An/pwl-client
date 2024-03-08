import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { IUser } from '../../models/IUser';
import { ICurrentImage, IWish } from '../../models/IWish';
import { ICreateWish, IUpdateWish } from './types';

const processCommonFields = (formData: FormData, commonFields: { [key: string]: string | boolean }) => {
    for (const [key, value] of Object.entries(commonFields)) {
        formData.append(key, value.toString());
    }
};

const processImages = (formData: FormData, images: ICurrentImage[]) => {
    if (images && Array.isArray(images)) {
        images.forEach((image, idx) => {
            if (image instanceof File) {
                formData.append(`image-${idx}`, image);
            } else if (image) {
                formData.append(`image-${idx}`, JSON.stringify(image));
            }
        });
    }
};

const createWish = async ({ userId, material, name, price, link, description, images }: ICreateWish): Promise<AxiosResponse<IWish>> => {
    const formData = new FormData();
    processCommonFields(formData, { userId, material, name, description });
    price && processCommonFields(formData, { price });
    link && processCommonFields(formData, { link });
    processImages(formData, images);

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
};

const updateWish = async ({ id, userId, material, name, price, link, description, images }: IUpdateWish): Promise<AxiosResponse<IWish>> => {
    const formData = new FormData();
    formData.append('id', id);
    processCommonFields(formData, { userId, material, name, description });
    price && processCommonFields(formData, { price });
    link && processCommonFields(formData, { link });
    processImages(formData, images);

    try {
        return await api.put(
            '/wish',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось оновити бажання.', { type: 'error' });
        throw error;
    }
};

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
        toast(error.response?.data?.message || 'Не вдалось отримати всі бажання.', { type: 'error' });
        throw error;
    }
};

const deleteWish = async (userId: IUser['id'], wishId: IWish['id']): Promise<AxiosResponse<IWish['id']>> => {
    try {
        return await api.delete(
            '/wish',
            {
                params: {
                    userId,
                    wishId,
                }
            }
        );
    } catch (error: any) {
        toast(
            error.response?.data?.message || `Бажання з ідентифікатором ${wishId} не вдалось видалити.`,
            { type: 'error' },
        );
        throw error;
    }
};

const wishApi = {
    createWish,
    updateWish,
    getWishList,
    deleteWish,
};

export default wishApi;
