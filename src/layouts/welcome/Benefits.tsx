import React, { FC } from 'react';
import { useTranslation } from "react-i18next";
import CheckedIcon from "@/assets/images/welcome/checked-icon.svg";
import BenefitsGiftBigImg from "@/assets/images/welcome/benefits-gift-big.png";
import BenefitsGiftMiddleImg from "@/assets/images/welcome/benefits-gift-middle.png";
import ActionGiftSmallImg from "@/assets/images/welcome/action-gift-small.png";

const Benefits: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="benefits">
            <div className="benefits_perfect">
                <h4>
                    { t('welcome-page.making_dreams') }
                    <img
                        className="benefits_checked-icon"
                        src={ CheckedIcon }
                        alt={ t('welcome-page.alts.checked_icon') }
                    />
                </h4>

                <p>{ t('welcome-page.your_dreams') }</p>
            </div>

            <div>
                <h4>
                    { t('welcome-page.time_saving') }
                    <img
                        className="benefits_checked-icon"
                        src={ CheckedIcon }
                        alt={ t('welcome-page.checked_icon') }
                    />
                </h4>

                <p>{ t('welcome-page.forget_the_long') }</p>
            </div>

            <div className="benefits_easy">
                <h4>
                    { t('welcome-page.easy_to_use') }
                    <img
                        className="benefits_checked-icon"
                        src={ CheckedIcon }
                        alt={ t('welcome-page.alts.checked_icon') }
                    />
                </h4>

                <p>{ t('welcome-page.our_intuitive') }</p>
            </div>

            <img
                className="benefits_gift-big"
                src={ BenefitsGiftBigImg }
                alt={ t('welcome-page.alts.bigger_gift') }
            />

            <img
                className="benefits_gift-middle"
                src={ BenefitsGiftMiddleImg }
                alt={ t('welcome-page.alts.middle_gift') }
            />

            <img
                className="benefits_gift-small"
                src={ ActionGiftSmallImg }
                alt={ t('welcome-page.alts.smaller_gift') }
            />
        </div>
    );
};

export default Benefits;
