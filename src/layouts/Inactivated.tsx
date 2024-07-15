import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { sendActivationLink } from '@/store/my-user/thunks';
import { WAITING_TIME } from '@/utils/constants';
import Button from '@/components/Button';

const Inactivated: FC = () => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const [ timeLeft, setTimeLeft ] = useState<number | null>(null);

    const handleSendActivationLink = async () => {
        if (!myUser) return;

        await dispatch(sendActivationLink(myUser.id));

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
        <p className="inactivated">
            { t('inactivated.aim') }
            <br />
            { t('inactivated.check') } <span className="bold">{ myUser?.email }</span> { t('inactivated.activate') }
            <br />
            { t('inactivated.spam') }
            <br />
            { timeLeft === null ? (
                <>
                    { t('inactivated.click') }
                    <span className="inactivated-link">
                        <Button type="button" variant="text" onClick={ handleSendActivationLink }>
                            { t('inactivated.here') }
                        </Button>
                    </span>
                </>
            ) : (
                <span>
                    { t('inactivated.resend') }
                    <span className="timer">
                        { Math.floor(timeLeft / 60) }:{ timeLeft % 60 > 9 ? timeLeft % 60 : `0${ timeLeft % 60 }` }
                    </span>
                </span>
            ) }
            <br />
            <span className="attention">
                { t('inactivated.day') }
            </span>
        </p>
    );
};

export default Inactivated;
