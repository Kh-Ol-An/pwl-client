import React, { FC, ReactNode } from 'react';
import { t } from 'i18next';
import { Modal } from '@mui/material';
import Card from '@/layouts/Card';
import Button from '@/components/Button';

interface IProps {
    show: boolean;
    title?: string;
    confirmText?: string;
    closeText?: string;
    children: ReactNode;
    close: () => void;
    confirm: () => void;
}

const ConfirmModal: FC<IProps> = ({
                                      show,
                                      title = t('confirm-modal.title'),
                                      confirmText = t('confirm-modal.confirm'),
                                      closeText = t('confirm-modal.close'),
                                      children,
                                      close,
                                      confirm,
                                  }) => {
    return (
        <Modal
            open={ show }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modal confirm">
                <Card classes="not-full-screen">
                    <h3 className="title attention">{ title }</h3>

                    { children }

                    <div className="modal-actions">
                        <Button variant="text" color="action-color" type="button" onClick={ confirm }>
                            { confirmText }
                        </Button>

                        <Button type="button" onClick={ close }>{ closeText }</Button>
                    </div>
                </Card>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
