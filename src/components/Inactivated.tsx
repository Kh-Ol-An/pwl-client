import React, { FC } from 'react';
import {useAppSelector} from '../store/hook';
import Button from './Button';

const Inactivated: FC = () => {
    const myUser = useAppSelector((state) => state.myUser.user);

    const getActivationLink
        = `${
            process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_API_URL
        }/get-activation-link/${myUser?.id}`;

    return (
        <div className="inactivated">
            <p>
                Ми прагнемо, щоб всі користувачі були справжніми. <br/>
                Перевірте свою пошту: <span className="bold">{myUser?.email}</span> і активуйте свій акаунт. <br/>
                Якщо листа немає, перевірте папку "Спам". <br/>
                Якщо Ви не отримали листа, натисніть <Button to={getActivationLink} variant="text">сюди</Button> <br/><br/>
                <span className="attention">Якщо не активувати акаунт протягом доби з моменту реєстрації, він буде видалений.</span>
            </p>
        </div>
    );
};

export default Inactivated;
