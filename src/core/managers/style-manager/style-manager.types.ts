import {
    InputClassStatesNamesType,
    InputClassStatesValuesEnum
} from '@core/framework/common/common.input.state.types'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'

export const SStyleManager = Symbol.for('IStyleManager')

export const defaultFieldInputCSSClassName = 'f-input'

export interface IFieldStateFlags {
    dirty: boolean
    errors: boolean
    focus: boolean
    open: boolean
    pristine: boolean
    valid: boolean
    required: boolean
    busy: boolean
}

export const defaultFieldStateFlags: IFieldStateFlags = {
    dirty: false,
    errors: false,
    focus: false,
    open: false,
    pristine: true,
    valid: true,
    required: false,
    busy: false
}

export interface IFieldStyleProperties {
    className: string
    classesList: Map<InputClassStatesNamesType, InputClassStatesValuesEnum>
}

export interface IStyleManager extends IFieldStyleProperties, IExtendedInputBase {
    new (): IStyleManager
    update: (type: InputClassStatesNamesType, state: boolean) => void
    get: (state: InputClassStatesNamesType) => string
    getFlagsList: () => IFieldStateFlags[]
    getFlagsObject: () => IFieldStateFlags
    classNames: () => string
}
