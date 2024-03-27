import React, { FC, useState } from 'react';
import { useAppDispatch } from '@/store/hook';
import { doneWish } from '@/store/wishes/thunks';
import ConfirmModal from '@/layouts/ConfirmModal';
import Button from '@/components/Button';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';

interface IProps {
    wish: IWish;
    userId?: IUser['id'];
    close: () => void;
}

const DoneWish: FC<IProps> = ({ wish, userId, close }) => {
    const [show, setShow] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        if (!userId) return;

        await dispatch(doneWish({ userId, wishId: wish.id }));
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
                    Ви впевнені, що бажання "{wish.name}" виконано?
                </p>
            </ConfirmModal>
        </>
    );
};

export default DoneWish;
