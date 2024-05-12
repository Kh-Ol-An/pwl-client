import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TCurrentImage } from '@/models/IWish';
import { ALLOWED_FILE_EXTENSIONS, ALLOWED_MAX_FILE_SIZE_IN_MB, MAX_NUMBER_OF_IMAGES_PER_WISH } from '@/utils/constants';

interface IProps {
    images: TCurrentImage[];
}

const ImagesValidation: FC<IProps> = ({ images }) => {
    const { t } = useTranslation();

    const extensionsValidation = images.some((image) => {
        if (image instanceof File) {
            const fileExtension = image.type.split('/')[1];
            return !Object.keys(ALLOWED_FILE_EXTENSIONS).includes(fileExtension);
        }

        return false;
    });

    if (extensionsValidation) {
        return (
            <p className="error">
                {t('images-error.file-type')} {Object.keys(ALLOWED_FILE_EXTENSIONS).join(', ')}.
            </p>
        );
    }

    // --------------------------------------------------

    const sizeValidation = images.some((image) => {
        if (image instanceof File) {
            return image.size > ALLOWED_MAX_FILE_SIZE_IN_MB * 1024 * 1024;
        }

        return false;
    });

    if (sizeValidation) {
        return (
            <p className="error">
                {t('images-error.file-size', { size: ALLOWED_MAX_FILE_SIZE_IN_MB })}
            </p>
        );
    }

    // --------------------------------------------------

    const imagesLength = images
        .filter((image) => image instanceof File || (!(image instanceof File) && !image.delete))
        .length;

    if (imagesLength > MAX_NUMBER_OF_IMAGES_PER_WISH) {
        return (
            <p className="error">
                {t('images-error.file-count', { count: MAX_NUMBER_OF_IMAGES_PER_WISH })}
            </p>
        );
    }

   return null;
};

export default ImagesValidation;
