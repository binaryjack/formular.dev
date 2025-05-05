import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IClickBaseInput } from '../click-base-input/click-base-input.types'
import {
    IFieldBaseInput,
    IFieldInput,
    IFieldInputExtended
} from '../field-base-input/field-input-base-types'

export type IOptionInput = IOptionBaseInput & IClickBaseInput & IFieldInput

export interface IOptionBaseInput extends IFieldInputExtended {
    new (): IOptionBaseInput

    optionsInitialized: boolean
    options: IOptionItem[]
    /** works with IOptionItem[] and fields of type select*/
    selectedOptionId: number | null

    initialize: (fieldInput: IFieldBaseInput) => void
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
