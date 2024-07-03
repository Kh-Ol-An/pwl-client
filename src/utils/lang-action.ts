import i18next from 'i18next';
import { IUser } from '@/models/IUser';

export const getLang = (): IUser['lang'] => {
    if (i18next.language.includes('en')) return 'en';
    if (i18next.language.includes('uk')) return 'uk';
    return 'en';
}

export const getMonthWithDate = (): 'MMMM Do' | 'DD MMMM' => {
    if (i18next.language.includes('en')) return 'MMMM Do';
    if (i18next.language.includes('uk')) return 'DD MMMM';
    return 'MMMM Do';
}

export const getFullShortDate = (): 'MM/DD/YYYY' | 'DD.MM.YYYY' => {
    if (i18next.language.includes('en')) return 'MM/DD/YYYY';
    if (i18next.language.includes('uk')) return 'DD.MM.YYYY';
    return 'MM/DD/YYYY';
}

export const getFullDate = (): 'MMMM DD, YYYY' | 'DD MMMM YYYY' => {
    if (i18next.language.includes('en')) return 'MMMM DD, YYYY';
    if (i18next.language.includes('uk')) return 'DD MMMM YYYY';
    return 'MMMM DD, YYYY';
}