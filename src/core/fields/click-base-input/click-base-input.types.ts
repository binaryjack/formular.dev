import { IEvents } from '../../events/events.types'
import { IFieldInput } from '../field-base-input/field-input-base-types'
import { IOptionInput } from '../option-based-input/option-base-input.types'

export type IClickInput = IClickBaseInput & IOptionInput

export interface IClickBaseInput {
    new (): IClickBaseInput
    checked?: boolean
    initializeInputBased: (fieldInput: IFieldInput) => void
    initializeOptionsBased: (fieldInput: IFieldInput) => void
    handleOnClicked: <T extends IEvents>(this: IClickBaseInput, data?: T) => void
}
