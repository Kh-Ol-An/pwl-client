import React, { FC, useState } from 'react';
import ConfirmModal from '@/layouts/ConfirmModal';
import Button from '@/components/Button';
import { IWish } from '@/models/IWish';

interface IProps {
    wishName: IWish['name'];
    close: () => void;
}

const CancelBookWish: FC<IProps> = ({ wishName, close }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleSubmit = () => {
        console.log('CancelBookWish handleSubmit');
        close();
    };

    return (
        <>
            <Button
                type="button"
                variant="text"
                onClick={() => setShow(true)}
            >
                Скасувати виконання
            </Button>

            <ConfirmModal
                show={show}
                confirmText="Скасувати мій намір"
                close={() => setShow(false)}
                confirm={handleSubmit}
            >
                <p className="text-lg">
                    Ви впевнені, що хочете скасувати свій намір виконати бажання "{wishName}"?
                </p>
            </ConfirmModal>
        </>
    );
};

export default CancelBookWish;
