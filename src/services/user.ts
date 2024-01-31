import $api from '../utils/api';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';

export default class User {
    static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }
}
