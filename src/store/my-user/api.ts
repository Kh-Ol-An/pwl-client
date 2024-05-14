import axios, { AxiosResponse } from 'axios';
import { t } from 'i18next';
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
        toast(
            error.response?.data?.message || t('alerts.my-user-api.registration.error'),
            { type: 'error' },
        );
        throw error;
    }
};

const googleAuthorization = async (data: IGoogleAuth): Promise<AxiosResponse<IAuth>> => {
    try {
        const response = await api.post('/google-auth', data);
        localStorage.setItem('token', response.data.accessToken);
        return response;
    } catch (error: any) {
        toast(
            error.response?.data?.message || t('alerts.my-user-api.google-authorization.error'),
            { type: 'error' },
        );
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
        toast(
            error.response?.data?.message || t('alerts.my-user-api.login.error'),
            { type: 'error' },
        );
        throw error;
    }
};

const logout = async (): Promise<void> => {
    try {
        await api.post('/logout');
        localStorage.removeItem('token');
    } catch (error: any) {
        toast(
            error.response?.data?.message || t('alerts.my-user-api.logout.error'),
            { type: 'error' },
        );
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
        console.log('my-user refresh error: ', error.response?.data?.message || t('alerts.my-user-api.refresh.error'));
        localStorage.removeItem('token');
        throw error;
    }
};

const sendActivationLink = async (userId: IUser['id']): Promise<AxiosResponse<IUser['email']>> => {
    try {
        return await api.get(`/get-activation-link/${userId}`);
    } catch (error: any) {
        toast(
            error.response?.data?.message || t('alerts.my-user-api.send-activation-link.error'),
            { type: 'error' },
        )
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
            t('alerts.my-user-api.change-forgotten-password.success'),
            { type: 'success' },
        );
    } catch (error: any) {
        toast(
            error.response?.data?.message || t('alerts.my-user-api.change-forgotten-password.error'),
            { type: 'error' },
        );
        throw error;
    }
};

const forgotPassword = async (data: IForgotPassword): Promise<void> => {
    try {
        await api.put('/forgot-password', data);
        toast(
            t('alerts.my-user-api.forgot-password.success', { email: data.email }),
            { type: 'success' },
        );
    } catch (error: any) {
        toast(
            error.response?.data?.message || t('alerts.my-user-api.forgot-password.error', { email: data.email }),
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
            t('alerts.my-user-api.change-password.success'),
            { type: 'success' },
        );
    } catch (error: any) {
        toast(
            error.response?.data?.message || t('alerts.my-user-api.change-password.error'),
            { type: 'error' },
        );
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
        toast(
            error.response?.data?.message || t('alerts.my-user-api.update-my-user.error'),
            { type: 'error' },
        );
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
        localStorage.removeItem('token');
        return response;
    } catch (error: any) {
        toast(
            error.response?.data?.message || t('alerts.my-user-api.delete-my-user.error', { userId: data.id }),
            { type: 'error' },
        );
        throw error;
    }
};

const addFriend = async (data: IAddFriend): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.post('/friend', data);
    } catch (error: any) {
        toast(
            error.response?.data?.message || t('alerts.my-user-api.add-friend.error'),
            { type: 'error' },
        );
        throw error;
    }
};

const removeFriend = async (data: IRemoveFriend): Promise<AxiosResponse<IUser>> => {
    try {
        return await api.delete('/friend', { data });
    } catch (error: any) {
        toast(
            error.response?.data?.message || t('alerts.my-user-api.remove-friend.error'),
            { type: 'error' },
        );
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
