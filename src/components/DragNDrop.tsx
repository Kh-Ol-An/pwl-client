import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { ICurrentImage, IImage } from '@/models/IWish';
import ImagesValidation from '@/utils/ImagesValidation';
import {
    ALLOWED_FILE_EXTENSIONS,
    ALLOWED_MAX_FILE_SIZE_IN_MB,
    MAX_NUMBER_OF_IMAGES_PER_WISH
} from '@/utils/constants';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    images: ICurrentImage[];
    setImages: (images: ICurrentImage[]) => void;
    removeAllImages: () => void;
}

const acceptTypes: { [key: string]: string[] } = {};
Object.keys(ALLOWED_FILE_EXTENSIONS).forEach((ext) => {
    const mimeType = ALLOWED_FILE_EXTENSIONS[ext];
    if (!acceptTypes[mimeType]) {
        acceptTypes[mimeType] = [];
    }
    acceptTypes[mimeType].push(`.${ext}`);
});

const DragNDrop: FC<IProps> = ({ images, setImages, removeAllImages }) => {
    const onDrop = useCallback((acceptedImages: File[]) => {
        setImages([...images, ...acceptedImages]);
    }, [images, setImages]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const updatedImages = [...images];
        const [removed] = updatedImages.splice(result.source.index, 1);
        updatedImages.splice(result.destination.index, 0, removed);

        setImages(updatedImages);
    };

    const showImage = (image: ICurrentImage) => {
        if (image instanceof File) {
            return URL.createObjectURL(image);
        }

        return image.delete ? '' : image.path;
    };

    const removeImage = (image: ICurrentImage, idx: number) => () => {
        const newImages = [...images];
        if (newImages[idx] instanceof File) {
            newImages.splice(newImages.indexOf(image), 1);
        } else {
            const updatedImage = { ...newImages[idx] as IImage };
            updatedImage.delete = true;
            newImages[idx] = updatedImage;
        }
        setImages(newImages);
    };

    return (
        <div className="drag-n-drop">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p className="text">
                    <span className="mouse">Натисніть або перетягніть сюди зображення, щоб додати їх до бажання.</span>
                    <span className="touch">Натисніть сюди, щоб додати зображення до бажання.</span>
                    <br />
                    <br />
                    Також Ви можете змінювати позицію зображень перетягуючи їх між собою.
                    <br />
                    <br />
                    <span className="rules">
                        Максимальний розмір файлу: {ALLOWED_MAX_FILE_SIZE_IN_MB} МБ.
                        <br />
                        Дозволені формати: {Object.keys(ALLOWED_FILE_EXTENSIONS).join(', ')}.
                        <br />
                        Максимальна кількість файлів: {MAX_NUMBER_OF_IMAGES_PER_WISH} шт.
                    </span>
                </p>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="wish-image-list" direction="horizontal">
                    {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                            {images.map((image, idx) => {
                                if (!(image instanceof File) && image.delete) return null;

                                return (
                                    <Draggable
                                        key={`wish-image-${idx}`}
                                        draggableId={`wish-image-${idx}`}
                                        index={idx}
                                    >
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="item"
                                            >
                                                <img
                                                    src={showImage(image)}
                                                    alt={`wish-${idx}`}
                                                    loading="lazy"
                                                />
                                                <button className="remove" type="button" onClick={removeImage(image, idx)}>
                                                    <CancelIcon sx={{ color: StylesVariables.actionColor }} />
                                                </button>
                                            </li>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

            <ImagesValidation images={images} />

            {images.length > 0 && (
                <button className="remove-all" type="button" onClick={removeAllImages}>Видалити всі зображення</button>
            )}
        </div>
    );
};

export default DragNDrop;
