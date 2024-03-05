import { WISH_NAME_MAX_LENGTH, WISH_NAME_MIN_LENGTH } from './constants';

export const allFieldsValidation = {
    validate: (value: string) => {
        const trimmedValue = value.trim();
        if (trimmedValue === '' && value.length > 0) {
            return "Введені дані не можуть містити тільки пробіли.";
        }
        return true;
    },
};

export const wishNameValidation = {
    ...allFieldsValidation,
    required: {
        value: true,
        message: "Неможливо створити бажання без назви."
    },
    pattern: {
        value: /^[a-zA-Zа-яА-ЯіІїЇ'єЄ0-9\s-!"№#$%&()*,;=?@_]+$/,
        message: "Назва бажання містить недопустимі символи. Будь ласка, використовуй лише літери латинського або кириличного алфавітів, цифри, пробіли та наступні символи: -!\"№#$%&()*,;=?@_"
    },
    minLength: {
        value: WISH_NAME_MIN_LENGTH,
        message: `Назва твого бажання занадто довга. Давай намагатимемося вміститися в ${WISH_NAME_MIN_LENGTH} символів.`
    },
    maxLength: {
        value: WISH_NAME_MAX_LENGTH,
        message: `Що це за така коротка назва бажання? Придумай будь ласка назву яка довша за ${WISH_NAME_MAX_LENGTH - 1} символ.`
    }
};

export const wishPriceValidation = {
    ...allFieldsValidation,
    required: {
        value: true,
        message: "Матеріальне бажання яке не має своєї ціни не може бути виконано твоїм всесвітом."
    },
};
