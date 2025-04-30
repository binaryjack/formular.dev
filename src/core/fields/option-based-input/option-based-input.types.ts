import { IOptionItem } from '@dependency/schema/options-schema/options.scheme.types'
import { IEvents } from '../../events/events.types'
import { IFieldInput } from '../field-base-input/field-input-base-types'

export interface IOptionBaseInput {
    new (field: IFieldInput): IOptionBaseInput
    field: IFieldInput
    optionsInitialized: boolean
    /** works with IOptionItem[] and fields of type select*/
    selectedOptionId: number | null
    onSelectItem: (option: IOptionItem) => void
    checkOptionsInitialized: () => boolean

    register: () => object | null
    registerLabel: (optionId: string) => object
    refOption: (o: HTMLInputElement | null) => void

    setValue: (value: IOptionItem | string | number | null) => void
    getValue: () => string | undefined
    getSelectedValue: () => string | undefined
    handleOnSelected: <T extends IEvents>(data?: T) => void
    getOptionByValue: (value: string) => IOptionItem | null
    getOptionById: (id: string) => IOptionItem | null
    getOptionBySequenceId: (sequenceId: number) => IOptionItem | null
    tryGetOptionByIdOrValue: (id: string, value: string) => IOptionItem | null
    tryGetOptionBySequenceIdThenIdOrValue: (
        sequenceId: number,
        id: string,
        value: string
    ) => IOptionItem | null
}
