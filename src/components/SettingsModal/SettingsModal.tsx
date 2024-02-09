import React, { FC, useContext, useState, useEffect } from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AvatarBox, AvatarImg, FileInput, Root } from './SettingsModalStyles';
import Button from '../../components/Button/Button';
import { StoreContext } from '../../index';

const SettingsModal: FC = () => {
    const { store } = useContext(StoreContext);

    const [name, setName] = useState<string>('');
    const [visibleAvatar, setVisibleAvatar] = useState<string | null>('');
    const [avatar, setAvatar] = useState<File | null>(null);
    const [birthday, setBirthday] = useState<Dayjs | null>(null);

    const send = () => {
        if (!store.myUser || !birthday) return;

        store.updateUser(store.myUser.id, name, birthday, avatar);
    };

    const removeAvatar = () => {
        setVisibleAvatar(null);
        setAvatar(null);
    };

    const showAvatar = () => {
        if (visibleAvatar === null) return;

        return visibleAvatar || store.myUser?.avatar;
    };

    useEffect(() => {
        if (!store.myUser) return;

        setName(store.myUser.name);
        setBirthday(dayjs(store.myUser.birthday));
    }, [store.myUser]);

    return (
        <Root>
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

                            setVisibleAvatar(URL.createObjectURL(file));
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
        </Root>
    );
};

export default SettingsModal;
