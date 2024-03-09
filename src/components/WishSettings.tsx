import React, { FC, ChangeEvent, useState, useLayoutEffect, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../components/Button';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { createWish, deleteWish, updateWish } from '../store/wishes/thunks';
import Input from './Input';
import { ICurrentImage, IImage, IWish } from '../models/IWish';
import {
    wishDescriptionValidation,
    wishLinkValidation,
    wishNameValidation,
    wishPriceValidation,
} from '../utils/validations';
import DragNDrop from './DragNDrop';
import { removingWhiteSpaces, addingWhiteSpaces } from '../utils/formating-value';
import Switch from './Switch';
import ConfirmModal from './ConfirmModal';
import Radio from './Radio';
import { ICreateWish } from '../store/wishes/types';

interface IProps {
    idOfSelectedWish: IWish['id'] | null;
    close: () => void;
}

type Inputs = {
    name: string
    price: string
    link: string
    description: string
}

const WishSettings: FC<IProps> = ({ idOfSelectedWish, close }) => {
    const [material, setMaterial] = useState<ICreateWish['material']>(true);
    const [show, setShow] = useState<ICreateWish['show']>('all');
    const [showConfirmRemoveWish, setShowConfirmRemoveWish] = useState<boolean>(false);
    const [images, setImages] = useState<ICurrentImage[]>([]);
    const [addClass, setAddClass] = useState<boolean>(false);

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
            link: material ? data.link : '',
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
        myWish.link && setValue('link', myWish.link);
        setValue('description', myWish.description);
        setImages(myWish.images);
    }, [idOfSelectedWish, wishList, setValue]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAddClass(true);
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
                title="Як називається твоє бажання?"
                error={errors?.name?.message}
            />

            <div className={"expander" + (addClass ? " transition" : "") + (material ? " rolled-up" : "")}>
                <Input
                    {...(material && register("price", wishPriceValidation))}
                    id="price"
                    name="price"
                    type="number"
                    label="Ціна*"
                    title="Приблизна або точна ціна"
                    error={errors?.price?.message}
                />

                <Input
                    {...(material && register("link", wishLinkValidation))}
                    id="link"
                    name="link"
                    type="text"
                    label="Посилання"
                    title="Посилання де можна придбати бажання"
                    error={errors?.link?.message}
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
                type="text"
                label="Опис бажання"
                title="Опиши своє бажання?"
                multiline
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
                                close={() => setShowConfirmRemoveWish(false)}
                                confirm={removeWish}
                            >
                                <p className="title">Ви впевнені, що хочете видалити це бажання?</p>
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
