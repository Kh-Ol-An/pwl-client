import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import PartyPopperIcon from "@/assets/images/welcome/party-popper-icon.svg";
import FlowersImg from "@/assets/images/welcome/flowers.png";
import BearImg from "@/assets/images/welcome/bear.png";
import VRHeadsetImg from "@/assets/images/welcome/vr-headset.png";
import HeadphonesImg from "@/assets/images/welcome/headphones.png";
import CheckedIcon from "@/assets/images/welcome/checked-icon.svg";
import StarEmojiImg from "@/assets/images/welcome/star-emoji.png";
import PigtailsEmojiImg from "@/assets/images/welcome/pigtails-emoji.png";
import WinkingEmojiImg from "@/assets/images/welcome/winking-emoji.png";
import BeardedEmojiImg from "@/assets/images/welcome/bearded_emoji.png";
import GreatEmojiImg from "@/assets/images/welcome/great-emoji.png";
import LoveSmileImg from "@/assets/images/welcome/love-smile.png";
import FestiveSmileImg from "@/assets/images/welcome/festive-smile.png";
import StarSmileImg from "@/assets/images/welcome/star-smile.png";
import SunglassesSmileImg from "@/assets/images/welcome/sunglasses-smile.png";
import ArrowImg from "@/assets/images/welcome/arrow.svg";

const CoverFigure: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="cover-figure">
            <img className="cover-figure-emoji-1" src={ StarEmojiImg } alt={ t('welcome-page.alts.star_emoji') } />
            <img className="cover-figure-arrow-1" src={ ArrowImg } alt={ t('welcome-page.alts.arrow') } />
            <img className="cover-figure-smile-1" src={ LoveSmileImg } alt={ t('welcome-page.alts.love_smile') } />

            <img className="cover-figure-emoji-2"
                 src={ PigtailsEmojiImg }
                 alt={ t('welcome-page.alts.pigtails_emoji') } />
            <img className="cover-figure-arrow-2" src={ ArrowImg } alt={ t('welcome-page.alts.arrow') } />
            <img className="cover-figure-smile-2"
                 src={ FestiveSmileImg }
                 alt={ t('welcome-page.alts.festive_smile') } />

            <img className="cover-figure-emoji-3"
                 src={ WinkingEmojiImg }
                 alt={ t('welcome-page.alts.winking_emoji') } />
            <img className="cover-figure-arrow-3" src={ ArrowImg } alt={ t('welcome-page.alts.arrow') } />
            <img className="cover-figure-smile-3" src={ StarSmileImg } alt={ t('welcome-page.alts.star_smile') } />

            <img className="cover-figure-emoji-4"
                 src={ BeardedEmojiImg }
                 alt={ t('welcome-page.alts.bearded_emoji') } />
            <img className="cover-figure-arrow-4" src={ ArrowImg } alt={ t('welcome-page.alts.arrow') } />
            <img className="cover-figure-smile-4"
                 src={ SunglassesSmileImg }
                 alt={ t('welcome-page.alts.sunglasses_smile') } />

            <img className="cover-figure-emoji-5" src={ GreatEmojiImg } alt={ t('welcome-page.alts.great_emoji') } />
            <img className="cover-figure-arrow-5" src={ ArrowImg } alt={ t('welcome-page.alts.arrow') } />

            <div className="cover-figure_head">
                <h4>
                    { t('welcome-page.birthday_wishlist') }
                    <img src={ PartyPopperIcon } alt={ t('welcome-page.alts.party_popper_icon') } />
                </h4>

                <span>{ t('welcome-page.count_wishes') }</span>
            </div>

            <ul className="cover-figure_list">
                {/* Flowers */ }
                <li className="cover-figure_item">
                    <div className="cover-figure_block">
                        <span className="cover-figure_checkbox"></span>

                        <div className="cover-figure_img">
                            <img src={ FlowersImg } alt={ t('welcome-page.bouquet_of') } />
                        </div>

                        <div className="cover-figure_content">
                            <span>{ t('welcome-page.bouquet_of') }</span>
                            <p>{ t('welcome-page.i_love_roses') }</p>
                        </div>
                    </div>
                </li>

                {/* Bear */ }
                <li className="cover-figure_item">
                    <div className="cover-figure_block">
                        <span className="cover-figure_checkbox">
                            <img src={ CheckedIcon } alt={ t('welcome-page.alts.checked_icon') } />
                        </span>

                        <div className="cover-figure_img">
                            <img src={ BearImg } alt={ t('welcome-page.teddy_bear') } />
                        </div>

                        <div className="cover-figure_content">
                            <span>{ t('welcome-page.teddy_bear') }</span>
                            <p>{ t('welcome-page.childhood_dream') }</p>
                        </div>
                    </div>
                </li>

                {/* VR Headset */ }
                <li className="cover-figure_item">
                    <div className="cover-figure_block">
                        <span className="cover-figure_checkbox"></span>

                        <div className="cover-figure_img">
                            <img src={ VRHeadsetImg } alt={ t('welcome-page.vr_headset') } />
                        </div>

                        <div className="cover-figure_content">
                            <span>{ t('welcome-page.vr_headset') }</span>
                            <p>{ t('welcome-page.i_will_be') }</p>
                        </div>
                    </div>
                </li>

                {/* Headphones */ }
                <li className="cover-figure_item">
                    <div className="cover-figure_block">
                        <span className="cover-figure_checkbox">
                            <img src={ CheckedIcon } alt={ t('welcome-page.checked_icon') } />
                        </span>

                        <div className="cover-figure_img">
                            <img src={ HeadphonesImg } alt="Beats by Dre" />
                        </div>

                        <div className="cover-figure_content">
                            <span>Beats by Dre</span>
                            <p>{ t('welcome-page.the_best_wireless') }</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default CoverFigure;
