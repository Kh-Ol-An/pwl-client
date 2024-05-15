import React, { FC } from 'react';
import i18next from "i18next";
import { UA, US } from 'country-flag-icons/react/3x2';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { changeLang } from '@/store/my-user/thunks';
import { setIsLoading } from '@/store/my-user/slice';
import { IUser } from '@/models/IUser';

const LanguageSelection: FC = () => {
    const myUser = useAppSelector((state) => state.myUser);

    const dispatch = useAppDispatch();

    const handleChangeLanguage = async (language: IUser['lang']) => {
        i18next.changeLanguage(language);

        if (myUser.user !== null) {
            await dispatch(changeLang({ userId: myUser.user.id, lang: language }));
            dispatch(setIsLoading(true));
            location.reload();
        }
    };

    return (
        <div className="language-selection">
            <button
                type="button"
                disabled={i18next.language.includes('en')}
                onClick={() => handleChangeLanguage('en')}
            >
                <US title="United States" className="flag-icon" />
            </button>

            <button
                type="button"
                disabled={i18next.language.includes('uk')}
                onClick={() => handleChangeLanguage('uk')}
            >
                <UA title="Ukraine" className="flag-icon" />
            </button>
        </div>
    );
};

export default LanguageSelection;
