import React, { FC } from 'react';
import i18next from "i18next";
import { UA, US } from 'country-flag-icons/react/3x2'

const LanguageSelection: FC = () => {
    return (
        <div className="language-selection">
            <button
                type="button"
                disabled={i18next.language.includes('en')}
                onClick={() => i18next.changeLanguage('en')}
            >
                <US title="United States" className="flag-icon" />
            </button>

            <button
                type="button"
                disabled={i18next.language.includes('uk')}
                onClick={() => i18next.changeLanguage('uk')}
            >
                <UA title="Ukraine" className="flag-icon" />
            </button>
        </div>
    );
};

export default LanguageSelection;
