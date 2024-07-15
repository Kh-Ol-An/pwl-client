import React, { FC } from 'react';

interface IProps {
    isLocal?: boolean;
}

const Loading: FC<IProps> = ({ isLocal }) => {
    return (
        <div className={ "loading" + (isLocal ? " local" : "") }>
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;
