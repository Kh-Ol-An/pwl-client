import React, { FC, useState } from 'react';
import { Login as LoginIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import Button from '../components/Button';
import { useAppDispatch } from '../store/hook';
import { registration, login } from '../store/my-user/thunks';
import Card from '../components/Card';
import Input from '../components/Input';
import stylesVariables from '../styles/utils/variables.module.scss';

const Auth: FC = () => {
    const [isRegistration, setIsRegistration] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const dispatch = useAppDispatch();

    return (
        <div className="page auth-page">
            <div className="box">
                <Card
                    withLights
                    title={
                        <h1 className="title">
                            <LoginIcon className="login-icon" sx={{ color: stylesVariables.primaryColor }} />
                            Привіт! {isRegistration ? 'Давай знайомитись. Моє ім\'я Олег.' : 'Нагадай хто ти?'}
                            <FavoriteIcon className="favorite-icon" sx={{ color: stylesVariables.actionColor }} />
                        </h1>
                    }
                >
                    {isRegistration && (
                        <Input
                            id="name"
                            type="text"
                            label="Ім'я*"
                            title="Якє в тебе ім'я?"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}
                    <Input
                        id="email"
                        type="text"
                        label="Email*"
                        title="Це поле потрібне щоб я міг ідентифікувати тебе."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        id="password"
                        type="password"
                        label="Пароль*"
                        title="Це поле потрібне щоб ніхто інший не зміг скористуватись твоїми данними."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isRegistration && (
                        <Input
                            id="repeat-password"
                            type="password"
                            label="Повтори пароль*"
                            title="Це поле потрібне щоб ти не помилився при введені паролю."
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    )}

                    <Button classes="text" type="button" onClick={() => setIsRegistration((state) => !state)}>
                        {isRegistration ? 'Ми вже знайомі.' : 'Ти мене ще не знаєш.'}
                    </Button>

                    {isRegistration ? (
                        <Button onClick={() => dispatch(registration({ name, email, password }))}>Зареєструватися</Button>
                    ) : (
                        <Button onClick={() => dispatch(login({ email, password }))}>Увійти</Button>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Auth;
