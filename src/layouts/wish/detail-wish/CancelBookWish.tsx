import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/store/hook';
import { cancelBookWish } from '@/store/wishes/thunks';
import ConfirmModal from '@/components/ConfirmModal';
import Button from '@/components/Button';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';
import { unencryptedData } from '@/utils/encryption-data';

interface IProps {
    wish: IWish;
    userId?: IUser['id'];
    close: () => void;
}

const CancelBookWish: FC<IProps> = ({ wish, userId, close }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [show, setShow] = useState<boolean>(false);

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
                {t('main-page.cancel-execution')}

            </Button>

            <ConfirmModal
                show={show}
                confirmText={t('main-page.cancel-my-intention')}
                close={() => setShow(false)}
                confirm={handleSubmit}
            >
                <p className="text-lg">
                    {t('main-page.cancel-intention', { name: unencryptedData(wish.name, wish.show) })}
                </p>
            </ConfirmModal>
        </>
    );
};

export default CancelBookWish;
