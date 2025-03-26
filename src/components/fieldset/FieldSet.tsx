import './FieldSet.css'

import React from 'react'
import { MdClose } from 'react-icons/md'

import { IFlagsObject } from '../../core/base/fieldStateStyle/fieldStateStyle.types'
import { Button } from '../button/Button'

import { useCenterElementTrigger } from '../../core/hooks/screen/useCenterElement'
import { CenterElementDebug } from '../context/debug/CenterElementDebug'
import { Drawer } from '../drawer/Drawer'
import { DrawerToggle } from '../drawer/Drawer.toggle'
import { DrawerSlot } from '../drawer/DrawerSlot'

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
}: IFieldSetProps<TType>) => {
    const { scrollPosition, elementRef, elementPositionRefs, toggle } =
        useCenterElementTrigger<HTMLFieldSetElement>()

    return (
        <fieldset
            ref={elementRef}
            id={`${inputId}-fieldset`}
            className={`relative  flex flex-col fieldset h-full fieldset-container  ${flags.isValid ? 'valid border-green-800' : 'invalid border-red-800'}`}
            data-type={type}
            data-testid={`test-${inputId}`}
            onClick={onClick}
        >
            <DrawerSlot
                id={inputId}
                slotName={'drawer-slot'}
                opensToThe="center"
                conditionnalShow={!!itemsChildren}
            />

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
                        <DrawerSlot
                            id={inputId}
                            slotName={'drawer-slot'}
                            opensToThe="bottom"
                            conditionnalShow={!!itemsChildren}
                        />

                        <Drawer id={`${inputId}`} position={toggle}>
                            {children}
                        </Drawer>

                        <DrawerSlot
                            id={inputId}
                            slotName={'drawer-slot'}
                            opensToThe="top"
                            conditionnalShow={!!itemsChildren}
                        />
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
                        <DrawerToggle id={inputId} conditionnalShow={!!itemsChildren} />
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
            <CenterElementDebug
                centerScreen={scrollPosition.centerScreen}
                parentHeight={elementPositionRefs.height}
                screenTop={scrollPosition.screenTop}
            />
        </fieldset>
    )
}

export default FieldSet
