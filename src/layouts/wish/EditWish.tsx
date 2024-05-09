import React, { FC, ChangeEvent, useState, useLayoutEffect, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Info as InfoIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { createWish, deleteWish, updateWish } from '@/store/wishes/thunks';
import { ICreateWish } from '@/store/wishes/types';
import { TCurrentImage, IImage, IWish } from '@/models/IWish';
import {
    onlyWhitespaceValidation,
    wishDescriptionValidation,
    wishNameValidation,
    wishPriceValidation,
} from '@/utils/validations';
import { WISH_DESCRIPTION_MAX_LENGTH } from '@/utils/constants';
import { removingWhiteSpaces, addingWhiteSpaces } from '@/utils/formating-value';
import { decryptedData, encryptedData } from '@/utils/encryption-data';
import ConfirmModal from '@/layouts/ConfirmModal';
import Button from '@/components/Button';
import Input from '@/components/Input';
import DragNDrop from '@/components/DragNDrop';
import Switch from '@/components/Switch';
import Radio from '@/components/Radio';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    idOfSelectedWish: IWish['id'] | null;
    close: () => void;
}

type Inputs = {
    name: IWish['name']
    price: IWish['price']
    address: IWish['address']
    description: IWish['description']
}

const EditWish: FC<IProps> = ({ idOfSelectedWish, close }) => {
    const myUser = useAppSelector((state) => state.myUser.user);
    const wishList = useAppSelector((state) => state.wishes.list);

    const dispatch = useAppDispatch();

    const {
        register,
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

        // address
        const dataAddress = data.address ? data.address.trim() : '';
        const encryptedAddress = encryptedData(dataAddress, process.env.REACT_APP_CRYPTO_JS_SECRET);
        const sendingAddress = show === 'all' ? dataAddress : encryptedAddress;

        // description
        const encryptedDescription = encryptedData(data.description.trim(), process.env.REACT_APP_CRYPTO_JS_SECRET);
        const sendingDescription = show === 'all' ? data.description.trim() : encryptedDescription;

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
            address: dataAddress.length > 0 ? sendingAddress : undefined,
            description: data.description.trim().length > 0 ? sendingDescription : undefined,
            images: show === 'all' ? encryptedImages : images,
        };
        if (idOfSelectedWish) {
            await dispatch(updateWish({
                ...wishData,
                id: idOfSelectedWish,
            }));
        } else {
            await dispatch(createWish(wishData));
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

        const myWish = wishList.find((wish) => wish.id === idOfSelectedWish);

        if (!myWish || !process.env.REACT_APP_CRYPTO_JS_SECRET) return;

        setMaterial(myWish.material);
        setShow(myWish.show);
        setValue(
            'name',
            myWish.show === 'all'
                ? myWish.name
                : decryptedData(myWish.name, process.env.REACT_APP_CRYPTO_JS_SECRET),
        );
        myWish.price && setValue(
            'price',
            addingWhiteSpaces(
                myWish.show === 'all'
                    ? myWish.price
                    : decryptedData(myWish.price, process.env.REACT_APP_CRYPTO_JS_SECRET)
            ),
        );
        myWish.currency && setCurrency(
            myWish.show === 'all'
                ? myWish.currency
                : decryptedData(myWish.currency, process.env.REACT_APP_CRYPTO_JS_SECRET) as IWish['currency']
        );
        myWish.address && setValue(
            'address',
            myWish.show === 'all'
                ? myWish.address
                : decryptedData(myWish.address, process.env.REACT_APP_CRYPTO_JS_SECRET),
        );
        setValue(
            'description',
            myWish.show === 'all'
                ? myWish.description
                : decryptedData(myWish.description, process.env.REACT_APP_CRYPTO_JS_SECRET)
        );

        const decryptedImages = myWish.images.map(image => {
            if (!process.env.REACT_APP_CRYPTO_JS_SECRET) return image;

            const decryptedImage = { ...image };
            decryptedImage.path = decryptedData(image.path, process.env.REACT_APP_CRYPTO_JS_SECRET);
            return decryptedImage;
        });
        setImages(myWish.show === 'all' ? myWish.images : decryptedImages);
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
                <span className={"yes" + (material ? " primary-color" : "")}>Матеріальне бажання</span>
                <Switch
                    id="material"
                    name="material"
                    checked={material}
                    onChange={(e) => setMaterial(e.target.checked)}
                />
                <span className={"no" + (material ? "" : " action-color")}>Не матеріальне бажання</span>
            </div>

            {/* name */}
            <Input
                {...register("name", wishNameValidation)}
                id="name"
                name="name"
                type="text"
                label="Назва твого бажання*"
                tooltip="Сподіваюсь що ти створиш багато бажань) І щоб їх було легко розрізняти, назва має бути не тільки обов'язковою, а ще і унікальною"
                error={errors?.name?.message}
            />
            <Tooltip
                id="name"
                style={{
                    backgroundColor: StylesVariables.blackColor,
                    color: StylesVariables.lightColor,
                    width: screenWidth > 411 ? '300px' : '200px',
                    fontSize: '14px',
                    zIndex: 9,
                }}
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
                        label="Ціна*"
                        tooltip="Матеріальне бажання яке не має своєї ціни не може бути виконано твоїм всесвітом. Введи приблизну або точну ціну."
                        error={errors?.price?.message}
                    />
                    <div className="custom-select">
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
                    style={{
                        backgroundColor: StylesVariables.blackColor,
                        color: StylesVariables.lightColor,
                        width: screenWidth > 411 ? '300px' : '200px',
                        fontSize: '14px',
                        zIndex: 9,
                    }}
                />

                {/* address */}
                <Input
                    {...(material && register("address", onlyWhitespaceValidation))}
                    id="address"
                    name="address"
                    type="text"
                    label="Де можна придбати"
                    tooltip="Назва місця, а краще адреса, а ще краще посилання де можна придбати бажання."
                    error={errors?.address?.message}
                />
                <Tooltip
                    id="address"
                    style={{
                        backgroundColor: StylesVariables.blackColor,
                        color: StylesVariables.lightColor,
                        width: screenWidth > 411 ? '300px' : '200px',
                        fontSize: '14px',
                        zIndex: 9,
                    }}
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
                                message: `Назва твого бажання містить: ${
                                    watch('description')?.length
                                } символів. Давай намагатимемося вміститися в ${
                                    WISH_DESCRIPTION_MAX_LENGTH
                                } символів.`,
                            }
                        },
                    )
                }
                id="description"
                name="description"
                type="multiline"
                label="Опис бажання"
                error={errors?.description?.message}
            />

            {/* show */}
            <div className="show">
                <span className="show-label">Хто може бачити твоє бажання*</span>

                <div className="show-actions">
                    <Radio
                        label="Всі"
                        id="show-all"
                        name="show"
                        checked={show === 'all'}
                        value="all"
                        onChange={changeShow}
                    />
                    <div className="show-item">
                        <Radio
                            label="Тільки друзі"
                            id="show-friends"
                            name="show"
                            checked={show === 'friends'}
                            value="friends"
                            onChange={changeShow}
                        />

                        <span
                            className="tooltip"
                            data-tooltip-id="show-friends"
                            data-tooltip-content="Бажання побачать тільки ті користувачі яких Ви додали до друзів та вони додали Вас до друзів"
                        >
                            <InfoIcon sx={{ color: StylesVariables.specialColor }} />
                        </span>
                        <Tooltip
                            id="show-friends"
                            opacity={1}
                            style={{
                                backgroundColor: StylesVariables.blackColor,
                                color: StylesVariables.lightColor,
                                width: screenWidth > 411 ? '300px' : '200px',
                                fontSize: '14px',
                                zIndex: 9,
                            }}
                        />
                    </div>
                    <Radio
                        label="Ніхто"
                        id="show-nobody"
                        name="show"
                        checked={show === 'nobody'}
                        value="nobody"
                        onChange={changeShow}
                    />
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
                            Видалити бажання
                        </Button>

                        <ConfirmModal
                            show={showConfirmDeleteWish}
                            confirmText="Видалити"
                            closeText="Залишити"
                            close={() => setShowConfirmDeleteWish(false)}
                            confirm={handleDeleteWish}
                        >
                            <p className="text-lg">Ви впевнені, що хочете видалити це бажання?</p>
                        </ConfirmModal>
                    </>
                )}

                <Button type="submit">
                    {idOfSelectedWish ? 'Оновити' : 'Створити'}
                </Button>
            </div>
        </form>
    );
};

export default EditWish;
