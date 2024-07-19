import React from 'react';
import TikTokIcon from "@/assets/images/social-networks/tiktok.svg";
import TelegramIcon from "@/assets/images/social-networks/telegram.svg";
import InstagramIcon from "@/assets/images/social-networks/instagram.svg";
import FacebookIcon from "@/assets/images/social-networks/facebook.svg";
import YouTubeIcon from "@/assets/images/social-networks/YouTubeIcon";
// Іконки соціальних мереж взято з https://www.svgrepo.com/

const SocialNetworks = () => {
    return (
        <>
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
                <YouTubeIcon />
            </a>
        </>
    );
};

export default SocialNetworks;
