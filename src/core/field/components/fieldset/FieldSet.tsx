import './FieldSet.css'

import React from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

import { IFlagsObject } from '../../fieldStateStyle/fieldStateStyle.types'
import { DrawerOpenStateType } from '../drawer/Drawer.types'

interface IFieldSet<TType> {
    inputId?: string
    label?: string
    type: TType
    flags: IFlagsObject
    children: React.ReactNode
    itemsChildren?: React.ReactNode
    validationChildren?: React.ReactNode
    drawerOpenState?: DrawerOpenStateType
    onSetFocus?: () => void
    onClear?: () => void
    onSelectItem?: () => void
    onSetOpenState?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const FieldSet = <TType,>({
    inputId,
    label,
    type,
    flags,
    children,
    itemsChildren,
    validationChildren,
    drawerOpenState,
    onSetFocus,
    onClear,
    onSetOpenState
}: IFieldSet<TType>) => {
    console.log('FieldSet', drawerOpenState)
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
                        <button type="button" className={`btn-sm-p mr-1`} onClick={onClear}>
                            {<MdClose />}
                        </button>
                        {itemsChildren && (
                            <button className={`btn-sm-p mr-1`} onClick={onSetOpenState}>
                                {drawerOpenState === 'closed' ? <FaChevronDown /> : <FaChevronUp />}
                            </button>
                        )}
                        {type === 'password' && <button className={`btn-sm-p mr-1`}>(o)</button>}
                    </div>
                </div>

                <div
                    className={`input-container-focus-indicator flex ${flags.isFocus ? 'focus' : ''}`}
                />
                {flags.required && <div className={`input-container-required-indicator flex`} />}
            </div>
            {itemsChildren && (
                <div className={`relative bottom-0 left-0 flex flex-col `}>
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
