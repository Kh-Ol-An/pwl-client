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
import Action from '@/components/Action';
import StylesVariables from '@/styles/utils/variables.module.scss';

dayjs.extend(isSameOrBefore);

interface IProps {
    wish: IWish;
    showWish: () => void;
    editWish: () => void;
}

const WishItem: FC<IProps> = ({ wish, showWish, editWish }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const handleEditWish = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        editWish();
    };

    return (
        <div
            className={
                "wish-item"
                + (wish.images.length > 0 ? " can-hover" : "")
                + (myUser?.id === wish.booking?.userId ? " i-m-booked" : "")
                + (showBookingExpired(wish, myUser?.id) ? " booking-expired" : "")
            }
            onClick={showWish}
        >
            <div className="wish-item-outer-border">
                <div className="wish-item-inner-border">
                    <div className="wish-item-content">
                        <div className="wish-item-name">
                            {unencryptedData(wish.name, wish.show)}
                        </div>

                        {(wish.images.length > 0 || wish.price) && (
                            <div className="wish-item-data">
                                {wish.images.length > 0 && (
                                    <div className="wish-item-img">
                                        <img
                                            src={unencryptedData(wish.images[0].path, wish.show)}
                                            alt={`${t('wish')} ${wish.images[0].position}`}
                                        />
                                    </div>
                                )}
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
                        )}
                    </div>
                </div>
            </div>

            {myUser?.id === wish.userId && !wish.booking?.userId && !wish.executed && (
                <Action onClick={handleEditWish}>
                    <EditIcon sx={{ color: StylesVariables.blackColor }} />
                </Action>
            )}
        </div>
    );
};

export default WishItem;
