import React, { ChangeEvent, FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/store/hook';
import { registration, login, forgotPassword, googleAuthorization } from '@/store/my-user/thunks';
import { IUser } from '@/models/IUser';
import { accountFirstNameValidation, emailValidation, passwordValidation } from '@/utils/validations';
import Card from '@/layouts/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import Checkbox from '@/components/Checkbox';

interface IGoogleAuthCredentialResponse {
    email: IUser['email'];
    email_verified: IUser['isActivated'];
    given_name: IUser['firstName'];
    family_name: IUser['lastName'];
    picture: IUser['avatar'];
}

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

    const [isRegistration, setIsRegistration] = useState<boolean>(
        location.search === '?register' || location.search === '?agree'
    );
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');
    const [checkedPrivacyPolicy, setCheckedPrivacyPolicy] = useState<boolean>(location.search === '?agree');
    const [checkedPrivacyPolicyError, setCheckedPrivacyPolicyError] = useState<string>('');

    let title = 'Вхід';
    isRegistration && (title = 'Реєстрація');
    isForgotPassword && (title = 'Забули пароль?');

    let submit = 'Увійти';
    isRegistration && (submit = 'Зареєструватися');
    isForgotPassword && (submit = 'Відновити');

    const handleGoogleLogin = async (response: CredentialResponse) => {
        if (!response.credential) return;

        const decodedUserData: IGoogleAuthCredentialResponse = jwtDecode(response.credential);
        console.log(decodedUserData);

        await dispatch(googleAuthorization({
            email: decodedUserData.email,
            isActivated: decodedUserData.email_verified,
            firstName: decodedUserData.given_name,
            lastName: decodedUserData.family_name,
            avatar: decodedUserData.picture,
        }));
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setClickedOnSubmit(true);

        if (isRegistration) {
            if (data.password === repeatPassword) {
                setRepeatPasswordError('');
            } else {
                return setRepeatPasswordError('Паролі не співпадають.');
            }

            if (checkedPrivacyPolicy) {
                setCheckedPrivacyPolicyError('');
            } else {
                return setCheckedPrivacyPolicyError('Ми не можемо Вас зареєструвати, поки Ви не погодитись на наші умови.');
            }

            if (repeatPasswordError.length > 0 || checkedPrivacyPolicyError.length > 0) return;
        }

        if (isRegistration && checkedPrivacyPolicy) {
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

    const handleTogglePrivacyPolicy = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setCheckedPrivacyPolicy(value);

        if (!clickedOnSubmit) return;

        value
            ? setCheckedPrivacyPolicyError('')
            : setCheckedPrivacyPolicyError('Ми не можемо Вас зареєструвати, поки Ви не погодитись на наші умови.');
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
                            {/*Вітаю! {isRegistration ? 'Давай знайомитись. Моє ім\'я Олег.' : 'Нагадай хто ти?'}*/}
                            {title}
                        </h1>

                        {!isForgotPassword && (
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                    console.log('Google OAuth Login Failed');
                                    toast('Не вдалось увійти за допомогою Google.', { type: 'error' });
                                }}
                            />
                        )}

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

                        {isRegistration && (
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

                        {isRegistration && (
                            <div>
                                <Checkbox
                                    id="privacy-policy"
                                    name="privacy-policy"
                                    value="privacy-policy"
                                    checked={checkedPrivacyPolicy}
                                    onChange={handleTogglePrivacyPolicy}
                                >
                                    Я погоджуюсь з{' '}
                                    <Button to="/privacy-policy" variant="text" color="primary-color">
                                        політикою конфіденційності
                                    </Button>
                                    сайту Wish Hub.
                                </Checkbox>

                                {checkedPrivacyPolicyError.length > 0 && (
                                    <p className="error">{checkedPrivacyPolicyError}</p>
                                )}
                            </div>
                        )}

                        <Button type="submit">{submit}</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Auth;
