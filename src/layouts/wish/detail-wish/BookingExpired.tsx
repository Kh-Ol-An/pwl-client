import React, { FC } from 'react';
import { Modal } from '@mui/material';
import { useAppDispatch } from '@/store/hook';
import { undoneWish, doneWish } from '@/store/wishes/thunks';
import Card from '@/layouts/Card';
import Button from '@/components/Button';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';

interface IProps {
    wish: IWish;
    userId?: IUser['id'];
    close: () => void;
}

const BookingExpired: FC<IProps> = ({ wish, userId, close }) => {
    const dispatch = useAppDispatch();

    const handleUndone = async () => {
        if (!userId) return;

        await dispatch(undoneWish({ userId, wishId: wish.id }));
        close();
    };

    const handleDone = async () => {
        if (!userId) return;

        await dispatch(doneWish({ userId, wishId: wish.id }));
        close();
    };

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modal confirm">
                <Card classes="not-full-screen">
                    <h3 className="title attention">Увага!</h3>

                    <p className="text-lg">
                        Термін який визначив виконавець на реалізацію бажання "{wish.name}" вичерпано.
                        <br />
                        <br />
                        Ваше бажання виконано?
                    </p>

                    <div className="modal-actions">
                        <Button type="button" onClick={handleUndone}>
                            Ні
                        </Button>

                        <Button type="button" onClick={handleDone}>
                            Так
                        </Button>
                    </div>
                </Card>
            </div>
        </Modal>
    );
};

export default BookingExpired;
