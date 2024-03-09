import React, { FC, MouseEvent, ReactNode } from 'react';

interface IProps {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

const Action: FC<IProps> = ({ onClick, children }) => {
    return (
        <button className="action" type="button" onClick={onClick}>
            <div className="action-outer-border">
                <div className="action-inner-border">
                    <div className="action-content">
                        {children}
                    </div>
                </div>
            </div>
        </button>
    );
};

export default Action;
