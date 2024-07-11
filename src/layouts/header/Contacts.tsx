import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import TikTokIcon from '@/assets/images/social-networks/tiktok.svg';
import TelegramIcon from '@/assets/images/social-networks/telegram.svg';
import InstagramIcon from '@/assets/images/social-networks/instagram.svg';
import FacebookIcon from '@/assets/images/social-networks/facebook.svg';
import YoutubeIcon from '@/assets/images/social-networks/youtube.svg';
// Іконки соціальних мереж взято з https://www.svgrepo.com/

const Contacts: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="contacts">
            <h3>
                { t('main-page.contacts') }:
            </h3>

            <p>
                { t('main-page.phone') } <a href="tel:+380508899268">+38 050 88 99 268</a>
            </p>

            <p className="contacts-adapt">
                { t('main-page.email') } <a href="mailto:wish-hub@ukr.net">wish-hub@ukr.net</a>
            </p>

            <p className="contacts-adapt">
                { t('main-page.social-networks') }
                <span className="contacts-social-networks">
                    <a
                        href="https://tiktok.com/@wish.hub5"
                        target="_blank"
                        rel="noopener noreferrer external nofollow"
                    >
                        <img src={ TikTokIcon } alt="Tik Tok" />
                    </a>

                    <a
                        href="https://t.me/wish_hub"
                        target="_blank"
                        rel="noopener noreferrer external nofollow"
                    >
                        <img src={ TelegramIcon } alt="Telegram" />
                    </a>

                    <a
                        href="https://www.instagram.com/wish_hub_net/"
                        target="_blank"
                        rel="noopener noreferrer external nofollow"
                    >
                        <img src={ InstagramIcon } alt="Instagram" />
                    </a>

                    <a
                        href="https://www.facebook.com/wish.hub.net"
                        target="_blank"
                        rel="noopener noreferrer external nofollow"
                    >
                        <img src={ FacebookIcon } alt="Facebook" />
                    </a>

                    <a
                        href="https://www.youtube.com/@wish-hub"
                        target="_blank"
                        rel="noopener noreferrer external nofollow"
                    >
                        <img src={ YoutubeIcon } alt="YouTube" />
                    </a>
                </span>
            </p>

            <p className="contact-us">
                { t('main-page.contact-us') }
            </p>
        </div>
    );
};

export default Contacts;
