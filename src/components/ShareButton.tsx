import React, { FC } from 'react';
import { toast } from 'react-toastify';
import ShareIcon from '@mui/icons-material/Share';
import StylesVariables from '@/styles/utils/variables.module.scss';

const ShareButton: FC = () => {
    const shareContent = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Wish Hub',
                text: 'Wish Hub - це місце, де ви можете зберігати свої бажання та ділитися ними з друзями.',
                url: 'https://wish-hub.net/',
            })
                .then(() => {
                    toast.success('Ви успішно поділилися вебзастосунком Wish Hub з друзями.');
                })
                .catch((error) => {
                    console.log('Помилка спільного доступу', error);
                    toast.error('Під час спроби активації функції "Поділитись" виникла помилка.');
                });
        } else {
            toast.error('Функція "Поділитись" не підтримується на Вашому пристрої.');
        }
    };

    return (
        <button className="share-button" type="button" onClick={shareContent}>
            <ShareIcon sx={{ color: StylesVariables.primaryColor }} />
        </button>
    );
};

export default ShareButton;
