import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IEvents } from '@core/framework/events/events.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { IClickBaseInput } from '../click-base/click-base-input.types'
import { IOptionBaseInput } from '../option-based/option-base-input.types'

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
    register: () => Partial<HTMLInputElement>

    refOption: (ref: HTMLInputElement | null) => void
    registerOption: () => Partial<HTMLInputElement>

    onSelectItem: (option: IOptionItem) => void
    setValue: (value: FieldDataTypes | null) => void
    getValue: () => FieldDataTypes
}
