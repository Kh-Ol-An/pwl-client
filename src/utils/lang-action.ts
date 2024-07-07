import i18next from 'i18next';
import { IUser } from '@/models/IUser';

export const getLang = (): IUser['lang'] => {
    if (i18next.language.includes('en')) return 'en';
    if (i18next.language.includes('uk')) return 'uk';
    return 'uk';
}

export const getMonthWithDate = (): 'MMMM Do' | 'DD MMMM' => {
    if (i18next.language.includes('en')) return 'MMMM Do';
    if (i18next.language.includes('uk')) return 'DD MMMM';
    return 'DD MMMM';
}

export const getFullShortDate = (): 'MM/DD/YYYY' | 'DD.MM.YYYY' => {
    if (i18next.language.includes('en')) return 'MM/DD/YYYY';
    if (i18next.language.includes('uk')) return 'DD.MM.YYYY';
    return 'DD.MM.YYYY';
}

export const getFullDate = (): 'MMMM DD, YYYY' | 'DD MMMM YYYY' => {
    if (i18next.language.includes('en')) return 'MMMM DD, YYYY';
    if (i18next.language.includes('uk')) return 'DD MMMM YYYY';
    return 'DD MMMM YYYY';
}
