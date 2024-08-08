import React, { FC, useState, useLayoutEffect, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { createWish } from '@/store/wishes/thunks';
import { IWishWithQuote, ICreateWish } from '@/store/wishes/types';
import { TCurrentImage, IImage, IWish, ECurrency, EShow } from '@/models/IWish';
import { wishDescriptionValidation, wishNameValidation, wishPriceValidation } from '@/utils/validations';
import { WISH_DESCRIPTION_MAX_LENGTH } from '@/utils/constants';
import { removingWhiteSpaces } from '@/utils/formating-value';
import { decryptedData, encryptedData } from '@/utils/encryption-data';
import getTooltipStyles from '@/utils/get-tooltip-styles';
import { getLang } from "@/utils/lang-action";
import Addresses from '@/layouts/wish/edit-wish/Addresses';
import Button from '@/components/Button';
import Input from '@/components/Input';
import DragNDrop from '@/components/DragNDrop';
import Switch from '@/components/Switch';
import QuoteMessage from "@/components/QuoteMessage";
import StylesVariables from '@/styles/utils/variables.module.scss';
import PrivacyChoices from "@/components/PrivacyChoices";
import FastWish from "@/layouts/wish/edit-wish/FastWish";

interface IProps {
    close: () => void;
}

export type TInputs = {
    name: IWish['name']
    price: IWish['price']
    addresses: IWish['addresses']
    description: IWish['description']
}

const CreateWish: FC<IProps> = ({ close }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishes = useAppSelector((state) => state.wishes);

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
    } = useForm<TInputs>();

    const [ isFastWish, setIsFastWish ] = useState<boolean>(true);
    const [ material, setMaterial ] = useState<ICreateWish['material']>(true);
    const [ show, setShow ] = useState<ICreateWish['show'] | null>(null);
    const [ showError, setShowError ] = useState<string>('');
    const [ images, setImages ] = useState<TCurrentImage[]>([]);
    const [ currency, setCurrency ] = useState<IWish['currency']>(ECurrency.UAH);
    const [ isTransition, setIsTransition ] = useState<boolean>(false);
    const [ screenWidth, setScreenWidth ] = useState<number>(window.innerWidth);

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        const nonUniqueName = wishes.list.some((wish) => {
            let wishName = wish.name;
            if (process.env.REACT_APP_CRYPTO_JS_SECRET && wish.show !== EShow.ALL) {
                wishName = decryptedData(wish.name, process.env.REACT_APP_CRYPTO_JS_SECRET)
            }
            return wishName === data.name.trim();
        });
        if (nonUniqueName) {
            setError(
                'name',
                {
                    type: 'unique',
                    message: t('main-page.non-unique-wish-name'),
                },
                { shouldFocus: true },
            );
            return;
        }

        if (!show) {
            return setShowError(t('main-page.private-wish-error'));
        } else {
            setShowError('');
        }

        if (!myUser || !process.env.REACT_APP_CRYPTO_JS_SECRET) return;

        // name
        const encryptedName = encryptedData(data.name.trim(), process.env.REACT_APP_CRYPTO_JS_SECRET);

        // price
        const priceWithoutWhiteSpaces = data.price ? removingWhiteSpaces(data.price.trim()) : '';
        const encryptedPrice = encryptedData(priceWithoutWhiteSpaces, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const sendingPrice = show === EShow.ALL ? priceWithoutWhiteSpaces : encryptedPrice;

        // currency
        const encryptedCurrency = encryptedData(currency, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const sendingCurrency = show === EShow.ALL ? currency : encryptedCurrency;

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
        const sendingAddresses = show === EShow.ALL ? dataAddresses : encryptedAddresses;

        // description
        const dataDescription = data.description ? data.description.trim() : '';
        const encryptedDescription = encryptedData(dataDescription, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const sendingDescription = show === EShow.ALL ? dataDescription : encryptedDescription;

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
            name: show === EShow.ALL ? data.name.trim() : encryptedName,
            price: material ? sendingPrice : undefined,
            currency: material ? sendingCurrency : undefined,
            addresses: material ? sendingAddresses : undefined,
            description: dataDescription.length > 0 ? sendingDescription : undefined,
            images: show === EShow.ALL ? images : encryptedImages,
        };

        try {
            const response = await dispatch(createWish(wishData));
            const quote = (response.payload as IWishWithQuote).quote[getLang()];
            toast(
                <QuoteMessage
                    title={ t('alerts.wishes-api.create-wish.success') }
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

    const changeShow = (value: EShow) => {
        setShow(value);
        setShowError('');
    }

    useLayoutEffect(() => {
        if (wishes.list.length === 0) return;

        wishes.wishCandidate?.name && setValue('name', wishes.wishCandidate.name);
        wishes.wishCandidate?.image && setImages([ {
            path: wishes.wishCandidate.image,
            position: 0,
        } ]);
        wishes.wishCandidate?.price && setValue('price', wishes.wishCandidate.price);
        wishes.wishCandidate?.url && setValue('addresses', [ {
            id: uuidv4(),
            value: wishes.wishCandidate.url
        }]);
        wishes.wishCandidate?.description && setValue('description', wishes.wishCandidate.description);
    }, [ wishes, setValue ]);

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

    return isFastWish ? (
        <FastWish close={ () => setIsFastWish(false) } />
    ) : (
        <form className="edit-wish" onSubmit={ handleSubmit(onSubmit) }>
            {/* material */ }
            <div className="material">
                <button
                    className={ "yes" + (material ? " primary-color" : "") }
                    type="button"
                    onClick={ () => setMaterial(true) }
                >
                    { t('main-page.material-wish') }
                </button>
                <Switch
                    id="material"
                    name="material"
                    checked={ material }
                    onChange={ (e) => setMaterial(e.target.checked) }
                />
                <button
                    className={ "no" + (material ? "" : " action-color") }
                    type="button"
                    onClick={ () => setMaterial(false) }
                >
                    { t('main-page.non-material-wish') }
                </button>
            </div>

            {/* name */ }
            <Input
                { ...register("name", wishNameValidation) }
                id="name"
                name="name"
                type="text"
                label={ t('main-page.wish-name') }
                tooltip={ t('main-page.wish-name-tooltip') }
                error={ errors?.name?.message }
            />
            <Tooltip
                id="name"
                style={ getTooltipStyles(screenWidth) }
            />

            {/* DragNDrop */ }
            <DragNDrop images={ images } setImages={ setImages } removeAllImages={ removeAllImages } />

            <div className={ "expander" + (isTransition ? " transition" : "") + (material ? " rolled-up" : "") }>
                {/* price */ }
                <div className="price">
                    <Input
                        { ...(material && register("price", wishPriceValidation)) }
                        id="price"
                        name="price"
                        type="number"
                        label={ t('main-page.wish-price') }
                        tooltip={ t('main-page.wish-price-tooltip') }
                        error={ errors?.price?.message }
                    />
                    <div className="custom-mui-select">
                        <Select
                            id="currency"
                            variant="standard"
                            sx={ { padding: '0 10px', color: StylesVariables.primaryColor } }
                            value={ currency }
                            onChange={ e => setCurrency(e.target.value as IWish['currency']) }
                        >
                            <MenuItem value={ ECurrency.UAH }>{ ECurrency.UAH }</MenuItem>
                            <MenuItem value={ ECurrency.USD }>{ ECurrency.USD }</MenuItem>
                            <MenuItem value={ ECurrency.EUR }>{ ECurrency.EUR }</MenuItem>
                        </Select>
                    </div>
                </div>
                <Tooltip
                    id="price"
                    style={ getTooltipStyles(screenWidth) }
                />

                {/* addresses */ }
                <Addresses
                    control={ control }
                    getValues={ getValues }
                    register={ register }
                    errors={ errors }
                    material={ material }
                    screenWidth={ screenWidth }
                />
            </div>

            {/* description */ }
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
                label={ t('main-page.wish-description') }
                error={ errors?.description?.message }
            />

            {/* PrivacyChoices */ }
            <PrivacyChoices
                id="wish"
                tooltipContent={ {
                    all: t('main-page.can-see.wish-all-tooltip'),
                    friends: t('main-page.can-see.wish-friends-tooltip'),
                    nobody: t('main-page.can-see.wish-nobody-tooltip'),
                } }
                show={ show }
                showError={ showError }
                changeShow={ changeShow }
            />

            {/* actions */ }
            <div className="actions">
                <Button type="submit">
                    { t('main-page.create') }
                </Button>
            </div>
        </form>
    );
};

export default CreateWish;
