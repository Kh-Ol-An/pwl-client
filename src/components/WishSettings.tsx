import React, { FC, useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Cancel as CancelIcon } from '@mui/icons-material';
import Button from '../components/Button';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { createWish, updateWish } from '../store/wishes/thunks';
import { ALLOWED_FILE_EXTENSIONS, ALLOWED_MAX_FILE_SIZE_IN_MB } from '../utils/constants';
import Input from './Input';
import { ICurrentImage, IImage, IWish } from '../models/IWish';
import StylesVariables from '../styles/utils/variables.module.scss';

interface IProps {
    idForEditing: IWish['id'] | null;
    close: () => void;
}

const acceptTypes: { [key: string]: string[] } = {};
Object.keys(ALLOWED_FILE_EXTENSIONS).forEach((ext) => {
    const mimeType = ALLOWED_FILE_EXTENSIONS[ext];
    if (!acceptTypes[mimeType]) {
        acceptTypes[mimeType] = [];
    }
    acceptTypes[mimeType].push(`.${ext}`);
});

const WishSettings: FC<IProps> = ({ idForEditing, close }) => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [images, setImages] = useState<ICurrentImage[]>([]);

    const onDrop = useCallback((acceptedImages: File[]) => {
        setImages([...images, ...acceptedImages]);
    }, [images]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: acceptTypes,
        maxSize: ALLOWED_MAX_FILE_SIZE_IN_MB * 1024 * 1024,
    });

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishList = useAppSelector((state) => state.wishes.list);

    const dispatch = useAppDispatch();

    const send = async () => {
        if (!myUser) return;

        if (idForEditing) {
            await dispatch(updateWish({ userId: myUser.id, id: idForEditing, name, price, description, images }));
        } else {
            await dispatch(createWish({ userId: myUser.id, name, price, description, images }));
        }
        close();
    };

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

    const removeAll = () => {
        setImages(
            (prevState) =>
                prevState
                    .filter((image) => !(image instanceof File))
                    .map((image) => {
                        const updatedImage = { ...image as IImage };
                        updatedImage.delete = true;
                        return updatedImage;
                    })
        );
    };

    useEffect(() => {
        if (wishList.length === 0) return;

        const myWish = wishList.find((wish) => wish.id === idForEditing);
        if (!myWish) return;

        setName(myWish.name);
        setPrice(myWish.price);
        setDescription(myWish.description);
        setImages(myWish.images);
    }, [idForEditing, wishList]);

    return (
        <>
            <Input
                id="name"
                type="text"
                label="Назва твого бажання"
                title="Як ти назвеш своє бажання?" // TODO: const nameRegex = /^[a-zA-Zа-яА-Я0-9\s!"№#$%&'()*,-;=?@_]*$/;
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Input
                id="price"
                type="text"
                label="Ціна"
                title="Приблизна або точна ціна"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <Input
                id="description"
                type="text"
                label="Опис бажання"
                title="Опиши своє бажання?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className="drag-n-drop">
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p className="text">
                        Перетягніть кілька зображень сюди або клацніть, щоб вибрати зображення.
                        <br />
                        Також ти можеш змінювати позицію зображень перетягуючи їх.
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
                                                    <button className="remove" onClick={removeImage(image, idx)}>
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

                {images.length > 0 && <button className="remove-all" onClick={removeAll}>Remove All images</button>}
            </div>

            <Button onClick={send}>
                {idForEditing ? 'Оновити' : 'Додати'}
            </Button>
        </>
    );
};

export default WishSettings;
