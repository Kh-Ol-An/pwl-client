import React from 'react';
import { useTranslation } from 'react-i18next';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAppDispatch } from '@/store/hook';
import { logout } from '@/store/my-user/thunks';
import Logo from '@/components/Logo';
import LanguageSelection from "@/components/LanguageSelection";
import Button from '@/components/Button';

const ActivationLinkExpired = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    return (
        <div className="inactivated">
            <div className="inactivated-header">
                <Logo to="/welcome" />

                <LanguageSelection />

                <div className="logout">
                    <Button variant="text" onClick={() => dispatch(logout())}>
                        <LogoutIcon />
                        <span>{t('logout')}</span>
                    </Button>
                </div>
            </div>

            <p className="content">
                {t('activation-link-expired.expired')}<br/>
                {t('activation-link-expired.utc')}<br/>
                {t('activation-link-expired.again')}
            </p>
        </div>
    );
};

export default ActivationLinkExpired;
