import $api from '../utils/api';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';
import { Dayjs } from 'dayjs';

export default class User {
    static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }

    static async saveMyUser(id: string, name: string, birthday: Dayjs): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('/user', { id, name, birthday });
    }
}
