import React, { FC, ReactNode, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    to?: string;
    target?: '_blank';
    tabIndex?: number;
    variant?: 'text';
    color?: 'action-color';
    fontSize?: 'small';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: any) => void;
    children: ReactNode;
}

const Button: FC<IProps> = ({
    to,
    target,
    tabIndex = 0,
    variant,
    color,
    fontSize,
    disabled,
    type,
    onClick,
    children,
}) => {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        disabled && event.preventDefault();
    };

    const tagProps: Record<string, any> = {
        className: `button${color ? ` ${color}` : ''}${variant ? ` ${variant}` : ''}${fontSize ? ` ${fontSize}` : ''}${disabled ? ' disabled' : ''}`,
        tabIndex,
        onClick: onClick || handleClick,
    };

    if (to) {
        return (
            <Link
                to={to}
                target={target}
                rel="noopener noreferrer"
                {...tagProps}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            disabled={disabled}
            {...tagProps}
        >
            {children}
        </button>
    );
};

export default Button;
