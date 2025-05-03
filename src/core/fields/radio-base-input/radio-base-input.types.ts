import { IOptionItem } from '@dependency/schema/options-schema/options.scheme.types'
import { IEvents } from '../../events/events.types'
import { IClickInput } from '../click-base-input/click-base-input.types'
import {
    IBaseField,
    IFieldInput,
    IFieldInputExtended
} from '../field-base-input/field-input-base-types'
import { IOptionInput } from '../option-based-input/option-base-input.types'

export type IRadioCombinedBaseInput = IOptionInput & IFieldInput & IClickInput

export interface IRadioInput extends IFieldInputExtended<IBaseField> {
    new (): IRadioInput
    _field: IRadioCombinedBaseInput
    field: () => IRadioCombinedBaseInput
    initialize: (fieldInput: IRadioCombinedBaseInput) => void
    handleOnChanged: <T extends IEvents>(data?: T) => void

    ref: (ref: HTMLInputElement | null) => void
    register: () => Partial<HTMLInputElement>

    refOption: (ref: HTMLInputElement | null) => void
    registerOption: () => Partial<HTMLInputElement>
    registerLabel: (optionId: string) => Partial<HTMLInputElement>

    setValue: (value: IOptionItem | string | number | null) => void
    getValue: () => unknown | null
}
