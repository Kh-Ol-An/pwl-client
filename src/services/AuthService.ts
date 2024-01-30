import axios, { AxiosResponse } from 'axios';
import $api from '../utils/api';
import { IAuthResponse } from '../models/response/IAuthResponse';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/login', { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/registration', { email, password });
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }

    static async refresh(): Promise<AxiosResponse<IAuthResponse>> {
        return axios.get<IAuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true });
    }
}
