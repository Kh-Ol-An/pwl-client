import React, { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

const Card: FC<IProps> = ({ children }) => {
    return (
        <div className="card">
            <div className="inner">
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Card;
