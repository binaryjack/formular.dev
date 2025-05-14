import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IExtendedInputBase, IInput } from '@core/input-engine/core/input-base/input-base.types'

export type TParser<TOut> = (field: IInput, value: Partial<InputDataTypes> | null) => TOut | null

export type FieldValuePropertyType = 'value' | 'id' | 'selectedOptionId'

export interface IParserStrategy<TOut> {
    id: string
    concernedTypes: string[]
    fieldValueProperty: FieldValuePropertyType
    /** From model IInput.value / .checked / .other .. To Value */
    methodOut: TParser<TOut>
    /** To model IInput.value / .checked / .other ..   */
    methodIn: TParser<TOut>
}

export const setParserStrategy = <TOut>(
    id: string,
    concernedTypes: string[],
    fieldValueProperty: FieldValuePropertyType,
    methodOut: TParser<TOut>,
    methodIn: TParser<TOut>
): IParserStrategy<TOut> => {
    return {
        id,
        concernedTypes,
        fieldValueProperty,
        methodOut,
        methodIn
    }
}

export interface IValueManagerProperties {
    valueStrategies: IParserStrategy<unknown>[]
}

export interface IValueManager extends IValueManagerProperties, IExtendedInputBase {
    new (): IValueManager
    acceptValueStrategies: (...parsers: IParserStrategy<any>[]) => void
    addValueStrategies: (...parsers: IParserStrategy<any>[]) => void
    getAsString: (field: IInput) => string | null
    setValue: (field: IInput, value: Partial<InputDataTypes> | null) => void
    getValue: (field: IInput) => Partial<InputDataTypes> | null
}
