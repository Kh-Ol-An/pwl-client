import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '@/i18n/languages/en.json';
import uk from '@/i18n/languages/uk.json';
import { ELang } from "@/models/IUser";

const resources = {
    en: { translation: en },
    uk: { translation: uk }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: ELang.UK,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
