import React, { ChangeEvent, FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/store/hook';
import { registration, login, forgotPassword } from '@/store/my-user/thunks';
import { IUser } from '@/models/IUser';
import { accountFirstNameValidation, emailValidation, passwordValidation } from '@/utils/validations';
import Card from '@/layouts/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Logo from '@/components/Logo';

type Inputs = {
    firstName: IUser['firstName']
    email: IUser['email']
    password: string
}

const Auth: FC = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const location = useLocation();

    const [isRegistration, setIsRegistration] = useState<boolean>(location.search === '?register');
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');

    let title = 'Вхід';
    isRegistration && (title = 'Реєстрація');
    isForgotPassword && (title = 'Забули пароль?');

    let submit = 'Увійти';
    isRegistration && (submit = 'Зареєструватися');
    isForgotPassword && (submit = 'Відновити');

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setClickedOnSubmit(true);

        if (isRegistration) {
            if (data.password === repeatPassword) {
                setRepeatPasswordError('');
            } else {
                return setRepeatPasswordError('Паролі не співпадають.');
            }

            if (repeatPasswordError.length > 0) return;
        }

        if (isRegistration) {
            return dispatch(registration(data));
        }

        if (isForgotPassword) {
            return dispatch(forgotPassword(data));
        }

        return dispatch(login(data));
    };

    const repeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepeatPassword(value);

        if (!clickedOnSubmit) return;

        const password = getValues('password');
        password === value ? setRepeatPasswordError('') : setRepeatPasswordError('Паролі не співпадають.');
    };

    return (
        <div className="auth-page">
            <div className="auth-title">
                <Logo to="/welcome" />
            </div>

            <div className="box">
                <Card withLights>
                    <div className="auth-title only-mobile">
                        <Logo to="/welcome" />
                    </div>

                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="title">
                            {/*Вітаю! {isRegistration ? 'Давай знайомитись. Моє ім\'я Олег.' : 'Нагадай хто ти?'}*/}
                            {title}
                        </h1>

                        {isRegistration && !isForgotPassword && (
                            <Input
                                {...register("firstName", accountFirstNameValidation)}
                                id="firstName"
                                name="firstName"
                                type="text"
                                label="Ім'я*"
                                error={errors?.firstName?.message}
                            />
                        )}

                        <Input
                            {...register("email", emailValidation)}
                            id="email"
                            name="email"
                            type="text"
                            label="Email*"
                            error={errors?.email?.message}
                        />

                        {!isForgotPassword && (
                            <Input
                                {...register("password", passwordValidation)}
                                id="password"
                                name="password"
                                type="password"
                                label="Пароль*"
                                error={errors?.password?.message}
                            />
                        )}

                        {isRegistration && !isForgotPassword && (
                            <Input
                                id="repeat-password"
                                name="repeat-password"
                                type="password"
                                label="Повторіть пароль*"
                                value={repeatPassword}
                                error={repeatPasswordError}
                                onChange={(event) => repeatPasswordChange(event as ChangeEvent<HTMLInputElement>)}
                            />
                        )}

                        <div className="actions">
                            {!isForgotPassword && (
                                <Button
                                    type="button"
                                    variant="text"
                                    onClick={() => setIsRegistration((state) => !state)}
                                >
                                    {/*{isRegistration ? 'Ми вже знайомі.' : 'Ти мене ще не знаєш.'}*/}
                                    {isRegistration ? 'Увійти' : 'Зареєструватись'}
                                </Button>
                            )}

                            {!isRegistration && (
                                <div className="forgot-password">
                                    <Button
                                        type="button"
                                        variant="text"
                                        color="action-color"
                                        onClick={() => setIsForgotPassword((state) => !state)}
                                    >
                                        {isForgotPassword ? 'Пароль згадано!' : 'Не пам\'ятаю пароль'}
                                    </Button>
                                </div>
                            )}
                        </div>

                        <Button type="submit">{submit}</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Auth;
