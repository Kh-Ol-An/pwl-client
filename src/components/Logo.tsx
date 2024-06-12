import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoIcon from '@/assets/images/logo.svg';

interface IProps {
    to?: string;
}

const Logo: FC<IProps> = ({ to = '/' }) => {
    const { t } = useTranslation();

    return (
        <div className="logo">
            <Link className="logo-box" to={to}>
                <img className="logo-icon" src={LogoIcon} alt={t('logo')} />
                <span className="logo-name">Wish Hub</span>
            </Link>
        </div>
    );
};

export default Logo;
