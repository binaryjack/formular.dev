import { IConstructor } from '@core/fields/field-base-input/constructors/constructors'
import { IExtendedInputBase } from '@core/fields/field-base-input/field-input-base-types'
import { FieldDataTypes } from '@core/framework/common/common.field.data.types'

export type TParser<TOut> = (value: Partial<FieldDataTypes>) => TOut | null

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

export interface IValueStrategyProperties {
    valueStrategies: IParserStrategy<unknown>[]
}

export interface IValueStrategy extends IValueStrategyProperties, IExtendedInputBase {
    new (constructor: IConstructor): IValueStrategy

    initialize: () => void
    acceptValueStrategies: (...parsers: IParserStrategy<any>[]) => void
    addValueStrategies: (...parsers: IParserStrategy<any>[]) => void
    getAsString: () => string | null
    setValue: (value: FieldDataTypes) => void
    getValue: () => FieldDataTypes
    setValueCheckBox: (value: boolean) => void
    setValueSelect: (value: string) => void
    setValueText: (value: string) => void
    setValueRadio: (value: string) => void
}
