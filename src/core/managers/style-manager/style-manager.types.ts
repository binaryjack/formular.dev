import { FieldInputStateType } from '@core/framework/common/common.input.state.types'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'

export const defaultFieldInputCSSClassName = 'f-input'

export interface IFlags {
    state: FieldInputStateType
    value: string
}

export interface IFieldStateFlags {
    isDirty: boolean
    hasErrors: boolean
    isFocus: boolean
    isOpen: boolean
    isPristine: boolean
    isValid: boolean
    required: boolean
}

export const defaultFieldStateFlags: IFieldStateFlags = {
    isDirty: false,
    hasErrors: false,
    isFocus: false,
    isOpen: false,
    isPristine: true,
    isValid: true,
    required: false
}

export interface IFieldStyleProperties {
    className: string
    classesList: Map<FieldInputStateType, string>
}

export interface IStyleManager extends IFieldStyleProperties, IExtendedInputBase {
    new (): IStyleManager
    update: (type: FieldInputStateType, state: boolean) => void
    get: () => string
    getFlagsList: () => IFlags[]
    getFlagsObject: () => IFieldStateFlags
    classNames: () => string
}
