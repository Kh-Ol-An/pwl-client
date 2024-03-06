import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Login as LoginIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import Button from '../components/Button';
import { useAppDispatch } from '../store/hook';
import { registration, login } from '../store/my-user/thunks';
import Card from '../components/Card';
import Input from '../components/Input';
import stylesVariables from '../styles/utils/variables.module.scss';
import { accountFirstNameValidation, emailValidation, passwordValidation } from '../utils/validations';

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
        <div className="page auth-page">
            <div className="box">
                <Card withLights>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="title">
                            <LoginIcon className="login-icon" sx={{ color: stylesVariables.primaryColor }} />
                            Привіт! {isRegistration ? 'Давай знайомитись. Моє ім\'я Олег.' : 'Нагадай хто ти?'}
                            <FavoriteIcon className="favorite-icon" sx={{ color: stylesVariables.actionColor }} />
                        </h1>
                        {isRegistration && (
                            <Input
                                {...register("firstName", accountFirstNameValidation)}
                                id="firstName"
                                type="text"
                                label="Ім'я*"
                                title="Якє в тебе ім'я?"
                                error={errors?.firstName?.message}
                            />
                        )}
                        <Input
                            {...register("email", emailValidation)}
                            id="email"
                            type="text"
                            label="Email*"
                            title="Це поле потрібне щоб я міг ідентифікувати тебе."
                            error={errors?.email?.message}
                        />
                        <Input
                            {...register("password", passwordValidation)}
                            id="password"
                            type="password"
                            label="Пароль*"
                            title="Це поле потрібне щоб ніхто інший не зміг скористуватись твоїми даними."
                            error={errors?.password?.message}
                        />
                        {isRegistration && (
                            <Input
                                id="repeat-password"
                                type="password"
                                label="Повтори пароль*"
                                title="Це поле потрібне щоб ти не помилився при введені паролю."
                                value={repeatPassword}
                                error={repeatPasswordError}
                                onChange={repeatPasswordChange}
                            />
                        )}

                        <Button classes="text" type="button" onClick={() => setIsRegistration((state) => !state)}>
                            {isRegistration ? 'Ми вже знайомі.' : 'Ти мене ще не знаєш.'}
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
