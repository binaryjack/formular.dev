import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { IEvents } from '../../events/events.types'
import { IFieldInput } from '../field-base-input/field-input-base-types'

export type ITextInput = ITextBaseInput & IFieldInput

export interface ITextBaseInput {
    new (): ITextBaseInput

    initialize: (fieldInput: IFieldInput) => void
    ref: (ref: HTMLInputElement | null) => void
    register: () => void
    setValue: (value: IFValueTypes) => void
    getValue: () => IFValueTypes
    handleOnChanged: <T extends IEvents>(data?: T) => void
}
