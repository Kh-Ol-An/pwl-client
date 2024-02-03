import axios, { AxiosResponse } from 'axios';
import $api from '../utils/api';
import { IAuth } from '../models/IAuth';

export default class Auth {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuth>> {
        return $api.post<IAuth>('/login', { email, password });
    }

    static async registration(name: string, email: string, password: string): Promise<AxiosResponse<IAuth>> {
        return $api.post<IAuth>('/registration', { name, email, password });
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }

    static async refresh(): Promise<AxiosResponse<IAuth>> {
        return axios.get<IAuth>(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true });
    }
}
