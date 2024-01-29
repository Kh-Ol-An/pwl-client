import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { API_URL } from '../utils/api';
import AuthService from '../services/AuthService';
import { IUser } from '../models/IUser';
import { IAuthResponse } from '../models/response/IAuthResponse';

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async registration(email: string, password: string) {
        this.setLoading(true);
        try {
            const response = await AuthService.registration(email, password);
            console.log('registration: ', response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) { // TODO: any
            console.error(e.response?.data?.message); // TODO: notification
        } finally {
            this.setLoading(false);
        }
    }

    async login(email: string, password: string) {
        this.setLoading(true);
        try {
            const response = await AuthService.login(email, password);
            console.log('login: ', response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) { // TODO: any
            console.error(e.response?.data?.message); // TODO: notification
        } finally {
            this.setLoading(false);
        }
    }

    async logout() {
        this.setLoading(true);
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) { // TODO: any
            console.error(e.response?.data?.message); // TODO: notification
        } finally {
            this.setLoading(false);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, { withCredentials: true });

            console.log('checkAuth: ', response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) { // TODO: any
            console.error(e.response?.data?.message); // TODO: notification
        } finally {
            this.setLoading(false);
        }
    }
}
