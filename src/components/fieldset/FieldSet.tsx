import './FieldSet.css'

import React from 'react'
import { MdClose } from 'react-icons/md'

import { IFlagsObject } from '../../core/base/fieldStateStyle/fieldStateStyle.types'
import Button from '../button/Button'

import { PortalSlot } from '../portals/PortalSlot'

interface IFieldSetProps<TType> {
    inputId: string
    label?: string
    type: TType
    flags: IFlagsObject
    children: React.ReactNode
    itemsChildren?: React.ReactNode
    validationChildren?: React.ReactNode
    onSetFocus?: () => void
    onClear?: () => void
    onSelectItem?: () => void

    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const FieldSet = <TType,>({
    inputId,
    label,
    type,
    flags,
    children,
    itemsChildren,
    validationChildren,
    onSetFocus,
    onClear,
    onClick
}: IFieldSetProps<TType>) => (
    <fieldset
        id={`${inputId}-fieldset`}
        className={`relative  flex flex-col fieldset h-full fieldset-container  ${flags.isValid ? 'valid border-green-800' : 'invalid border-red-800'}`}
        data-type={type}
        data-testid={`test-${inputId}`}
        onClick={onClick}
    >
        {itemsChildren && <div id={`${inputId}-drawer-slot-center-container`} />}

        <div className={`relative  input-row flex xl:flex-row md:flex-col xl:h-7 `}>
            <div className={`flex items-center justify-start`}>
                <label
                    htmlFor={inputId}
                    className={`label flex mr-2 ${flags.isValid ? '' : 'label-error'}`}
                >
                    {label}
                </label>
            </div>
            <div className={`input-container flex flex-row w-full`}>
                <div className={`input-content flex flex-col mr-2 w-full`}>
                    {itemsChildren && <div id={`${inputId}-drawer-slot-top-container`} />}

                    <div>{children}</div>

                    {itemsChildren && <div id={`${inputId}-drawer-slot-bottom-container`} />}
                </div>

                <div className={`input-commands flex flex-row `}>
                    <Button
                        id={`${inputId}-clear-field-btn`}
                        title={'Clear'}
                        variant={{ rounded: true, size: 'md' }}
                        onClickCallback={() => onClear?.()}
                    >
                        {<MdClose />}
                    </Button>

                    {itemsChildren && <PortalSlot id={inputId} slotName={'close-drawer'} />}
                    {type === 'password' && <button className={`btn-sm-p mr-1`}>(o)</button>}
                </div>
            </div>

            <div
                className={`input-container-focus-indicator flex ${flags.isFocus ? 'focus' : ''}`}
            />
            {flags.required && <div className={`input-container-required-indicator flex`} />}
        </div>

        {itemsChildren && <>{itemsChildren}</>}
        {validationChildren && (
            <div className={`relative bottom-0 left-0 flex flex-col mt-1`}>
                <div className={`${flags.isFocus ? 'validation-success' : 'validation-error'}`}>
                    {validationChildren}
                </div>
            </div>
        )}
    </fieldset>
)

export default FieldSet
