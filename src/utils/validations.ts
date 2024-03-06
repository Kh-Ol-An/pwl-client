import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, WISH_NAME_MAX_LENGTH, WISH_NAME_MIN_LENGTH } from './constants';

export const onlyWhitespaceValidation = {
    validate: (value: string) => {
        const trimmedValue = value.trim();
        if (trimmedValue === '' && value.length > 0) {
            return "Введені дані не можуть містити тільки пробіли.";
        }
        return true;
    },
};

export const wishNameValidation = {
    ...onlyWhitespaceValidation,
    required: {
        value: true,
        message: "Неможливо створити бажання без назви."
    },
    pattern: {
        value: /^[a-zA-Zа-яА-ЯіІїЇ'єЄ0-9\s-!"№#$%&()*.,;=?@_]+$/,
        message: "Назва бажання містить недопустимі символи. Будь ласка, використовуй лише літери латинського або кириличного алфавітів, цифри, пробіли та наступні символи: -!\"№#$%&()*.,;=?@_"
    },
    minLength: {
        value: WISH_NAME_MIN_LENGTH,
        message: `Що це за така коротка назва бажання? Придумай будь ласка назву яка довша за ${WISH_NAME_MIN_LENGTH - 1} символ.`
    },
    maxLength: {
        value: WISH_NAME_MAX_LENGTH,
        message: `Назва твого бажання занадто довга. Давай намагатимемося вміститися в ${WISH_NAME_MAX_LENGTH} символів.`
    }
};

export const wishPriceValidation = {
    ...onlyWhitespaceValidation,
    required: {
        value: true,
        message: "Матеріальне бажання яке не має своєї ціни не може бути виконано твоїм всесвітом."
    },
};

export const emailValidation = {
    required: {
        value: true,
        message: "Це поле потрібне щоб я міг ідентифікувати тебе."
    },
    pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Це не схоже на електронну адресу. Будь ласка, введи правильну адресу.",
    },
};

export const passwordValidation = {
    required: {
        value: true,
        message: "Це поле потрібне щоб ніхто інший не зміг скористуватись твоїми даними."
    },
    validate: (value: string) => {
        if (value[0] === ' ' || value[value.length - 1] === ' ') {
            return "Введені дані не можуть починатись або закінчуватись пробілом.";
        }
        return true;
    },
    minLength: {
        value: PASSWORD_MIN_LENGTH,
        message: `Для безпеки даних які ти довіряєш нам зберігати давай придумаємо пароль довший за ${PASSWORD_MIN_LENGTH - 1} символи.`
    },
    maxLength: {
        value: PASSWORD_MAX_LENGTH,
        message: `Здається ти перестарався. Длиний пароль не завжди якісний пароль. Давай намагатимемося вміститися в ${PASSWORD_MAX_LENGTH} символів.`
    }
};

export const accountFirstNameValidation = {
    ...onlyWhitespaceValidation,
    required: {
        value: true,
        message: "В тебе має бути ім'я. Не соромся)"
    },
};
