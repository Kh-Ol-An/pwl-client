import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from "@/store/hook";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/Input";
import { onlyWhitespaceValidation } from "@/utils/validations";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import { fetchWishDataFromLink } from "@/store/wishes/thunks";
import { Tooltip } from "react-tooltip";
import getTooltipStyles from "@/utils/get-tooltip-styles";

interface IProps {
    close: () => void;
}

export type TInputs = {
    url: string
}

const FastWish: FC<IProps> = ({ close }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();

    const [ screenWidth, setScreenWidth ] = useState<number>(window.innerWidth);

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        await dispatch(fetchWishDataFromLink(data));
        close();
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
        <form className="edit-wish" onSubmit={ handleSubmit(onSubmit) }>
            <h3>
                { t('main-page.fast_data_filling') }
            </h3>

            <Input
                { ...register("url", onlyWhitespaceValidation) }
                id="url"
                name="url"
                type="text"
                label={ t('main-page.product-link') }
                tooltip={ t('main-page.product-link-tooltip') }
                error={ errors?.url?.message }
            />
            <Tooltip
                id="url"
                style={ getTooltipStyles(screenWidth) }
            />

            <div className="actions">
                <Button variant="text" color="primary-color" onClick={close}>
                    { t('main-page.manually') }
                </Button>

                <Button type="submit">
                    { t('main-page.continue') }
                </Button>
            </div>
        </form>
    );
};

export default FastWish;
