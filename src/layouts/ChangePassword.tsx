import React, { ChangeEvent, FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/store/hook';
import { changePassword } from '@/store/my-user/thunks';
import { IUser } from '@/models/IUser';
import { passwordValidation } from '@/utils/validations';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface IProps {
    userId?: IUser['id'];
    close: () => void;
}

type Inputs = {
    oldPassword: string
    newPassword: string
}

const ChangePassword: FC<IProps> = ({ userId, close }) => {
    const dispatch = useAppDispatch();

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setClickedOnSubmit(true);

        if (data.newPassword === repeatPassword) {
            setRepeatPasswordError('');
        } else {
            return setRepeatPasswordError('Нові паролі не співпадають.');
        }

        if (!userId || repeatPasswordError.length > 0) return;
        await dispatch(changePassword({ userId, ...data }))
        close();
    };

    const repeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepeatPassword(value);

        if (!clickedOnSubmit) return;

        const password = getValues('newPassword');
        password === value ? setRepeatPasswordError('') : setRepeatPasswordError('Нові паролі не співпадають.');
    };

    return (
        <form className="edit-account" onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register("oldPassword", passwordValidation)}
                id="oldPassword"
                name="oldPassword"
                type="password"
                label="Старий пароль*"
                error={errors?.oldPassword?.message}
            />
            <Input
                {...register("newPassword", passwordValidation)}
                id="newPassword"
                name="newPassword"
                type="password"
                label="Новий пароль*"
                error={errors?.newPassword?.message}
            />
            <Input
                id="repeat-new-password"
                name="repeat-new-password"
                type="password"
                label="Повторіть новий пароль*"
                value={repeatPassword}
                error={repeatPasswordError}
                onChange={(event) => repeatPasswordChange(event as ChangeEvent<HTMLInputElement>)}
            />

            <div className="actions">
                <Button type="submit" color="action-color">Змінити пароль</Button>
            </div>
        </form>
    );
};

export default ChangePassword;
