import React, { FC } from 'react';
import { ICurrentAvatar } from '../models/IUser';
import { ALLOWED_FILE_EXTENSIONS, ALLOWED_MAX_FILE_SIZE_IN_MB } from '../utils/constants';

interface IProps {
    avatar: ICurrentAvatar;
}

const AvatarValidation: FC<IProps> = ({ avatar }) => {
    if (!(avatar instanceof File)) {
        return null;
    }

    // --------------------------------------------------

    const fileExtension = avatar.type.split('/')[1];
    if (!Object.keys(ALLOWED_FILE_EXTENSIONS).includes(fileExtension)) {
        return (
            <p className="error">
                Аватар має непідтримуваний формат. Підтримувані формати: {Object.keys(ALLOWED_FILE_EXTENSIONS).join(', ')}.
            </p>
        );
    }

    // --------------------------------------------------

    if (avatar.size > ALLOWED_MAX_FILE_SIZE_IN_MB * 1024 * 1024) {
        return (
            <p className="error">
                Аватар перевищує розмір {ALLOWED_MAX_FILE_SIZE_IN_MB} МБ.
            </p>
        );
    }

   return null;
};

export default AvatarValidation;
