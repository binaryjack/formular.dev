import './FieldSet.css'

import React from 'react'

import { IFlagsObject } from '../../fieldStateStyle/fieldStateStyle.types'

interface IFieldSet<TType> {
    inputId?: string
    label?: string
    type: TType
    flags: IFlagsObject
    children: React.ReactNode
    itemsChildren?: React.ReactNode
    validationChildren?: React.ReactNode

    onSetFocus?: () => void
    onClear?: () => void
    onSelectItem?: () => void
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
    onClear
}: IFieldSet<TType>) => {
    return (
        <fieldset
            className={`relative  flex flex-col fieldset h-full fieldset-container  ${flags.isValid ? 'valid border-green-800' : 'invalid border-red-800'}`}
            data-type={type}
            data-testid={`test-${inputId}`}
        >
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
                    <div className={`input-content flex mr-2 w-full`}>{children}</div>
                    <div className={`input-commands flex flex-row `}>
                        <button className={`btn-sm-p mr-1`} onClick={onClear}>
                            X
                        </button>
                        <button className={`btn-sm-p mr-1`}>V</button>
                        <button className={`btn-sm-p mr-1`}>(o)</button>
                    </div>
                </div>

                <div
                    className={`input-container-focus-indicator flex ${flags.isFocus ? 'focus' : ''}`}
                />
                {flags.required && <div className={`input-container-required-indicator flex`} />}
            </div>
            {itemsChildren && (
                <div className={`relative bottom-0 left-0 flex flex-col `}>
                    <div className={` flex flex-row justify-end`}>
                        <button className={`btn-sm-p mr-1`}>X</button>
                    </div>
                    <div className={` `}>{itemsChildren}</div>
                </div>
            )}
            {validationChildren && (
                <div className={`relative bottom-0 left-0 flex flex-col mt-1`}>
                    <div className={`${flags.isFocus ? 'validation-success' : 'validation-error'}`}>
                        {validationChildren}
                    </div>
                </div>
            )}
        </fieldset>
    )
}

export default FieldSet
