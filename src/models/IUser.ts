import { Dayjs } from 'dayjs';

export interface IUser {
    id: string;
    name: string;
    email: string;
    birthday: Dayjs;
    avatar?: string;
    wishList: string[];
    isActivated: boolean;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}

export type ICurrentAvatar = (File | 'delete' | string);
