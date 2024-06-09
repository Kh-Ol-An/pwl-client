import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/store/hook';
import { undoneWish, doneWish } from '@/store/wishes/thunks';
import { IDoneWish } from '@/store/wishes/types';
import CustomModal from '@/components/CustomModal';
import Button from '@/components/Button';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';
import { unencryptedData } from '@/utils/encryption-data';

interface IProps {
    wish: IWish;
    userId?: IUser['id'];
    whoseWish: IDoneWish['whoseWish'];
    close: () => void;
}

const BookingExpired: FC<IProps> = ({ wish, userId, whoseWish, close }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [show, setShow] = useState<boolean>(true);

    const handleUndone = async () => {
        if (!userId) return;

        await dispatch(undoneWish({ userId, wishId: wish.id }));
        close();
    };

    const handleDone = async () => {
        if (!userId) return;

        await dispatch(doneWish({ userId, wishId: wish.id, whoseWish }));
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
                {t('main-page.determine-status')}
            </Button>

            <CustomModal show={show} hide={() => setShow(false)} classes="modal confirm">
                <h3 className="title attention">{t('confirm-modal.title')}</h3>

                <p className="text-lg">
                    {t('main-page.period-expired', { name: unencryptedData(wish.name, wish.show) })}
                    <br />
                    <br />
                    {t('main-page.is_your_wish')}
                </p>

                <div className="modal-actions detail-wish-expired-actions">
                    <Button type="button" onClick={handleUndone}>
                        {t('main-page.no')}
                    </Button>

                    <Button type="button" onClick={handleDone}>
                        {t('main-page.yes')}
                    </Button>
                </div>
            </CustomModal>
        </>
    );
};

export default BookingExpired;
