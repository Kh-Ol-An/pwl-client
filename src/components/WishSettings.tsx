import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../components/Button';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { createWish, updateWish } from '../store/wishes/thunks';
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

interface IProps {
    idForEditing: IWish['id'] | null;
    close: () => void;
}

type Inputs = {
    name: string
    price: string
    link: string
    description: string
}

const WishSettings: FC<IProps> = ({ idForEditing, close }) => {
    const [material, setMaterial] = useState<boolean>(true);
    const [images, setImages] = useState<ICurrentImage[]>([]);
    const [addClass, setAddClass] = useState(false);

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
        if (wishList.some((wish) => wish.name === data.name.trim() && wish.id !== idForEditing)) {
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
            name: data.name.trim(),
            price: material ? removingWhiteSpaces(data.price.trim()) : '',
            link: material ? data.link : '',
            description: data.description.trim(),
            images,
        };
        if (idForEditing) {
            await dispatch(updateWish({
                ...wishData,
                id: idForEditing,
            }));
        } else {
            await dispatch(createWish(wishData));
        }
        close();
    };

    const changeMaterial = (e: ChangeEvent<HTMLInputElement>) => {
        setMaterial(e.target.checked);
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

    const removeWish = () => {
        console.log('removeWish');
    };

    useEffect(() => {
        if (wishList.length === 0) return;

        const myWish = wishList.find((wish) => wish.id === idForEditing);
        if (!myWish) return;

        setMaterial(myWish.material);
        setValue('name', myWish.name);
        myWish.price && setValue('price', addingWhiteSpaces(myWish.price));
        myWish.link && setValue('link', myWish.link);
        setValue('description', myWish.description);
        setImages(myWish.images);
    }, [idForEditing, wishList, setValue]);

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
                <Switch name="material" checked={material} onChange={changeMaterial} />
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
                    {idForEditing && (
                        <Button color="action-color" type="button" onClick={removeWish}>
                            Видалити бажання
                        </Button>
                    )}

                    <Button type="submit">
                        {idForEditing ? 'Оновити' : 'Додати'}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default WishSettings;
