import React, { FC, ReactNode } from 'react';

interface IProps {
    label: string;
    data:  string | ReactNode;
}

const DataWithLabel: FC<IProps> = ({ label, data }) => {
    return (
        <div className="data-with-label">
            <span className="label">{label}</span>
            {typeof data === 'string' ? <span className="data">{data}</span> : data}
        </div>
    );
};

export default DataWithLabel;
