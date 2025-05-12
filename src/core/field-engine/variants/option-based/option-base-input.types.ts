import { IExtendedInputBase, IInput } from '@core/field-engine/core/input-base/input-base.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IClickBaseInput } from '../click-base/click-base-input.types'

export type IOptionInput = IOptionBaseInput & IClickBaseInput & IInput

export interface IOptionBaseInputProperties {
    optionsInitialized: boolean
    options: IOptionItem[]
    /** works with IOptionItem[] and fields of type select*/
    selectedOptionId: number | null
}

export interface IOptionBaseInput extends IOptionBaseInputProperties, IExtendedInputBase {
    new (): IOptionBaseInput

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
}
