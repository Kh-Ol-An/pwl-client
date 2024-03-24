import React, { FC, useState, useEffect } from 'react';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hook';
import Button from '../components/Button';
import { logout } from '../store/my-user/thunks';
import { WAITING_TIME } from '../utils/constants';
import Logo from '../components/Logo';

const Inactivated: FC = () => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const getActivationLink
        = `${
            process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_API_URL
        }/get-activation-link/${myUser?.id}`;

    const handleClick = () => {
        setTimeLeft(WAITING_TIME);
        localStorage.setItem('timeLeft', String(WAITING_TIME));

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === null || prevTime === 0) {
                    clearInterval(timer);
                    localStorage.removeItem('timeLeft');
                    return null;
                }

                const newTimeLeft = prevTime - 1;
                localStorage.setItem('timeLeft', String(newTimeLeft));
                return newTimeLeft;
            });
        }, 1000);
    };

    useEffect(() => {
        const localTimeLeft = localStorage.getItem('timeLeft');
        if (!localTimeLeft) return;

        setTimeLeft(Number(localTimeLeft));

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === null || prevTime === 0) {
                    clearInterval(timer);
                    localStorage.removeItem('timeLeft');
                    return null;
                }
                const newTimeLeft = prevTime - 1;
                localStorage.setItem('timeLeft', String(newTimeLeft));
                return newTimeLeft;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="inactivated">
            <div className="inactivated-header">
                <Logo to="/welcome" />

                <div className="logout">
                    <Button variant="text" onClick={() => dispatch(logout())}>
                        <LogoutIcon />
                        <span>Вийти з аккаунту</span>
                    </Button>
                </div>
            </div>

            <p className="content">
                Ми прагнемо, щоб всі користувачі були справжніми. <br/>
                Перевірте свою пошту: <span className="bold">{myUser?.email}</span> і активуйте свій акаунт. <br/>
                Якщо листа немає, перевірте папку "Спам". <br/>
                {timeLeft === null ? (
                    <>
                        Якщо Ви не отримали листа, натисніть&nbsp;
                        <Button to={getActivationLink} variant="text" onClick={handleClick}>
                            сюди
                        </Button>
                    </>
                ) : (
                    <span>
                        Ще раз можна буде відправити листа через:
                        <span className="timer">
                            {Math.floor(timeLeft / 60)}:{timeLeft % 60 > 9 ? timeLeft % 60 : `0${timeLeft % 60}`}
                        </span>
                    </span>
                )}<br/><br/>
                <span className="attention">
                    Якщо не активувати акаунт протягом доби з моменту реєстрації, він буде видалений.
                </span>
            </p>
        </div>
    );
};

export default Inactivated;
