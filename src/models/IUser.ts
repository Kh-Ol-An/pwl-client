import { Dayjs } from 'dayjs';

export interface ICandidate {
    email?: string;
    firstName?: string;
}

export enum ELang {
    EN = 'en',
    UK = 'uk',
}

export interface IUser {
    id: string;
    email: string;
    hasPassword: boolean;
    isActivated: boolean;
    lang: ELang;
    showedInfo: boolean; // показую інструкцію як встановити PWA додаток
    firstLoaded: boolean; // має показувати модалку з редагуванням профілю. Але зараз такої модалки немає і замість неї сторінка з профілем. Тож поки це поле не задіяне
    firstName: string;
    lastName?: string;
    avatar?: string;
    deliveryAddress?: string;
    birthday?: Dayjs;
    wishList: string[];
    successfulWishes: number;
    unsuccessfulWishes: number;
    friends: string[];
    followFrom: string[];
    followTo: string[];
}

export type TCurrentAvatar = (File | 'delete' | string);
