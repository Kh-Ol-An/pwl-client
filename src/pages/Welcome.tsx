import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from "@/components/Logo";
import LanguageSelection from "@/components/LanguageSelection";
import Button from "@/components/Button";
import ActionBlockGiftBigImg from "@/assets/images/welcome/action-block-gift-big.png";
import ActionBlockGiftSmallImg from "@/assets/images/welcome/action-block-gift-small.png";
import PartyPopperIcon from "@/assets/images/welcome/party-popper-icon.svg";
import FlowersImg from "@/assets/images/welcome/flowers.png";
import BearImg from "@/assets/images/welcome/bear.png";
import VRHeadsetImg from "@/assets/images/welcome/vr-headset.png";
import HeadphonesImg from "@/assets/images/welcome/headphones.png";
import CheckedIcon from "@/assets/images/welcome/checked-icon.svg";
import Emoji1Img from "@/assets/images/welcome/emoji-1.png";
import Emoji2Img from "@/assets/images/welcome/emoji-2.png";
import Emoji3Img from "@/assets/images/welcome/emoji-3.png";
import Emoji4Img from "@/assets/images/welcome/emoji-4.png";
import Emoji5Img from "@/assets/images/welcome/emoji-5.png";
import Smile1Img from "@/assets/images/welcome/smile-1.png";
import Smile2Img from "@/assets/images/welcome/smile-2.png";
import Smile3Img from "@/assets/images/welcome/smile-3.png";
import Smile4Img from "@/assets/images/welcome/smile-4.png";
import Arrow1Img from "@/assets/images/welcome/arrow-1.png";
import Arrow2Img from "@/assets/images/welcome/arrow-2.png";
import Arrow3Img from "@/assets/images/welcome/arrow-3.png";
import Arrow4Img from "@/assets/images/welcome/arrow-4.png";
import Arrow5Img from "@/assets/images/welcome/arrow-5.png";

const Welcome: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="welcome-page">
            <section className="cover">
                <div className="container">
                    <div className="head">
                        <Logo />

                        <div className="actions">
                            <LanguageSelection/>

                            <div className="auth-actions">
                                <Button to="/auth" variant="text">{t('sing-in')}</Button>
                                <Button to="/auth?register">{t('sing-up')}</Button>
                            </div>
                        </div>
                    </div>

                    <div className="cover-content">
                        <div className="text-block">
                            <h1>{t('welcome-page.solve_the_problem')}</h1>

                            <p>{t('welcome-page.unique_platform')}</p>
                        </div>

                        <div className="cover-figure">
                            <img className="cover-figure-emoji-1" src={Emoji1Img} alt={t('welcome-page.emoji')} />
                            <img className="cover-figure-arrow-1" src={Arrow1Img} alt={t('welcome-page.arrow')} />
                            <img className="cover-figure-smile-1" src={Smile1Img} alt={t('welcome-page.smile')} />

                            <div className="cover-figure-wishlist">
                                <div className="cover-figure-wishlist_head">
                                    <div className="cover-figure-wishlist_title">
                                        <h4>{t('welcome-page.birthday_wishlist')}</h4>

                                        <img src={PartyPopperIcon} alt="Party Popper Icon"/>
                                    </div>

                                    <span>{t('welcome-page.count_wishes')}</span>
                                </div>

                                <ul className="cover-figure-wishlist_list">
                                    {/* Flowers */}
                                    <li className="cover-figure-wishlist_item">
                                        <div className="cover-figure-wishlist_block">
                                            <span className="cover-figure-wishlist_checkbox"></span>

                                            <div className="cover-figure-wishlist_img">
                                                <img src={FlowersImg} alt={t('welcome-page.bouquet_of')}/>
                                            </div>

                                            <div className="cover-figure-wishlist_content">
                                                <span>{t('welcome-page.bouquet_of')}</span>
                                                <p>{t('welcome-page.i_love_roses')}</p>
                                            </div>
                                        </div>
                                    </li>

                                    {/* Bear */}
                                    <li className="cover-figure-wishlist_item">
                                        <div className="cover-figure-wishlist_block">
                                            <span className="cover-figure-wishlist_checkbox">
                                                <img src={CheckedIcon} alt={t('welcome-page.checked_icon')}/>
                                            </span>

                                            <div className="cover-figure-wishlist_img">
                                                <img src={BearImg} alt={t('welcome-page.teddy_bear')}/>
                                            </div>

                                            <div className="cover-figure-wishlist_content">
                                                <span>{t('welcome-page.teddy_bear')}</span>
                                                <p>{t('welcome-page.childhood_dream')}</p>
                                            </div>
                                        </div>
                                    </li>

                                    {/* VR Headset */}
                                    <li className="cover-figure-wishlist_item">
                                        <div className="cover-figure-wishlist_block">
                                            <span className="cover-figure-wishlist_checkbox"></span>

                                            <div className="cover-figure-wishlist_img">
                                                <img src={VRHeadsetImg} alt={t('welcome-page.vr_headset')}/>
                                            </div>

                                            <div className="cover-figure-wishlist_content">
                                                <span>{t('welcome-page.vr_headset')}</span>
                                                <p>{t('welcome-page.childhood_dream')}</p>
                                            </div>
                                        </div>
                                    </li>

                                    {/* Headphones */}
                                    <li className="cover-figure-wishlist_item">
                                        <div className="cover-figure-wishlist_block">
                                            <span className="cover-figure-wishlist_checkbox">
                                                <img src={CheckedIcon} alt={t('welcome-page.checked_icon')}/>
                                            </span>

                                            <div className="cover-figure-wishlist_img">
                                                <img src={HeadphonesImg} alt="Beats by Dre"/>
                                            </div>

                                            <div className="cover-figure-wishlist_content">
                                                <span>Beats by Dre</span>
                                                <p>{t('welcome-page.the_best_wireless')}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="action-block">
                        <h3>{t('welcome-page.special_celebrations')}</h3>

                            <p>{t('welcome-page.create_wish_lists')}</p>

                            <Button to="/auth?register">{t('sing-up')}</Button>

                            <img className="action-block_gift-big" src={ActionBlockGiftBigImg} alt="bigger gift"/>

                            <img className="action-block_gift-small" src={ActionBlockGiftSmallImg} alt="smaller gift"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Welcome;
