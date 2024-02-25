import React, { FC, ReactNode } from 'react';

interface IProps {
    withLights?: boolean;
    classes?: 'rolled-up';
    title: ReactNode;
    children: ReactNode;
}

const Card: FC<IProps> = ({ withLights = false, classes, title, children }) => {
    return (
        <div className={"card" + (classes ? ` ${classes}` : "")}>
            {withLights && (
                <>
                    <div className="light-one"></div>
                    <div className="light-two"></div>
                </>
            )}

            <div className="box">
                <div className="inner">
                    <div className="content">
                        {title}
                        <div className="expander">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
