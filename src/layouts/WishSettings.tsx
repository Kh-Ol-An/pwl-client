import React, { FC, ChangeEvent, useState, useLayoutEffect, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { createWish, deleteWish, updateWish } from '../store/wishes/thunks';
import { ICreateWish } from '../store/wishes/types';
import { ICurrentImage, IImage, IWish } from '../models/IWish';
import {
    onlyWhitespaceValidation,
    wishDescriptionValidation,
    wishNameValidation,
    wishPriceValidation,
} from '../utils/validations';
import { removingWhiteSpaces, addingWhiteSpaces } from '../utils/formating-value';
import ConfirmModal from './ConfirmModal';
import Button from '../components/Button';
import Input from '../components/Input';
import DragNDrop from '../components/DragNDrop';
import Switch from '../components/Switch';
import Radio from '../components/Radio';

interface IProps {
    idOfSelectedWish: IWish['id'] | null;
    close: () => void;
}

type Inputs = {
    name: string
    price: string
    address: string
    description: string
}

const WishSettings: FC<IProps> = ({ idOfSelectedWish, close }) => {
    const [material, setMaterial] = useState<ICreateWish['material']>(true);
    const [show, setShow] = useState<ICreateWish['show']>('all');
    const [showConfirmRemoveWish, setShowConfirmRemoveWish] = useState<boolean>(false);
    const [images, setImages] = useState<ICurrentImage[]>([]);
    const [isTransition, setIsTransition] = useState<boolean>(false);

    const {
        register,
        setValue,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const myUser = useAppSelector((state) => state.myUser.user);
    const wishList = useAppSelector((state) => state.wishes.list);

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (wishList.some((wish) => wish.name === data.name.trim() && wish.id !== idOfSelectedWish)) {
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

        if (!myUser) return;

        const wishData = {
            userId: myUser.id,
            material,
            show,
            name: data.name.trim(),
            price: material ? removingWhiteSpaces(data.price.trim()) : '',
            address: material ? data.address : '',
            description: data.description.trim(),
            images,
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

    const changeMaterial = (e: ChangeEvent<HTMLInputElement>) => {
        setMaterial(e.target.checked);
    };

    const changeShow = (e: ChangeEvent<HTMLInputElement>) => {
        setShow(e.target.value as ICreateWish['show']);
    };

    const removeAll = () => {
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

    const removeWish = async () => {
        if (!myUser || !idOfSelectedWish) return;

        await dispatch(deleteWish([myUser.id, idOfSelectedWish]));
        close();
    };

    useLayoutEffect(() => {
        if (wishList.length === 0) return;

        const myWish = wishList.find((wish) => wish.id === idOfSelectedWish);
        if (!myWish) return;

        setMaterial(myWish.material);
        setShow(myWish.show);
        setValue('name', myWish.name);
        myWish.price && setValue('price', addingWhiteSpaces(myWish.price));
        myWish.address && setValue('address', myWish.address);
        setValue('description', myWish.description);
        setImages(myWish.images);
    }, [idOfSelectedWish, wishList, setValue]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransition(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <form className="wish-settings" onSubmit={handleSubmit(onSubmit)}>
            <div className="material">
                <span className={material ? "primary-color" : ""}>Матеріальне бажання</span>
                <Switch id="material" name="material" checked={material} onChange={changeMaterial} />
                <span className={material ? "" : "action-color"}>Не матеріальне бажання</span>
            </div>

            <Input
                {...register("name", wishNameValidation)}
                id="name"
                name="name"
                type="text"
                label="Назва твого бажання*"
                tooltip="Сподіваюсь що ти створиш багато бажань) І щоб їх було легко розрізняти, назва має бути не тільки обов'язковою, а ще і унікальною"
                error={errors?.name?.message}
            />

            <div className={"expander" + (isTransition ? " transition" : "") + (material ? " rolled-up" : "")}>
                <Input
                    {...(material && register("price", wishPriceValidation))}
                    id="price"
                    name="price"
                    type="number"
                    label="Ціна*"
                    tooltip="Матеріальне бажання яке не має своєї ціни не може бути виконано твоїм всесвітом. Введи приблизну або точну ціну."
                    error={errors?.price?.message}
                />

                <Input
                    {...(material && register("address", onlyWhitespaceValidation))}
                    id="address"
                    name="address"
                    type="text"
                    label="Де можна придбати"
                    tooltip="Назва місця, а краще адреса, а ще краще посилання де можна придбати бажання."
                    error={errors?.address?.message}
                />
            </div>

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
                    <Radio
                        label="Тільки друзі"
                        id="show-friends"
                        name="show"
                        checked={show === 'friends'}
                        value="friends"
                        onChange={changeShow}
                    />
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

            <Input
                {...register("description", wishDescriptionValidation)}
                id="description"
                name="description"
                type="multiline"
                label="Опис бажання"
                error={errors?.description?.message}
            />

            <DragNDrop images={images} setImages={setImages} />

            <div className="actions">
                {images.length > 0 && (
                    <button className="remove-all" type="button" onClick={removeAll}>Видалити всі зображення</button>
                )}

                <div className="sub-actions">
                    {idOfSelectedWish && (
                        <>
                            <Button
                                color="action-color"
                                type="button"
                                onClick={() => setShowConfirmRemoveWish(true)}
                            >
                                Видалити бажання
                            </Button>

                            <ConfirmModal
                                show={showConfirmRemoveWish}
                                confirmText="Видалити"
                                closeText="Залишити"
                                close={() => setShowConfirmRemoveWish(false)}
                                confirm={removeWish}
                            >
                                <h3 className="title attention">Увага!</h3>
                                <p className="text-lg">Ви впевнені, що хочете видалити це бажання?</p>
                            </ConfirmModal>
                        </>
                    )}

                    <Button type="submit">
                        {idOfSelectedWish ? 'Оновити' : 'Додати'}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default WishSettings;
