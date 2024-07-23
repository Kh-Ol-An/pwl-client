import React from 'react';
import TikTokIcon from "@/assets/images/social-networks/TikTokIcon";
import TelegramIcon from "@/assets/images/social-networks/TelegramIcon";
import InstagramIcon from "@/assets/images/social-networks/InstagramIcon";
import FacebookIcon from "@/assets/images/social-networks/FacebookIcon";
import YouTubeIcon from "@/assets/images/social-networks/YouTubeIcon";
// Іконки соціальних мереж взято з https://www.svgrepo.com/

const SocialNetworks = () => {
    return (
        <>
            <a
                href="https://tiktok.com/@wish.hub.net"
                target="_blank"
                rel="noopener noreferrer external nofollow"
            >
                <TikTokIcon />
            </a>

            <a
                href="https://t.me/wish_hub"
                target="_blank"
                rel="noopener noreferrer external nofollow"
            >
                <TelegramIcon />
            </a>

            <a
                href="https://www.instagram.com/wish_hub_net/"
                target="_blank"
                rel="noopener noreferrer external nofollow"
            >
                <InstagramIcon />
            </a>

            <a
                href="https://www.facebook.com/wish.hub.net"
                target="_blank"
                rel="noopener noreferrer external nofollow"
            >
                <FacebookIcon />
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
