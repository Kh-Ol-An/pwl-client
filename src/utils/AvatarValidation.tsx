import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TCurrentAvatar } from '@/models/IUser';
import { ALLOWED_FILE_EXTENSIONS, ALLOWED_MAX_FILE_SIZE_IN_MB } from '@/utils/constants';

interface IProps {
    avatar: TCurrentAvatar;
}

const AvatarValidation: FC<IProps> = ({ avatar }) => {
    const { t } = useTranslation();

    if (!(avatar instanceof File)) {
        return null;
    }

    // --------------------------------------------------

    const fileExtension = avatar.type.split('/')[1];
    if (!Object.keys(ALLOWED_FILE_EXTENSIONS).includes(fileExtension)) {
        return (
            <p className="error">
                { t('avatar-error.file-type') } { Object.keys(ALLOWED_FILE_EXTENSIONS).join(', ') }.
            </p>
        );
    }

    // --------------------------------------------------

    if (avatar.size > ALLOWED_MAX_FILE_SIZE_IN_MB * 1024 * 1024) {
        return (
            <p className="error">
                { t('avatar-error.file-size', { size: ALLOWED_MAX_FILE_SIZE_IN_MB }) }
            </p>
        );
    }

    return null;
};

export default AvatarValidation;
