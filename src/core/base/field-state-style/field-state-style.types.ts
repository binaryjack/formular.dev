import { IFieldInput } from '../abstract-base-input/field-input-base-types'
import { FieldInputStateType } from '../common.types'

export const defaultFieldInputCSSClassName = 'f-input'

export interface IFlags {
    state: FieldInputStateType
    value: string
}

export interface IFlagsObject {
    isDirty: boolean
    hasErrors: boolean
    isFocus: boolean
    isOpen: boolean
    isPristine: boolean
    isValid: boolean
    required: boolean
}

export const defaultFlagsObject: IFlagsObject = {
    isDirty: false,
    hasErrors: false,
    isFocus: false,
    isOpen: false,
    isPristine: true,
    isValid: true,
    required: false
}

export interface IFieldStateStyle {
    new (field: IFieldInput): IFieldStateStyle
    field: IFieldInput
    className: string
    fieldStateStyle: IFieldStateStyle
    classesList: Map<FieldInputStateType, string>
    update: (type: FieldInputStateType, state: boolean) => void
    get: () => string
    getFlagsList: () => IFlags[]
    getFlagsObject: () => IFlagsObject
    classNames: () => string
}
