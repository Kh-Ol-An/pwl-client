import React, { FC, ChangeEvent, Ref, forwardRef, useState } from 'react';
import { Tooltip } from '@mui/material';
import {
    VisibilityOff as VisibilityOffIcon,
    Visibility as VisibilityIcon,
    Info as InfoIcon,
} from '@mui/icons-material';
import { addingWhiteSpaces } from '../utils/formating-value';
import stylesVariables from '../styles/utils/variables.module.scss';

interface IProps {
    id: string;
    name: string;
    type: 'text' | 'password' | 'number' | 'multiline';
    label: string;
    tooltip?: string;
    value?: string;
    error?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input: FC<IProps> = forwardRef<HTMLInputElement | HTMLTextAreaElement, IProps>(({
    id,
    name,
    type,
    label,
    tooltip,
    value,
    error,
    onChange,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [openTooltip, setOpenTooltip] = useState<boolean>(false);

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

    const handleTooltipClose = () => {
        setOpenTooltip(false);
    };

    const handleTooltipOpen = () => {
        setOpenTooltip(true);
    };

    return (
        <div className="input">
            <div className={"wrap" + (type === 'multiline' ? " with-bg" : "")}>
                {
                    type === 'multiline'
                        ? <textarea
                              ref={ref as Ref<HTMLTextAreaElement>}
                              id={id}
                              name={name}
                              placeholder="hidden"
                              value={value}
                              onChange={onChange}
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
                            <VisibilityOffIcon sx={{ color: stylesVariables.accentColor }} /> :
                            <VisibilityIcon sx={{ color: stylesVariables.accentColor }} />}
                    </button>
                )}
                <label htmlFor={id}>
                    {label}
                    {tooltip && tooltip.length > 0 && (
                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={handleTooltipClose}
                            open={openTooltip}
                            title={tooltip}
                            arrow
                            placement="top"
                        >
                            <button type="button" onClick={handleTooltipOpen}>
                                <InfoIcon sx={{ color: stylesVariables.specialColor }} />
                            </button>
                        </Tooltip>
                    )}
                </label>
                <div className="background"></div>
            </div>

            {error && <p className="error">{error}</p>}
        </div>
    );
});

export default Input;
