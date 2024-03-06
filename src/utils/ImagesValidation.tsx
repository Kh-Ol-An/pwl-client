import React, { FC } from 'react';
import { ICurrentImage } from '../models/IWish';
import { ALLOWED_FILE_EXTENSIONS, ALLOWED_MAX_FILE_SIZE_IN_MB, MAX_NUMBER_OF_IMAGES_PER_WISH } from './constants';

interface IProps {
    images: ICurrentImage[];
}

const ImagesValidation: FC<IProps> = ({ images }) => {
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
                Один або декілька файлів мають непідтримуваний формат. Підтримувані формати: {Object.keys(ALLOWED_FILE_EXTENSIONS).join(', ')}.
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
                Один або декілька файлів перевищують розмір {ALLOWED_MAX_FILE_SIZE_IN_MB} МБ.
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
                На жаль неможливо зберегти більш ніж {MAX_NUMBER_OF_IMAGES_PER_WISH} зображень.
            </p>
        );
    }

   return null;
};

export default ImagesValidation;
