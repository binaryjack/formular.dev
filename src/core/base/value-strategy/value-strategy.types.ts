import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldInputBase } from '../field-input-base/field-input.types'

export type TParser<TOut> = (value: Partial<FieldValuesTypes>) => TOut | null

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

export interface IValueStrategy {
    new (...parser: IParserStrategy<any>[]): IValueStrategy
    strategies: IParserStrategy<unknown>[]
    addStrategy: (...strategies: IParserStrategy<any>[]) => void
    getValue: (field: IFieldInputBase) => unknown | null
}
