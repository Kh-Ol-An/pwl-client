import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import api from '@/utils/api';
import {
    IAddFriend,
    IChangeForgottenPassword,
    IChangePassword,
    IDeleteMyUser,
    IForgotPassword,
    IGoogleAuth,
    ILogin,
    IRegistration,
    IRemoveFriend,
    IUpdateMyUser,
} from '@/store/my-user/types';
import { IAuth } from '@/models/IAuth';
import { IUser } from '@/models/IUser';
import { encryptedData } from '@/utils/encryption-data';

const registration = async (data: IRegistration): Promise<AxiosResponse<IAuth>> => {
    try {
        if (!process.env.REACT_APP_CRYPTO_JS_SECRET) {
            return Promise.reject('REACT_APP_CRYPTO_JS_SECRET is not defined.');
        }

        const encryptedPassword = encryptedData(data.password, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const response = await api.post('/registration', { ...data, password: encryptedPassword });
        localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось зареєструватись.', { type: 'error' });
        throw error;
    }
};

const googleAuthorization = async (data: IGoogleAuth): Promise<AxiosResponse<IAuth>> => {
    try {
        const response = await api.post('/google-auth', data);
        localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось увійти за допомогою Google.', { type: 'error' });
        throw error;
    }
};

const login = async (data: ILogin): Promise<AxiosResponse<IAuth>> => {
    try {
        if (!process.env.REACT_APP_CRYPTO_JS_SECRET) {
            return Promise.reject('REACT_APP_CRYPTO_JS_SECRET is not defined.');
        }

        const encryptedPassword = encryptedData(data.password, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const response = await api.post('/login', { ...data, password: encryptedPassword });
        localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось увійти на сайт.', { type: 'error' });
        throw error;
    }
};

const logout = async (): Promise<void> => {
    try {
        await api.post('/logout');
        localStorage.clear();
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось вийти з аккаунту.', { type: 'error' });
        throw error;
    }
};

const refresh = async (): Promise<AxiosResponse<IAuth>> => {
    try {
        const response = await axios.get(
            `${
                process.env.NODE_ENV === 'development'
                    ? process.env.REACT_APP_DEV_API_URL
                    : process.env.REACT_APP_API_URL
            }/refresh`,
            { withCredentials: true },
        );
        localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
//        toast(error.response?.data?.message || 'Не вдалось оновити сесію.', { type: 'error' });
        console.log('myUserApi refresh error: ', error.response?.data?.message || 'Не вдалось оновити сесію.');
        localStorage.removeItem('token');
        throw error;
    }
};

const sendActivationLink = async (userId: IUser['id']): Promise<AxiosResponse<IUser['email']>> => {
    try {
        return await api.get(`/get-activation-link/${userId}`);
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось надіслати посилання активації.', { type: 'error' })
        throw error;
    }
}

const changeForgottenPassword = async (data: IChangeForgottenPassword): Promise<void> => {
    try {
        if (!process.env.REACT_APP_CRYPTO_JS_SECRET) {
            return Promise.reject('REACT_APP_CRYPTO_JS_SECRET is not defined.');
        }

        const encryptedNewPassword = encryptedData(data.newPassword, process.env.REACT_APP_CRYPTO_JS_SECRET);
        await api.put('/change-forgotten-password', { ...data, newPassword: encryptedNewPassword });
        toast(
            'Пароль успішно змінено. Будь ласка, увійдіть за допомогою нового паролю.',
            { type: 'success' },
        );
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось змінити пароль.', { type: 'error' });
        throw error;
    }
};

const forgotPassword = async (data: IForgotPassword): Promise<void> => {
    try {
        await api.put('/forgot-password', data);
        toast(
            `Лист з інструкцією для зміни пароля успішно відправлено на пошту: ${data.email}. Будь ласка, увійдіть за допомогою нового паролю.`,
            { type: 'success' },
        );
    } catch (error: any) {
        toast(
            error.response?.data?.message
                || `Не вдалось відправити лист з інструкцією для зміни пароля на пошту: ${data.email}.`,
            { type: 'error' },
        );
        throw error;
    }
};

const changePassword = async (data: IChangePassword): Promise<void> => {
    try {
        if (!process.env.REACT_APP_CRYPTO_JS_SECRET) {
            return Promise.reject('REACT_APP_CRYPTO_JS_SECRET is not defined.');
        }

        const encryptedOldPassword = encryptedData(data.oldPassword, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const encryptedNewPassword = encryptedData(data.newPassword, process.env.REACT_APP_CRYPTO_JS_SECRET);
        await api.put('/change-password', {
            ...data,
            oldPassword: encryptedOldPassword,
            newPassword: encryptedNewPassword,
        });
        localStorage.removeItem('token');
        toast(
            'Пароль успішно змінено. Будь ласка, увійдіть за допомогою нового паролю.',
            { type: 'success' },
        );
    } catch (error: any) {
        toast(error.response?.data?.message || 'Не вдалось змінити пароль.', { type: 'error' });
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

const deleteMyUser = async (data: IDeleteMyUser): Promise<AxiosResponse<IUser['id']>> => {
    try {
        if (!process.env.REACT_APP_CRYPTO_JS_SECRET) {
            return Promise.reject('REACT_APP_CRYPTO_JS_SECRET is not defined.');
        }

        const encryptedPassword = encryptedData(data.password, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const response = await api.post('/user/delete', { ...data, password: encryptedPassword });
        localStorage.clear();
        return response;
    } catch (error: any) {
        toast(
            error.response?.data?.message || `Користувача з ідентифікатором ${data.id} не вдалось видалити.`,
            { type: 'error' },
        );
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
    googleAuthorization,
    login,
    logout,
    refresh,
    sendActivationLink,
    changeForgottenPassword,
    forgotPassword,
    changePassword,
    updateMyUser,
    deleteMyUser,
    addFriend,
    removeFriend,
};

export default myUserApi;
