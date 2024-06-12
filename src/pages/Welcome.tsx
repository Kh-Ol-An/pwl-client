import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from "@/store/hook";
import { setCandidate } from "@/store/my-user/slice";
import { IUser } from "@/models/IUser";
import { accountFirstNameValidation, emailValidation } from "@/utils/validations";
import CoverFigure from "@/layouts/CoverFigure";
import WelcomeDivider from "@/layouts/WelcomeDivider";
import AlgorithmBox from "@/layouts/AlgorithmBox";
import Logo from "@/components/Logo";
import LanguageSelection from "@/components/LanguageSelection";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ActionGiftBigImg from "@/assets/images/welcome/action-gift-big.png";
import ActionGiftSmallImg from "@/assets/images/welcome/action-gift-small.png";
import PlusIcon from "@/assets/images/welcome/plus-icon.svg";
import EyeIcon from "@/assets/images/welcome/eye-icon.svg";
import LockIcon from "@/assets/images/welcome/lock-icon.svg";
import ChainIcon from "@/assets/images/welcome/chain-icon.svg";
import ArrowImg from "@/assets/images/welcome/arrow.svg";
import CheckedIcon from "@/assets/images/welcome/checked-icon.svg";
import BenefitsGiftBigImg from "@/assets/images/welcome/benefits-gift-big.png";
import BenefitsGiftMiddleImg from "@/assets/images/welcome/benefits-gift-middle.png";
import LoveEmojiImg from "@/assets/images/welcome/love-emoji.png";
import FestiveEmojiImg from "@/assets/images/welcome/festive-emoji.png";
import FestiveSmileImg from "@/assets/images/welcome/festive-smile.png";
import StarSmileImg from "@/assets/images/welcome/star-smile.png";

type Inputs = {
    firstName: IUser['firstName']
    email: IUser['email']
}

const Welcome: FC = () => {
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
        <div className="welcome-page">
            <section className="cover">
                <div className="container">
                    <div className="head">
                        <Logo />

                        <div className="actions">
                            <LanguageSelection />

                            <div className="auth-actions">
                                <Button to="/auth" variant="text">{ t('sing-in') }</Button>
                                <Button to="/auth?register">{ t('sing-up') }</Button>
                            </div>
                        </div>
                    </div>

                    <div className="cover-content">
                        <div className="text-block">
                            <h1>{ t('welcome-page.solve_the_problem') }</h1>

                            <p>{ t('welcome-page.unique_platform') }</p>
                        </div>

                        <CoverFigure />

                        <div className="action-block">
                            <h3>{ t('welcome-page.special_celebrations') }</h3>

                            <p>{ t('welcome-page.create_wish_lists') }</p>

                            <Button to="/auth?register">{ t('sing-up') }</Button>

                            <img
                                className="action-block_gift-big"
                                src={ ActionGiftBigImg }
                                alt={ t('welcome-page.bigger_gift') }
                            />

                            <img
                                className="action-block_gift-small"
                                src={ ActionGiftSmallImg }
                                alt={ t('welcome-page.smaller_gift') }
                            />
                        </div>
                    </div>
                </div>
            </section>

            <WelcomeDivider />

            <section className="join">
                <div className="container">
                    <div className="text-block">
                        <h2>{ t('welcome-page.with_wish_hub') }</h2>

                        <p>
                            { t('welcome-page.save_time') }
                            &nbsp;
                            <br />
                            { t('welcome-page.no_more') }
                        </p>
                    </div>

                    {/* algorithm */}
                    <div className="algorithm-wrap">
                        <AlgorithmBox
                            icon={ <img src={ PlusIcon } alt={ t('welcome-page.plus_icon') } /> }
                            title={ t('welcome-page.create_wishes') }
                            text={ t('welcome-page.easily_add') }
                        />

                        <img className="algorithm_chain-icon first" src={ ChainIcon } alt={ t('welcome.chain_icon') } />

                        <AlgorithmBox
                            icon={ <img src={ EyeIcon } alt={ t('welcome-page.eye_icon') } /> }
                            title={ t('welcome-page.browse_wishes') }
                            text={ t('welcome-page.discover_wishes') }
                        />

                        <img className="algorithm_chain-icon second"
                             src={ ChainIcon }
                             alt={ t('welcome.chain_icon') } />

                        <AlgorithmBox
                            icon={ <img src={ LockIcon } alt={ t('welcome-page.lock_icon') } /> }
                            title={ t('welcome-page.reserve_wishes') }
                            text={ t('welcome-page.duplicate_gifts') }
                        />
                    </div>

                    <div className="text-block">
                        <h2>{ t('welcome-page.benefits_of_being') }</h2>

                        <p>{ t('welcome-page.forget_hassle') }</p>
                    </div>

                    <div className="foot">
                        {/* benefits */}
                        <div className="benefits">
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

                            <div className="benefits_perfect">
                                <h4>
                                    { t('welcome-page.guaranteed_perfect') }
                                    <img
                                        className="benefits_checked-icon"
                                        src={ CheckedIcon }
                                        alt={ t('welcome-page.checked_icon') }
                                    />
                                </h4>

                                <p>{ t('welcome-page.give_what') }</p>
                            </div>

                            <div className="benefits_easy">
                                <h4>
                                    { t('welcome-page.easy_to_use') }
                                    <img
                                        className="benefits_checked-icon"
                                        src={ CheckedIcon }
                                        alt={ t('welcome-page.checked_icon') }
                                    />
                                </h4>

                                <p>{ t('welcome-page.our_intuitive') }</p>
                            </div>

                            <img
                                className="benefits_gift-big"
                                src={ BenefitsGiftBigImg }
                                alt={ t('welcome-page.bigger_gift') }
                            />

                            <img
                                className="benefits_gift-middle"
                                src={ BenefitsGiftMiddleImg }
                                alt={ t('welcome-page.middle_gift') }
                            />

                            <img
                                className="benefits_gift-small"
                                src={ ActionGiftSmallImg }
                                alt={ t('welcome-page.smaller_gift') }
                            />
                        </div>

                        <img className="benefits-arrow" src={ ArrowImg } alt={ t('welcome-page.arrow') } />

                        {/* sing-up */ }
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

                            <Button onClick={handleSingUp} >
                                { t('sing-up') }
                            </Button>

                            <img
                                className="sing-up_love-emoji"
                                src={ LoveEmojiImg }
                                alt={ t('welcome-page.love_emoji') }
                            />

                            <img
                                className="sing-up_festive-emoji"
                                src={ FestiveEmojiImg }
                                alt={ t('welcome-page.festive_emoji') }
                            />

                            <img
                                className="sing-up_festive-smile"
                                src={ FestiveSmileImg }
                                alt={ t('welcome-page.festive_smile') }
                            />

                            <img
                                className="sing-up_star-smile"
                                src={ StarSmileImg }
                                alt={ t('welcome-page.star_smile') }
                            />
                        </div>
                    </div>
                </div>
            </section>

            <WelcomeDivider />

            <div className="footer">2024. Wish Hub. All rights reserved</div>
        </div>
    );
};

export default Welcome;
