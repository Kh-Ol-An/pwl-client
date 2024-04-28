import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import api from '@/utils/api';
import {
    IBookWish,
    IActionWish,
    ICreateWish,
    ISendWishList,
    IUpdateWish,
    IGetWish,
    ISendWish
} from '@/store/wishes/types';
import { IUser } from '@/models/IUser';
import { TCurrentImage, IWish } from '@/models/IWish';

const processCommonFields = (formData: FormData, commonFields: { [key: string]: string | boolean }) => {
    for (const [key, value] of Object.entries(commonFields)) {
        formData.append(key, value.toString());
    }
};

const processImages = (formData: FormData, images: TCurrentImage[]) => {
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

const createWish = async ({ userId, material, show, name, price, currency, address, description, images }: ICreateWish): Promise<AxiosResponse<IWish>> => {
    const formData = new FormData();
    processCommonFields(formData, { userId, material, show, name });
    price && processCommonFields(formData, { price });
    currency && processCommonFields(formData, { currency });
    address && processCommonFields(formData, { address });
    description && processCommonFields(formData, { description });
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

const updateWish = async ({ id, userId, material, show, name, price, currency, address, description, images }: IUpdateWish): Promise<AxiosResponse<IWish>> => {
    const formData = new FormData();
    formData.append('id', id);
    processCommonFields(formData, { userId, material, show, name });
    price && processCommonFields(formData, { price });
    currency && processCommonFields(formData, { currency });
    address && processCommonFields(formData, { address });
    description && processCommonFields(formData, { description });
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

const getWishList = async (params: ISendWishList): Promise<AxiosResponse<IWish[]>> => {
    try {
        return await api.get('/wishes', { params });
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось отримати всі бажання.', { type: 'error' });
        throw error;
    }
};

const getWish = async (params: ISendWish): Promise<AxiosResponse<IGetWish>> => {
    try {
        return await api.get('/wish', { params });
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось отримати бажання.', { type: 'error' });
        throw error;
    }
};

const bookWish = async (data: IBookWish): Promise<AxiosResponse<IWish>> => {
    try {
        return await api.post('/wish/book', data);
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось забронювати бажання.', { type: 'error' });
        throw error;
    }
};

const cancelBookWish = async (data: IActionWish): Promise<AxiosResponse<IWish>> => {
    try {
        return await api.post('/wish/cancel-book', data);
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось скасувати бронювання бажання.', { type: 'error' });
        throw error;
    }
};

const doneWish = async (data: IActionWish): Promise<AxiosResponse<{ executorUser: IUser, bookedWish: IWish }>> => {
    try {
        return await api.post('/wish/done', data);
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось позначити бажання виконаним.', { type: 'error' });
        throw error;
    }
};

const undoneWish = async (data: IActionWish): Promise<AxiosResponse<{ executorUser: IUser, bookedWish: IWish }>> => {
    try {
        return await api.post('/wish/undone', data);
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось позначити бажання не виконаним.', { type: 'error' });
        throw error;
    }
};

const wishApi = {
    createWish,
    updateWish,
    deleteWish,
    getWishList,
    getWish,
    bookWish,
    cancelBookWish,
    doneWish,
    undoneWish,
};

export default wishApi;
