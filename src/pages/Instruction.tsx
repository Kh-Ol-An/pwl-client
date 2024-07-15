import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from "@/store/hook";
import PageHeader from '@/layouts/PageHeader';
import App from "@/layouts/instruction/App";
import Auth from "@/layouts/instruction/Auth";
import CustomAccordion from '@/components/CustomAccordion';

const Instruction: FC = () => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser);

    const [ screenWidth, setScreenWidth ] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="instruction-page">
            <div className="container">
                <PageHeader />
            </div>

            <section className={ "container" + (myUser.user === null ? " logged-out" : "") }>
                <h1>{ t('instruction-page.title') }</h1>

                <div>
                    { screenWidth < 1280 && (
                        <CustomAccordion
                            ariaControls="app-content"
                            titleId="app-header"
                            title={ t('instruction-page.app.title') }
                            contentId="app-content"
                        >
                            <App />
                        </CustomAccordion>
                    ) }

                    <CustomAccordion
                        ariaControls="auth-content"
                        titleId="auth-header"
                        title={ t('instruction-page.auth.title') }
                        contentId="auth-content"
                    >
                        <Auth />
                    </CustomAccordion>

                    <CustomAccordion
                        ariaControls="next-content"
                        titleId="next-header"
                        title={ t('instruction-page.next.title') }
                        contentId="next-content"
                    >
                        <p>
                            { t('instruction-page.next.text') }
                        </p>
                    </CustomAccordion>
                </div>
            </section>
        </div>
    );
};

export default Instruction;
