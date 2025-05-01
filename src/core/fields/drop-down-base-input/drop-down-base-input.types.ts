import { IOptionItem } from '@dependency/schema/options-schema/options.scheme.types'
import { IEvents } from '../../events/events.types'
import { IOptionInput } from '../option-based-input/option-base-input.types'

export type IDropDownInput = IDropDownBaseInput & IOptionInput

export interface IDropDownBaseInput {
    new (): IDropDownBaseInput

    initialize: (optionInput: IOptionInput) => void

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

    /** willl be moved to radio kind of input */
    registerLabel: (optionId: string) => Partial<HTMLInputElement>
}
