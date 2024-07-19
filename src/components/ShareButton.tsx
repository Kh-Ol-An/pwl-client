import React, { FC, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ShareIcon from '@mui/icons-material/Share';
import ConfirmModal from '@/components/ConfirmModal';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    link?: string;
    wishShow?: 'all' | 'friends' | 'nobody';
    children?: ReactNode;
}

const ShareButton: FC<IProps> = ({ link = '', wishShow, children }) => {
    const { t } = useTranslation();

    const [ show, setShow ] = useState<boolean>(false);

    const shareContent = () => {
        if (navigator.share) {
            navigator.share({
                    title: 'Wish Hub',
                    text: t('share-button.share-text'),
                    url: `https://wish-hub.net/${ link }`,
                })
                .then(() =>
                    toast.success(
                        link === 'welcome'
                            ? t('alerts.share-button.share.wish_hub_success')
                            : t('alerts.share-button.share.wish_success')
                    ))
                .catch((error) => {
                    console.log(t('alerts.share-button.share.console-error'), error);
                    toast.error(t('alerts.share-button.share.error'));
                });
        } else {
            navigator.clipboard.writeText(`https://wish-hub.net/${ link }`)
                .then(() =>
                    toast.success(
                        link === 'welcome'
                            ? t('alerts.share-button.clipboard.wish_hub_success')
                            : t('alerts.share-button.clipboard.wish_success')
                    ))
                .catch((error) => {
                    console.log(t('alerts.share-button.clipboard.console-error'), error);
                    toast.error(t('alerts.share-button.clipboard.error'));
                });
        }

        setShow(false);
    };

    const handleClick = () => {
        wishShow === 'friends' || wishShow === 'nobody' ? setShow(true) : shareContent();
    };

    return (
        <>
            <button className="share-button" type="button" onClick={ handleClick }>
                { children }
                <ShareIcon sx={ { color: StylesVariables.primaryColor } } />
            </button>

            <ConfirmModal
                show={ show }
                confirmText={ t('share-button.confirm') }
                close={ () => setShow(false) }
                confirm={ shareContent }
            >
                <p className="text-lg">
                    {
                        wishShow === 'nobody'
                            ? t('share-button.question-nobody')
                            : t('share-button.question-friends')
                    }
                </p>
            </ConfirmModal>
        </>
    );
};

export default ShareButton;
