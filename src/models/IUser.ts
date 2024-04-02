import { Dayjs } from 'dayjs';

export interface IUser {
    id: string;
    firstName: string;
    lastName?: string;
    hasPassword: boolean;
    email: string;
    birthday?: Dayjs;
    avatar?: string;
    wishList: string[];
    successfulWishes: number;
    unsuccessfulWishes: number;
    friends: string[];
    followFrom: string[];
    followTo: string[];
    isActivated: boolean;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}

export type ICurrentAvatar = (File | 'delete' | string);
