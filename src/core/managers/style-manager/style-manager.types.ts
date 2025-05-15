import {
    InputClassStatesNamesType,
    InputClassStatesValuesEnum
} from '@core/framework/common/common.input.state.types'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'

export const defaultFieldInputCSSClassName = 'f-input'

export interface IFlags {
    state: InputClassStatesNamesType
    value: InputClassStatesValuesEnum
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
    classesList: Map<InputClassStatesNamesType, InputClassStatesValuesEnum>
}

export interface IStyleManager extends IFieldStyleProperties, IExtendedInputBase {
    new (): IStyleManager
    update: (type: InputClassStatesNamesType, state: boolean) => void
    get: (state: InputClassStatesNamesType) => string
    getFlagsList: () => IFlags[]
    getFlagsObject: () => IFieldStateFlags
    classNames: () => string
}
