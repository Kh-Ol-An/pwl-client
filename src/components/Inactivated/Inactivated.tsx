import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Root } from './InactivatedStyles';
import { StoreContext } from '../../index';

const Inactivated: FC = () => {
    const { store } = useContext(StoreContext);

    return (
        <Root>
            Ми прагнемо, щоб всі користувачі були справжніми.
            Перевірте свою пошту: {store?.myUser?.email} і активуйте свій акаунт.
        </Root>
    );
};

export default observer(Inactivated);
