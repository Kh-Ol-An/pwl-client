import React, { FC, useState, useEffect, useRef, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Avatar } from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateValidationError } from '@mui/x-date-pickers/models';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { updateMyUser } from '@/store/my-user/thunks';
import { IUpdateMyUser } from '@/store/my-user/types';
import { ICurrentAvatar } from '@/models/IUser';
import { accountFirstNameValidation, accountLastNameValidation } from '@/utils/validations';
import AvatarValidation from '@/utils/AvatarValidation';
import { ALLOWED_FILE_EXTENSIONS } from '@/utils/constants';
import Input from '@/components/Input';
import Button from '@/components/Button';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    close: () => void;
    handleShowConfirmDeleteMyUser: () => void;
}

type Inputs = {
    firstName: string
    lastName: string
}

const EditAccount: FC<IProps> = ({ close, handleShowConfirmDeleteMyUser }) => {
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);
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
            case 'minDate': {
                return 'В нас є сумніви що Вам більше 120 років.';
            }
            case 'disableFuture': {
                return 'Неможливо народитись в майбутньому.';
            }
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
            firstName: data.firstName.trim(),
            avatar,
        };
        if (data.lastName) {
            updateMyUserData.lastName = data.lastName.trim();
        }
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
        myUser.lastName && setValue('lastName', myUser.lastName);
        setAvatar(myUser.avatar || '');
        myUser.birthday && setBirthday(dayjs(myUser.birthday));
    }, [myUser, setValue]);

    return (
        <form className="edit-account" onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register("firstName", accountFirstNameValidation)}
                id="firstName"
                name="firstName"
                type="text"
                label="Ім'я*"
                error={errors?.firstName?.message}
            />

            <Input
                {...register("lastName", accountLastNameValidation)}
                id="lastName"
                name="lastName"
                type="text"
                label="Прізвище"
                error={errors?.lastName?.message}
            />

            <div className="avatar-box">
                <div className="avatar">
                    <label htmlFor="avatar">
                        <input
                            className="hidden"
                            id="avatar"
                            ref={inputRef}
                            accept={Object.values(ALLOWED_FILE_EXTENSIONS).join(",")}
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

                    {(avatar instanceof File || (avatar.length > 0 && avatar !== 'delete')) && (
                        <button className="remove" type="button" onClick={removeAvatar}>
                            <CancelIcon sx={{ color: StylesVariables.actionColor }} />
                        </button>
                    )}
                </div>

                <AvatarValidation avatar={avatar} />
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
                        minDate={dayjs().subtract(120, 'years')} // Дозволити вибір дати до 120 років в минулому
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

            <div className="actions">
                <Button type="button" variant="text" color="action-color" onClick={handleShowConfirmDeleteMyUser}>
                    Видалити свій акаунт
                </Button>

                <Button type="submit">Оновити</Button>
            </div>
        </form>
    );
};

export default EditAccount;
