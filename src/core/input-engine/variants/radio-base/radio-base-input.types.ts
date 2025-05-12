import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IEvents } from '@core/framework/events/events.types'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { IClickBaseInput } from '../click-base/click-base-input.types'
import { IOptionBaseInput } from '../option-based/option-base-input.types'

export interface IRadioBaseInputProperties {
    optionBase: IOptionBaseInput
    clickBase: IClickBaseInput
}

export interface IRadioBaseInput extends IRadioBaseInputProperties, IExtendedInputBase {
    new (): IRadioBaseInput

    handleOnChanged: <T extends IEvents>(data?: T) => void

    ref: (ref: HTMLInputElement | null) => void
    register: () => Partial<HTMLInputElement>

    refOption: (ref: HTMLInputElement | null) => void
    registerOption: () => Partial<HTMLInputElement>
    registerLabel: (optionId: string) => Partial<HTMLInputElement>

    setValue: (value: InputDataTypes) => void
    getValue: () => InputDataTypes
}
