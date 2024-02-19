import React, { FC, useState, useEffect } from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AvatarBox, AvatarImg, FileInput } from './WishSettingsStyles';
import Button from '../../components/Button/Button';
import {useAppDispatch, useAppSelector} from "../../store/hook";
import { createWish } from '../../store/wish/thunks';

interface IProps {
    close: () => void;
}

const WishSettings: FC<IProps> = ({ close }) => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
//    const [avatar, setAvatar] = useState<File | null | string>('');

    const myUser = useAppSelector((state) => state.myUser);

    const dispatch = useAppDispatch();

    const send = async () => {
        if (!myUser.user) return;

        await dispatch(createWish({ userId: myUser.user.id, name, price, description }));
        close();
    };

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
                title="Як ти назвеш своє бажання?"
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

            {/*<AvatarBox>*/}
            {/*    <label htmlFor="avatar">*/}
            {/*        <FileInput*/}
            {/*            id="avatar"*/}
            {/*            accept="image/*"*/}
            {/*            type="file"*/}
            {/*            onChange={(e) => {*/}
            {/*                const file = e.target.files?.[0];*/}
            {/*                if (!file) return;*/}

            {/*                setAvatar(file);*/}
            {/*            }}*/}
            {/*        />*/}
            {/*        <AvatarImg src={showAvatar()} alt={myUser.user?.name} />*/}
            {/*    </label>*/}

            {/*    <Button onClick={removeAvatar}>*/}
            {/*        removeAvatar*/}
            {/*    </Button>*/}
            {/*</AvatarBox>*/}

            <Button onClick={send}>
                Зберегти
            </Button>
        </>
    );
};

export default WishSettings;
