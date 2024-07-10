import React, { FC, MouseEvent, ReactNode } from 'react';
import { Popover } from '@mui/material';
import Card from "@/layouts/Card";

interface IProps {
    anchor: HTMLButtonElement | null;
    setAnchor: (el: HTMLButtonElement | null) => void;
    actionIcon: ReactNode;
    isTopPosition?: boolean;
    children: ReactNode;
}

const Popup: FC<IProps> = ({ anchor, setAnchor, actionIcon, isTopPosition = false, children }) => {
    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;

    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    return (
        <>
            <button className="people-icon" type="button" onClick={handleOpen}>
                {actionIcon}
            </button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={isTopPosition ? {
                    vertical: 'top',
                    horizontal: 'left',
                } : {
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={isTopPosition ? {
                    vertical: 'bottom',
                    horizontal: 'left',
                } : {
                    vertical: 'top',
                    horizontal: 'right',
                }}
                style={{ borderRadius: '20px' }}
            >
                <Card classes="thin-border">
                    <div className="popup">
                        {children}
                    </div>
                </Card>
            </Popover>
        </>
    );
};

export default Popup;
