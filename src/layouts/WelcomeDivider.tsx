import React from 'react';
import { useTranslation } from "react-i18next";
import StarIcon from "@/assets/images/welcome/star.svg";

const WelcomeDivider = () => {
    const { t } = useTranslation();

    return (
        <div className="welcome-divider">
            { Array.from({ length: 40 }).map((_, index) => (
                <>
                    <span key={ index }>WishHub</span>
                    <img src={ StarIcon } alt={ t('star_icon') } />
                </>
            )) }
        </div>
    );
};

export default WelcomeDivider;
