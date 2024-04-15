import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import ShareIcon from '@mui/icons-material/Share';
import StylesVariables from '@/styles/utils/variables.module.scss';
import ConfirmModal from '@/layouts/ConfirmModal';

interface IProps {
    link?: string;
    withConfirm?: boolean;
}

const ShareButton: FC<IProps> = ({ link = '', withConfirm = false }) => {
    const [show, setShow] = useState<boolean>(false);

    const shareContent = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Wish Hub',
                text: 'Wish Hub - це місце, де ви можете зберігати свої бажання та ділитися ними з друзями.',
                url: `https://wish-hub.net/${link}`,
            })
                .then(() => toast.success(`Ви успішно поділилися ${link === 'welcome' ? 'Wish Hub' : 'своїм бажанням'}.`))
                .catch((error) => {
                    console.log('Помилка спільного доступу', error);
                    toast.error('Під час спроби активації функції "Поділитись" виникла помилка.');
                });
        } else {
            navigator.clipboard.writeText(`https://wish-hub.net/${link}`)
                .then(() => toast.success(`Посилання на ${link === 'welcome' ? 'Wish Hub' : 'Ваше бажання'} було скопійовано в буфер обміну.`))
                .catch(() => toast.error('Під час спроби скопіювати посилання виникла помилка.'));
        }

        setShow(false);
    };

    const handleClick = () => {
        withConfirm ? setShow(true) : shareContent();
    };

    return (
        <>
            <button className="share-button" type="button" onClick={handleClick}>
                <ShareIcon sx={{ color: StylesVariables.primaryColor }} />
            </button>

            <ConfirmModal
                show={show}
                confirmText="Поділитись"
                close={() => setShow(false)}
                confirm={shareContent}
            >
                <p className="text-lg">
                    Ви впевнені що хочете поділитись бажанням, яке відкрите тільки для друзів?
                </p>
            </ConfirmModal>
        </>
    );
};

export default ShareButton;
