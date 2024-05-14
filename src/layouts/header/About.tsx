import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const About: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="about">
            <h2>{t('about.title')}</h2>

            <p>
                {t('about.hello')}
            </p>

            <p>
                {t('about.do_you_have')}
            </p>

            <p>
                {t('about.it_likely')}
            </p>

            <p>
                {t('about.what_about')}
            </p>

            <p>
                {t('about.it_appears_to')}
            </p>

            <p>
                {t('about.probably')}
            </p>

            <p>
                {t('about.what_other_factors')}
            </p>

            <p>
                {t('about.today_we')}
            </p>

            <p>
                {t('about.but_what')}
            </p>

            <p>
                {t('about.profound')}
            </p>

            <p>
                {t('about.let_delve')}
            </p>

            <p>
                {t('about.there_are_so')}
            </p>

            <p>
                {t('about.yes_money_it')}
            </p>

            <p>
                {t('about.and_finally')}
            </p>

            <p>
                {t('about.you_know')}
            </p>

            <p>
                {t('about.this_web')}
            </p>
        </div>
    );
};

export default About;
