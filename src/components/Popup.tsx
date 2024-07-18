import React, { FC, MouseEvent, ReactNode } from 'react';
import { Popover } from '@mui/material';

interface IProps {
    actionClasses?: string;
    anchor: HTMLButtonElement | null;
    setAnchor: (el: HTMLButtonElement | null) => void;
    actionIcon: ReactNode;
    isTopPosition?: boolean;
    children: ReactNode;
}

const Popup: FC<IProps> = ({ actionClasses, anchor, setAnchor, actionIcon, isTopPosition = false, children }) => {
    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;

    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchor(event.currentTarget);
    };

    const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchor(null);
    };

    return (
        <>
            <button className={ actionClasses } type="button" onClick={ handleOpen }>
                { actionIcon }
            </button>

            <Popover
                id={ id }
                open={ open }
                anchorEl={ anchor }
                onClose={ handleClose }
                anchorOrigin={ isTopPosition ? {
                    vertical: 'top',
                    horizontal: 'left',
                } : {
                    vertical: 'bottom',
                    horizontal: 'right',
                } }
                transformOrigin={ isTopPosition ? {
                    vertical: 'bottom',
                    horizontal: 'left',
                } : {
                    vertical: 'top',
                    horizontal: 'right',
                } }
                style={ { borderRadius: '20px' } }
            >
                { children }
            </Popover>
        </>
    );
};

export default Popup;
