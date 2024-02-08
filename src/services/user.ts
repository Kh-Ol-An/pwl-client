import $api from '../utils/api';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';
import { Dayjs } from 'dayjs';

export default class User {
    static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }

    static async saveMyUser(id: string, name: string, birthday: Dayjs, avatar: File | null): Promise<AxiosResponse<IUser>> {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('birthday', birthday.format('DD.MM.YYYY'));
        if (avatar) {
            formData.append('avatar', avatar);
        }

        return $api.post<IUser>(
            '/user',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    }
}
