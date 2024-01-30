import axios from 'axios';
import { toast } from 'react-toastify';
import AuthService from '../services/AuthService';

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                return $api.request(originalRequest);
            } catch (e: any) {
                toast(e.response?.data?.message || 'Не вдалось оновити сесію.', { type: 'error' });
            }
        }
        throw error;
    }
);

export default $api;
