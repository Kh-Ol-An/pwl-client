import React, { FC, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import stylesVariables from '../styles/utils/variables.module.scss';

interface IProps {
    id: string;
    type: string;
    label: string;
    title?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IProps> = ({ id, type, label, title, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const getTypes = (type: string) => {
        if (type === 'password') {
            return showPassword ? 'text' : 'password';
        }

        return type;
    };

    return (
        <div className="input" title={title}>
            <input id={id} type={getTypes(type)} value={value} required onChange={onChange} />
            {type === 'password' && (
                <button type="button" onClick={() => setShowPassword(prevState => !prevState)}>
                    {showPassword ?
                        <VisibilityOff sx={{ color: stylesVariables.accentColor }} /> :
                        <Visibility sx={{ color: stylesVariables.accentColor }} />}
                </button>
            )}
            <label htmlFor={id}>{label}</label>
            <div className="background"></div>
        </div>
    );
};

export default Input;
