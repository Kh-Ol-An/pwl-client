import React, { FC, ReactNode } from 'react';

interface IProps {
    withLights?: boolean;
    classes?: string;
    children: ReactNode;
}

const Card: FC<IProps> = ({ withLights = false, classes, children }) => {
    return (
        <div className={ "card" + (classes ? ` ${ classes }` : "") }>
            { withLights && (
                <>
                    <div className="card-light-one"></div>
                    <div className="card-light-two"></div>
                </>
            ) }

            <div className="card-outer-border">
                <div className="card-inner-border">
                    <div className="card-content">
                        <div className="card-scroll">
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
