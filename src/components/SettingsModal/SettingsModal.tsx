import React, { FC, useContext, useState, useEffect } from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AvatarBox, AvatarImg, FileInput } from './SettingsModalStyles';
import Button from '../../components/Button/Button';
import { StoreContext } from '../../index';

interface IProps {
    close: () => void;
}

const SettingsModal: FC<IProps> = ({ close }) => {
    const { store } = useContext(StoreContext);

    const [name, setName] = useState<string>('');
    const [avatar, setAvatar] = useState<File | null | string>('');
    const [birthday, setBirthday] = useState<Dayjs | null>(null);

    const send = async () => {
        if (!store.myUser || !birthday) return;

        await store.updateUser(store.myUser.id, name, birthday.format(), avatar);
        close();
    };

    const removeAvatar = () => {
        setAvatar(null);
    };

    const showAvatar = () => {
        if (avatar instanceof File) {
            return URL.createObjectURL(avatar);
        }

        return avatar || '';
    };

    useEffect(() => {
        if (!store.myUser) return;

        setName(store.myUser.name);
        setAvatar(store.myUser.avatar || '');
        setBirthday(dayjs(store.myUser.birthday));
    }, [store.myUser]);

    return (
        <>
            <FormControl
                sx={{ width: '100%' }}
                variant="outlined"
                size="small"
                title="Якє в тебе ім'я?"
            >
                <InputLabel htmlFor="name">Ім'я</InputLabel>
                <OutlinedInput
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="Ім'я"
                />
            </FormControl>

            <AvatarBox>
                <label htmlFor="avatar">
                    <FileInput
                        id="avatar"
                        accept="image/*"
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setAvatar(file);
                        }}
                    />
                    <AvatarImg src={showAvatar()} alt={store.myUser?.name} />
                </label>

                <Button onClick={removeAvatar}>
                    removeAvatar
                </Button>
            </AvatarBox>

            <div title="Коли твій день народженя?">
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="День Народженя"
                        format="DD.MM.YYYY"
                        value={birthday}
                        onChange={(value) => setBirthday(value)}
                    />
                </DemoContainer>
            </div>

            <Button onClick={send}>
                Зберегти
            </Button>
        </>
    );
};

export default SettingsModal;
