import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { IEntityScheme } from '../../../dependency/schema/field-schema/field.schema.types'
import { INotifiableEntity } from '../../notifiable-entity/notifiable-entity-base.types'
import { IClickBasedInput } from '../click-based-input/click-based-input.types'
import { IDommable } from '../dommable/dommable.types'
import { IDrawerBase } from '../drawer-based-input/drawer-based-input'
import { IBaseEventsHanlders } from '../events/events.types'
import { IOptionBaseInput } from '../option-based-input/option-based-input'
import { ITracker } from '../tracker/tracker.types'
import { IValidable } from '../validation-strategy/validator.types'
import { IParserStrategy, IValueStrategy } from '../value-strategy/value-strategy.types'

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

export type IFieldInput = IFieldInputBase &
    IFieldDescriptor &
    IDommable<HTMLInputElement> &
    IValidable &
    IBaseEventsHanlders

export interface IFieldInputBase {
    new (descriptor: IFieldDescriptor, autoTracker?: INotifiableEntity): IFieldInput
    originalValue: FieldValuesTypes | null
    enabled: boolean
    _valueStrategy: IValueStrategy | null
    _notifier: INotifiableEntity | null
    _tracker: ITracker | null
    _drawer: IDrawerBase | null
    _optionBase: IOptionBaseInput | null
    _clickBased: IClickBasedInput | null

    intitialize: () => void
    setup: () => void

    initializeProperties: (descriptor: IFieldDescriptor) => void
    initializeValidation: (descriptor: IFieldDescriptor) => void
    initializeAutoTracker: (autoTracker?: INotifiableEntity) => void
    initializeValueStrategy: (...parsers: IParserStrategy<any>[]) => void

    hasChanges: (callback: () => void) => void
    setFocus: () => void
    setValue: (value: Omit<FieldValuesTypes, 'object' | 'INDate' | 'DateObject'> | null) => void
    getValue: () => FieldValuesTypes | null
    toString: () => string

    enable: (enabled: boolean) => void
    show: (show: boolean) => void
    clear: () => void
    register: () => object

    getAsString: () => string | null

    focus: () => void
}

export enum FieldTypesNamesEnum {
    // BOOLEAN TYPES
    CHECK = 'checkbox',
    BOOLEAN = 'boolean',
    TOGGLE = 'toggle',

    // STRING TYPES
    TEXT = 'text',
    STRING = 'string',
    TEXTAREA = 'textarea',

    // NUMBER TYPES
    SELECT = 'select',
    NUMBER = 'number',
    RADIO = 'radio',
    BIGINT = 'bigint',
    RANGE = 'range',

    // NUMBER TYPES
    DATETIME = 'datetime',
    DATE = 'time'
}

export const booleanTypes = [
    FieldTypesNamesEnum.BOOLEAN.toString(),
    FieldTypesNamesEnum.CHECK.toString(),
    FieldTypesNamesEnum.TOGGLE.toString()
]

export const stringTypes = [
    FieldTypesNamesEnum.TEXT.toString(),
    FieldTypesNamesEnum.STRING.toString(),
    FieldTypesNamesEnum.TEXTAREA.toString(),
    FieldTypesNamesEnum.RADIO.toString()
]

export const numberTypes = [
    FieldTypesNamesEnum.NUMBER.toString(),
    FieldTypesNamesEnum.BIGINT.toString(),
    FieldTypesNamesEnum.RANGE.toString()
]

export const optionBaseedNumericTypes = [FieldTypesNamesEnum.SELECT.toString()]

export const dateTypes = [
    FieldTypesNamesEnum.DATETIME.toString(),
    FieldTypesNamesEnum.DATE.toString()
]

export type fieldTypesConcatType =
    | typeof booleanTypes
    | typeof stringTypes
    | typeof numberTypes
    | typeof dateTypes
    | typeof optionBaseedNumericTypes
