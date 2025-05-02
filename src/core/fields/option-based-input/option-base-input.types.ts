import { IOptionItem } from '@dependency/schema/options-schema/options.scheme.types'
import { IFieldInput } from '../field-base-input/field-input-base-types'
import { IRadioCombinedBaseInput } from '../radio-base-input/radio-base-input.types'

export type IOptionInput = IOptionBaseInput & IFieldInput

export interface IOptionBaseInput {
    new (): IOptionBaseInput
    _field: IRadioCombinedBaseInput
    field: () => IRadioCombinedBaseInput

    optionsInitialized: boolean
    options: IOptionItem[]
    /** works with IOptionItem[] and fields of type select*/
    selectedOptionId: number | null

    initialize: (fieldInput: IRadioCombinedBaseInput) => void
    checkOptionsInitialized: () => boolean

    getOptionByValue: (value: string) => IOptionItem | null
    getOptionById: (id: string) => IOptionItem | null
    getOptionBySequenceId: (sequenceId: number) => IOptionItem | null
    tryGetOptionByIdOrValue: (id: string, value: string) => IOptionItem | null
    tryGetOptionBySequenceIdThenIdOrValue: (
        sequenceId: number,
        id: string,
        value: string
    ) => IOptionItem | null
    getSelectedValue: () => string | undefined

    /** to move to specifics*/
}
