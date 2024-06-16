import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/store/hook';
import { doneWish } from '@/store/wishes/thunks';
import { IDoneWish } from '@/store/wishes/types';
import ConfirmModal from '@/components/ConfirmModal';
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

const DoneWish: FC<IProps> = ({ wish, userId, whoseWish, close }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [show, setShow] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!userId) return;

        await dispatch(doneWish({ userId, wishId: wish.id, whoseWish }));
        close();
    };

    return (
        <>
            <Button
                type="button"
                variant="text"
                color="primary-color"
                onClick={() => setShow(true)}
            >
                {t('main-page.wish-fulfilled')}
            </Button>

            <ConfirmModal
                show={show}
                confirmText={t('main-page.wish-fulfilled')}
                close={() => setShow(false)}
                confirm={handleSubmit}
            >
                <p className="text-lg">
                    {t('main-page.sure-fulfilled', { name: unencryptedData(wish.name, wish.show) })}
                </p>
            </ConfirmModal>
        </>
    );
};

export default DoneWish;
