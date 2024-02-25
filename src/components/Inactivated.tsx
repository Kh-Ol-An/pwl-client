import React, { FC } from 'react';
import {useAppSelector} from '../store/hook';

const Inactivated: FC = () => {
    const myUser = useAppSelector((state) => state.myUser);

    return (
        <div className="inactivated">
            Ми прагнемо, щоб всі користувачі були справжніми.
            Перевірте свою пошту: <span>{myUser?.user?.email}</span> і активуйте свій акаунт.
        </div>
    );
};

export default Inactivated;
