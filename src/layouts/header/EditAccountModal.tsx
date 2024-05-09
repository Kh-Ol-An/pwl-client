import React, { FC, useState } from 'react';
import { Modal } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useAppSelector } from '@/store/hook';
import Card from '@/layouts/Card';
import EditAccount from '@/layouts/EditAccount';
import ChangePassword from '@/layouts/ChangePassword';
import Switch from '@/components/Switch';
import Action from '@/components/Action';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    show: boolean;
    hide: () => void;
    handleShowConfirmDeleteMyUser: () => void;
}

const EditAccountModal: FC<IProps> = ({ show, hide, handleShowConfirmDeleteMyUser }) => {
    const myUser = useAppSelector((state) => state.myUser.user);

    const [isEditAccount, setIsEditAccount] = useState<boolean>(true);

    return (
        <Modal
            open={show}
            onClose={hide}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modal">
                <Card>
                    <div className="change-edit-account">
                        <span className={isEditAccount ? "primary-color" : ""}>Редагувати акаунт</span>
                        <Switch
                            id="change-edit-account"
                            name="change-edit-account"
                            checked={isEditAccount}
                            onChange={(e) => setIsEditAccount(e.target.checked)}
                        />
                        <span className={isEditAccount ? "" : "action-color"}>Змінити пароль</span>
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
                </Card>

                <Action onClick={hide}>
                    <CloseIcon sx={{ color: StylesVariables.blackColor }} />
                </Action>
            </div>
        </Modal>
    );
};

export default EditAccountModal;
