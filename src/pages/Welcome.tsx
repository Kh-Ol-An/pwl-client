import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from "@/components/Logo";
import CoverFigure from "@/layouts/CoverFigure";
import WelcomeDivider from "@/layouts/WelcomeDivider";
import AlgorithmBox from "@/layouts/AlgorithmBox";
import LanguageSelection from "@/components/LanguageSelection";
import Button from "@/components/Button";
import ActionBlockGiftBigImg from "@/assets/images/welcome/action-block-gift-big.png";
import ActionBlockGiftSmallImg from "@/assets/images/welcome/action-block-gift-small.png";
import PlusIcon from "@/assets/images/welcome/plus-icon.svg";
import EyeIcon from "@/assets/images/welcome/eye-icon.svg";
import LockIcon from "@/assets/images/welcome/lock-icon.svg";
import ChainIcon from "@/assets/images/welcome/chain-icon.svg";

const Welcome: FC = () => {
    const { t } = useTranslation();

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
                                src={ ActionBlockGiftBigImg }
                                alt={ t('welcome-page.bigger_gift') }
                            />

                            <img
                                className="action-block_gift-small"
                                src={ ActionBlockGiftSmallImg }
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
                        <h1>{ t('welcome-page.with_wish_hub') }</h1>

                        <p>
                            { t('welcome-page.save_time') }
                            &nbsp;
                            <br />
                            { t('welcome-page.no_more') }
                        </p>
                    </div>

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
                        <h1>{ t('welcome-page.benefits_of_being') }</h1>

                        <p>{ t('welcome-page.forget_hassle') }</p>
                    </div>

                    <div className="foot">
                        <div className="benefits">
                            <div>
                                <h4>{ t('welcome-page.time_saving') }</h4>

                                <p>{ t('welcome-page.forget_the_long') }</p>
                            </div>

                            <div>
                                <h4>{ t('welcome-page.guaranteed_perfect') }</h4>

                                <p>{ t('welcome-page.give_what') }</p>
                            </div>

                            <div>
                                <h4>{ t('welcome-page.easy_to_use') }</h4>

                                <p>{ t('welcome-page.our_intuitive') }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <WelcomeDivider />
        </div>
    );
};

export default Welcome;
