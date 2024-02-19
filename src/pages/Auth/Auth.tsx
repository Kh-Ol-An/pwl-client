import React, { FC, MouseEvent, useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Root, Title, ToggleRegistration, Wrap } from './AuthStyles';
import Button from '../../components/Button/Button';
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {registration, login} from '../../store/my-user/thunks';

const Auth: FC = () => {
    const [isRegistration, setIsRegistration] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const myUser = useAppSelector((state) => state.myUser);

    const dispatch = useAppDispatch();

    return (
        <Root>
            <Wrap>
                <Title>Привіт! {isRegistration ? 'Давай знайомитись. Моє ім\'я Олег.' : 'Нагадай хто ти?'}</Title>

                {isRegistration && (
                    <FormControl
                        sx={{ width: '100%' }}
                        variant="outlined"
                        size="small"
                        title="Якє в тебе ім'я?"
                    >
                        <InputLabel htmlFor="name">Ім'я</InputLabel>
                        <OutlinedInput
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Ім'я"
                        />
                    </FormControl>
                )}

                <FormControl
                    sx={{ width: '100%' }}
                    variant="outlined"
                    size="small"
                    title="Це поле потрібне щоб я міг ідентифікувати тебе."
                >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                        id="email"
                        type="text"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>

                <FormControl
                    sx={{ width: '100%' }}
                    variant="outlined"
                    size="small"
                    title="Це поле потрібне щоб ніхто інший не зміг скористуватись твоїми данними."
                >
                    <InputLabel htmlFor="password">Пароль</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        label="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                {isRegistration && (
                    <FormControl
                        sx={{ width: '100%' }}
                        variant="outlined"
                        size="small"
                        title="Це поле потрібне щоб ти не помилився при введені паролю."
                    >
                        <InputLabel htmlFor="repeatPassword">Повторіть пароль</InputLabel>
                        <OutlinedInput
                            id="repeatPassword"
                            type={showRepeatPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            label="Повторіть пароль"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowRepeatPassword((show) => !show)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                )}

                <ToggleRegistration type="button" onClick={() => setIsRegistration((state) => !state)}>
                    {isRegistration ? 'Ми вже знайомі.' : 'Ти мене ще не знаєш.'}
                </ToggleRegistration>

                {isRegistration ? (
                    <Button onClick={() => dispatch(registration({name, email, password}))}>Зареєструватися</Button>
                ) : (
                    <Button onClick={() => dispatch(login({email, password}))}>Увійти</Button>
                )}
            </Wrap>
        </Root>
    );
};

export default Auth;
