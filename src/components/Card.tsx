import React, { FC, ReactNode } from 'react';

interface IProps {
    withLights?: boolean;
    classes?: string;
    title?: ReactNode;
    children: ReactNode;
}

const Card: FC<IProps> = ({ withLights = false, classes, title, children }) => {
    return (
        <div
            className={
                "card" + (title ? ' rolled-up' : "") + (classes ? ` ${classes}` : "")
            }
        >
            {withLights && (
                <>
                    <div className="light-one"></div>
                    <div className="light-two"></div>
                </>
            )}

            <div className="outer-border">
                <div className="inner-border">
                    <div className="card-content">
                        {title && (
                            <div className="card-title">
                                {title}
                            </div>
                        )}
                        <div className="card-expander">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
