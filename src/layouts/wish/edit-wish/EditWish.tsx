import React, { FC, ChangeEvent, useState, useLayoutEffect, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';
import i18next from "i18next";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Info as InfoIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { createWish, deleteWish, updateWish } from '@/store/wishes/thunks';
import { IWishWithQuote, ICreateWish } from '@/store/wishes/types';
import { TCurrentImage, IImage, IWish } from '@/models/IWish';
import { IUser } from "@/models/IUser";
import { wishDescriptionValidation, wishNameValidation, wishPriceValidation } from '@/utils/validations';
import { WISH_DESCRIPTION_MAX_LENGTH } from '@/utils/constants';
import { removingWhiteSpaces, addingWhiteSpaces } from '@/utils/formating-value';
import { decryptedData, encryptedData } from '@/utils/encryption-data';
import getTooltipStyles from '@/utils/get-tooltip-styles';
import Addresses from '@/layouts/wish/edit-wish/Addresses';
import ConfirmModal from '@/components/ConfirmModal';
import Button from '@/components/Button';
import Input from '@/components/Input';
import DragNDrop from '@/components/DragNDrop';
import Switch from '@/components/Switch';
import Radio from '@/components/Radio';
import QuoteMessage from "@/components/QuoteMessage";
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    idOfSelectedWish: IWish['id'] | null;
    close: () => void;
}

export type Inputs = {
    name: IWish['name']
    price: IWish['price']
    addresses: IWish['addresses']
    description: IWish['description']
}

const EditWish: FC<IProps> = ({ idOfSelectedWish, close }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishList = useAppSelector((state) => state.wishes.list);

    const dispatch = useAppDispatch();

    const {
        control,
        register,
        getValues,
        setValue,
        watch,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const [material, setMaterial] = useState<ICreateWish['material']>(true);
    const [show, setShow] = useState<ICreateWish['show']>('all');
    const [showConfirmDeleteWish, setShowConfirmDeleteWish] = useState<boolean>(false);
    const [images, setImages] = useState<TCurrentImage[]>([]);
    const [currency, setCurrency] = useState<IWish['currency']>('UAH');
    const [isTransition, setIsTransition] = useState<boolean>(false);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    let lang: IUser['lang'] = 'en';
    i18next.language.includes('en') && (lang = 'en');
    i18next.language.includes('uk') && (lang = 'uk');

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const nonUniqueName = wishList.some((wish) => {
            let wishName = wish.name;
            if (process.env.REACT_APP_CRYPTO_JS_SECRET && wish.show !== 'all') {
                wishName = decryptedData(wish.name, process.env.REACT_APP_CRYPTO_JS_SECRET)
            }
            return wishName === data.name.trim() && wish.id !== idOfSelectedWish;
        });
        if (nonUniqueName) {
            setError(
                'name',
                {
                    type: 'unique',
                    message: 'В тебе вже є бажання з такою назвою. У бажання має бути хоча б одне унікальне поле.',
                },
                { shouldFocus: true },
            );
            return;
        }

        if (!myUser || !process.env.REACT_APP_CRYPTO_JS_SECRET) return;

        // name
        const encryptedName = encryptedData(data.name.trim(), process.env.REACT_APP_CRYPTO_JS_SECRET);

        // price
        const priceWithoutWhiteSpaces = data.price ? removingWhiteSpaces(data.price.trim()) : '';
        const encryptedPrice = encryptedData(priceWithoutWhiteSpaces, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const sendingPrice = show === 'all' ? priceWithoutWhiteSpaces : encryptedPrice;

        // currency
        const encryptedCurrency = encryptedData(currency, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const sendingCurrency = show === 'all' ? currency : encryptedCurrency;

        // addresses
        const dataAddresses = (data.addresses && data.addresses.length > 0)
            ? data.addresses
                .filter(address => address.value.length > 0)
                .map((address) => ({ ...address, value: address.value.trim() }))
            : [];
        const encryptedAddresses = dataAddresses.length > 0
            ? dataAddresses.map(
                (address) =>
                    process.env.REACT_APP_CRYPTO_JS_SECRET
                        ? { ...address, value: encryptedData(address.value, process.env.REACT_APP_CRYPTO_JS_SECRET) }
                        : address
            ) : undefined;
        const sendingAddresses = show === 'all' ? dataAddresses : encryptedAddresses;

        // description
        const dataDescription = data.description ? data.description.trim() : '';
        const encryptedDescription = encryptedData(dataDescription, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const sendingDescription = show === 'all' ? dataDescription : encryptedDescription;

        // images
        const encryptedImages = images.map(image => {
            if (image instanceof File || !process.env.REACT_APP_CRYPTO_JS_SECRET) return image;

            const encryptedImage = { ...image };
            encryptedImage.path = encryptedData(image.path, process.env.REACT_APP_CRYPTO_JS_SECRET);
            return encryptedImage;
        });

        const wishData = {
            userId: myUser.id,
            material,
            show,
            name: show === 'all' ? data.name.trim() : encryptedName,
            price: material ? sendingPrice : undefined,
            currency: material ? sendingCurrency : undefined,
            addresses: material ? sendingAddresses : undefined,
            description: dataDescription.length > 0 ? sendingDescription : undefined,
            images: show === 'all' ? images : encryptedImages,
        };
        if (idOfSelectedWish) {
            try {
                await dispatch(updateWish({
                    ...wishData,
                    id: idOfSelectedWish,
                }));
            } catch (e: any) {
                console.error(e)
            }
        } else {
            try {
                const response = await dispatch(createWish(wishData));
                const quote = (response.payload as IWishWithQuote).quote[lang];
                toast(
                    <QuoteMessage
                        title={t('alerts.wishes-api.create-wish.success')}
                        text={quote?.text}
                        author={quote?.author}
                    />,
                    { type: 'success' },
                );
            } catch (e: any) {
                console.error(e)
            }
        }
        close();
    };

    const changeShow = (e: ChangeEvent<HTMLInputElement>) => {
        setShow(e.target.value as ICreateWish['show']);
    };

    const removeAllImages = () => {
        setImages(
            (prevState) =>
                prevState
                    .filter((image) => !(image instanceof File))
                    .map((image) => {
                        const updatedImage = { ...image as IImage };
                        updatedImage.delete = true;
                        return updatedImage;
                    })
        );
    };

    const handleDeleteWish = async () => {
        if (!myUser || !idOfSelectedWish) return;

        await dispatch(deleteWish([myUser.id, idOfSelectedWish]));
        close();
    };

    useLayoutEffect(() => {
        if (wishList.length === 0) return;

        const selectedWish = wishList.find((wish) => wish.id === idOfSelectedWish);

        if (!selectedWish || !process.env.REACT_APP_CRYPTO_JS_SECRET) return;

        setMaterial(selectedWish.material);
        setShow(selectedWish.show);

        // name
        setValue(
            'name',
            selectedWish.show === 'all'
                ? selectedWish.name
                : decryptedData(selectedWish.name, process.env.REACT_APP_CRYPTO_JS_SECRET),
        );

        // price
        selectedWish.price && setValue(
            'price',
            addingWhiteSpaces(
                selectedWish.show === 'all'
                    ? selectedWish.price
                    : decryptedData(selectedWish.price, process.env.REACT_APP_CRYPTO_JS_SECRET)
            ),
        );

        // currency
        selectedWish.currency && setCurrency(
            selectedWish.show === 'all'
                ? selectedWish.currency
                : decryptedData(selectedWish.currency, process.env.REACT_APP_CRYPTO_JS_SECRET) as IWish['currency']
        );

        // addresses
        selectedWish.addresses && selectedWish.addresses.length > 0 && setValue(
            'addresses',
            selectedWish.show === 'all'
                ? selectedWish.addresses
                : selectedWish.addresses.map(
                    address => process.env.REACT_APP_CRYPTO_JS_SECRET
                        ? { ...address, value: decryptedData(address.value, process.env.REACT_APP_CRYPTO_JS_SECRET) }
                        : address
                ),
        );

        // description
        setValue(
            'description',
            selectedWish.show === 'all'
                ? selectedWish.description
                : decryptedData(selectedWish.description, process.env.REACT_APP_CRYPTO_JS_SECRET)
        );

        // images
        const decryptedImages = selectedWish.images.map(image => {
            if (!process.env.REACT_APP_CRYPTO_JS_SECRET) return image;

            const decryptedImage = { ...image };
            decryptedImage.path = decryptedData(image.path, process.env.REACT_APP_CRYPTO_JS_SECRET);
            return decryptedImage;
        });
        setImages(selectedWish.show === 'all' ? selectedWish.images : decryptedImages);
    }, [idOfSelectedWish, wishList, setValue]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransition(true);
        }, 0);

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <form className="edit-wish" onSubmit={handleSubmit(onSubmit)}>
            {/* material */}
            <div className="material">
                <span className={"yes" + (material ? " primary-color" : "")}>{t('main-page.material-wish')}</span>
                <Switch
                    id="material"
                    name="material"
                    checked={material}
                    onChange={(e) => setMaterial(e.target.checked)}
                />
                <span className={"no" + (material ? "" : " action-color")}>{t('main-page.non-material-wish')}</span>
            </div>

            {/* name */}
            <Input
                {...register("name", wishNameValidation)}
                id="name"
                name="name"
                type="text"
                label={t('main-page.wish-name')}
                tooltip={t('main-page.wish-name-tooltip')}
                error={errors?.name?.message}
            />
            <Tooltip
                id="name"
                style={getTooltipStyles(screenWidth)}
            />

            {/* DragNDrop */}
            <DragNDrop images={images} setImages={setImages} removeAllImages={removeAllImages} />

            <div className={"expander" + (isTransition ? " transition" : "") + (material ? " rolled-up" : "")}>
                {/* price */}
                <div className="price">
                    <Input
                        {...(material && register("price", wishPriceValidation))}
                        id="price"
                        name="price"
                        type="number"
                        label={t('main-page.wish-price')}
                        tooltip={t('main-page.wish-price-tooltip')}
                        error={errors?.price?.message}
                    />
                    <div className="custom-mui-select">
                        <Select
                            id="currency"
                            variant="standard"
                            sx={{ padding: '0 10px', color: StylesVariables.primaryColor }}
                            value={currency}
                            onChange={e => setCurrency(e.target.value as IWish['currency'])}
                        >
                            <MenuItem value="UAH">UAH</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                        </Select>
                    </div>
                </div>
                <Tooltip
                    id="price"
                    style={getTooltipStyles(screenWidth)}
                />

                {/* addresses */}
                <Addresses
                    control={control}
                    getValues={getValues}
                    register={register}
                    errors={errors}
                    material={material}
                    screenWidth={screenWidth}
                />
            </div>

            {/* description */}
            <Input
                {
                    ...register(
                        "description",
                        {
                            ...wishDescriptionValidation,
                            maxLength: {
                                value: WISH_DESCRIPTION_MAX_LENGTH,
                                message: t(
                                    'validations.wish-description.max',
                                    { current: watch('description')?.length, max: WISH_DESCRIPTION_MAX_LENGTH },
                                ),
                            }
                        },
                    )
                }
                id="description"
                name="description"
                type="multiline"
                label={t('main-page.wish-description')}
                error={errors?.description?.message}
            />

            {/* show */}
            <div className="show">
                <span className="show-label">{t('main-page.can-see.title')}</span>

                <div className="show-actions">
                    <Radio
                        label={t('main-page.can-see.all')}
                        id="show-all"
                        name="show"
                        checked={show === 'all'}
                        value="all"
                        onChange={changeShow}
                    />

                    <div className="show-item">
                        <Radio
                            label={t('main-page.can-see.friends')}
                            id="show-friends"
                            name="show"
                            checked={show === 'friends'}
                            value="friends"
                            onChange={changeShow}
                        />

                        <span
                            className="tooltip"
                            data-tooltip-id="show-friends"
                            data-tooltip-content={t('main-page.can-see.friends-tooltip')}
                        >
                            <InfoIcon sx={{ color: StylesVariables.specialColor }} />
                        </span>
                        <Tooltip
                            id="show-friends"
                            opacity={1}
                            style={getTooltipStyles(screenWidth)}
                        />
                    </div>

                    <div className="show-item">
                        <Radio
                            label={t('main-page.can-see.nobody')}
                            id="show-nobody"
                            name="show"
                            checked={show === 'nobody'}
                            value="nobody"
                            onChange={changeShow}
                        />

                        <span
                            className="tooltip"
                            data-tooltip-id="show-nobody"
                            data-tooltip-content={t('main-page.can-see.nobody-tooltip')}
                        >
                            <InfoIcon sx={{ color: StylesVariables.specialColor }} />
                        </span>
                        <Tooltip
                            id="show-nobody"
                            opacity={1}
                            style={getTooltipStyles(screenWidth)}
                        />
                    </div>
                </div>
            </div>

            {/* actions */}
            <div className="actions">
                {idOfSelectedWish && (
                    <>
                        <Button
                            color="action-color"
                            variant="text"
                            type="button"
                            onClick={() => setShowConfirmDeleteWish(true)}
                        >
                            {t('main-page.delete-wish')}
                        </Button>

                        <ConfirmModal
                            show={showConfirmDeleteWish}
                            confirmText="Видалити"
                            closeText="Залишити"
                            close={() => setShowConfirmDeleteWish(false)}
                            confirm={handleDeleteWish}
                        >
                            <p className="text-lg">{t('main-page.are-you-sure')}</p>
                        </ConfirmModal>
                    </>
                )}

                <Button type="submit">
                    {idOfSelectedWish ? t('main-page.update') : t('main-page.create')}
                </Button>
            </div>
        </form>
    );
};

export default EditWish;
