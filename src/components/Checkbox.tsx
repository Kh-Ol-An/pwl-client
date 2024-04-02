import React, { FC, ReactNode, ChangeEvent, useEffect, useState } from 'react';

interface IProps {
    id: string;
    name: string;
    checked: boolean;
    value: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    children: ReactNode;
}

const Checkbox: FC<IProps> = ({ id, name, checked, value, onChange, children }) => {
    const [isTransition, setIsTransition] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransition(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="checkbox">
            <div className="checkbox-action">
                <div className="checkbox-outer-border">
                    <div className="checkbox-inner-border">
                        <div
                            className={
                                "checkbox-content" + (checked ? " checked" : "") + (isTransition ? " transition" : "")
                            }
                        ></div>
                    </div>
                </div>
            </div>

            <input
                className="hidden"
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                value={value}
                onChange={onChange}
            />

            <label htmlFor={id}>
                {children}
            </label>
        </div>
    );
};

export default Checkbox;
