import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldInputBase } from '../fieldInputBase/fieldInputBase.types'

export type TParserStrategy<TOut> = (value: Partial<FieldValuesTypes>) => TOut | null

export interface IParser<TOut> {
    id: string
    concernedTypes: string[]
    method: TParserStrategy<TOut>
}

export const setParser = <TOut>(
    id: string,
    concernedTypes: string[],
    method: TParserStrategy<TOut>
): IParser<TOut> => {
    return {
        id,
        concernedTypes,
        method
    }
}

export interface IValueStrategy {
    new (...parser: IParser<any>[]): IValueStrategy
    parsers: IParser<unknown>[]
    addStrategy: (...parser: IParser<any>[]) => void
    getValue: (field: IFieldInputBase) => unknown | null
}
