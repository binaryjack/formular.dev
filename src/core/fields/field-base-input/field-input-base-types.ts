import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'

import { IFieldDescriptor } from '@dependency/schema/descriptor/field.descriptor'
import { IEntityScheme } from '@dependency/schema/field-schema/field.schema.types'

import { IDommable } from '@core/dommable/dommable.types'

import { ITracker, ITrackingOutputProvider, TrackingType } from '@core/tracker/tracker.types'
import {
    IValidationMethodStrategy,
    IValidationStrategy
} from '@core/validation-strategy/validation-strategy.types'
import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { IOptionItem } from '@dependency/schema/options-schema/options.scheme.types'
import { IEvents } from '../../events/events.types'
import { IParserStrategy, IValueStrategy } from '../../value-strategy/value-strategy.types'
import { IClickInput } from '../click-base-input/click-base-input.types'
import { IDrawerInput } from '../drawer-base-input/drawer-base-input.types'
import { IFieldStateStyle } from '../field-state-style/field-state-style.types'
import { IOptionBaseInput } from '../option-based-input/option-base-input.types'

export interface IBaseField {
    [key: string]: any
    id: number
    name: string
    label?: string
    value: any
    defaultValue?: any
    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean

    /** Dependency accessors */
    dom?: () => IDommable<HTMLInputElement> | undefined
    notifier?: () => INotifiableEntity | undefined
    style?: () => IFieldStateStyle | undefined
    track?: () => ITracker | undefined
    validationStrategy?: () => IValidationStrategy | undefined
    valueStrategy?: () => IValueStrategy | undefined

    /** Core methods */
    setValue: (value: any) => void
    getValue: () => any
    setFocus: () => void
    clear: () => void
    enable: (enabled: boolean) => void
    hasChanges: (callback: () => void) => void
    handleValidation: <T extends IEvents>(event?: T) => void
}

export type IInitializerType = IFieldInputBase | IOptionBaseInput | IFieldInput | IClickInput

export interface IFieldInputExtended<Tfi extends IBaseField> {
    id: number
    name: string

    optionsInitialized: boolean
    options: IOptionItem[]
    /** works with IOptionItem[] and fields of type select*/
    selectedOptionId: number | null

    _field: Tfi
    field: () => Tfi

    hasChange: (callback: () => void) => void
    handleOnBlur: <T extends IEvents>(data?: T) => void
    handleOnFocus: <T extends IEvents>(data?: T) => void
    handleOnClear: <T extends IEvents>(data?: T) => void
    handleOnChanged: <T extends IEvents>(data?: T) => void
    handleOnClick: <T extends IEvents>(data?: T) => void
    handleValidation: <T extends IEvents>(event?: T) => void
    getOptionById: (id: string) => IOptionItem | null
}

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor
/** @warning: should not being used outside it's main implementation prefer the use of @Ifield */
export type IFieldInput = IFieldInputBase & Omit<IFieldDescriptor, 'validationOptions' | 'options'>

export interface IField
    extends Omit<
        IFieldInput,
        '_dom' | '_drawer' | '_style' | '_notifier' | '_tracker' | '_validation' | '_value'
    > {
    new (descriptor: IFieldDescriptor): IField
}

export interface IFieldInputBase extends IBaseField {
    new (descriptor: IFieldDescriptor): IFieldInput

    originalValue: IFValueTypes
    enabled: boolean

    /** dependencies */
    _dom?: IDommable<HTMLInputElement>
    _drawer?: IDrawerInput
    _style?: IFieldStateStyle
    _notifier?: INotifiableEntity
    _tracker?: ITracker
    _validation?: IValidationStrategy
    _value?: IValueStrategy
    /** message helper method : uses treacker and fallbacks to console */
    message: (type: TrackingType, source: string, message: string) => void
    /** Dependency accessors */
    dom(): IDommable<HTMLInputElement> | undefined
    notifier: () => INotifiableEntity | undefined
    drawer: () => IDrawerInput | undefined
    style: () => IFieldStateStyle | undefined
    track: () => ITracker | undefined
    validationStrategy: () => IValidationStrategy | undefined
    valueStrategy: () => IValueStrategy | undefined

    setValue: (value: IFValueTypes) => void
    getValue: () => IFValueTypes

    initializeFieldProperties: (descriptor: IFieldDescriptor) => void
    /** initializer builders */
    initializeEvents: () => IFieldInput
    initializeDommable: () => IFieldInput
    initializeTracking: (providers?: ITrackingOutputProvider[]) => IFieldInput
    initializeValueStrategy: (...parsers: IParserStrategy<any>[]) => IFieldInput
    initializeValidationStrategy: (...parsers: IValidationMethodStrategy[]) => IFieldInput
    initializeDrawerableState: () => IFieldInput
    initializeStyle: () => IFieldInput

    /** Events */
    setFocus: () => void
    enable: (enabled: boolean) => void
    show: (show: boolean) => void
    clear: () => void
    focus: () => void

    /** Event handlers */
    hasChanges: (callback: () => void) => void
    handleOnBlur: <T extends IEvents>(data?: T) => void
    handleOnFocus: <T extends IEvents>(data?: T) => void
    handleOnClear: <T extends IEvents>(data?: T) => void
    handleValidation: <T extends IEvents>(event?: T) => void
}
