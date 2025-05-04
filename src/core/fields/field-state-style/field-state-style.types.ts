import { FieldInputStateType } from '@core/framework/common/common.input.state.types'
import {
    IBaseField,
    IFieldInput,
    IFieldInputExtended
} from '../field-base-input/field-input-base-types'

export const defaultFieldInputCSSClassName = 'f-input'

export interface IFlags {
    state: FieldInputStateType
    value: string
}

export interface IStateFlags {
    isDirty: boolean
    hasErrors: boolean
    isFocus: boolean
    isOpen: boolean
    isPristine: boolean
    isValid: boolean
    required: boolean
}

export const defaultFlagsObject: IStateFlags = {
    isDirty: false,
    hasErrors: false,
    isFocus: false,
    isOpen: false,
    isPristine: true,
    isValid: true,
    required: false
}

export interface IFieldStateStyle extends IFieldInputExtended<IBaseField> {
    new (field: IFieldInput): IFieldStateStyle
    _field: IFieldInput
    field: () => IFieldInput
    className: string
    fieldStateStyle: IFieldStateStyle
    classesList: Map<FieldInputStateType, string>
    initialize: (fieldInput: IFieldInput) => void
    update: (type: FieldInputStateType, state: boolean) => void
    get: () => string
    getFlagsList: () => IFlags[]
    getFlagsObject: () => IStateFlags
    classNames: () => string
}
