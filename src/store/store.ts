import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import Auth from '../services/auth';
import User from '../services/user';
import { IUser } from '../models/IUser';
import { Dayjs } from 'dayjs';

export default class Store {
    myUser: IUser | null = null;
    users = [] as IUser[];
    isAuth = false;
    waitRegistration = false;
    waitLogin = false;
    waitLogout = false;
    waitCheckAuth = false;
    waitUsers = false;
    waitSendMyUser = false;

    constructor() {
        makeAutoObservable(this);
    }

    setMyUser(user: IUser | null) {
        this.myUser = user;
    }

    setUsers(users: IUser[]) {
        this.users = users;
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setWaitRegistration(bool: boolean) {
        this.waitRegistration = bool;
    }

    setWaitLogin(bool: boolean) {
        this.waitLogin = bool;
    }

    setWaitLogout(bool: boolean) {
        this.waitLogout = bool;
    }

    setWaitCheckAuth(bool: boolean) {
        this.waitCheckAuth = bool;
    }

    setWaitUsers(bool: boolean) {
        this.waitUsers = bool;
    }

    setWaitSendMyUser(bool: boolean) {
        this.waitSendMyUser = bool;
    }

    async registration(name: string, email: string, password: string) {
        if (this.waitRegistration) return;

        this.setWaitRegistration(true);
        try {
            const response = await Auth.registration(name, email, password);

            await localStorage.setItem('token', response.data.accessToken);
            await this.setAuth(true);
            await this.setMyUser(response.data.user);
            window.location.href = '/';
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось зареєструватися.', { type: 'error' });
        } finally {
            this.setWaitRegistration(false);
        }
    }

    async login(email: string, password: string) {
        if (this.waitLogin) return;

        this.setWaitLogin(true);
        try {
            const response = await Auth.login(email, password);

            await localStorage.setItem('token', response.data.accessToken);
            await this.setAuth(true);
            await this.setMyUser(response.data.user);
            window.location.href = '/';
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось авторизуватись.', { type: 'error' });
        } finally {
            this.setWaitLogin(false);
        }
    }

    async logout() {
        if (this.waitLogout) return;

        this.setWaitLogout(true);
        try {
            await Auth.logout();
            await localStorage.removeItem('token');
            await this.setAuth(false);
            await this.setMyUser({} as IUser);
            window.location.href = '/welcome';
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось вийти.', { type: 'error' });
        } finally {
            this.setWaitLogout(false);
        }
    }

    async checkAuth(withNotify = true) {
        if (this.waitCheckAuth) return;

        this.setWaitCheckAuth(true);
        try {
            const response = await Auth.refresh();

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setMyUser(response.data.user);
        } catch (e: any) {
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setMyUser(null);
            withNotify && toast(e.response?.data?.message || 'Не вдалось оновити сесію.', { type: 'error' });
        } finally {
            this.setWaitCheckAuth(false);
        }
    }

    async getUsers() {
        if (this.waitUsers) return;

        this.setWaitUsers(true);
        try {
            const response = await User.fetchUsers();

            this.setUsers(response.data);
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось отримати всіх юзерів.', { type: 'error' });
        } finally {
            this.setWaitUsers(false);
        }
    }

    async updateUser(id: string, name: string, birthday: Dayjs) {
        if (this.waitSendMyUser) return;

        this.setWaitSendMyUser(true);
        try {
            const response = await User.saveMyUser(id, name, birthday);

            await this.setMyUser(response.data);
            window.location.href = '/';
        } catch (e: any) {
            toast(e.response?.data?.message || 'Не вдалось зберегти твої дані.', { type: 'error' });
        } finally {
            this.setWaitSendMyUser(false);
        }
    }
}
