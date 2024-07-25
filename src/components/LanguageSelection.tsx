import React, { FC, useState, useEffect } from 'react';
import i18next from "i18next";
import { UA, US } from 'country-flag-icons/react/3x2';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { changeLang } from '@/store/my-user/thunks';
import { setIsLoading } from '@/store/my-user/slice';
import { ELang } from '@/models/IUser';
import CustomSelect, { IOption } from "@/components/CustomSelect";
import { getLang } from "@/utils/lang-action";

const options: IOption[] = [
    {
        label: (
            <>
                <US title="United States" className="flag-icon" />
                <span className="lang-text">Eng</span>
            </>
        ),
        value: ELang.EN,
    },
    {
        label: (
            <>
                <UA title="Ukraine" className="flag-icon" />
                <span className="lang-text">Укр</span>
            </>
        ),
        value: ELang.UK,
    },
];

interface IProps {
    hidPopup?: () => void;
}

const LanguageSelection: FC<IProps> = ({ hidPopup }) => {
    const myUser = useAppSelector((state) => state.myUser);

    const dispatch = useAppDispatch();

    const [ lang, setLang ] = useState<ELang>(getLang());

    const handleChangeLanguage = async (value: IOption['value']) => {
        try {
            await i18next.changeLanguage(value);
            setLang(value as ELang);

            if (myUser.user !== null) {
                await dispatch(changeLang({ userId: myUser.user.id, lang: value as ELang }));
                await dispatch(setIsLoading(true));
                window.location.reload();
            }
        } catch (error) {
            console.error('Language Selection: ', error);
        }

        hidPopup && hidPopup();
    };

    useEffect(() => {
        setLang(getLang());
    }, []);

    return (
        <div className="language-selection">
            <CustomSelect
                options={ options }
                value={ lang }
                onChange={ handleChangeLanguage }
            />
        </div>
    );
};

export default LanguageSelection;
