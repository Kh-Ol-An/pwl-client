import React, { FC, forwardRef, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import stylesVariables from '../styles/utils/variables.module.scss';
import { addingWhiteSpaces } from '../utils/formating-value';

interface IProps {
    id: string;
    type: string;
    label: string;
    title?: string;
    value?: string;
    error?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(({
    id,
    type,
    label,
    title,
    value,
    error,
    onChange,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const getTypes = (type: string) => {
        switch (type) {
            case 'password':
                return showPassword ? 'text' : 'password';
            case 'number':
                return 'text';
            default:
                return type;
        }
    };

    return (
        <div className="input" title={title}>
            <div className="wrap">
                <input
                    className={type === 'password' ? 'with-icon' : ''}
                    ref={ref}
                    id={id}
                    type={getTypes(type)}
                    inputMode={type === 'number' ? 'numeric' : 'text'}
                    placeholder="hidden"
                    value={value}
                    onChange={(e) => {
                        if (type === 'number') {
                            e.target.value = addingWhiteSpaces(e.target.value);
                        }
                        onChange && onChange(e);
                    }}
                    {...props}
                />
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

            {error && <p className="error">{error}</p>}
        </div>
    );
});

export default Input;
