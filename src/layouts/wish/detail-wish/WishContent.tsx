import React, { FC, Fragment } from 'react';
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
            { t('main-page.show-all-1') } <span className="accent">
                { t('main-page.show-all-2') }
            </span> { t('main-page.show-all-3') }
        </>
    );
    wish.show === 'friends' && (
        show = (
            <>
                { t('main-page.show-friends-1') } <span className="accent">
                    { t('main-page.show-friends-2') }
                </span> { t('main-page.show-friends-3') }
            </>
        )
    );
    wish.show === 'nobody' && (
        show = (
            <>
                { t('main-page.show-nobody-1') } <span className="accent">
                    { t('main-page.show-nobody-2') }
                </span> { t('main-page.show-nobody-3') }
            </>
        )
    );

    let showRow = false;
    myUserId === wish.userId && (showRow = true);
    wish.price && (showRow = true);

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
                    { unencryptedData(wish.name, wish.show) }
                </h3>

                { myUserId === wish.userId && (
                    <ShareButton link={ `wish/${ wish.id }` } wishShow={ wish.show } />
                ) }
            </div>

            { showRow && (
                <div className="detail-wish-row">
                    { myUserId === wish.userId && (
                        <p className="detail-wish-label">{ show }</p>
                    ) }

                    { wish.price && (
                        <div className="detail-wish-box">
                            <span className="detail-wish-label">{ t('wish-page.price') }</span>
                            <span className="detail-wish-data">
                                {
                                    addingWhiteSpaces(unencryptedData(wish.price, wish.show))
                                } {
                                unencryptedData(wish.currency, wish.show) || 'UAH'
                            }
                            </span>
                        </div>
                    ) }
                </div>
            ) }

            { wish.addresses && wish.addresses.length > 0 && (
                <p className="detail-wish-description">
                    <span className="label">{ t('wish-page.address') }</span>
                    { wish.addresses.map((address, idx) => {
                        const unencryptedAddress = unencryptedData(address.value, wish.show);

                        if (isURL(unencryptedAddress)) {
                            return (
                                <Fragment key={ address.id }>
                                    <a
                                        className="link"
                                        href={ unencryptedAddress }
                                        title={ unencryptedAddress }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        { unencryptedAddress }
                                    </a>
                                    { wish.addresses && idx < wish.addresses.length - 1 && <br /> }
                                </Fragment>
                            );
                        }

                        return (
                            <Fragment key={ address.id }>
                                { unencryptedAddress }
                                { wish.addresses && idx < wish.addresses.length - 1 && <br /> }
                            </Fragment>
                        );
                    }) }
                </p>
            ) }

            { wish.description && (
                <p className="detail-wish-description">
                    <span className="label">{ t('wish-page.description') }</span>
                    <span className="value">{ unencryptedData(wish.description, wish.show) }</span>
                </p>
            ) }
        </>
    );
};

export default WishContent;
