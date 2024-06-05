import React, { FC, ReactNode, useState, useRef, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface IOption {
    label: ReactNode;
    value: string;
}

interface IProps {
    options: IOption[];
    value: IOption['value'];
    onChange: (value: IOption['value']) => void;
}

const CustomSelect: FC<IProps> = ({ options, value, onChange }) => {
    const [show, setShow] = useState<boolean>(false);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setShow(!show);
    };

    const handleOptionChange = (value: IOption['value']) => {
        onChange(value);
        setShow(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShow(false);
            }
        };

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        document.addEventListener('mousedown', handleClickOutside);

        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);

            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            className={"custom-select" + (show ? " show" : "")}
            ref={containerRef}
        >
            <button className="select-action" type="button" onClick={handleClick}>
                {options.find((option) => option.value === value)?.label || options[0].label}
                {screenWidth >= 768 && <KeyboardArrowDownIcon className="arrow-icon"/>}
            </button>

            <ul className="select-options">
                {options.map((option) => {
                    if (option.value === value) return null;

                    return (
                        <li key={option.value}>
                            <button className="select-item" type="button" onClick={() => handleOptionChange(option.value)}>
                                {option.label}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default CustomSelect;
