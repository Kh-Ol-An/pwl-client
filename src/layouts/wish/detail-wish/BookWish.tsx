import React, { FC, useEffect, useMemo, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateValidationError } from '@mui/x-date-pickers/models';
import dayjs, { Dayjs } from 'dayjs';
import { Tooltip } from 'react-tooltip';
import { Info as InfoIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { bookWish } from '@/store/wishes/thunks';
import ConfirmModal from '@/layouts/ConfirmModal';
import Button from '@/components/Button';
import { IWish } from '@/models/IWish';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    wish: IWish;
    close: () => void;
}

const BookWish: FC<IProps> = ({ wish, close }) => {
    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const [bookEnd, setBookEnd] = useState<Dayjs | null>(null);
    const [bookEndError, setBookEndError] = useState<DateValidationError | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [clickedOnBookWish, setClickedOnBookWish] = useState<boolean>(false);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    const birthdayErrorMessage = useMemo(() => {
        if (!clickedOnBookWish) return;

        if (bookEnd === null && clickedOnBookWish) {
            setBookEndError('invalidDate');
            return 'Це поле обов\'язкове для заповнення.';
        }

        switch (bookEndError) {
            case 'disablePast': {
                return 'Неможливо виконати завдання в минулому.';
            }
            case 'maxDate': {
                return 'Вважаєте розумним обіцяти виконати бажання більш ніж через рік.';
            }
            case 'invalidDate': {
                return 'Введена дата недійсна.';
            }
            default: {
                return '';
            }
        }
    }, [clickedOnBookWish, bookEnd, bookEndError]);

    const handleSubmit = async () => {
        setClickedOnBookWish(true);

        if (!myUser || !bookEnd || (bookEndError && bookEndError.length > 0)) return;

        await dispatch(bookWish({ userId: myUser.id, wishId: wish.id, end: bookEnd.add(1, 'day').format() }));
        close();
    };

    const handleHide = () => {
        setBookEnd(null);
        setBookEndError(null);
        setClickedOnBookWish(false);
        setShow(false);
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
                onClick={() => setShow(true)}
            >
                Я виконаю бажання
            </Button>

            <ConfirmModal
                show={show}
                confirmText="Підтвердити намір"
                close={handleHide}
                confirm={handleSubmit}
            >
                <p className="text-lg">
                    Я маю намір виконати бажання "{wish.name}" до:
                </p>

                <div
                    className={
                        "date-picker"
                        + (clickedOnBookWish ? " clicked-on-submit" : "")
                        + (bookEnd === null ? " error" : "")
                    }
                >
                    <DemoContainer components={['DesktopDatePicker']}>
                        <DesktopDatePicker
                            label="включно*"
                            format="DD.MM.YYYY"
                            dayOfWeekFormatter={(weekday) => weekday}
                            disablePast
                            maxDate={dayjs().add(1, 'year')} // Дозволити вибір дати тільки на рік вперед
                            value={bookEnd}
                            onChange={(value) => setBookEnd(value)}
                            onError={(newError) => setBookEndError(newError)}
                            slotProps={{
                                textField: {
                                    helperText: birthdayErrorMessage,
                                },
                            }}
                        />
                    </DemoContainer>
                </div>

                <p className="text book-wish-text">
                    Після того як Ви підтвердите свій намір,
                    ніхто з користувачів не зможе забронювати це бажання.
                    У Вас буде можливість скасувати свій намір виконати бажання впродовж трьох діб.
                    <span
                        className="tooltip detail-wish-book-tooltip"
                        data-tooltip-id="book-wish"
                        data-tooltip-content="
                            Декларуючи свій намір виконати бажання,
                            Ви берете на себе відповідальність за його виконання.
                            Всесвіт покладається на Вас :)
                            Постійна зміна рішень може погіршити Ваші відносини зі Всесвітом.
                            Виконання бажань впливає на Ваш рейтинг в системі.
                            Більш детально про це можна дізнатися в розділі 'Інструкція'.
                        "
                    >
                        <InfoIcon sx={{ color: StylesVariables.specialColor }} />
                    </span>
                </p>

                <Tooltip
                    id="book-wish"
                    opacity={1}
                    style={{
                        backgroundColor: StylesVariables.blackColor,
                        color: StylesVariables.lightColor,
                        width: screenWidth > 411 ? '300px' : '200px',
                        fontSize: '14px',
                        zIndex: 9,
                    }}
                />
            </ConfirmModal>
        </>
    );
};

export default BookWish;
