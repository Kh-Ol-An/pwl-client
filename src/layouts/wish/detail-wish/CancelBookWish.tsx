import React, { FC, useState } from 'react';
import { useAppDispatch } from '@/store/hook';
import { cancelBookWish } from '@/store/wishes/thunks';
import ConfirmModal from '@/layouts/ConfirmModal';
import Button from '@/components/Button';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';

interface IProps {
    wish: IWish;
    userId?: IUser['id'];
    close: () => void;
}

const CancelBookWish: FC<IProps> = ({ wish, userId, close }) => {
    const [show, setShow] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        if (!userId) return;
        await dispatch(cancelBookWish({ userId, wishId: wish.id }));
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
                Скасувати виконання
            </Button>

            <ConfirmModal
                show={show}
                confirmText="Скасувати мій намір"
                close={() => setShow(false)}
                confirm={handleSubmit}
            >
                <p className="text-lg">
                    Ви впевнені, що хочете скасувати свій намір виконати бажання "{wish.name}"?
                </p>
            </ConfirmModal>
        </>
    );
};

export default CancelBookWish;
