import React, { FC } from 'react';

interface IProps {
    label: string;
    data: string;
}

const DataWithLabel: FC<IProps> = ({ label, data }) => {
    return (
        <div className="data-with-label">
            <span className="label">{label}</span>
            <span className="data">{data}</span>
        </div>
    );
};

export default DataWithLabel;
