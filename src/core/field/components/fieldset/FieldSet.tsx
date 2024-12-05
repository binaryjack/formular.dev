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
            className={`fieldset-container mt-2 ${flags.isValid ? 'valid' : 'invalid'}`}
            data-type={type}
            data-testid={`test-${inputId}`}
        >
            <label htmlFor={inputId} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
            <div
                className={`input-row flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600`}
            >
                <div className={`input-container`}>
                    <div className={`input-content`}>{children}</div>
                    <div className={`input-commands`}>
                        <button>X</button>
                        <button>V</button>
                        <button>(o)</button>
                    </div>
                </div>

                <div
                    className={`input-container-focus-indicator ${flags.isFocus ? 'focus' : ''}`}
                />
                {flags.required && <div className={`input-container-required-indicator`} />}
            </div>
            {itemsChildren && (
                <div className={`drawer-container`}>
                    <div className={`drawer-container-header`}>
                        <button>X</button>
                    </div>
                    <div className={`drawer-container-body`}>{itemsChildren}</div>
                </div>
            )}
            {validationChildren && (
                <div className={`validation-container`}>
                    <div className={`validation-container-header`}>
                        <button>X</button>
                    </div>
                    <div className={`validation-container-body`}>{validationChildren}</div>
                </div>
            )}
        </fieldset>
    )
}

export default FieldSet
