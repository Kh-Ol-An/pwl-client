import React from 'react';
import { useTranslation } from 'react-i18next';

const Contacts = () => {
    const { t } = useTranslation();

    return (
        <div className="contacts">
            <h3>
                {t('main.contacts')}:
            </h3>

            <p>
                {t('main.phone')} <a href="tel:+380508899268">+38 050 88 99 268</a>
            </p>

            <p className="contacts-mail">
                {t('main.email')} <a href="mailto:wish-hub@ukr.net">wish-hub@ukr.net</a>
            </p>

            <p className="contact-us">
                {t('main.contact-us')}
            </p>
        </div>
    );
};

export default Contacts;
