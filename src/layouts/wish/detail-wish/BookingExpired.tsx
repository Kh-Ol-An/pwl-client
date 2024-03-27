import React, { FC } from 'react';
import { IWish } from '@/models/IWish';
import Card from '@/layouts/Card';
import Button from '@/components/Button';
import { Modal } from '@mui/material';

interface IProps {
    wishName: IWish['name'];
    close: () => void;
}

const BookingExpired: FC<IProps> = ({ wishName, close }) => {
    const handleUndone = () => {
        console.log('handleUndone');
        close();
    };

    const handleDone = () => {
        console.log('handleDone');
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
                        Термін який визначив виконавець на реалізацію бажання "{wishName}" вичерпано.
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
