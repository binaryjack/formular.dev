import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'

import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'

import { IDommable } from '@core/dommable/dommable.types'

import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { ITracker, TrackingType } from '@core/tracker/tracker.types'
import { IValidationStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IEvents } from '../../events/events.types'
import { IValueStrategy, IValueStrategyProperties } from '../../value-strategy/value-strategy.types'
import { ICheckBoxBaseInputProperties } from '../check-box-base-input/check-box-base-input.types'
import { IClickBaseInputProperties } from '../click-base-input/click-base-input.types'
import {
    IDrawerBaseInput,
    IDrawerBaseInputProperties
} from '../drawer-base-input/drawer-base-input.types'
import {
    IFieldStateStyle,
    IFieldStateStyleProperties
} from '../field-state-style/field-state-style.types'
import { IOptionBaseInputProperties } from '../option-based-input/option-base-input.types'
import { IRadioBaseInputProperties } from '../radio-base-input/radio-base-input.types'
import { ISelectBaseInputProperties } from '../select-base-input/select-base-input.types'
import { ITextBaseInput } from '../text-base-input/text-base-input.types'
import { IInitilizationCheckResult } from './prototype/check-initialized'

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
    dom: IDommable<HTMLInputElement>
    drawer: IDrawerBaseInput
    styler: IFieldStateStyle
    notifier: INotifiableEntity
    tracker: ITracker
    validationStrategy: IValidationStrategy
    valueStrategy: IValueStrategy
}

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

/** @warning: should not being used outside it's main implementation prefer the use of @Ifield */
export type IFieldInput = IFieldBaseInput & Omit<IFieldDescriptor, 'validationOptions' | 'options'>

export interface IFieldBaseInput extends IField, IInitializableDependency {
    new (descriptor: IFieldDescriptor): IFieldBaseInput

    /** initializer builders */
    initializeProperties: (descriptor: IFieldDescriptor) => void
    checkInitialized: () => IInitilizationCheckResult
    useDommable: (dommableInstance?: IDommable<HTMLInputElement>) => IFieldBaseInput
    useNotifier: (notifierInstance?: INotifiableEntity) => IFieldBaseInput
    useTracking: (trackerInstance?: ITracker) => IFieldBaseInput
    useValueStrategy: (valueStrategyInstance?: IValueStrategy) => IFieldBaseInput
    useValidationStrategy: (validationStrategyInstance?: IValidationStrategy) => IFieldBaseInput
    useDrawerableState: (drawerableInstance?: IDrawerBaseInput) => IFieldBaseInput
    useStyler: (stylerInstance?: IFieldStateStyle) => IFieldBaseInput
}

export interface IExtendedInputBase extends IInitializableDependency {
    field: IFieldBaseInput
}

export interface IInitializableDependency {
    /*Discriminator Property*/
    dependencyName: string
    /** says if the dependency has been initialized */
    isInitialized: boolean
    /** initializes the dependency */
    initialize: (params: IFieldInitializationParameters) => void
}

export interface IExtendedFieldInput
    extends IFieldStateStyleProperties,
        IOptionBaseInputProperties,
        IDrawerBaseInputProperties,
        IClickBaseInputProperties,
        ICheckBoxBaseInputProperties,
        IRadioBaseInputProperties,
        ISelectBaseInputProperties,
        IValueStrategyProperties,
        ITextBaseInput,
        IExtendedInputBase,
        IInitializableDependency {
    // getOptionByValue: (value: string) => IOptionItem | null
    // tryGetOptionByIdOrValue: (id: string, value: string) => IOptionItem | null
    // handleOnChanged: <T extends IEvents>(data?: T) => void
    // handleOnClick: <T extends IEvents>(data?: T) => void
    // getOptionById: (id: string) => IOptionItem | null
}

const i: IExtendedFieldInput = {} as IExtendedFieldInput
