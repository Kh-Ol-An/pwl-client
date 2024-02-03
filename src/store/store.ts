import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import Auth from '../services/auth';
import User from '../services/user';
import { IUser } from '../models/IUser';

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

    async registration(name: string, email: string, password: string) {
        this.setLoading(true);
        try {
            const response = await Auth.registration(name, email, password);

            await localStorage.setItem('token', response.data.accessToken);
            await this.setAuth(true);
            await this.setUser(response.data.user);
            window.location.href = '/';
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось зареєструватися.', { type: 'error' });
        } finally {
            this.setLoading(false);
        }
    }

    async login(email: string, password: string) {
        this.setLoading(true);
        try {
            const response = await Auth.login(email, password);

            await localStorage.setItem('token', response.data.accessToken);
            await this.setAuth(true);
            await this.setUser(response.data.user);
            window.location.href = '/';
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
            await localStorage.removeItem('token');
            await this.setAuth(false);
            await this.setUser({} as IUser);
            window.location.href = '/welcome';
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось вийти.', { type: 'error' });
        } finally {
            this.setLoading(false);
        }
    }

    async checkAuth(withNotify = true) {
        if (this.isLoading) return;

        this.setLoading(true);
        try {
            const response = await Auth.refresh();

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
            withNotify && toast(e.response?.data?.message || 'Не вдалось оновити сесію.', { type: 'error' });
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
