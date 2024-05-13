import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/store/hook';
import { doneWish } from '@/store/wishes/thunks';
import ConfirmModal from '@/layouts/ConfirmModal';
import Button from '@/components/Button';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';

interface IProps {
    wish: IWish;
    userId?: IUser['id'];
    actionText?: string;
    close: () => void;
}

const DoneWish: FC<IProps> = ({ wish, userId, actionText, close }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [show, setShow] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!userId) return;

        await dispatch(doneWish({ userId, wishId: wish.id }));
        close();
    };

    return (
        <>
            {actionText && (
                <Button
                    type="button"
                    variant="text"
                    onClick={() => setShow(true)}
                >
                    {actionText}
                </Button>
            )}

            <ConfirmModal
                show={show}
                confirmText={t('main.wish-fulfilled')}
                close={() => setShow(false)}
                confirm={handleSubmit}
            >
                <p className="text-lg">
                    {t('main.sure-fulfilled', { name: wish.name })}
                </p>
            </ConfirmModal>
        </>
    );
};

export default DoneWish;
