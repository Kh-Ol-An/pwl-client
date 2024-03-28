import React, { FC } from 'react';
import { Modal } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useAppDispatch } from '@/store/hook';
import { undoneWish, doneWish } from '@/store/wishes/thunks';
import Card from '@/layouts/Card';
import Button from '@/components/Button';
import Action from '@/components/Action';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';

interface IProps {
    wish: IWish;
    userId?: IUser['id'];
    close: () => void;
}

const BookingExpired: FC<IProps> = ({ wish, userId, close }) => {
    const dispatch = useAppDispatch();

    const [show, setShow] = React.useState<boolean>(true);

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
        <>
            <Button
                type="button"
                variant="text"
                color="action-color"
                onClick={() => setShow(true)}
            >
                Визначити статус виконання
            </Button>

            <Modal
                open={show}
                onClose={() => setShow(false)}
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

                        <div className="modal-actions detail-wish-expired-actions">
                            <Button type="button" onClick={handleUndone}>
                                Ні
                            </Button>

                            <Button type="button" onClick={handleDone}>
                                Так
                            </Button>
                        </div>
                    </Card>

                    <Action onClick={() => setShow(false)}>
                        <CloseIcon />
                    </Action>
                </div>
            </Modal>
        </>
    );
};

export default BookingExpired;
