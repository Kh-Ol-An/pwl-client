import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
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
import ArrowImg from "@/assets/images/welcome/arrow.svg";

const CoverFigure: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="cover-figure">
            <img className="cover-figure-emoji-1" src={Emoji1Img} alt={t('welcome-page.emoji')} />
            <img className="cover-figure-arrow-1" src={ArrowImg} alt={t('welcome-page.arrow')} />
            <img className="cover-figure-smile-1" src={Smile1Img} alt={t('welcome-page.smile')} />

            <img className="cover-figure-emoji-2" src={Emoji2Img} alt={t('welcome-page.emoji')} />
            <img className="cover-figure-arrow-2" src={ArrowImg} alt={t('welcome-page.arrow')} />
            <img className="cover-figure-smile-2" src={Smile2Img} alt={t('welcome-page.smile')} />

            <img className="cover-figure-emoji-3" src={Emoji3Img} alt={t('welcome-page.emoji')} />
            <img className="cover-figure-arrow-3" src={ArrowImg} alt={t('welcome-page.arrow')} />
            <img className="cover-figure-smile-3" src={Smile3Img} alt={t('welcome-page.smile')} />

            <img className="cover-figure-emoji-4" src={Emoji4Img} alt={t('welcome-page.emoji')} />
            <img className="cover-figure-arrow-4" src={ArrowImg} alt={t('welcome-page.arrow')} />
            <img className="cover-figure-smile-4" src={Smile4Img} alt={t('welcome-page.smile')} />

            <img className="cover-figure-emoji-5" src={Emoji5Img} alt={t('welcome-page.emoji')} />
            <img className="cover-figure-arrow-5" src={ArrowImg} alt={t('welcome-page.arrow')} />

            <div className="cover-figure_head">
                <h4>
                    {t('welcome-page.birthday_wishlist')}
                    <img src={PartyPopperIcon} alt={t('welcome-page.party_popper_icon')} />
                </h4>

                <span>{t('welcome-page.count_wishes')}</span>
            </div>

            <ul className="cover-figure_list">
                {/* Flowers */}
                <li className="cover-figure_item">
                    <div className="cover-figure_block">
                    <span className="cover-figure_checkbox"></span>

                        <div className="cover-figure_img">
                            <img src={FlowersImg} alt={t('welcome-page.bouquet_of')} />
                        </div>

                        <div className="cover-figure_content">
                            <span>{t('welcome-page.bouquet_of')}</span>
                            <p>{t('welcome-page.i_love_roses')}</p>
                        </div>
                    </div>
                </li>

                {/* Bear */}
                <li className="cover-figure_item">
                    <div className="cover-figure_block">
                        <span className="cover-figure_checkbox">
                            <img src={CheckedIcon} alt={t('welcome-page.checked_icon')} />
                        </span>

                        <div className="cover-figure_img">
                            <img src={BearImg} alt={t('welcome-page.teddy_bear')} />
                        </div>

                        <div className="cover-figure_content">
                            <span>{t('welcome-page.teddy_bear')}</span>
                            <p>{t('welcome-page.childhood_dream')}</p>
                        </div>
                    </div>
                </li>

                {/* VR Headset */}
                <li className="cover-figure_item">
                    <div className="cover-figure_block">
                        <span className="cover-figure_checkbox"></span>

                        <div className="cover-figure_img">
                            <img src={VRHeadsetImg} alt={t('welcome-page.vr_headset')}/>
                        </div>

                        <div className="cover-figure_content">
                            <span>{t('welcome-page.vr_headset')}</span>
                            <p>{t('welcome-page.childhood_dream')}</p>
                        </div>
                    </div>
                </li>

                {/* Headphones */}
                <li className="cover-figure_item">
                    <div className="cover-figure_block">
                        <span className="cover-figure_checkbox">
                            <img src={CheckedIcon} alt={t('welcome-page.checked_icon')}/>
                        </span>

                        <div className="cover-figure_img">
                            <img src={HeadphonesImg} alt="Beats by Dre"/>
                        </div>

                        <div className="cover-figure_content">
                            <span>Beats by Dre</span>
                            <p>{t('welcome-page.the_best_wireless')}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default CoverFigure;
