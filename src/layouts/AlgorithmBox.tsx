import React, { FC, ReactNode } from 'react';

interface IProps {
    icon?: ReactNode;
    title: string;
    text: string;
}

const AlgorithmBox: FC<IProps> = ({ icon, title, text }) => {
    return (
        <div className="algorithm-box">
            <div className="algorithm-head">
                <div className="algorithm-box-bg">
                    { icon }
                </div>

                <h4 className="algorithm-title">{ title }</h4>
            </div>

            <p className="algorithm-text">
                { text }
            </p>
        </div>
    );
};

export default AlgorithmBox;
