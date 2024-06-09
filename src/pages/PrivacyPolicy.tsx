import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import LanguageSelection from "@/components/LanguageSelection";

const PrivacyPolicy: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="privacy-policy">
            <div className="privacy-policy-header">
                <Logo to="/auth" />

                <LanguageSelection />
            </div>

            <div className="container">
                <h1>{t('privacy-policy-page.title')}</h1>

                <p>{t('privacy-policy-page.updated')}</p>

                <p>{t('privacy-policy-page.intro')}</p>

                <p>
                    {t('privacy-policy-page.we-use')}
                    <a
                        href="https://www.privacypolicies.com/privacy-policy-generator/"
                        target="_blank"
                        rel="noopener noreferrer external nofollow"
                    >
                        {t('privacy-policy-page.generator')}
                    </a>
                </p>

                <h2>{t('privacy-policy-page.interpretation-definitions')}</h2>

                <h3>{t('privacy-policy-page.interpretation')}</h3>

                <p>{t('privacy-policy-page.interpretation-text')}</p>

                <h3>{t('privacy-policy-page.definitions')}</h3>

                <p>{t('privacy-policy-page.definitions-intro')}</p>

                <ul>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.account-strong')}
                            </strong> {t('privacy-policy-page.account')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.affiliate-strong')}
                            </strong> {t('privacy-policy-page.affiliate')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.company-strong')}
                            </strong> {t('privacy-policy-page.company')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.cookies-strong')}
                            </strong> {t('privacy-policy-page.cookies')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.country-strong')}
                            </strong> {t('privacy-policy-page.country')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.device-strong')}
                            </strong> {t('privacy-policy-page.device')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.personal-strong')}
                            </strong> {t('privacy-policy-page.personal')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.service-strong')}
                            </strong> {t('privacy-policy-page.service')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.provider-strong')}
                            </strong> {t('privacy-policy-page.provider')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.third-party-strong')}
                            </strong> {t('privacy-policy-page.third-party')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.usage-strong')}
                            </strong> {t('privacy-policy-page.usage')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.website-strong')}
                            </strong> {t('privacy-policy-page.website')}
                            <a href="https://wish-hub.net/">
                                https://wish-hub.net/
                            </a>
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.you-strong')}
                            </strong> {t('privacy-policy-page.you')}
                        </p>
                    </li>
                </ul>

                <h2>{t('privacy-policy-page.collecting')}</h2>

                <h3>{t('privacy-policy-page.types')}</h3>

                <h4>{t('privacy-policy-page.personal-data')}</h4>

                <p>{t('privacy-policy-page.personal-info')}</p>

                <ul>
                    <li>
                        <p>{t('privacy-policy-page.email')}</p>
                    </li>
                    <li>
                        <p>{t('privacy-policy-page.full-name')}</p>
                    </li>
                    <li>
                        <p>{t('privacy-policy-page.phone')}</p>
                    </li>
                    <li>
                        <p>{t('privacy-policy-page.address')}</p>
                    </li>
                    <li>
                        <p>{t('privacy-policy-page.usage_data')}</p>
                    </li>
                </ul>

                <h4>{t('privacy-policy-page.usage_data_title')}</h4>
                <p>{t('privacy-policy-page.usage_data_is')}</p>
                <p>{t('privacy-policy-page.usage_data_may')}</p>
                <p>{t('privacy-policy-page.when_you_access')}</p>
                <p>{t('privacy-policy-page.we_may_also')}</p>

                <h4>{t('privacy-policy-page.information_from_third-party')}</h4>

                <p>{t('privacy-policy-page.the_company_allows')}</p>

                <ul>
                    <li>Google</li>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Twitter</li>
                    <li>LinkedIn</li>
                </ul>

                <p>{t('privacy-policy-page.if_you_decide')}</p>
                <p>{t('privacy-policy-page.you_may_also')}</p>

                <h4>{t('privacy-policy-page.tracking_technologies')}</h4>

                <p>{t('privacy-policy-page.we_use_cookies')}</p>

                <ul>
                    <li>
                        <strong>
                            {t('privacy-policy-page.cookies_or_browser_cookies')}
                        </strong> {t('privacy-policy-page.a_cookie_is')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy-page.web_beacons')}
                        </strong> {t('privacy-policy-page.certain_sections_of')}
                    </li>
                </ul>

                <p>
                    {t('privacy-policy-page.cookies_can_be')}
                    <a
                        href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking"
                        target="_blank"
                        rel="noopener noreferrer external nofollow"
                    >
                        {t('privacy-policy-page.privacy_policies_website')}
                    </a>
                    {t('privacy-policy-page.article')}
                </p>
                <p>{t('privacy-policy-page.we_use_both')}</p>

                <ul>
                    <li>
                        <p><strong>{t('privacy-policy-page.necessary')}</strong></p>
                        <p>{t('privacy-policy-page.session_cookies')}</p>
                        <p>{t('privacy-policy-page.administered_1')}</p>
                        <p>{t('privacy-policy-page.these_cookies_are')}</p>
                    </li>
                    <li>
                        <p><strong>{t('privacy-policy-page.cookies_policy')}</strong></p>
                        <p>{t('privacy-policy-page.persistent_cookies_1')}</p>
                        <p>{t('privacy-policy-page.administered_2')}</p>
                        <p>{t('privacy-policy-page.these_cookies_identify')}</p>
                    </li>
                    <li>
                        <p><strong>{t('privacy-policy-page.functionality_cookies')}</strong></p>
                        <p>{t('privacy-policy-page.persistent_cookies_2')}</p>
                        <p>{t('privacy-policy-page.administered_3')}</p>
                        <p>{t('privacy-policy-page.these_cookies_allow')}</p>
                    </li>
                </ul>

                <p>{t('privacy-policy-page.for_more_information')}</p>

                <h3>{t('privacy-policy-page.use_of_your')}</h3>

                <p>{t('privacy-policy-page.the_company_may')}</p>

                <ul>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.to_provide_and')}
                            </strong> {t('privacy-policy-page.including_to_monitor')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.to_manage_your_account')}
                            </strong> {t('privacy-policy-page.to_manage_your_registration')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.for_the_performance')}
                            </strong> {t('privacy-policy-page.the_development')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.to_contact_you')}
                            </strong> {t('privacy-policy-page.by_email')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.to_provide_you')}
                            </strong> {t('privacy-policy-page.with_news')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.to_manage_your_requests')}
                            </strong> {t('privacy-policy-page.to_attend')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.for_business_transfers')}
                            </strong> {t('privacy-policy-page.we_may_use_1')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy-page.for_other_purposes')}
                            </strong> {t('privacy-policy-page.we_may_use_2')}
                        </p>
                    </li>
                </ul>

                <p>{t('privacy-policy-page.we_may_share_1')}</p>

                <ul>
                    <li>
                        <strong>
                            {t('privacy-policy-page.with_service_providers')}
                        </strong> {t('privacy-policy-page.we_may_share_2')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy-page.for_business_transfers_2')}
                        </strong> {t('privacy-policy-page.we_may_share_3')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy-page.with_affiliates')}
                        </strong> {t('privacy-policy-page.we_may_share_4')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy-page.with_business_partners')}
                        </strong> {t('privacy-policy-page.we_may_share_5')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy-page.with_other_users')}
                        </strong> {t('privacy-policy-page.when_you_share')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy-page.with_your_consent')}
                        </strong> {t('privacy-policy-page.we_may_disclose')}
                    </li>
                </ul>

                <h3>{t('privacy-policy-page.retention')}</h3>
                <p>{t('privacy-policy-page.company_will_retain')}</p>
                <p>{t('privacy-policy-page.company_will_also')}</p>

                <h3>{t('privacy-policy-page.transfer')}</h3>
                <p>{t('privacy-policy-page.your_information')}</p>
                <p>{t('privacy-policy-page.your_consent')}</p>
                <p>{t('privacy-policy-page.company_will_take')}</p>

                <h3>{t('privacy-policy-page.delete')}</h3>
                <p>{t('privacy-policy-page.you_have_the')}</p>
                <p>{t('privacy-policy-page.our_service_may')}</p>
                <p>{t('privacy-policy-page.you_may_update')}</p>
                <p>{t('privacy-policy-page.please_note')}</p>

                <h3>{t('privacy-policy-page.disclosure')}</h3>

                <h4>{t('privacy-policy-page.business_transactions')}</h4>
                <p>{t('privacy-policy-page.if_the_company')}</p>

                <h4>{t('privacy-policy-page.law_enforcement')}</h4>
                <p>{t('privacy-policy-page.under_certain')}</p>

                <h4>{t('privacy-policy-page.other_legal')}</h4>
                <p>{t('privacy-policy-page.company_may_disclose')}</p>

                <ul>
                    <li>{t('privacy-policy-page.comply_with')}</li>
                    <li>{t('privacy-policy-page.protect_defend')}</li>
                    <li>{t('privacy-policy-page.prevent_investigate')}</li>
                    <li>{t('privacy-policy-page.protect_personal')}</li>
                    <li>{t('privacy-policy-page.protect_against')}</li>
                </ul>

                <h3>{t('privacy-policy-page.security')}</h3>
                <p>{t('privacy-policy-page.the_security_of')}</p>

                <h2>{t('privacy-policy-page.children_privacy')}</h2>
                <p>{t('privacy-policy-page.our_service_does')}</p>
                <p>{t('privacy-policy-page.if_we_need')}</p>

                <h2>{t('privacy-policy-page.other_websites')}</h2>
                <p>{t('privacy-policy-page.our_service_may_contain')}</p>
                <p>{t('privacy-policy-page.we_have_no')}</p>

                <h2>{t('privacy-policy-page.changes')}</h2>
                <p>{t('privacy-policy-page.we_may_update')}</p>
                <p>{t('privacy-policy-page.we_will_let')}</p>
                <p>{t('privacy-policy-page.you_are_advised')}</p>

                <h2>{t('privacy-policy-page.contact_us')}</h2>

                <p>{t('privacy-policy-page.if_you_have')}</p>

                <ul>
                    <li>{t('privacy-policy-page.contact_email')}</li>
                </ul>

                <div className="agree">
                    <Button to="/auth?agree">{t('privacy-policy-page.agree')}</Button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
