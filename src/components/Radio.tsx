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
    const [addClass, setAddClass] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAddClass(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="radio">
            <div className="radio-action">
                <div className="radio-outer-border">
                    <div className="radio-inner-border">
                        <div
                            className={"radio-content" + (checked ? " checked" : "") + (addClass ? " transition" : "")}
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

            <label className={(checked ? " checked" : "") + (addClass ? " transition" : "")} htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

export default Radio;
