import React, { FC, ChangeEvent, Ref, forwardRef, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import stylesVariables from '../styles/utils/variables.module.scss';
import { addingWhiteSpaces } from '../utils/formating-value';

interface IProps {
    id: string;
    name: string;
    type: string;
    label: string;
    title?: string;
    value?: string;
    multiline?: boolean;
    error?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IProps> = forwardRef<HTMLInputElement | HTMLTextAreaElement, IProps>(({
    id,
    name,
    type,
    label,
    title,
    value,
    multiline = false,
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
            <div className={"wrap" + (multiline ? " with-bg" : "")}>
                {
                    multiline
                        ? <textarea
                              ref={ref as Ref<HTMLTextAreaElement>}
                              id={id}
                              name={name}
                              placeholder="hidden"
                              {...props}
                          />
                        : <input
                              className={type === 'password' ? 'with-icon' : ''}
                              ref={ref as Ref<HTMLInputElement>}
                              id={id}
                              name={name}
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
                }
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
