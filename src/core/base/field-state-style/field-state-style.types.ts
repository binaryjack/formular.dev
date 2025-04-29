import { FieldInputStateType } from '../common.types'

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
    new (): IFieldStateStyle
    className: string
    fieldStateStyle: IFieldStateStyle
    classesList: Map<FieldInputStateType, string>
    update: (type: FieldInputStateType, state: boolean) => void
    get: () => string
    getFlagsList: () => IFlags[]
    getFlagsObject: () => IFlagsObject
    classNames: () => string
}
