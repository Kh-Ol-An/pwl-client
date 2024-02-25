import React, { FC, ReactNode, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    to?: string;
    target?: '_blank';
    tabIndex?: number;
    classes?: 'text';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: any) => void;
    children: ReactNode;
}

const Button: FC<IProps> = ({
    to,
    target,
    tabIndex = 0,
    classes,
    disabled,
    type,
    onClick,
    children,
}) => {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        disabled && event.preventDefault();
    };

    if (to) {
        return (
            <Link
                className={"button" + (classes ? ` ${classes}` : "")}
                to={to}
                target={target}
                rel="noopener noreferrer"
                tabIndex={tabIndex}
                onClick={onClick || handleClick}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            className={"button" + (classes ? ` ${classes}` : "")}
            type={type}
            tabIndex={tabIndex}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
