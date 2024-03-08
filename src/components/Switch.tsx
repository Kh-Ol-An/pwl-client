import React, { ChangeEvent, FC } from 'react';

interface IProps {
    id: string;
    name: string;
    checked: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Switch: FC<IProps> = ({ id, name, checked, onChange }) => {
    return (
        <label className="switch">
            <div className="switch-outer-border">
                <div className="switch-inner-border">
                    <div className={"switch-content" + (checked ? " checked" : "")}>
                        <input
                            className="hidden"
                            type="checkbox"
                            id={id}
                            name={name}
                            checked={checked}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>
        </label>
    );
};

export default Switch;
