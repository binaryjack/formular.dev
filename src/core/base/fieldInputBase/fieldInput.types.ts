import { IDrawerBase } from '../../../components/drawer/Drawer.types'
import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { IEntityScheme } from '../../../dependency/schema/fieldSchema/field.schema.types'
import { IOptionItem } from '../../../dependency/schema/optionsSchema/options.scheme.types'
import { INotifiableEntity } from '../../notifiableEntity/notifiableEntityBase.types'
import { TNotifierEventsType } from '../../notifications/notifications.types'
import { IDommable } from '../dommable/dommable.types'
import { IEventsHanlders } from '../events/events.types'
import { IFieldStateStyle, IFlagsObject } from '../fieldStateStyle/fieldStateStyle.types'
import { ITriggerableNotifiableEntity } from '../hybridTypes/hybrid.types'
import { ITracker } from '../tracker/tracker.types'
import {
    IValidable,
    IValidableField,
    ValidationTriggerModeType
} from '../validatiors/validator.types'
import { IValueStrategy } from '../valueStrategy/valueStrategy.types'

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
    new (descriptor: IFieldDescriptor): IFieldInput
    optionsInitialized: boolean
    internalHTMLElementRef: HTMLInputElement[] | null
    originalValue: FieldValuesTypes | null
    enabled: boolean
    fieldStateStyle: IFieldStateStyle
    className: string
    valueStrategy: IValueStrategy | null
    checked?: boolean
    /** works with IOptionItem[] and fields of type select*/
    selectedOptionId?: string
    setup: () => void
    initializeProperties: (descriptor: IFieldDescriptor) => void
    initializeValidation: (descriptor: IFieldDescriptor) => void
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
    getSelectedValue: () => string | undefined
    enable: (enabled: boolean) => void
    show: (show: boolean) => void
    clear: () => void
    register: () => object
    registerOption: () => object | null
    registerLabel: (refHtmlFor: HTMLInputElement) => object
    ref: (o: HTMLInputElement | null) => void
    refOption: (o: HTMLInputElement | null) => void
    getAsString: () => string | null
    onSelectItem: (option: IOptionItem) => void
    getOptionByValue: (value: string) => IOptionItem | null
    getOptionById: (id: string) => IOptionItem | null
    tryGetOptionByIdOrValue: (id: string, value: string) => IOptionItem | null
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
    FieldTypesNamesEnum.SELECT.toString(),
    FieldTypesNamesEnum.NUMBER.toString(),
    FieldTypesNamesEnum.BIGINT.toString(),
    FieldTypesNamesEnum.RANGE.toString()
]

export const dateTypes = [
    FieldTypesNamesEnum.DATETIME.toString(),
    FieldTypesNamesEnum.DATE.toString()
]

export type fieldTypesConcatType =
    | typeof booleanTypes
    | typeof stringTypes
    | typeof numberTypes
    | typeof dateTypes
