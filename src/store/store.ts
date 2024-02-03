import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import Auth from '../services/auth';
import User from '../services/user';
import { IUser } from '../models/IUser';
//import { sleep } from '../utils/sleep';

export default class Store {
    user = {} as IUser;
    users = [] as IUser[];
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setUsers(users: IUser[]) {
        this.users = users;
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
            const response = await Auth.registration(email, password);

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось зареєструватися.', { type: 'error' });
        } finally {
            this.setLoading(false);
        }
    }

    async login(email: string, password: string) {
        this.setLoading(true);
//        await sleep(1);
        try {
            const response = await Auth.login(email, password);

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось авторизуватись.', { type: 'error' });
        } finally {
            this.setLoading(false);
        }
    }

    async logout() {
        this.setLoading(true);
        try {
            await Auth.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось вийти.', { type: 'error' });
        } finally {
            this.setLoading(false);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await Auth.refresh();

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось оновити сесію.', { type: 'error' });
        } finally {
            this.setLoading(false);
        }
    }

    async getUsers() {
        this.setLoading(true);
        try {
            const response = await User.fetchUsers();

            this.setUsers(response.data);
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось отримати всіх юзерів.', { type: 'error' });
        } finally {
            this.setLoading(false);
        }
    }
}
