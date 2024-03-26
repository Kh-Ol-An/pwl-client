import React, { FC, useState } from 'react';
import ConfirmModal from '@/layouts/ConfirmModal';
import Button from '@/components/Button';
import { IWish } from '@/models/IWish';

interface IProps {
    wishName: IWish['name'];
    close: () => void;
}

const ConfirmExecutionWish: FC<IProps> = ({ wishName, close }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleSubmit = () => {
        console.log('ConfirmBookWish handleSubmit');
        close();
    };

    return (
        <>
            <Button
                type="button"
                variant="text"
                onClick={() => setShow(true)}
            >
                Підтвердити виконання
            </Button>

            <ConfirmModal
                show={show}
                confirmText="Бажання виконано"
                close={() => setShow(false)}
                confirm={handleSubmit}
            >
                <p className="text-lg">
                    Ви впевнені, що бажання "{wishName}" виконано?
                </p>
            </ConfirmModal>
        </>
    );
};

export default ConfirmExecutionWish;
