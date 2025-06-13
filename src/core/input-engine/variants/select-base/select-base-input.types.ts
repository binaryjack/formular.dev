import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IEvents } from '@core/framework/events/events.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { ICustomHandler } from '@core/input-engine/core/dom-registers-builder/dom-registers-builder'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { IClickBaseInput } from '../click-base/click-base-input.types'
import { IOptionBaseInput } from '../option-based/option-base-input.types'

export const SSelectBaseInput = Symbol.for('ISelectBaseInput')

export interface ISelectBaseInputProperties {
    optionBase: IOptionBaseInput
    clickBase: IClickBaseInput
}

export interface ISelectBaseInput extends ISelectBaseInputProperties, IExtendedInputBase {
    new (): ISelectBaseInput

    handleOnChanged: <T extends IEvents>(data?: T) => void
    handleOnSelected: <T extends IEvents>(data?: T) => void
    handleOnClear: <T extends IEvents>(data?: T) => void

    ref: (ref: HTMLInputElement | null) => void
    register: (...customHandlers: ICustomHandler[]) => Partial<HTMLInputElement>

    clear: () => void

    onSelectItem: (option: IOptionItem) => void
    setValue: (value: InputDataTypes | null) => void
    getValue: () => InputDataTypes
}
