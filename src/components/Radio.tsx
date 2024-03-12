import React, { FC, ChangeEvent, useEffect, useState } from 'react';

interface IProps {
    label: string;
    id: string;
    name: string;
    checked: boolean;
    value: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Radio: FC<IProps> = ({ label, id, name, checked, value, onChange }) => {
    const [isTransition, setIsTransition] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransition(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="radio">
            <div className="radio-action">
                <div className="radio-outer-border">
                    <div className="radio-inner-border">
                        <div
                            className={
                                "radio-content" + (checked ? " checked" : "") + (isTransition ? " transition" : "")
                            }
                        ></div>
                    </div>
                </div>
            </div>

            <input
                className="hidden"
                type="radio"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />

            <label className={(checked ? " checked" : "") + (isTransition ? " transition" : "")} htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

export default Radio;
