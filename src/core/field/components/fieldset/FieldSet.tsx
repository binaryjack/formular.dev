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
}

const FieldSet = <TType,>({
    inputId,
    label,
    type,
    flags,
    children,
    itemsChildren,
    validationChildren
}: IFieldSet<TType>) => {
    return (
        <fieldset
            className={`input-container ${flags.isValid ? 'valid' : 'invalid'}`}
            data-type={type}
            data-testid={`test-${inputId}`}
        >
            <label htmlFor={inputId}>{label}</label>
            <div className={`input-container`}>
                <div className={`input-container-input`}>{children}</div>
                <div className={`input-container-commands`}></div>

                <div
                    className={`input-container-focus-indicator ${flags.isFocus ? 'focus' : ''}`}
                />
                {flags.required && <div className={`input-container-required-indicator`} />}
            </div>
            {itemsChildren && (
                <div className={`drawer-container`}>
                    <div className={`drawer-container-header`}></div>
                    <div className={`drawer-container-body`}>{itemsChildren}</div>
                </div>
            )}
            {validationChildren && (
                <div className={`validation-container`}>
                    <div className={`validation-container-header`}></div>
                    <div className={`validation-container-body`}>{validationChildren}</div>
                </div>
            )}
        </fieldset>
    )
}

export default FieldSet
