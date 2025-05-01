import { IOptionItem } from '@dependency/schema/options-schema/options.scheme.types'
import { IEvents } from '../../events/events.types'
import { IClickInput } from '../click-base-input/click-base-input.types'
import { IFieldInput } from '../field-base-input/field-input-base-types'

export type IRadioInput = IRadioBaseInput & IClickInput

export interface IRadioBaseInput {
    new (): IRadioBaseInput

    initialize: (fieldInput: IFieldInput) => void
    handleOnChanged: <T extends IEvents>(data?: T) => void

    ref: (ref: HTMLInputElement | null) => void
    register: () => Partial<HTMLInputElement>

    refOption: (ref: HTMLInputElement | null) => void
    registerOption: () => Partial<HTMLInputElement>
    registerLabel: (optionId: string) => Partial<HTMLInputElement>

    setValue: (value: IOptionItem | string | number | null) => void
    getValue: () => unknown | null
}
