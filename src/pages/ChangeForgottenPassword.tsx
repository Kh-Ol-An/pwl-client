import React, { FC, ChangeEvent, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/store/hook';
import { changeForgottenPassword } from '@/store/my-user/thunks';
import { passwordValidation } from '@/utils/validations';
import Card from '@/layouts/Card';
import Logo from '@/components/Logo';
import Input from '@/components/Input';
import Button from '@/components/Button';

type Inputs = {
    newPassword: string
}

const ChangeForgottenPassword: FC = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const { passwordResetLink } = useParams<{ passwordResetLink: string }>();
    const navigate = useNavigate();

    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setClickedOnSubmit(true);

        if (!passwordResetLink) return;

        if (data.newPassword === repeatPassword) {
            setRepeatPasswordError('');
        } else {
            return setRepeatPasswordError('Паролі не співпадають.');
        }

        dispatch(changeForgottenPassword({ passwordResetLink, ...data })).then(() => navigate('/auth'));
    };

    const repeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepeatPassword(value);

        if (!clickedOnSubmit) return;

        const password = getValues('newPassword');
        password === value ? setRepeatPasswordError('') : setRepeatPasswordError('Паролі не співпадають.');
    };

    return (
        <div className="auth-page">
            <div className="auth-title">
                <Logo to="/welcome" />
            </div>

            <div className="box">
                <Card>
                    <div className="auth-title only-mobile">
                        <Logo to="/welcome" />
                    </div>

                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="title">
                            Відновлення паролю
                        </h1>

                        <Input
                            {...register("newPassword", passwordValidation)}
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            label="Новий пароль*"
                            error={errors?.newPassword?.message}
                        />
                        <Input
                            id="repeat-password"
                            name="repeat-password"
                            type="password"
                            label="Повторіть новий пароль*"
                            value={repeatPassword}
                            error={repeatPasswordError}
                            onChange={(event) => repeatPasswordChange(event as ChangeEvent<HTMLInputElement>)}
                        />

                        <Button type="submit">Відновити</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ChangeForgottenPassword;