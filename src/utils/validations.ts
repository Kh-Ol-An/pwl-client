import { t } from 'i18next';
import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    WISH_NAME_MAX_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    WISH_DESCRIPTION_MIN_LENGTH,
    WISH_PRICE_MAX_LENGTH,
    DELIVERY_ADDRESS_MIN_LENGTH,
    DELIVERY_ADDRESS_MAX_LENGTH,
} from '@/utils/constants';

// Only whitespace
export const onlyWhitespaceValidation = {
    validate: (value?: string) => {
        if (!value) {
            return true;
        }
        const trimmedValue = value.trim();
        if (trimmedValue === '' && value.length > 0) {
            return t('validations.only-whitespace');
        }
        return true;
    },
};

// Wish name
export const wishNameValidation = {
    ...onlyWhitespaceValidation,
    required: {
        value: true,
        message: t('validations.wish-name.required')
    },
    minLength: {
        value: NAME_MIN_LENGTH,
        message: t('validations.wish-name.min', { min: NAME_MIN_LENGTH - 1 })
    },
    maxLength: {
        value: WISH_NAME_MAX_LENGTH,
        message: t('validations.wish-name.max', { max: WISH_NAME_MAX_LENGTH })
    }
};

// Wish price
export const wishPriceValidation = {
    ...onlyWhitespaceValidation,
    required: {
        value: true,
        message: t('validations.wish-price.required')
    },
    pattern: {
        value: /^(?!0)\d+(\s\d+)*$/,
        message: t('validations.wish-price.pattern')
    },
    maxLength: {
        value: WISH_PRICE_MAX_LENGTH,
        message: t('validations.wish-price.max', { max: WISH_PRICE_MAX_LENGTH })
    }
};

// Wish description
export const wishDescriptionValidation = {
    ...onlyWhitespaceValidation,
    minLength: {
        value: WISH_DESCRIPTION_MIN_LENGTH,
        message: t('validations.wish-price.min', { min: WISH_DESCRIPTION_MIN_LENGTH - 1 })
    },
};

// Email
export const emailValidation = {
    required: {
        value: true,
        message: t('validations.email.required')
    },
    validate: (value?: string) => {
        if (!value) {
            return true;
        }

        const trimmedValue = value.trim();
        if (trimmedValue === '' && value.length > 0) {
            return t('validations.email.only-whitespace');
        }

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(trimmedValue)) {
            return t('validations.email.pattern');
        }

        return true;
    },
};

// Password
export const passwordValidation = {
    required: {
        value: true,
        message: t('validations.password.required')
    },
    validate: (value: string) => {
        if (value[0] === ' ' || value[value.length - 1] === ' ') {
            return t('validations.password.whitespaces');
        }
        return true;
    },
    minLength: {
        value: PASSWORD_MIN_LENGTH,
        message: t('validations.password.min', { min: PASSWORD_MIN_LENGTH - 1 })
    },
    maxLength: {
        value: PASSWORD_MAX_LENGTH,
        message: t('validations.password.max', { max: PASSWORD_MAX_LENGTH })
    }
};

// Account first name
export const accountFirstNameValidation = {
    ...onlyWhitespaceValidation,
    required: {
        value: true,
        message: t('validations.first-name.required')
    },
    minLength: {
        value: NAME_MIN_LENGTH,
        message: t('validations.first-name.min', { min: NAME_MIN_LENGTH })
    },
    maxLength: {
        value: NAME_MAX_LENGTH,
        message: t('validations.first-name.max', { max: NAME_MAX_LENGTH })
    }
};

// Account last name
export const accountLastNameValidation = {
    ...onlyWhitespaceValidation,
    minLength: {
        value: NAME_MIN_LENGTH,
        message: t('validations.last-name.min', { min: NAME_MIN_LENGTH })
    },
    maxLength: {
        value: NAME_MAX_LENGTH,
        message: t('validations.last-name.max', { max: NAME_MAX_LENGTH })
    }
};

// Account delivery address
export const accountDeliveryAddress = {
    ...onlyWhitespaceValidation,
    minLength: {
        value: DELIVERY_ADDRESS_MIN_LENGTH,
        message: t('validations.delivery-address.min', { min: DELIVERY_ADDRESS_MIN_LENGTH })
    },
    maxLength: {
        value: DELIVERY_ADDRESS_MAX_LENGTH,
        message: t('validations.delivery-address.max', { max: DELIVERY_ADDRESS_MAX_LENGTH })
    },
};
