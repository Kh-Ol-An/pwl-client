import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '@/store/hook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { passwordValidation } from '@/utils/validations';
import Input from '@/components/Input';
import Button from '@/components/Button';

type Inputs = {
    oldPassword: string
    newPassword: string
}

const ChangePassword = () => {
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
        console.log('onSubmit');
    };

    const repeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepeatPassword(value);

        if (!clickedOnSubmit) return;

        const password = getValues('newPassword');
        password === value ? setRepeatPasswordError('') : setRepeatPasswordError('Паролі не співпадають.');
    };

    return (
        <form className="edit-account" onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register("oldPassword", passwordValidation)}
                id="old-password"
                name="old-password"
                type="password"
                label="Старий пароль*"
                error={errors?.oldPassword?.message}
            />
            <Input
                {...register("newPassword", passwordValidation)}
                id="new-password"
                name="new-password"
                type="password"
                label="Новий пароль*"
                error={errors?.newPassword?.message}
            />
            <Input
                id="repeat-new-password"
                name="repeat-new-password"
                type="password"
                label="Повтори пароль*"
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
