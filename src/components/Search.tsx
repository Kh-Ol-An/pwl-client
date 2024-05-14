import React, { FC, ChangeEvent, useState, useRef, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import Input from '@/components/Input';

const useDebounce = (callback: () => void) => {
    const ref = useRef<() => void>();

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    return useMemo(() => {
        const callRef = () => {
            ref?.current?.();
        };

        return debounce(callRef, 500);
    }, []);
};

interface Props {
    id: string;
    label: string;
    changeSearchBar: (value: string) => void;
}

const Search: FC<Props> = ({ id, label, changeSearchBar }) => {
    const [searchBar, setSearchBar] = useState('');

    const send = useDebounce(() => changeSearchBar(searchBar.trim()));

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();

        if (event.target.value.startsWith(' ')) {
            setSearchBar(value);
        } else if (value.length > 0) {
            setSearchBar(event.target.value);
        } else {
            setSearchBar('');
        }
        send();
    };

    const clear = () => {
        setSearchBar('');
        send();
    };

    return (
        <Input
            id={id}
            name={id}
            type="search"
            label={label}
            value={searchBar}
            clear={clear}
            onChange={(event) => change(event as ChangeEvent<HTMLInputElement>)}
        />
    );
};

export default Search;
