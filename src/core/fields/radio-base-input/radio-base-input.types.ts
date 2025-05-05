import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IEvents } from '../../events/events.types'
import { IClickBaseInput } from '../click-base-input/click-base-input.types'
import {
    IFieldBaseInput,
    IFieldInput,
    IFieldInputExtended
} from '../field-base-input/field-input-base-types'
import { IOptionInput } from '../option-based-input/option-base-input.types'

export type IRadioInput = IOptionInput & IFieldInput & IClickBaseInput

export interface IRadioBaseInput extends IFieldInputExtended {
    new (): IRadioBaseInput
    initialize: (fieldInput: IFieldBaseInput) => void
    handleOnChanged: <T extends IEvents>(data?: T) => void

    ref: (ref: HTMLInputElement | null) => void
    register: () => Partial<HTMLInputElement>

    refOption: (ref: HTMLInputElement | null) => void
    registerOption: () => Partial<HTMLInputElement>
    registerLabel: (optionId: string) => Partial<HTMLInputElement>

    setValue: (value: FieldDataTypes) => void
    getValue: () => FieldDataTypes
}
