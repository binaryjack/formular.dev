import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { IFieldInput } from '../fields/field-base-input/field-input-base-types'

export type TParser<TOut> = (value: Partial<IFValueTypes>) => TOut | null

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
    valueStrategies: IParserStrategy<unknown>[]
    acceptValueStrategies: (...parsers: IParserStrategy<any>[]) => void
    addValueStrategies: (...parsers: IParserStrategy<any>[]) => void
    getAsString: () => string | null
    setValue: (value: IFValueTypes) => void
    getValue: () => IFValueTypes
}
