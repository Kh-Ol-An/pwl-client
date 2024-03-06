import React, { FC, useState, useEffect, useRef, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Avatar } from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateValidationError } from '@mui/x-date-pickers/models';
import dayjs, { Dayjs } from 'dayjs';
import Button from '../components/Button';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { updateMyUser } from '../store/my-user/thunks';
import { ALLOWED_FILE_EXTENSIONS } from '../utils/constants';
import Input from './Input';
import StylesVariables from '../styles/utils/variables.module.scss';
import { ICurrentAvatar } from '../models/IUser';
import { accountFirstNameValidation, accountLastNameValidation } from '../utils/validations';
import { IUpdateMyUser } from '../store/my-user/types';

interface IProps {
    close: () => void;
}

type Inputs = {
    firstName: string
    lastName: string
}

const AccountSettings: FC<IProps> = ({ close }) => {
    const [clickedOnSubmit, setClickedOnSubmit] = useState(false);
    const [avatar, setAvatar] = useState<ICurrentAvatar>('');
    const [birthday, setBirthday] = useState<Dayjs | null>(null);
    const [birthdayError, setBirthdayError] = useState<DateValidationError | null>(null);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const inputRef = useRef<HTMLInputElement>(null);

    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const birthdayErrorMessage = useMemo(() => {
        if (!clickedOnSubmit) return;

        switch (birthdayError) {
            case 'minDate':
            case 'invalidDate': {
                return 'Введена дата недійсна.';
            }

            default: {
                return '';
            }
        }
    }, [clickedOnSubmit, birthdayError]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setClickedOnSubmit(true);

        if (!myUser || (birthdayError && birthdayError.length > 0)) return;

        const updateMyUserData: IUpdateMyUser = {
            id: myUser.id,
            firstName: data.firstName,
            lastName: data.lastName,
            avatar,
        };
        if (birthday) {
            updateMyUserData.birthday = birthday.format();
        }
        await dispatch(updateMyUser(updateMyUserData));
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
        setValue('lastName', myUser.lastName);
        setAvatar(myUser.avatar || '');
        myUser.birthday && setBirthday(dayjs(myUser.birthday));
    }, [myUser, setValue]);

    return (
        <form className="account-settings" onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register("firstName", accountFirstNameValidation)}
                id="firstName"
                type="text"
                label="Ім'я*"
                title="Якє в тебе ім'я?"
                error={errors?.firstName?.message}
            />

            <Input
                {...register("lastName", accountLastNameValidation)}
                id="lastName"
                type="text"
                label="Прізвище"
                title="Якє в тебе прізвище?"
                error={errors?.lastName?.message}
            />

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

            <div
                className={"date-picker" + (clickedOnSubmit ? " clicked-on-submit" : "")}
                title="Коли твій день народження?"
            >
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="День Народження*"
                        format="DD.MM.YYYY"
                        value={birthday}
                        disableFuture
                        onError={(newError) => setBirthdayError(newError)}
                        slotProps={{
                            textField: {
                                helperText: birthdayErrorMessage,
                            },
                        }}
                        onChange={(value) => setBirthday(value)}
                    />
                </DemoContainer>
            </div>

            <Button type="submit">
                Зберегти
            </Button>
        </form>
    );
};

export default AccountSettings;
