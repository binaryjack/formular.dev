import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldInput } from '../abstract-base-input/field-input-base-types'

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
    new (field: IFieldInput): IValueStrategy
    field: IFieldInput
    strategies: IParserStrategy<unknown>[]
    accept: (...parsers: IParserStrategy<any>[]) => void
    addStrategy: (...strategies: IParserStrategy<any>[]) => void
    getAsString: () => string | null
    getValue: () => unknown | null
    toString: () => string
}
