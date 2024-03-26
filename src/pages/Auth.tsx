import React, { ChangeEvent, FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/store/hook';
import { registration, login } from '@/store/my-user/thunks';
import { accountFirstNameValidation, emailValidation, passwordValidation } from '@/utils/validations';
import Card from '@/layouts/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Logo from '@/components/Logo';

type Inputs = {
    firstName: string
    email: string
    password: string
}

const Auth: FC = () => {
    const [isRegistration, setIsRegistration] = useState(false);
    const [clickedOnSubmit, setClickedOnSubmit] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const dispatch = useAppDispatch();

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setClickedOnSubmit(true);

        data.password === repeatPassword ? setRepeatPasswordError('') : setRepeatPasswordError('Паролі не співпадають.');
        if (repeatPasswordError.length > 0) return;

        isRegistration ? dispatch(registration(data)) : dispatch(login(data));
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
                            {isRegistration ? 'Реєстрація' : 'Вхід'}
                        </h1>

                        {isRegistration && (
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

                        <Input
                            {...register("password", passwordValidation)}
                            id="password"
                            name="password"
                            type="password"
                            label="Пароль*"
                            error={errors?.password?.message}
                        />

                        {isRegistration && (
                            <Input
                                id="repeat-password"
                                name="repeat-password"
                                type="password"
                                label="Повтори пароль*"
                                value={repeatPassword}
                                error={repeatPasswordError}
                                onChange={(event) => repeatPasswordChange(event as ChangeEvent<HTMLInputElement>)}
                            />
                        )}

                        <Button variant="text" type="button" onClick={() => setIsRegistration((state) => !state)}>
                            {/*{isRegistration ? 'Ми вже знайомі.' : 'Ти мене ще не знаєш.'}*/}
                            {isRegistration ? 'Увійти' : 'Зареєструватись'}
                        </Button>

                        <Button type="submit">
                            {isRegistration ? 'Зареєструватися' : 'Увійти'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Auth;
