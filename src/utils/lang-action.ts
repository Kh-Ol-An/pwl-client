import i18next from 'i18next';
import { ELang } from '@/models/IUser';

export const getLang = (): ELang => {
    if (i18next.language.includes(ELang.EN)) return ELang.EN;
    if (i18next.language.includes(ELang.UK)) return ELang.UK;
    return ELang.UK;
}

export const getMonthWithDate = (): 'MMMM Do' | 'DD MMMM' => {
    if (i18next.language.includes(ELang.EN)) return 'MMMM Do';
    if (i18next.language.includes(ELang.UK)) return 'DD MMMM';
    return 'DD MMMM';
}

export const getFullShortDate = (): 'MM/DD/YYYY' | 'DD.MM.YYYY' => {
    if (i18next.language.includes(ELang.EN)) return 'MM/DD/YYYY';
    if (i18next.language.includes(ELang.UK)) return 'DD.MM.YYYY';
    return 'DD.MM.YYYY';
}

export const getFullDate = (): 'MMMM DD, YYYY' | 'DD MMMM YYYY' => {
    if (i18next.language.includes(ELang.EN)) return 'MMMM DD, YYYY';
    if (i18next.language.includes(ELang.UK)) return 'DD MMMM YYYY';
    return 'DD MMMM YYYY';
}
