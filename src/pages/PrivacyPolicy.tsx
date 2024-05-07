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
                <h1>{t('privacy-policy.title')}</h1>

                <p>{t('privacy-policy.updated')}</p>

                <p>{t('privacy-policy.intro')}</p>

                <p>
                    {t('privacy-policy.we-use')}
                    <a
                        href="https://www.privacypolicies.com/privacy-policy-generator/"
                        target="_blank"
                        rel="noopener noreferrer external nofollow"
                    >
                        {t('privacy-policy.generator')}
                    </a>
                </p>

                <h2>{t('privacy-policy.interpretation-definitions')}</h2>

                <h3>{t('privacy-policy.interpretation')}</h3>

                <p>{t('privacy-policy.interpretation-text')}</p>

                <h3>{t('privacy-policy.definitions')}</h3>

                <p>{t('privacy-policy.definitions-intro')}</p>

                <ul>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.account-strong')}
                            </strong> {t('privacy-policy.account')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.affiliate-strong')}
                            </strong> {t('privacy-policy.affiliate')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.company-strong')}
                            </strong> {t('privacy-policy.company')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.cookies-strong')}
                            </strong> {t('privacy-policy.cookies')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.country-strong')}
                            </strong> {t('privacy-policy.country')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.device-strong')}
                            </strong> {t('privacy-policy.device')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.personal-strong')}
                            </strong> {t('privacy-policy.personal')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.service-strong')}
                            </strong> {t('privacy-policy.service')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.provider-strong')}
                            </strong> {t('privacy-policy.provider')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.third-party-strong')}
                            </strong> {t('privacy-policy.third-party')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.usage-strong')}
                            </strong> {t('privacy-policy.usage')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.website-strong')}
                            </strong> {t('privacy-policy.website')}
                            <a href="https://wish-hub.net/">
                                https://wish-hub.net/
                            </a>
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.you-strong')}
                            </strong> {t('privacy-policy.you')}
                        </p>
                    </li>
                </ul>

                <h2>{t('privacy-policy.collecting')}</h2>

                <h3>{t('privacy-policy.types')}</h3>

                <h4>{t('privacy-policy.personal-data')}</h4>

                <p>{t('privacy-policy.personal-info')}</p>

                <ul>
                    <li>
                        <p>{t('privacy-policy.email')}</p>
                    </li>
                    <li>
                        <p>{t('privacy-policy.full-name')}</p>
                    </li>
                    <li>
                        <p>{t('privacy-policy.phone')}</p>
                    </li>
                    <li>
                        <p>{t('privacy-policy.address')}</p>
                    </li>
                    <li>
                        <p>{t('privacy-policy.usage_data')}</p>
                    </li>
                </ul>

                <h4>{t('privacy-policy.usage_data_title')}</h4>
                <p>{t('privacy-policy.usage_data_is')}</p>
                <p>{t('privacy-policy.usage_data_may')}</p>
                <p>{t('privacy-policy.when_you_access')}</p>
                <p>{t('privacy-policy.we_may_also')}</p>

                <h4>{t('privacy-policy.information_from_third-party')}</h4>

                <p>{t('privacy-policy.the_company_allows')}</p>

                <ul>
                    <li>Google</li>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Twitter</li>
                    <li>LinkedIn</li>
                </ul>

                <p>{t('privacy-policy.if_you_decide')}</p>
                <p>{t('privacy-policy.you_may_also')}</p>

                <h4>{t('privacy-policy.tracking_technologies')}</h4>

                <p>{t('privacy-policy.we_use_cookies')}</p>

                <ul>
                    <li>
                        <strong>
                            {t('privacy-policy.cookies_or_browser_cookies')}
                        </strong> {t('privacy-policy.a_cookie_is')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy.web_beacons')}
                        </strong> {t('privacy-policy.certain_sections_of')}
                    </li>
                </ul>

                <p>
                    {t('privacy-policy.cookies_can_be')}
                    <a
                        href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking"
                        target="_blank"
                        rel="noopener noreferrer external nofollow"
                    >
                        {t('privacy-policy.privacy_policies_website')}
                    </a>
                    {t('privacy-policy.article')}
                </p>
                <p>{t('privacy-policy.we_use_both')}</p>

                <ul>
                    <li>
                        <p><strong>{t('privacy-policy.necessary')}</strong></p>
                        <p>{t('privacy-policy.session_cookies')}</p>
                        <p>{t('privacy-policy.administered_1')}</p>
                        <p>{t('privacy-policy.these_cookies_are')}</p>
                    </li>
                    <li>
                        <p><strong>{t('privacy-policy.cookies_policy')}</strong></p>
                        <p>{t('privacy-policy.persistent_cookies_1')}</p>
                        <p>{t('privacy-policy.administered_2')}</p>
                        <p>{t('privacy-policy.these_cookies_identify')}</p>
                    </li>
                    <li>
                        <p><strong>{t('privacy-policy.functionality_cookies')}</strong></p>
                        <p>{t('privacy-policy.persistent_cookies_2')}</p>
                        <p>{t('privacy-policy.administered_3')}</p>
                        <p>{t('privacy-policy.these_cookies_allow')}</p>
                    </li>
                </ul>

                <p>{t('privacy-policy.for_more_information')}</p>

                <h3>{t('privacy-policy.use_of_your')}</h3>

                <p>{t('privacy-policy.the_company_may')}</p>

                <ul>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.to_provide_and')}
                            </strong> {t('privacy-policy.including_to_monitor')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.to_manage_your_account')}
                            </strong> {t('privacy-policy.to_manage_your_registration')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.for_the_performance')}
                            </strong> {t('privacy-policy.the_development')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.to_contact_you')}
                            </strong> {t('privacy-policy.by_email')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.to_provide_you')}
                            </strong> {t('privacy-policy.with_news')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.to_manage_your_requests')}
                            </strong> {t('privacy-policy.to_attend')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.for_business_transfers')}
                            </strong> {t('privacy-policy.we_may_use_1')}
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>
                                {t('privacy-policy.for_other_purposes')}
                            </strong> {t('privacy-policy.we_may_use_2')}
                        </p>
                    </li>
                </ul>

                <p>{t('privacy-policy.we_may_share_1')}</p>

                <ul>
                    <li>
                        <strong>
                            {t('privacy-policy.with_service_providers')}
                        </strong> {t('privacy-policy.we_may_share_2')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy.for_business_transfers_2')}
                        </strong> {t('privacy-policy.we_may_share_3')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy.with_affiliates')}
                        </strong> {t('privacy-policy.we_may_share_4')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy.with_business_partners')}
                        </strong> {t('privacy-policy.we_may_share_5')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy.with_other_users')}
                        </strong> {t('privacy-policy.when_you_share')}
                    </li>
                    <li>
                        <strong>
                            {t('privacy-policy.with_your_consent')}
                        </strong> {t('privacy-policy.we_may_disclose')}
                    </li>
                </ul>

                <h3>{t('privacy-policy.retention')}</h3>
                <p>{t('privacy-policy.company_will_retain')}</p>
                <p>{t('privacy-policy.company_will_also')}</p>

                <h3>{t('privacy-policy.transfer')}</h3>
                <p>{t('privacy-policy.your_information')}</p>
                <p>{t('privacy-policy.your_consent')}</p>
                <p>{t('privacy-policy.company_will_take')}</p>

                <h3>{t('privacy-policy.delete')}</h3>
                <p>{t('privacy-policy.you_have_the')}</p>
                <p>{t('privacy-policy.our_service_may')}</p>
                <p>{t('privacy-policy.you_may_update')}</p>
                <p>{t('privacy-policy.please_note')}</p>

                <h3>{t('privacy-policy.disclosure')}</h3>

                <h4>{t('privacy-policy.business_transactions')}</h4>
                <p>{t('privacy-policy.if_the_company')}</p>

                <h4>{t('privacy-policy.law_enforcement')}</h4>
                <p>{t('privacy-policy.under_certain')}</p>

                <h4>{t('privacy-policy.other_legal')}</h4>
                <p>{t('privacy-policy.company_may_disclose')}</p>

                <ul>
                    <li>{t('privacy-policy.comply_with')}</li>
                    <li>{t('privacy-policy.protect_defend')}</li>
                    <li>{t('privacy-policy.prevent_investigate')}</li>
                    <li>{t('privacy-policy.protect_personal')}</li>
                    <li>{t('privacy-policy.protect_against')}</li>
                </ul>

                <h3>{t('privacy-policy.security')}</h3>
                <p>{t('privacy-policy.the_security_of')}</p>

                <h2>{t('privacy-policy.children_privacy')}</h2>
                <p>{t('privacy-policy.our_service_does')}</p>
                <p>{t('privacy-policy.if_we_need')}</p>

                <h2>{t('privacy-policy.other_websites')}</h2>
                <p>{t('privacy-policy.our_service_may_contain')}</p>
                <p>{t('privacy-policy.we_have_no')}</p>

                <h2>{t('privacy-policy.changes')}</h2>
                <p>{t('privacy-policy.we_may_update')}</p>
                <p>{t('privacy-policy.we_will_let')}</p>
                <p>{t('privacy-policy.you_are_advised')}</p>

                <h2>{t('privacy-policy.contact_us')}</h2>

                <p>{t('privacy-policy.if_you_have')}</p>

                <ul>
                    <li>{t('privacy-policy.contact_email')}</li>
                </ul>

                <div className="agree">
                    <Button to="/auth?agree">{t('privacy-policy.agree')}</Button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
