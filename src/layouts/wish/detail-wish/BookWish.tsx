import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateValidationError } from '@mui/x-date-pickers/models';
import dayjs, { Dayjs } from 'dayjs';
import { Tooltip } from 'react-tooltip';
import { toast } from "react-toastify";
import { Info as InfoIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { bookWish } from '@/store/wishes/thunks';
import { IWishWithQuote } from "@/store/wishes/types";
import getTooltipStyles from '@/utils/get-tooltip-styles';
import { unencryptedData } from '@/utils/encryption-data';
import { getFullShortDate, getLang } from "@/utils/lang-action";
import ConfirmModal from '@/components/ConfirmModal';
import Button from '@/components/Button';
import QuoteMessage from "@/components/QuoteMessage";
import { IWish } from '@/models/IWish';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    wish: IWish;
    close: () => void;
}

const BookWish: FC<IProps> = ({ wish, close }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [ bookEnd, setBookEnd ] = useState<Dayjs | null>(null);
    const [ bookEndError, setBookEndError ] = useState<DateValidationError | null>(null);
    const [ show, setShow ] = useState<boolean>(false);
    const [ clickedOnBookWish, setClickedOnBookWish ] = useState<boolean>(false);
    const [ screenWidth, setScreenWidth ] = useState<number>(window.innerWidth);

    const birthdayErrorMessage = useMemo(() => {
        if (!clickedOnBookWish) return;

        if (bookEnd === null && clickedOnBookWish) {
            setBookEndError('invalidDate');
            return t('main-page.book-end-errors.required');
        }

        switch (bookEndError) {
            case 'disablePast': {
                return t('main-page.book-end-errors.past');
            }
            case 'maxDate': {
                return t(`main-page.book-end-errors.max.${ myUser?.id === wish.userId ? 'my' : 'another' }`);
            }
            case 'invalidDate': {
                return t('main-page.book-end-errors.invalid');
            }
            default: {
                return '';
            }
        }
    }, [ clickedOnBookWish, bookEnd, bookEndError ]);

    const handleBookWish = () => {
        if (myUser) {
            setShow(true);
        } else {
            navigate('/auth');
        }
    };

    const handleSubmit = async () => {
        setClickedOnBookWish(true);

        if (!myUser || !bookEnd || (bookEndError && bookEndError.length > 0)) return;

        try {
            const response = await dispatch(bookWish({
                userId: myUser.id,
                wishId: wish.id,
                end: bookEnd.add(1, 'day').format()
            }));
            const quote = (response.payload as IWishWithQuote).quote[getLang()];
            toast(
                <QuoteMessage
                    title={ t('alerts.wishes-api.book-wish.success') }
                    text={ quote?.text }
                    author={ quote?.author }
                />,
                { type: 'success' },
            );
        } catch (e: any) {
            console.error(e)
        }

        close();
    };

    const handleHide = () => {
        setBookEnd(null);
        setBookEndError(null);
        setClickedOnBookWish(false);
        setShow(false);
    };

    const handleChangeDate = (value: dayjs.Dayjs | null) => {
        setBookEndError(null);
        setBookEnd(value)
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <Button
                type="button"
                variant="text"
                color="primary-color"
                onClick={ handleBookWish }
            >
                { t('main-page.will-fulfill') }
            </Button>

            <ConfirmModal
                show={ show }
                confirmText={ t('main-page.confirm-intention') }
                close={ handleHide }
                confirm={ handleSubmit }
            >
                <p className="text-lg">
                    { t('main-page.i-intend', { name: unencryptedData(wish.name, wish.show) }) }
                </p>

                <div
                    className={
                        "date-picker"
                        + (clickedOnBookWish ? " clicked-on-submit" : "")
                        + (bookEnd === null ? " error" : "")
                    }
                >
                    <DemoContainer components={ [ 'DesktopDatePicker' ] }>
                        <DesktopDatePicker
                            label={ t('main-page.including') }
                            format={ getFullShortDate() }
                            dayOfWeekFormatter={ (weekday) => weekday }
                            disablePast
                            maxDate={ dayjs().add(myUser?.id === wish.userId ? 10 : 1, 'year') } // Дозволити вибір дати тільки на рік вперед
                            value={ bookEnd }
                            onChange={ handleChangeDate }
                            onError={ (newError) => setBookEndError(newError) }
                            slotProps={ {
                                textField: {
                                    helperText: birthdayErrorMessage,
                                },
                            } }
                        />
                    </DemoContainer>
                </div>

                <p className="text book-wish-text">
                    { t('main-page.after_you_confirm') }
                    <span
                        className="tooltip detail-wish-book-tooltip"
                        data-tooltip-id="book-wish"
                        data-tooltip-content={ t('main-page.by_declaring') }
                    >
                        <InfoIcon sx={ { color: StylesVariables.specialColor } } />
                    </span>
                </p>

                <Tooltip
                    id="book-wish"
                    opacity={ 1 }
                    style={ getTooltipStyles(screenWidth) }
                />
            </ConfirmModal>
        </>
    );
};

export default BookWish;
