import React, { FC } from 'react';

interface IProps {
    id: string;
    type: string;
    label: string;
    title?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IProps> = ({ id, type, label, title, value, onChange }) => {
    return (
        <div className="input" title={title}>
            <input id={id} type={type} value={value} required onChange={onChange} />
            <label htmlFor={id}>{label}</label>
            <div className="background"></div>
        </div>
    );
};

export default Input;
