import React, { FC, useLayoutEffect } from 'react';
import { useFieldArray, UseFormGetValues, Control, UseFormRegister, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { Tooltip } from 'react-tooltip';
import { Cancel as CancelIcon, AddCircle as AddCircleIcon } from '@mui/icons-material';
import { ICreateWish } from '@/store/wishes/types';
import { onlyWhitespaceValidation } from '@/utils/validations';
import getTooltipStyles from '@/utils/get-tooltip-styles';
import { Inputs } from '@/layouts/wish/edit-wish/EditWish';
import Input from '@/components/Input';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    control: Control<Inputs>;
    getValues: UseFormGetValues<Inputs>;
    register: UseFormRegister<Inputs>;
    errors: FieldErrors<Inputs>;
    material: ICreateWish['material'];
    screenWidth: number;
}

const Addresses: FC<IProps> = ({ control, getValues, errors, register, material, screenWidth }) => {
    const { t } = useTranslation();

    const { append, remove } = useFieldArray({
        control,
        name: "addresses"
    });

    const addresses = getValues('addresses');

    useLayoutEffect(() => {
        append({ id: uuidv4(), value: "" });
    }, []);

    return (
        <div className="address">
            {addresses && addresses.map((address, idx) => (
                <div key={address.id}>
                    <div className="address-field">
                        <Input
                            {...(material && register(`addresses.${idx}.value`, onlyWhitespaceValidation))}
                            id={`address-${idx}`}
                            name={`addresses[${idx}].value`}
                            type="text"
                            label={t('main.where-to-buy')}
                            tooltip={t('main.where-to-buy-tooltip')}
                        />

                        {addresses.length > 1 && (
                            <button className="action-address" type="button" onClick={() => remove(idx)}>
                                <CancelIcon sx={{ color: StylesVariables.actionColor }} />
                            </button>
                        )}

                        {idx === addresses.length - 1 && (
                            <button
                                className="action-address"
                                type="button"
                                onClick={() => append({ id: uuidv4(), value: "" })}
                            >
                                <AddCircleIcon sx={{ color: StylesVariables.successColor }} />
                            </button>
                        )}
                    </div>

                    {errors?.addresses?.[idx]?.value && (
                        <span className="error">{errors?.addresses?.[idx]?.value?.message}</span>
                    )}

                    <Tooltip
                        id={`address-${idx}`}
                        style={getTooltipStyles(screenWidth)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Addresses;
