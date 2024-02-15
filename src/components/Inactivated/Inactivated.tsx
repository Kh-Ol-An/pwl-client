import React, { FC } from 'react';
import { Root } from './InactivatedStyles';
import {useAppSelector} from "../../store/hook";

const Inactivated: FC = () => {
    const myUser = useAppSelector((state) => state.myUser);

    return (
        <Root>
            Ми прагнемо, щоб всі користувачі були справжніми.
            Перевірте свою пошту: {myUser?.user?.email} і активуйте свій акаунт.
        </Root>
    );
};

export default Inactivated;
