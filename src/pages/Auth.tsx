import React, { FC, MouseEvent, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import Button from '../components/Button';
import { useAppDispatch } from '../store/hook';
import { registration, login } from '../store/my-user/thunks';
import Card from '../components/Card';
import Input from '../components/Input';

const Auth: FC = () => {
    const [isRegistration, setIsRegistration] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const dispatch = useAppDispatch();

    return (
        <div className="page">
            <Card
                withLights
                title={
                    <h1 className="title">
                        <i className="fa-solid fa-right-to-bracket"></i>
                        Привіт! {isRegistration ? 'Давай знайомитись. Моє ім\'я Олег.' : 'Нагадай хто ти?'}
                        <i className="fa-solid fa-heart"></i>
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
                    type={showPassword ? 'text' : 'password'}
                    label="Пароль*"
                    title="Це поле потрібне щоб ніхто інший не зміг скористуватись твоїми данними."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isRegistration && (
                    <Input
                        id="name"
                        type={showRepeatPassword ? 'text' : 'password'}
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

            {/*<Wrap>*/}

                {/*<FormControl*/}
                {/*    sx={{ width: '100%' }}*/}
                {/*    variant="outlined"*/}
                {/*    size="small"*/}
                {/*    title="Це поле потрібне щоб я міг ідентифікувати тебе."*/}
                {/*>*/}
                {/*    <InputLabel htmlFor="email">Email</InputLabel>*/}
                {/*    <OutlinedInput*/}
                {/*        id="email"*/}
                {/*        type="text"*/}
                {/*        label="Email"*/}
                {/*        value={email}*/}
                {/*        onChange={(e) => setEmail(e.target.value)}*/}
                {/*    />*/}
                {/*</FormControl>*/}

                {/*<FormControl*/}
                {/*    sx={{ width: '100%' }}*/}
                {/*    variant="outlined"*/}
                {/*    size="small"*/}
                {/*    title="Це поле потрібне щоб ніхто інший не зміг скористуватись твоїми данними."*/}
                {/*>*/}
                {/*    <InputLabel htmlFor="password">Пароль</InputLabel>*/}
                {/*    <OutlinedInput*/}
                {/*        id="password"*/}
                {/*        type={showPassword ? 'text' : 'password'}*/}
                {/*        autoComplete="current-password"*/}
                {/*        label="Пароль"*/}
                {/*        value={password}*/}
                {/*        onChange={(e) => setPassword(e.target.value)}*/}
                {/*        endAdornment={*/}
                {/*            <InputAdornment position="end">*/}
                {/*                <IconButton*/}
                {/*                    aria-label="toggle password visibility"*/}
                {/*                    onClick={handleClickShowPassword}*/}
                {/*                    onMouseDown={handleMouseDownPassword}*/}
                {/*                    edge="end"*/}
                {/*                >*/}
                {/*                    {showPassword ? <VisibilityOff /> : <Visibility />}*/}
                {/*                </IconButton>*/}
                {/*            </InputAdornment>*/}
                {/*        }*/}
                {/*    />*/}
                {/*</FormControl>*/}

                {/*{isRegistration && (*/}
                {/*    <FormControl*/}
                {/*        sx={{ width: '100%' }}*/}
                {/*        variant="outlined"*/}
                {/*        size="small"*/}
                {/*        title="Це поле потрібне щоб ти не помилився при введені паролю."*/}
                {/*    >*/}
                {/*        <InputLabel htmlFor="repeatPassword">Повторіть пароль</InputLabel>*/}
                {/*        <OutlinedInput*/}
                {/*            id="repeatPassword"*/}
                {/*            type={showRepeatPassword ? 'text' : 'password'}*/}
                {/*            autoComplete="current-password"*/}
                {/*            label="Повторіть пароль"*/}
                {/*            endAdornment={*/}
                {/*                <InputAdornment position="end">*/}
                {/*                    <IconButton*/}
                {/*                        aria-label="toggle password visibility"*/}
                {/*                        onClick={() => setShowRepeatPassword((show) => !show)}*/}
                {/*                        onMouseDown={handleMouseDownPassword}*/}
                {/*                        edge="end"*/}
                {/*                    >*/}
                {/*                        {showRepeatPassword ? <VisibilityOff /> : <Visibility />}*/}
                {/*                    </IconButton>*/}
                {/*                </InputAdornment>*/}
                {/*            }*/}
                {/*        />*/}
                {/*    </FormControl>*/}
                {/*)}*/}

                {/*<ToggleRegistration type="button" onClick={() => setIsRegistration((state) => !state)}>*/}
                {/*    {isRegistration ? 'Ми вже знайомі.' : 'Ти мене ще не знаєш.'}*/}
                {/*</ToggleRegistration>*/}

                {/*{isRegistration ? (*/}
                {/*    <Button onClick={() => dispatch(registration({ name, email, password }))}>Зареєструватися</Button>*/}
                {/*) : (*/}
                {/*    <Button onClick={() => dispatch(login({ email, password }))}>Увійти</Button>*/}
                {/*)}*/}
            {/*</Wrap>*/}
        </div>
    );
};

export default Auth;
