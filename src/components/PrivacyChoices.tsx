import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Radio from "@/components/Radio";
import { EShow } from "@/models/IWish";
import { Info as InfoIcon } from "@mui/icons-material";
import StylesVariables from "@/styles/utils/variables.module.scss";
import { Tooltip } from "react-tooltip";
import getTooltipStyles from "@/utils/get-tooltip-styles";
import { useTranslation } from "react-i18next";

interface IProps {
    id: string;
    tooltipContent: {
        all: string,
        friends: string,
        nobody: string,
    };
    show: EShow;
    setShow: (show: EShow) => void;
}

const PrivacyChoices: FC<IProps> = ({ id, tooltipContent, show, setShow }) => {
    const { t } = useTranslation();

    const [ screenWidth, setScreenWidth ] = useState<number>(window.innerWidth);

    const changeShow = (e: ChangeEvent<HTMLInputElement>) => {
        setShow(e.target.value as EShow);
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="privacy-choices">
            <span className="privacy-choices-label">
                { t('main-page.can-see.title') }
            </span>

            <div className="privacy-choices-actions">
                <div className="privacy-choices-item">
                    <Radio
                        label={ t('main-page.can-see.all') }
                        id={`${id}-all`}
                        name="show"
                        checked={ show === EShow.ALL }
                        value={ EShow.ALL }
                        onChange={ changeShow }
                    />

                    <span
                        className="tooltip"
                        data-tooltip-id={`${id}-all`}
                        data-tooltip-content={ tooltipContent.all }
                    >
                        <InfoIcon sx={ { color: StylesVariables.specialColor } } />
                    </span>
                    <Tooltip
                        id={`${id}-all`}
                        opacity={ 1 }
                        style={ getTooltipStyles(screenWidth) }
                    />
                </div>

                <div className="privacy-choices-item">
                    <Radio
                        label={ t('main-page.can-see.friends') }
                        id={`${id}-friends`}
                        name="show"
                        checked={ show === EShow.FRIENDS }
                        value={ EShow.FRIENDS }
                        onChange={ changeShow }
                    />

                    <span
                        className="tooltip"
                        data-tooltip-id={`${id}-friends`}
                        data-tooltip-content={ tooltipContent.friends }
                    >
                        <InfoIcon sx={ { color: StylesVariables.specialColor } } />
                    </span>
                    <Tooltip
                        id={`${id}-friends`}
                        opacity={ 1 }
                        style={ getTooltipStyles(screenWidth) }
                    />
                </div>

                <div className="privacy-choices-item">
                    <Radio
                        label={ t('main-page.can-see.nobody') }
                        id={`${id}-nobody`}
                        name="show"
                        checked={ show === EShow.NOBODY }
                        value={ EShow.NOBODY }
                        onChange={ changeShow }
                    />

                    <span
                        className="tooltip"
                        data-tooltip-id={`${id}-nobody`}
                        data-tooltip-content={ tooltipContent.nobody }
                    >
                        <InfoIcon sx={ { color: StylesVariables.specialColor } } />
                    </span>
                    <Tooltip
                        id={`${id}-nobody`}
                        opacity={ 1 }
                        style={ getTooltipStyles(screenWidth) }
                    />
                </div>
            </div>
        </div>
    );
};

export default PrivacyChoices;
