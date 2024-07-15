import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import { Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { deleteMyUser } from '@/store/my-user/thunks';
import { IUser } from '@/models/IUser';
import { emailValidation, passwordValidation } from '@/utils/validations';
import Card from '@/layouts/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface IProps {
    show: boolean;
    hide: () => void;
    hideHeader: () => void;
}

type Inputs = {
    email: IUser['email']
    password: string
}

const ConfirmDeleteMyUserModal: FC<IProps> = ({ show, hide, hideHeader }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const [ confirmDeleteMyUserError, setConfirmDeleteMyUserError ] = useState<string>('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const getDataFromGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            if (!myUser) return;

            const token = tokenResponse.access_token;

            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${ token }`,
                },
            });

            const data = await response.json();
            if (myUser.email !== data.email) {
                setConfirmDeleteMyUserError(t('main-page.email-not-match'));
                return;
            }
            await dispatch(deleteMyUser({ email: data.email, password: '', userId: myUser.id }));
            hideHeader();
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!myUser) return;

        if (myUser.hasPassword) {
            if (myUser.email !== data.email) {
                setConfirmDeleteMyUserError(t('main-page.email-not-match'));
                return;
            } else {
                setConfirmDeleteMyUserError('');
            }

            await dispatch(deleteMyUser({ ...data, userId: myUser.id }));
            hideHeader();
        } else {
            await getDataFromGoogle();
        }
    };

    return (
        <Modal
            open={ show }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form className="modal confirm" onSubmit={ handleSubmit(onSubmit) }>
                <Card classes="not-full-screen">
                    <h3 className="title attention">{ t('confirm-modal.title') }</h3>

                    <p className="text">
                        { t('main-page.sadness') }
                    </p>

                    { !myUser?.hasPassword && confirmDeleteMyUserError.length > 0 && (
                        <p className="error">{ confirmDeleteMyUserError }</p>
                    ) }

                    { myUser?.hasPassword && (
                        <>
                            <div className="email-box">
                                <Input
                                    { ...register("email", emailValidation) }
                                    id="email"
                                    name="email"
                                    type="text"
                                    label="Email*"
                                    error={ errors?.email?.message }
                                />
                                { confirmDeleteMyUserError.length > 0 && (
                                    <p className="error">{ confirmDeleteMyUserError }</p>
                                ) }
                            </div>

                            <Input
                                { ...register("password", passwordValidation) }
                                id="password"
                                name="password"
                                type="password"
                                label={ t('auth.password') }
                                error={ errors?.password?.message }
                            />
                        </>
                    ) }

                    <div className="modal-actions">
                        <Button variant="text" color="action-color" type="submit">
                            { t('main-page.delete-my-account') }
                        </Button>

                        <Button type="button" onClick={ hide }>
                            { t('main-page.stay') }
                        </Button>
                    </div>
                </Card>
            </form>
        </Modal>
    );
};

export default ConfirmDeleteMyUserModal;
