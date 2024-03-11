import React, { FC, ReactNode } from 'react';
import { Popover } from '@mui/material';
import Card from "./Card";

interface IProps {
    anchor: HTMLButtonElement | null;
    setAnchor: (el: HTMLButtonElement | null) => void;
    actionIcon: ReactNode;
    children: ReactNode;
}

const Popup: FC<IProps> = ({ anchor, setAnchor, actionIcon, children }) => {
    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    return (
        <>
            <button className="settings" type="button" onClick={handleOpen}>
                {actionIcon}
            </button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
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
