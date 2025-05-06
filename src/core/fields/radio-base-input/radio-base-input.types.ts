import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IEvents } from '../../events/events.types'
import { IClickBaseInput } from '../click-base-input/click-base-input.types'
import { IConstructor } from '../field-base-input/constructors/constructors'
import { IExtendedInputBase } from '../field-base-input/field-input-base-types'
import { IOptionBaseInput } from '../option-based-input/option-base-input.types'

export interface IRadioBaseInputProperties {
    optionBase: IOptionBaseInput
    clickBase: IClickBaseInput
}

export interface IRadioBaseInput extends IRadioBaseInputProperties, IExtendedInputBase {
    new (constructor: IConstructor): IRadioBaseInput
    initialize: () => void
    handleOnChanged: <T extends IEvents>(data?: T) => void

    ref: (ref: HTMLInputElement | null) => void
    register: () => Partial<HTMLInputElement>

    refOption: (ref: HTMLInputElement | null) => void
    registerOption: () => Partial<HTMLInputElement>
    registerLabel: (optionId: string) => Partial<HTMLInputElement>

    setValue: (value: FieldDataTypes) => void
    getValue: () => FieldDataTypes
}
