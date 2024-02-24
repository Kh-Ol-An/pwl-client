import React, { FC, useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { DnDList, DnDItem, DnDArea, Image, DnD } from './WishSettingsStyles';
import Button from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { createWish } from '../../store/wishes/thunks';
import { ALLOWED_FILE_EXTENSIONS, ALLOWED_MAX_FILE_SIZE_IN_MB } from '../../utils/constants';

interface IProps {
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

const WishSettings: FC<IProps> = ({ close }) => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [images, setImages] = useState<File[]>([]);

    const onDrop = useCallback((acceptedImages: File[]) => {
        setImages([...images, ...acceptedImages]);
    }, [images]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: acceptTypes,
        maxSize: ALLOWED_MAX_FILE_SIZE_IN_MB * 1024 * 1024,
    });

    const myUser = useAppSelector((state) => state.myUser);

    const dispatch = useAppDispatch();

    const send = async () => {
        if (!myUser.user) return;

        await dispatch(createWish({ userId: myUser.user.id, name, price, description, images }));
        close();
    };

    const removeImage = (image: File) => () => {
        const newImages = [...images];
        newImages.splice(newImages.indexOf(image), 1);
        setImages(newImages);
    };

    const removeAll = () => {
        setImages([]);
    };

//    useEffect(() => {
//        if (!myUser.user) return;
//
//        setName(myUser.user.name);
//        setPrice(myUser.user.name);
//        setDescription(myUser.user.name);
////        setAvatar(myUser.user.avatar || '');
//    }, [myUser]);

    return (
        <>
            <FormControl
                sx={{ width: '100%' }}
                variant="outlined"
                size="small"
                title="Як ти назвеш своє бажання?" // TODO: const nameRegex = /^[a-zA-Zа-яА-Я0-9\s!"№#$%&'()*,-;=?@_]*$/;
            >
                <InputLabel htmlFor="name">Назва твого бажаня</InputLabel>
                <OutlinedInput
                    id="name"
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    label="Назва твого бажаня"
                />
            </FormControl>

            <FormControl
                sx={{ width: '100%' }}
                variant="outlined"
                size="small"
                title="Приблизна або точна ціна"
            >
                <InputLabel htmlFor="name">Ціна</InputLabel>
                <OutlinedInput
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    label="Ціна"
                />
            </FormControl>

            <FormControl
                sx={{ width: '100%' }}
                variant="outlined"
                size="small"
                title="Опиши своє бажання?"
            >
                <InputLabel htmlFor="name">Опис бажаня</InputLabel>
                <OutlinedInput
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Опис бажаня"
                />
            </FormControl>

            <DnD>
                <DnDArea {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Перетягніть кілька зображень сюди або клацніть, щоб вибрати зображення</p>
                </DnDArea>
                <DnDList>
                    {images.map((image, i) => (
                        <DnDItem key={image.name + i}>
                            <Image
                                src={URL.createObjectURL(image)}
                                alt={image.name}
                                loading="lazy"
                            />
                            <button onClick={removeImage(image)}>Remove image</button>
                        </DnDItem>
                    ))}
                </DnDList>
                {images.length > 0 && <button onClick={removeAll}>Remove All images</button>}
            </DnD>

            <Button onClick={send}>
                Зберегти
            </Button>
        </>
    );
};

export default WishSettings;
