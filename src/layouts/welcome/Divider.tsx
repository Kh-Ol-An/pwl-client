import React, { Fragment } from 'react';
import { useTranslation } from "react-i18next";
import StarIcon from "@/assets/images/welcome/star.svg";

const Divider = () => {
    const { t } = useTranslation();

    return (
        <div className="welcome-divider">
            { Array.from({ length: 40 }).map((_, index) => (
                <Fragment key={ index }>
                    <span>WishHub</span>
                    <img src={ StarIcon } alt={ t('welcome-page.alts.star_icon') } />
                </Fragment>
            )) }
        </div>
    );
};

export default Divider;
