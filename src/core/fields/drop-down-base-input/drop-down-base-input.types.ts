import { IOptionItem } from '@dependency/schema/options-schema/options.scheme.types'
import { IEvents } from '../../events/events.types'
import { IClickInput } from '../click-base-input/click-base-input.types'
import { IFieldInput, IFieldInputExtended } from '../field-base-input/field-input-base-types'
import { IOptionInput } from '../option-based-input/option-base-input.types'

export type IDropDownInput = IDropDownBaseInput & IOptionInput & IClickInput

export interface IDropDownBaseInput extends IFieldInputExtended<IFieldInput> {
    new (): IDropDownBaseInput
    _field: IDropDownInput
    field: () => IDropDownInput

    initialize: (fieldInput: IFieldInput) => void

    handleOnChanged: <T extends IEvents>(data?: T) => void
    handleOnClick: <T extends IEvents>(data?: T) => void
    handleOnSelected: <T extends IEvents>(data?: T) => void

    ref: (ref: HTMLInputElement | null) => void
    register: () => Partial<HTMLInputElement>

    refOption: (ref: HTMLInputElement | null) => void
    registerOption: () => Partial<HTMLInputElement>

    onSelectItem: (option: IOptionItem) => void
    setValue: (value: IOptionItem | string | number | null) => void
    getValue: () => unknown | null
}
