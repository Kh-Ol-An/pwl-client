import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { addingWhiteSpaces } from '@/utils/formating-value';
import { unencryptedData } from '@/utils/encryption-data';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';
import ShareButton from '@/components/ShareButton';

interface IProps {
    wish: IWish;
    myUserId?: IUser['id'];
}

const WishContent: FC<IProps> = ({ wish, myUserId }) => {
    const { t } = useTranslation();

    let show = (
        <>
            {t('main.show-all-1')} <span className="accent">
                {t('main.show-all-2')}
            </span> {t('main.show-all-3')}
        </>
    );
    wish.show === 'friends' && (
        show = (
            <>
                {t('main.show-friends-1')} <span className="accent">
                    {t('main.show-friends-2')}
                </span> {t('main.show-friends-3')}
            </>
        )
    );
    wish.show === 'nobody' && (
        show = (
            <>
                {t('main.show-nobody-1')} <span className="accent">
                    {t('main.show-nobody-2')}
                </span> {t('main.show-nobody-3')}
            </>
        )
    );

    let showRow = false;
    myUserId === wish.userId && (showRow = true);
    wish.price && (showRow = true);

    const unencryptedAddress = wish.address ? unencryptedData(wish.address, wish.show) : '';

    const isURL = (str: string) => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <>
            <div className="detail-wish-title">
                <h3 className="detail-wish-name">
                    {unencryptedData(wish.name, wish.show)}
                </h3>

                {myUserId === wish.userId && (
                    <ShareButton link={`wish/${wish.id}`} wishShow={wish.show} />
                )}
            </div>

            {showRow && (
                <div className="detail-wish-row">
                    {myUserId === wish.userId && (
                        <p className="detail-wish-label">{show}</p>
                    )}

                    {wish.price && (
                        <div className="detail-wish-box">
                            <span className="detail-wish-label">{t('wish.price')}</span>
                            <span className="detail-wish-data">
                                {
                                    addingWhiteSpaces(unencryptedData(wish.price, wish.show))
                                } {
                                    unencryptedData(wish.currency, wish.show) || 'UAH'
                                }
                            </span>
                        </div>
                    )}
                </div>
            )}

            {wish.address && (
                <p className="detail-wish-description">
                    <span className="label">{t('wish.address')}</span>
                    {isURL(unencryptedAddress) ? (
                        <a
                            className="link"
                            href={unencryptedAddress}
                            title={unencryptedAddress}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {unencryptedAddress}
                        </a>
                    ) : (<>{unencryptedAddress}</>)}
                </p>
            )}

            {wish.description && (
                <p className="detail-wish-description">
                    <span className="label">{t('wish.description')}</span>
                    <span className="value">{unencryptedData(wish.description, wish.show)}</span>
                </p>
            )}
        </>
    );
};

export default WishContent;
