import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'

import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'

import { IDommable } from '@core/dommable/dommable.types'

import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { ITracker, TrackingType } from '@core/tracker/tracker.types'
import { IValidationStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IEvents } from '../../events/events.types'
import { IParserStrategy, IValueStrategy } from '../../value-strategy/value-strategy.types'
import { IDrawerBaseInput } from '../drawer-base-input/drawer-base-input.types'
import { IFieldStateStyle } from '../field-state-style/field-state-style.types'
import { ToggleableStateType } from '../toggleable-base-element/toggleable-base-element'

/**
 * Should be the root base of a field's properties
 */
export interface IField extends IFieldDescriptor {
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

    /** Dependency accessors */
    dom: () => IDommable<HTMLInputElement>
    notifier: () => INotifiableEntity
    drawer: () => IDrawerBaseInput
    style: () => IFieldStateStyle
    track: () => ITracker
    validationStrategy: () => IValidationStrategy
    valueStrategy: () => IValueStrategy
}

export interface IFieldExtensions {
    [key: string]: any
    /** dependencies */
    _dom: IDommable<HTMLInputElement>
    _drawer: IDrawerBaseInput
    _style: IFieldStateStyle
    _notifier: INotifiableEntity
    _tracker: ITracker
    _validation: IValidationStrategy
    _value: IValueStrategy
}

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

/** @warning: should not being used outside it's main implementation prefer the use of @Ifield */
export type IFieldInput = IFieldBaseInput & Omit<IFieldDescriptor, 'validationOptions' | 'options'>

export interface IFieldBaseInput extends IField, IFieldExtensions {
    new (descriptor: IFieldDescriptor): IFieldBaseInput
    /** initializer builders */
    initializeFieldProperties: (descriptor: IFieldDescriptor) => void
    checkInitialized: () => boolean
}

export interface IFieldInputExtended extends IFieldBaseInput {
    valueStrategies: IParserStrategy<unknown>[]
    _field: IFieldInput
    field: () => IFieldInput
    options: IOptionItem[]
    optionsInitialized: boolean
    /** works with IOptionItem[] and fields of type select*/
    selectedOptionId: number | null
    checked?: boolean
    openState: ToggleableStateType

    getOptionByValue: (value: string) => IOptionItem | null
    tryGetOptionByIdOrValue: (id: string, value: string) => IOptionItem | null

    handleOnChanged: <T extends IEvents>(data?: T) => void
    handleOnClick: <T extends IEvents>(data?: T) => void

    getOptionById: (id: string) => IOptionItem | null
}
