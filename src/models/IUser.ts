import { Dayjs } from 'dayjs';

export interface ICandidate {
    firstName?: string;
    email?: string;
}

export interface IUser {
    id: string;
    firstName: string;
    lastName?: string;
    hasPassword: boolean;
    email: string;
    lang: 'en' | 'uk';
    firstLoaded: boolean;
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

export type TCurrentAvatar = (File | 'delete' | string);
