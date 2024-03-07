import React, { FC, useState, useEffect } from 'react';
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
import { addingWhiteSpaces, removingWhiteSpaces } from '../utils/formating-value';

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
    const [images, setImages] = useState<ICurrentImage[]>([]);

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

        if (idForEditing) {
            await dispatch(updateWish({
                userId: myUser.id,
                id: idForEditing,
                name: data.name.trim(),
                price: removingWhiteSpaces(data.price.trim()),
                link: data.link,
                description: data.description.trim(),
                images,
            }));
        } else {
            await dispatch(createWish({
                userId: myUser.id,
                name: data.name.trim(),
                price: removingWhiteSpaces(data.price.trim()),
                link: data.link,
                description: data.description.trim(),
                images,
            }));
        }
        close();
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

    useEffect(() => {
        if (wishList.length === 0) return;

        const myWish = wishList.find((wish) => wish.id === idForEditing);
        if (!myWish) return;

        setValue('name', myWish.name);
        setValue('price', addingWhiteSpaces(myWish.price));
        setValue('link', myWish.link);
        setValue('description', myWish.description);
        setImages(myWish.images);
    }, [idForEditing, wishList, setValue]);

    return (
        <form className="wish-settings" onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register("name", wishNameValidation)}
                id="name"
                type="text"
                label="Назва твого бажання*"
                title="Як називається твоє бажання?"
                error={errors?.name?.message}
            />

            <Input
                {...register("price", wishPriceValidation)}
                id="price"
                type="number"
                label="Ціна*"
                title="Приблизна або точна ціна"
                error={errors?.price?.message}
            />

            <Input
                {...register("link", wishLinkValidation)}
                id="link"
                type="text"
                label="Посилання"
                title="Посилання де можна придбати бажання"
                error={errors?.link?.message}
            />

            <Input
                {...register("description", wishDescriptionValidation)}
                id="description"
                type="text"
                label="Опис бажання"
                title="Опиши своє бажання?"
                error={errors?.description?.message}
            />

            <DragNDrop images={images} setImages={setImages} removeAll={removeAll} />

            <Button type="submit">
                {idForEditing ? 'Оновити' : 'Додати'}
            </Button>
        </form>
    );
};

export default WishSettings;
