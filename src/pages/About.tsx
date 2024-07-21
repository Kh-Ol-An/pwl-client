import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppSelector } from "@/store/hook";
import PageHeader from "@/layouts/PageHeader";

const About: FC = () => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className={ "about-page container" + (myUser.user === null ? " logged-out" : "") }>
            <PageHeader />

            <section>
                <h1>
                    <button type="button" onClick={ goBack }>
                        <ArrowBackIcon />
                    </button>

                    { t('about-page.title') }
                </h1>

                <p>
                    { t('about-page.hello') }
                </p>

                <p>
                    { t('about-page.wish_hub_is') }
                </p>

                <p>
                    { t('about-page.our_mission') }
                </p>
            </section>

            <section>
                <h2>{ t('about-page.sub-title') }</h2>

                <p>
                    { t('about-page.do_you_have') }
                </p>

                <p>
                    { t('about-page.it_likely') }
                </p>

                <p>
                    { t('about-page.what_about') }
                </p>

                <p>
                    { t('about-page.it_appears_to') }
                </p>

                <p>
                    { t('about-page.probably') }
                </p>

                <p>
                    { t('about-page.what_other_factors') }
                </p>

                <p>
                    { t('about-page.today_we') }
                </p>

                <p>
                    { t('about-page.but_what') }
                </p>

                <p>
                    { t('about-page.profound') }
                </p>

                <p>
                    { t('about-page.let_delve') }
                </p>

                <p>
                    { t('about-page.there_are_so') }
                </p>

                <p>
                    { t('about-page.yes_money_it') }
                </p>

                <p>
                    { t('about-page.and_finally') }
                </p>

                <p>
                    { t('about-page.you_know') }
                </p>

                <p>
                    { t('about-page.this_web') }
                </p>
            </section>
        </div>
    );
};

export default About;
