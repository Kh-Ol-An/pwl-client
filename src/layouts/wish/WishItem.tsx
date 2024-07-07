import React, { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '@/store/hook';
import { IWish } from '@/models/IWish';
import { addingWhiteSpaces } from '@/utils/formating-value';
import { unencryptedData } from '@/utils/encryption-data';
import showBookingExpired from '@/utils/show-booking-expired';
import StylesVariables from '@/styles/utils/variables.module.scss';

dayjs.extend(isSameOrBefore);

interface IProps {
    wish: IWish;
    selectedWishListLength: number;
    showWish: () => void;
    editWish: () => void;
}

const WishItem: FC<IProps> = ({ wish, selectedWishListLength, showWish, editWish }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const handleEditWish = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        editWish();
    };

    return (
        <li
            className={
                "wish-item"
                + (selectedWishListLength < 2 ? " alone" : "")
                + (wish.booking?.end ? " reserved" : "")
                + (wish.executed ? " fulfilled" : "")
                + (myUser?.id === wish.booking?.userId ? " i-m-booked" : "")
                + (showBookingExpired(wish, myUser?.id) ? " booking-expired" : "")
            }
            onClick={showWish}
        >
            <div className="wish-box">
                {wish.images.length > 0 && (
                    <div className="wish-item-img">
                        <img
                            src={unencryptedData(wish.images[0].path, wish.show)}
                            alt={`${t('wish')} ${wish.images[0].position}`}
                        />
                    </div>
                )}

                <div className="wish-item-data">
                    <div className="wish-item-name">
                        {unencryptedData(wish.name, wish.show)}
                    </div>

                    {wish.price && (
                        <div className="wish-item-price">
                            {
                                addingWhiteSpaces(unencryptedData(wish.price, wish.show))
                            } {
                            unencryptedData(wish.currency, wish.show) || 'UAH'
                        }
                        </div>
                    )}
                </div>

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

                {myUser?.id === wish.userId && !wish.booking?.userId && !wish.executed && (
                    <button className="wish-item-action" type="button" onClick={ handleEditWish }>
                        <EditIcon sx={ { color: StylesVariables.lightColor } } />
                    </button>
                ) }
            </div>
        </li>
    );
};

export default WishItem;
