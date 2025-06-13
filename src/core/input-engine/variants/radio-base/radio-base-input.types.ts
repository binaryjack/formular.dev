import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IEvents } from '@core/framework/events/events.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { ICustomHandler } from '@core/input-engine/core/dom-registers-builder/dom-registers-builder'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { IClickBaseInput } from '../click-base/click-base-input.types'
import { IOptionBaseInput } from '../option-based/option-base-input.types'

export const SRadioBaseInput = Symbol.for('IRadioBaseInput')

export interface IRadioBaseInputProperties {
    optionBase: IOptionBaseInput
    clickBase: IClickBaseInput
}

export interface IRadioBaseInput extends IRadioBaseInputProperties, IExtendedInputBase {
    new (): IRadioBaseInput

    handleOnChanged: <T extends IEvents>(data?: T) => void

    ref: (ref: HTMLInputElement | null) => void
    register: (...customHandlers: ICustomHandler[]) => any

    refOption: (ref: HTMLInputElement | null) => void
    registerOption: (option: IOptionItem) => any
    registerLabel: (option: IOptionItem) => any

    setValue: (value: InputDataTypes) => void
    getValue: () => InputDataTypes
}
