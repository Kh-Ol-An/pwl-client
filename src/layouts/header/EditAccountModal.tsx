import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hook';
import EditAccount from '@/layouts/EditAccount';
import ChangePassword from '@/layouts/header/ChangePassword';
import Switch from '@/components/Switch';
import CustomModal from '@/components/CustomModal';

interface IProps {
    show: boolean;
    hide: () => void;
    handleShowConfirmDeleteMyUser: () => void;
}

const EditAccountModal: FC<IProps> = ({ show, hide, handleShowConfirmDeleteMyUser }) => {
    const { t } = useTranslation();

    const myUser = useAppSelector((state) => state.myUser.user);

    const [isEditAccount, setIsEditAccount] = useState<boolean>(true);

    return (
        <CustomModal show={show} hide={hide}>
            <div className="edit-account-container">
                <div className="change-edit-account">
                    <span className={isEditAccount ? "primary-color" : ""}>{t('main-page.edit-account')}</span>
                    <Switch
                        id="change-edit-account"
                        name="change-edit-account"
                        checked={isEditAccount}
                        onChange={(e) => setIsEditAccount(e.target.checked)}
                    />
                    <span className={isEditAccount ? "" : "action-color"}>{t('main-page.change-password')}</span>
                </div>

                <div className="header-actions-account">
                    <div className={"header-edit-account" + (isEditAccount ? " show" : "")}>
                        <EditAccount
                            close={hide}
                            handleShowConfirmDeleteMyUser={handleShowConfirmDeleteMyUser}
                        />
                    </div>

                    <div className={"header-change-password" + (isEditAccount ? "" : " show")}>
                        <ChangePassword userId={myUser?.id} close={hide} />
                    </div>
                </div>
            </div>
        </CustomModal>
    );
};

export default EditAccountModal;
