import { Dayjs } from 'dayjs';

export interface ICandidate {
    email?: string;
    firstName?: string;
}

export interface IUser {
    id: string;
    email: string;
    hasPassword: boolean;
    isActivated: boolean;
    lang: 'en' | 'uk';
    showedInfo: boolean;
    firstLoaded: boolean;
    firstName: string;
    lastName?: string;
    birthday?: Dayjs;
    avatar?: string;
    wishList: string[];
    successfulWishes: number;
    unsuccessfulWishes: number;
    friends: string[];
    followFrom: string[];
    followTo: string[];
}

export type TCurrentAvatar = (File | 'delete' | string);
