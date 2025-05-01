import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { IEvents } from '../../events/events.types'
import { IClickBaseInput } from '../click-base-input/click-base-input.types'
import { IFieldInput } from '../field-base-input/field-input-base-types'

export type ICheckBoxInput = ICheckBoxBaseInput & IClickBaseInput & IFieldInput

export interface ICheckBoxBaseInput {
    new (): ICheckBoxBaseInput

    initialize: (fieldInput: IFieldInput) => void
    ref: (ref: HTMLInputElement | null) => void
    register: () => void
    setValue: (value: IFValueTypes) => void
    getValue: () => IFValueTypes
    handleOnChanged: <T extends IEvents>(data?: T) => void
}
