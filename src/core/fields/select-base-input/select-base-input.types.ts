import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IEvents } from '../../events/events.types'
import { IClickBaseInput } from '../click-base-input/click-base-input.types'
import { IExtendedInputBase } from '../field-base-input/field-input-base-types'
import { IOptionBaseInput } from '../option-based-input/option-base-input.types'

export interface ISelectBaseInputProperties {
    optionBase: IOptionBaseInput
    clickBase: IClickBaseInput
}

export interface ISelectBaseInput extends ISelectBaseInputProperties, IExtendedInputBase {
    new (): ISelectBaseInput

    handleOnChanged: <T extends IEvents>(data?: T) => void
    handleOnClick: <T extends IEvents>(data?: T) => void
    handleOnSelected: <T extends IEvents>(data?: T) => void

    ref: (ref: HTMLInputElement | null) => void
    register: () => Partial<HTMLInputElement>

    refOption: (ref: HTMLInputElement | null) => void
    registerOption: () => Partial<HTMLInputElement>

    onSelectItem: (option: IOptionItem) => void
    setValue: (value: FieldDataTypes | null) => void
    getValue: () => FieldDataTypes
}
