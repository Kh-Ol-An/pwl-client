import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    WISH_DESCRIPTION_MIN_LENGTH,
    WISH_DESCRIPTION_MAX_LENGTH,
    WISH_PRICE_MAX_LENGTH,
} from '@/utils/constants';

// Only whitespace
export const onlyWhitespaceValidation = {
    validate: (value: string) => {
        if (!value) {
            return true;
        }
        const trimmedValue = value.trim();
        if (trimmedValue === '' && value.length > 0) {
            return "Введені дані не можуть містити тільки пробіли.";
        }
        return true;
    },
};

// Wish name
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
        value: NAME_MIN_LENGTH,
        message: `Що це за така коротка назва бажання? Придумай будь ласка назву яка довша за ${NAME_MIN_LENGTH - 1} символ.`
    },
    maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Назва твого бажання занадто довга. Давай намагатимемося вміститися в ${NAME_MAX_LENGTH} символів.`
    }
};

// Wish price
export const wishPriceValidation = {
    ...onlyWhitespaceValidation,
    required: {
        value: true,
        message: "Матеріальне бажання яке не має своєї ціни не може бути виконано твоїм всесвітом."
    },
    pattern: {
        value: /^(?!0)\d+(\s\d+)*$/,
        message: "Ціна має бути цілим, позитивним числом, та починатися не з \"0\"."
    },
    maxLength: {
        value: WISH_PRICE_MAX_LENGTH,
        message: `Дуже важко уявити що можна купити за ці гроші. Давай намагатимемося вміститися в ${WISH_PRICE_MAX_LENGTH} символів.`
    }
};

// Wish description
export const wishDescriptionValidation = {
    ...onlyWhitespaceValidation,
    minLength: {
        value: WISH_DESCRIPTION_MIN_LENGTH,
        message: `Що це за такий короткий опис бажання? Придумай будь ласка опис який довший за ${WISH_DESCRIPTION_MIN_LENGTH - 1} символ.`
    },
    maxLength: {
        value: WISH_DESCRIPTION_MAX_LENGTH,
        message: `Твій опис бажання занадто довгий. Давай намагатимемося вміститися в ${WISH_DESCRIPTION_MAX_LENGTH} символів.`
    }
};

// Email
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

// Password
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

// Account first name
export const accountFirstNameValidation = {
    ...onlyWhitespaceValidation,
    required: {
        value: true,
        message: "В тебе має бути ім'я. Не соромся)"
    },
    minLength: {
        value: NAME_MIN_LENGTH,
        message: `Ні разу не чув такого короткого імені. Мінімальна довжина поля ${NAME_MIN_LENGTH} символи.`
    },
    maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Здається ти щось вигадуєш. Максимальна довжина поля ${NAME_MAX_LENGTH} символів.`
    }
};

// Account last name
export const accountLastNameValidation = {
    ...onlyWhitespaceValidation,
    minLength: {
        value: NAME_MIN_LENGTH,
        message: `Ні разу не чув такого короткого прізвища. Мінімальна довжина поля ${NAME_MIN_LENGTH} символи.`
    },
    maxLength: {
        value: NAME_MAX_LENGTH,
        message: `Здається ти щось вигадуєш. Максимальна довжина поля ${NAME_MAX_LENGTH} символів.`
    }
};
