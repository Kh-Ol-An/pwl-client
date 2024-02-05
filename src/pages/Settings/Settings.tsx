import React, { FC, useContext, useState } from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { Root } from './SettingsStyles';
import Button from '../../components/Button/Button';
import { StoreContext } from '../../index';

const Settings: FC = () => {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState<Dayjs | null>(null);

    const { store } = useContext(StoreContext);

    const send = () => {
        console.log(name, birthday);
        if (!store.myUser || !birthday) return;

        store.updateUser(store.myUser.id, name, birthday);
    };

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

export default Settings;
