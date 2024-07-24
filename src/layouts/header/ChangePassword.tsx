import React, { ChangeEvent, FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { changePassword } from '@/store/my-user/thunks';
import { IUser } from '@/models/IUser';
import { passwordValidation } from '@/utils/validations';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface IProps {
    userId?: IUser['id'];
}

type Inputs = {
    oldPassword: string
    newPassword: string
}

const ChangePassword: FC<IProps> = ({ userId }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const [ repeatPassword, setRepeatPassword ] = useState<string>('');
    const [ repeatPasswordError, setRepeatPasswordError ] = useState<string>('');
    const [ clickedOnSubmit, setClickedOnSubmit ] = useState<boolean>(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setClickedOnSubmit(true);

        if (data.newPassword === repeatPassword) {
            setRepeatPasswordError('');
        } else {
            return setRepeatPasswordError(t('main-page.repeat-password-error'));
        }

        if (!userId || repeatPasswordError.length > 0) return;
        await dispatch(changePassword({ userId, ...data }))
    };

    const repeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepeatPassword(value);

        if (!clickedOnSubmit) return;

        const password = getValues('newPassword');
        password === value ? setRepeatPasswordError('') : setRepeatPasswordError(t('main-page.repeat-password-error'));
    };

    return (
        <form className="edit-account" onSubmit={ handleSubmit(onSubmit) }>
            { myUser?.hasPassword && (
                <Input
                    { ...register("oldPassword", passwordValidation) }
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    label={ t('main-page.old-password') }
                    error={ errors?.oldPassword?.message }
                />
            ) }
            <Input
                { ...register("newPassword", passwordValidation) }
                id="newPassword"
                name="newPassword"
                type="password"
                label={ t('main-page.new-password') }
                error={ errors?.newPassword?.message }
            />
            <Input
                id="repeat-new-password"
                name="repeat-new-password"
                type="password"
                label={ t('main-page.repeat-new-password') }
                value={ repeatPassword }
                error={ repeatPasswordError }
                onChange={ (event) => repeatPasswordChange(event as ChangeEvent<HTMLInputElement>) }
            />

            <div className="actions">
                <Button type="submit">{ t('main-page.change-password') }</Button>
            </div>
        </form>
    );
};

export default ChangePassword;
