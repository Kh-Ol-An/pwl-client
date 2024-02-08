import { Dayjs } from 'dayjs';

export interface IUser {
    id: string;
    name: string;
    email: string;
    birthday: Dayjs;
    avatar?: string;
    isActivated: boolean;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}

export interface IWish {
    id: string;
    userId: string;
    title: string;
    description: string;
    image: string;
    link: boolean;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
