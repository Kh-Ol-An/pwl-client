import React, { FC, useState } from 'react';
import ConfirmModal from '@/layouts/ConfirmModal';
import Button from '@/components/Button';
import { IWish } from '@/models/IWish';

interface IProps {
    wishName: IWish['name'];
    close: () => void;
}

const NotDoneWish: FC<IProps> = ({ wishName, close }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleSubmit = () => {
        console.log('NotDoneWish handleSubmit');
        close();
    };

    return (
        <>
            <Button
                type="button"
                variant="text"
                color="action-color"
                onClick={() => setShow(true)}
            >
                Бажання не виконано
            </Button>

            <ConfirmModal
                show={show}
                confirmText="Бажання не виконано"
                close={() => setShow(false)}
                confirm={handleSubmit}
            >
                <p className="text-lg">
                    Ви впевнені, що бажання "{wishName}" не виконано?
                </p>
            </ConfirmModal>
        </>
    );
};

export default NotDoneWish;
