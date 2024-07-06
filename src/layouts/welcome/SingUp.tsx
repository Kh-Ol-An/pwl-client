import React, { FC } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store/hook";
import { setCandidate } from "@/store/my-user/slice";
import { IUser } from "@/models/IUser";
import { accountFirstNameValidation, emailValidation } from "@/utils/validations";
import Input from "@/components/Input";
import Button from "@/components/Button";
import LoveEmojiImg from "@/assets/images/welcome/love-emoji.png";
import FestiveEmojiImg from "@/assets/images/welcome/festive-emoji.png";
import FestiveSmileImg from "@/assets/images/welcome/festive-smile.png";
import StarSmileImg from "@/assets/images/welcome/star-smile.png";

type Inputs = {
    firstName: IUser['firstName']
    email: IUser['email']
}

const SingUp: FC = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {
        register,
        getValues,
        formState: { errors },
    } = useForm<Inputs>();

    const handleSingUp = async () => {
        await dispatch(setCandidate({ firstName: getValues('firstName'), email: getValues('email')}))
        navigate('/auth?register');
    }

    return (
        <div className="sing-up">
            <h3>{ t('welcome-page.join_today') }</h3>

            <p>{ t('welcome-page.sign_up_now') }</p>

            <div className="sing-up_data">
                <Input
                    { ...register("firstName", accountFirstNameValidation) }
                    id="firstName"
                    name="firstName"
                    type="text"
                    label={ t('first-name') }
                    error={ errors?.firstName?.message }
                />

                <Input
                    { ...register("email", emailValidation) }
                    id="email"
                    name="email"
                    type="text"
                    label="Email*"
                    error={ errors?.email?.message }
                />
            </div>

            <Button onClick={ handleSingUp }>
                { t('sing-up') }
            </Button>

            <img
                className="sing-up_love-emoji"
                src={ LoveEmojiImg }
                alt={ t('welcome-page.alts.love_emoji') }
            />

            <img
                className="sing-up_festive-emoji"
                src={ FestiveEmojiImg }
                alt={ t('welcome-page.alts.festive_emoji') }
            />

            <img
                className="sing-up_festive-smile"
                src={ FestiveSmileImg }
                alt={ t('welcome-page.alts.festive_smile') }
            />

            <img
                className="sing-up_star-smile"
                src={ StarSmileImg }
                alt={ t('welcome-page.alts.star_smile') }
            />
        </div>
    );
};

export default SingUp;
