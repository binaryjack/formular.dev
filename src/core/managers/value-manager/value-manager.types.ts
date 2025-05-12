import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'

export type TParser<TOut> = (value: Partial<InputDataTypes>) => TOut | null

export type FieldValuePropertyType = 'value' | 'id' | 'selectedOptionId'

export interface IParserStrategy<TOut> {
    id: string
    concernedTypes: string[]
    fieldValueProperty: FieldValuePropertyType
    method: TParser<TOut>
}

export const setParserStrategy = <TOut>(
    id: string,
    concernedTypes: string[],
    fieldValueProperty: FieldValuePropertyType,
    method: TParser<TOut>
): IParserStrategy<TOut> => {
    return {
        id,
        concernedTypes,
        fieldValueProperty,
        method
    }
}

export interface IValueManagerProperties {
    valueStrategies: IParserStrategy<unknown>[]
}

export interface IValueManager extends IValueManagerProperties, IExtendedInputBase {
    new (): IValueManager
    acceptValueStrategies: (...parsers: IParserStrategy<any>[]) => void
    addValueStrategies: (...parsers: IParserStrategy<any>[]) => void
    getAsString: () => string | null
    setValue: (value: InputDataTypes) => void
    getValue: () => InputDataTypes
    setValueCheckBox: (value: boolean) => void
    setValueSelect: (value: string) => void
    setValueText: (value: string) => void
    setValueRadio: (value: string) => void
}
