import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SocialNetworks from "@/components/SocialNetworks";

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
                    <SocialNetworks />
                </span>
            </p>

            <p className="contact-us">
                { t('main-page.contact-us') }
            </p>
        </div>
    );
};

export default Contacts;
