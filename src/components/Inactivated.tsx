import React, { FC } from 'react';
import {useAppSelector} from '../store/hook';
import Button from './Button';

const Inactivated: FC = () => {
    const myUser = useAppSelector((state) => state.myUser.user);

    return (
        <div className="inactivated">
            <p>
                Ми прагнемо, щоб всі користувачі були справжніми. <br/>
                Перевірте свою пошту: <span className="bold">{myUser?.email}</span> і активуйте свій акаунт. <br/>
                Якщо листа немає, перевірте папку "Спам". <br/>
                Якщо Ви не отримали листа, натисніть <Button to="#" variant="text">сюди</Button> <br/><br/>
                <span className="attention">Якщо не активувати акаунт протягом доби з моменту реєстрації, він буде видалений.</span>
            </p>
        </div>
    );
};

export default Inactivated;
