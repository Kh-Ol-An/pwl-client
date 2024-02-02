import React, { FC, ReactNode, MouseEventHandler } from 'react';
import { TagButton, TagLink } from './ButtonStyles';

interface IProps {
    to?: string;
    target?: '_blank';
    tabIndex?: number;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: any) => void;
    children: ReactNode;
}

const Button: FC<IProps> = ({ to, target, tabIndex = 0, disabled, type, onClick, children }) => {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        disabled && event.preventDefault();
    };

    if (to) {
        return (
            <TagLink
                to={to}
                target={target}
                rel="noopener noreferrer"
                tabIndex={tabIndex}
                onClick={onClick || handleClick}
            >
                {children}
            </TagLink>
        );
    }

    return (
        <TagButton
            type={type}
            tabIndex={tabIndex}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </TagButton>
    );
};

export default Button;
