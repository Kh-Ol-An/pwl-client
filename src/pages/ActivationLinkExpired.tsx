import React from 'react';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAppDispatch } from '@/store/hook';
import { logout } from '@/store/my-user/thunks';
import Logo from '@/components/Logo';
import LanguageSelection from "@/components/LanguageSelection";
import Button from '@/components/Button';

const ActivationLinkExpired = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="inactivated">
            <div className="inactivated-header">
                <Logo to="/welcome" />

                <LanguageSelection />

                <div className="logout">
                    <Button variant="text" onClick={() => dispatch(logout())}>
                        <LogoutIcon />
                        <span>Вийти з аккаунту</span>
                    </Button>
                </div>
            </div>

            <p className="content">
                Термін активації акаунта закінчився. <br/>
                Акаунт буде видалений в 00:00 за Київським часом. <br/>
                Зареєструватись за такою ж поштою можна буде знову після видалення старого акаунту.
            </p>
        </div>
    );
};

export default ActivationLinkExpired;
