import { FieldInputStateType } from '@core/framework/common/common.input.state.types'
import { IConstructor } from '../field-base-input/constructors/constructors'
import { IExtendedInputBase } from '../field-base-input/field-input-base-types'

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

export interface IFieldStateStyleProperties {
    className: string
    classesList: Map<FieldInputStateType, string>
}

export interface IFieldStateStyle extends IFieldStateStyleProperties, IExtendedInputBase {
    new (constructor: IConstructor): IFieldStateStyle
    initialize: () => void
    update: (type: FieldInputStateType, state: boolean) => void
    get: () => string
    getFlagsList: () => IFlags[]
    getFlagsObject: () => IStateFlags
    classNames: () => string
}
