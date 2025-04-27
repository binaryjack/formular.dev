import { IDrawerBase } from '../../../components/drawer/drawer.types'
import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { IEntityScheme } from '../../../dependency/schema/field-schema/field.schema.types'
import { IOptionItem } from '../../../dependency/schema/options-schema/options.scheme.types'
import { INotifiableEntity } from '../../notifiable-entity/notifiable-entity-base.types'
import { TNotifierEventsType } from '../../notifiable-entity/notifications.types'
import { IDommable } from '../dommable/dommable.types'
import { IEventsHanlders } from '../events/events.types'
import { IFieldStateStyle, IFlagsObject } from '../field-state-style/field-state-style.types'
import { ITriggerableNotifiableEntity } from '../hybrid-types/hybrid.types'
import { ITracker } from '../tracker/tracker.types'
import {
    IValidable,
    IValidableField,
    ValidationTriggerModeType
} from '../validation-strategy/validator.types'
import { IValueStrategy } from '../value-strategy/value-strategy.types'

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

export type IFieldInput = IFieldInputBase &
    IDommable<HTMLInputElement> &
    IFieldDescriptor &
    INotifiableEntity &
    IDrawerBase &
    IValidable &
    IValidableField &
    IEventsHanlders &
    ITriggerableNotifiableEntity &
    ITracker

export interface IFieldInputBase {
    new (descriptor: IFieldDescriptor, autoTracker?: INotifiableEntity): IFieldInput
    optionsInitialized: boolean
    internalHTMLElementRef: HTMLInputElement[] | null
    originalValue: FieldValuesTypes | null
    enabled: boolean
    fieldStateStyle: IFieldStateStyle
    className: string
    valueStrategy: IValueStrategy | null
    checked?: boolean
    /** works with IOptionItem[] and fields of type select*/
    selectedOptionId: number | null
    setup: () => void
    initializeProperties: (descriptor: IFieldDescriptor) => void
    initializeValidation: (descriptor: IFieldDescriptor) => void
    initializeAutoTracker: (autoTracker?: INotifiableEntity) => void
    initializeValueStrategy: () => void
    initializeNotifier: () => (
        this: IFieldInput,
        type: TNotifierEventsType,
        fieldState: string,
        trigger: ValidationTriggerModeType
    ) => void
    classNames: () => string
    getFlagsObject: () => IFlagsObject
    hasChanges: (callback: () => void) => void
    setFocus: () => void
    setValue: (value: Omit<FieldValuesTypes, 'object' | 'INDate' | 'DateObject'> | null) => void
    getValue: () => FieldValuesTypes | null
    toString: () => string
    getSelectedValue: () => string | undefined
    enable: (enabled: boolean) => void
    show: (show: boolean) => void
    clear: () => void
    register: () => object
    registerOption: () => object | null
    registerLabel: (optionId: string) => object
    ref: (o: HTMLInputElement | null) => void
    refOption: (o: HTMLInputElement | null) => void
    getAsString: () => string | null
    onSelectItem: (option: IOptionItem) => void
    getOptionByValue: (value: string) => IOptionItem | null
    getOptionById: (id: string) => IOptionItem | null
    getOptionBySequenceId: (sequenceId: number) => IOptionItem | null
    tryGetOptionByIdOrValue: (id: string, value: string) => IOptionItem | null
    tryGetOptionBySequenceIdThenIdOrValue: (
        sequenceId: number,
        id: string,
        value: string
    ) => IOptionItem | null
    checkOptionsInitialized: () => boolean
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
