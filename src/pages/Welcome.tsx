import React, { FC } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { setCandidate } from "@/store/my-user/slice";
import { useAppDispatch } from "@/store/hook";
import CoverFigure from "@/layouts/welcome/CoverFigure";
import Divider from "@/layouts/welcome/Divider";
import AlgorithmBox from "@/layouts/welcome/AlgorithmBox";
import Benefits from "@/layouts/welcome/Benefits";
import SingUp from "@/layouts/welcome/SingUp";
import Logo from "@/components/Logo";
import LanguageSelection from "@/components/LanguageSelection";
import Button from "@/components/Button";
import ActionGiftBigImg from "@/assets/images/welcome/action-gift-big.png";
import ActionGiftSmallImg from "@/assets/images/welcome/action-gift-small.png";
import PlusIcon from "@/assets/images/welcome/plus-icon.svg";
import EyeIcon from "@/assets/images/welcome/eye-icon.svg";
import LockIcon from "@/assets/images/welcome/lock-icon.svg";
import ChainIcon from "@/assets/images/welcome/chain-icon.svg";
import ArrowImg from "@/assets/images/welcome/arrow.svg";

const Welcome: FC = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleSingIn = async () => {
        await dispatch(setCandidate({ firstName: '', email: '' }))
        navigate('/auth');
    }

    const handleSingUp = async () => {
        await dispatch(setCandidate({ firstName: '', email: '' }))
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
                                <Button onClick={ handleSingIn } variant="text">{ t('sing-in') }</Button>
                                <Button onClick={ handleSingUp }>{ t('sing-up') }</Button>
                            </div>
                        </div>
                    </div>

                    <div className="cover-content">
                        <div className="text-block">
                            <h1>{ t('welcome-page.wish_hub_makes') }</h1>

                            <p>{ t('welcome-page.unique_platform') }</p>
                        </div>

                        <CoverFigure />

                        <div className="action-block">
                            <h3>{ t('welcome-page.take_first_step') }</h3>

                            <p>{ t('welcome-page.create_wish_lists') }</p>

                            <Button onClick={ handleSingUp }>{ t('sing-up') }</Button>

                            <img
                                className="action-block_gift-big"
                                src={ ActionGiftBigImg }
                                alt={ t('welcome-page.alts.bigger_gift') }
                            />

                            <img
                                className="action-block_gift-small"
                                src={ ActionGiftSmallImg }
                                alt={ t('welcome-page.alts.smaller_gift') }
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

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

                    {/* algorithm */ }
                    <div className="algorithm-wrap">
                        <AlgorithmBox
                            icon={ <img src={ PlusIcon } alt={ t('welcome-page.alts.plus_icon') } /> }
                            title={ t('welcome-page.create_wishes') }
                            text={ t('welcome-page.add_your_dreams') }
                        />

                        <img
                            className="algorithm_chain-icon first"
                            src={ ChainIcon }
                            alt={ t('welcome.alts.chain_icon') }
                        />

                        <AlgorithmBox
                            icon={ <img src={ EyeIcon } alt={ t('welcome-page.alts.eye_icon') } /> }
                            title={ t('welcome-page.share_your_wishes') }
                            text={ t('welcome-page.share_your_lists') }
                        />

                        <img
                            className="algorithm_chain-icon second"
                            src={ ChainIcon }
                            alt={ t('welcome.alts.chain_icon') }
                        />

                        <AlgorithmBox
                            icon={ <img src={ LockIcon } alt={ t('welcome-page.alts.lock_icon') } /> }
                            title={ t('welcome-page.book_wishes') }
                            text={ t('welcome-page.book_other_wishes') }
                        />
                    </div>

                    <div className="text-block">
                        <h2>{ t('welcome-page.benefits_of_being') }</h2>

                        <p>{ t('welcome-page.forget_hassle') }</p>
                    </div>

                    <div className="foot">
                        {/* benefits */ }
                        <Benefits />

                        <img className="foot-arrow" src={ ArrowImg } alt={ t('welcome-page.arrow') } />

                        {/* sing-up */ }
                        <SingUp />
                    </div>
                </div>
            </section>

            <Divider />

            <div className="footer">2024. Wish Hub. All rights reserved</div>
        </div>
    );
};

export default Welcome;
