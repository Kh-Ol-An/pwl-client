import React, { FC, ReactNode } from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@/layouts/Card';
import Action from '@/components/Action';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    show: boolean;
    hide: () => void;
    classes?: string;
    children: ReactNode;
}

const CustomModal: FC<IProps> = ({ show, hide, classes = 'modal', children }) => {
    return (
        <Modal
            open={show}
            onClose={hide}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={classes}>
                <Card classes="not-full-screen">
                    {children}
                </Card>

                <Action onClick={hide}>
                    <CloseIcon sx={{ color: StylesVariables.blackColor }} />
                </Action>
            </div>
        </Modal>
    );
};

export default CustomModal;
