import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'

import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'

import { IDommable } from '@core/dommable/dommable.types'

import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { ITracker, ITrackingOutputProvider, TrackingType } from '@core/tracker/tracker.types'
import {
    IValidationMethodStrategy,
    IValidationStrategy
} from '@core/validation-strategy/validation-strategy.types'
import { IEvents } from '../../events/events.types'
import { IParserStrategy, IValueStrategy } from '../../value-strategy/value-strategy.types'
import { IDrawerBaseInput } from '../drawer-base-input/drawer-base-input.types'
import { IFieldStateStyle } from '../field-state-style/field-state-style.types'
import { ToggleableStateType } from '../toggleable-base-element/toggleable-base-element'

/**
 * Should be the root base of a field's properties
 */
export interface IFieldBaseProperties {
    [key: string]: any
    id: number
    name: string
    label: string

    enabled: boolean
    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean

    value: FieldDataTypes
    originalValue: FieldDataTypes
}

/**
 * Should be the base of a field's methods
 */
export interface IFieldBaseMethods extends IFieldBaseProperties {
    [key: string]: any

    /** message helper method : uses treacker and fallbacks to console */
    message: (type: TrackingType, source: string, message: string) => void
    /** Core methods */
    setValue: (value: FieldDataTypes) => void
    getValue: () => FieldDataTypes

    setFocus: () => void
    clear: () => void
    enable: (enabled: boolean) => void

    hasChanges: (callback: () => void) => void
    handleValidation: <T extends IEvents>(event?: T) => void

    handleOnBlur: <T extends IEvents>(data?: T) => void
    handleOnFocus: <T extends IEvents>(data?: T) => void
    handleOnClear: <T extends IEvents>(data?: T) => void
}

/**
 * Should be the base of a private implementation of a Field Input
 */
export interface IFieldPrivateAccessors extends IFieldBaseMethods {
    [key: string]: any
    /** dependencies */
    _dom?: IDommable<HTMLInputElement>
    _drawer?: IDrawerBaseInput
    _style?: IFieldStateStyle
    _notifier?: INotifiableEntity
    _tracker?: ITracker
    _validation?: IValidationStrategy
    _value?: IValueStrategy
}

/**
 * Should be the base of a public implementation of a Field Input
 */
export interface IFieldPublicAccessors extends IFieldBaseMethods {
    [key: string]: any

    /** Dependency accessors */
    dom?: () => IDommable<HTMLInputElement> | undefined
    notifier?: () => INotifiableEntity | undefined
    style?: () => IFieldStateStyle | undefined
    track?: () => ITracker | undefined
    validationStrategy?: () => IValidationStrategy | undefined
    valueStrategy?: () => IValueStrategy | undefined
}

export interface IPrivateBaseField extends IFieldPrivateAccessors {
    /** initializer builders */
    initializeEvents: () => IFieldInput
    initializeDommable: () => IFieldInput
    initializeTracking: (providers?: ITrackingOutputProvider[]) => IFieldInput
    initializeValueStrategy: (...parsers: IParserStrategy<any>[]) => IFieldInput
    initializeValidationStrategy: (...parsers: IValidationMethodStrategy[]) => IFieldInput
    initializeDrawerableState: () => IFieldInput
    initializeStyle: () => IFieldInput
}

export interface IPublicBaseField extends IFieldPublicAccessors {
    /** */
}

export interface IExtendedFieldBase extends IFieldBaseInput {
    id: number
    name: string
    valueStrategies: IParserStrategy<unknown>[]
    _field: IFieldInput
    field: () => IFieldInput
}

export interface IDrawerExtendedField extends IExtendedFieldBase {
    openState: ToggleableStateType
}

export interface IClickExtendedField extends IExtendedFieldBase {
    checked?: boolean
}

export interface IOptionExtendedField extends IExtendedFieldBase {
    options: IOptionItem[]
    optionsInitialized: boolean
    /** works with IOptionItem[] and fields of type select*/
    selectedOptionId: number | null

    getOptionById: (id: string) => IOptionItem | null
    getOptionByValue: (value: string) => IOptionItem | null
    tryGetOptionByIdOrValue: (id: string, value: string) => IOptionItem | null
}

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

/** @warning: should not being used outside it's main implementation prefer the use of @Ifield */
export type IFieldInput = IFieldBaseInput & Omit<IFieldDescriptor, 'validationOptions' | 'options'>

export interface IFieldBaseInput extends IPrivateBaseField {
    new (descriptor: IFieldDescriptor): IFieldInput

    initializeFieldProperties: (descriptor: IFieldDescriptor) => void
}

export interface FieldsExtensionsTypes
    extends IExtendedFieldBase,
        IDrawerExtendedField,
        IClickExtendedField,
        IOptionExtendedField,
        IFieldInput {}

export interface IFieldInputExtended extends FieldsExtensionsTypes {
    hasChange: (callback: () => void) => void
    handleOnBlur: <T extends IEvents>(data?: T) => void
    handleOnFocus: <T extends IEvents>(data?: T) => void
    handleOnClear: <T extends IEvents>(data?: T) => void
    handleOnChanged: <T extends IEvents>(data?: T) => void
    handleOnClick: <T extends IEvents>(data?: T) => void
    handleValidation: <T extends IEvents>(event?: T) => void
    getOptionById: (id: string) => IOptionItem | null
}
