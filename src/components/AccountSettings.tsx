import React, { FC, useState, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Avatar } from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Button from '../components/Button';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { updateMyUser } from '../store/my-user/thunks';
import { ALLOWED_FILE_EXTENSIONS } from '../utils/constants';
import Input from './Input';
import StylesVariables from '../styles/utils/variables.module.scss';
import { ICurrentAvatar } from '../models/IUser';
import { accountFirstNameValidation } from '../utils/validations';

interface IProps {
    close: () => void;
}

type Inputs = {
    firstName: string
}

const AccountSettings: FC<IProps> = ({ close }) => {
    const [avatar, setAvatar] = useState<ICurrentAvatar>('');
    const [birthday, setBirthday] = useState<Dayjs | null>(null);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const inputRef = useRef<HTMLInputElement>(null);

    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!myUser || !birthday) return; // TODO: why cant delete without birthday

        await dispatch(updateMyUser({
            id: myUser.id,
            firstName: data.firstName,
            birthday: birthday.format(),
            avatar,
        }));
        close();
    };

    const removeAvatar = () => {
        setAvatar('delete');
        inputRef.current && (inputRef.current.value = '');
    };

    const showAvatar = () => {
        if (avatar instanceof File) {
            return URL.createObjectURL(avatar);
        }

        return avatar || '';
    };

    useEffect(() => {
        if (!myUser) return;

        setValue('firstName', myUser.firstName);
        setAvatar(myUser.avatar || '');
        myUser.birthday && setBirthday(dayjs(myUser.birthday));
    }, [myUser, setValue]);

    return (
        <form className="account-settings" onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register("firstName", accountFirstNameValidation)}
                id="name"
                type="text"
                label="Ім'я*"
                title="Якє в тебе ім'я?"
                error={errors?.firstName?.message}
            />

            <div className="field">
                <div className="avatar">
                    <label htmlFor="avatar">
                        <input
                            className="hidden"
                            id="avatar"
                            ref={inputRef}
                            accept={Object.values(ALLOWED_FILE_EXTENSIONS).join(",")} // TODO: check
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                setAvatar(file);
                            }}
                        />
                        <Avatar
                            sx={{ cursor: 'pointer', width: '100%', height: '100%' }}
                            src={showAvatar()} alt={`${myUser?.firstName} ${myUser?.lastName}`}
                        />
                    </label>

                    {avatar && (
                        <button className="remove" onClick={removeAvatar}>
                            <CancelIcon sx={{ color: StylesVariables.actionColor }} />
                        </button>
                    )}
                </div>

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
            </div>

            <Button type="submit" disabled={!birthday}>
                Зберегти
            </Button>
        </form>
    );
};

export default AccountSettings;
