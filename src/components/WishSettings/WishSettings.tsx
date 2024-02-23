import React, { FC, useState, useCallback, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { DnDList, DnDItem, DnDArea, Image, DnD } from './WishSettingsStyles';
import Button from '../../components/Button/Button';
import {useAppDispatch, useAppSelector} from "../../store/hook";
import { createWish } from '../../store/wishes/thunks';
import { ALLOWED_FILE_EXTENSIONS, ALLOWED_MAX_FILE_SIZE_IN_MB } from '../../utils/constants';

interface IProps {
    close: () => void;
}

const acceptTypes: { [key: string]: string[] } = {};
Object.keys(ALLOWED_FILE_EXTENSIONS).forEach((ext: keyof typeof ALLOWED_FILE_EXTENSIONS) => {
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
//    const [avatar, setAvatar] = useState<File | null | string>('');
    const [myFiles, setMyFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setMyFiles([...myFiles, ...acceptedFiles])
    }, [myFiles]);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: acceptTypes,
        maxSize: ALLOWED_MAX_FILE_SIZE_IN_MB * 1024 * 1024,
    });

    const myUser = useAppSelector((state) => state.myUser);

    const dispatch = useAppDispatch();

    const send = async () => {
        if (!myUser.user) return;

        await dispatch(createWish({ userId: myUser.user.id, name, price, description, images: myFiles }));
        close();
    };

    const removeFile = (file: File) => () => {
        const newFiles = [...myFiles]
        newFiles.splice(newFiles.indexOf(file), 1)
        setMyFiles(newFiles)
//        const newFiles = [...acceptedFiles];     // make a var for the new array
//        newFiles.splice(file, 1);        // remove the file from the array
//        setMyFiles(newFiles);
    }

    const removeAll = () => {
        setMyFiles([])
    }

//    const removeAvatar = () => {
//        setAvatar(null);
//    };

//    const showAvatar = () => {
//        if (avatar instanceof File) {
//            return URL.createObjectURL(avatar);
//        }
//
//        return avatar || '';
//    };

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
                <DnDArea {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p>Перетягніть кілька файлів сюди або клацніть, щоб вибрати файли</p>
                </DnDArea>
                <DnDList>
                    {myFiles.map((file, i) => (
                        <DnDItem key={file.name + i}>
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                loading="lazy"
                            />
                            <button onClick={removeFile(file)}>Remove File</button>
                        </DnDItem>
                    ))}
                </DnDList>
                {myFiles.length > 0 && <button onClick={removeAll}>Remove All</button>}
            </DnD>

            <Button onClick={send}>
                Зберегти
            </Button>
        </>
    );
};

export default WishSettings;
