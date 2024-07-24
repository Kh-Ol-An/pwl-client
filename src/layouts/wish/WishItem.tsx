import React, { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '@/store/hook';
import { ECurrency, IWish } from '@/models/IWish';
import { addingWhiteSpaces } from '@/utils/formating-value';
import { unencryptedData } from '@/utils/encryption-data';
import showBookingExpired from '@/utils/show-booking-expired';
import LikeAction from "@/layouts/wish/detail-wish/LikeAction";
import LogoIcon from "@/assets/images/logo.svg";
import StylesVariables from '@/styles/utils/variables.module.scss';

dayjs.extend(isSameOrBefore);

interface IProps {
    wish: IWish;
    showWish: () => void;
    editWish?: () => void;
}

const WishItem: FC<IProps> = ({ wish, showWish, editWish }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const handleEditWish = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        editWish && editWish();
    };

    return (
        <li
            className={
                "wish-item"
                + (wish.executed ? " fulfilled" : "")
                + (myUser && myUser.id === wish.booking?.userId ? " i-m-booked" : "")
                + (showBookingExpired(wish, myUser?.id) ? " booking-expired" : "")
            }
            onClick={ showWish }
        >
            <div className={ "wish-box" + (wish.booking?.end ? " reserved-box" : "") }>
                <div className="wish-item-img">
                    { wish.images?.length > 0 ? (
                        <img
                            src={ unencryptedData(wish.images[0].path, wish.show) }
                            alt={ `${ t('wish') } ${ wish.images[0].position }` }
                        />
                    ) : (
                        <img
                            className="wish-item-img-effects"
                            src={ LogoIcon }
                            alt="Logo Wish Hub"
                        />
                    ) }
                </div>

                <div className="wish-item-data">
                    <div className="wish-item-name">
                        { unencryptedData(wish.name, wish.show) }
                    </div>

                    { wish.price && (
                        <div className="wish-item-price">
                            {
                                addingWhiteSpaces(unencryptedData(wish.price, wish.show))
                            } {
                            unencryptedData(wish.currency, wish.show) || ECurrency.UAH
                        }
                        </div>
                    ) }
                </div>
            </div>

            <div className="wish-likes">
                <LikeAction wish={ wish } type="likes" />

                <LikeAction wish={ wish } type="dislikes" />
            </div>

            { myUser?.id === wish.userId && !wish.booking?.userId && !wish.executed && (
                <button className="wish-item-edit" type="button" onClick={ handleEditWish }>
                    <EditIcon sx={ { color: StylesVariables.lightColor } } />
                </button>
            ) }

            <svg width="0" height="0">
                <filter id="worn-out">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" />
                </filter>
            </svg>

            { wish.booking?.end && (
                <span className="reserved">
                    { t('main-page.reserved') }
                </span>
            ) }

            { wish.executed && (
                <span className="fulfilled">
                    { t('main-page.fulfilled.single') }
                </span>
            ) }
        </li>
    );
};

export default WishItem;
