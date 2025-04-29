import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldInput } from '../abstract-base-input/field-input-base-types'

import { IParserStrategy, IValueStrategy } from './value-strategy.types'

export const ValueStrategy = function (
    this: IValueStrategy,
    ...strategies: IParserStrategy<any>[]
) {
    this.strategies = strategies
} as any as IValueStrategy

ValueStrategy.prototype = {
    addStrategy: function (...parsers: IParserStrategy<any>[]) {
        for (const parser of parsers) {
            if (this.strategies.find((o: IParserStrategy<unknown>) => o.id === parser.id)) continue
            this.parsers.push(parser)
        }
    },
    /** Factory method that returns a value from field according the predefined strategy regarding the field type. */
    getValue: function (field: IFieldInput) {
        const strategy = this.strategies.find((o: IParserStrategy<unknown>) =>
            o.concernedTypes.includes(field.type)
        ) as IParserStrategy<unknown>
        if (!strategy) {
            console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${field.type} `)
            return
        }
        try {
            /** Factory */
            switch (strategy.fieldValueProperty) {
                case 'id':
                    return strategy.method(field.id as FieldValuesTypes)
                case 'selectedOptionId':
                    return strategy.method(field.selectedOptionId as FieldValuesTypes)
                case 'value':
                default:
                    return strategy.method(field.value as FieldValuesTypes)
            }
        } catch (e) {
            console.error(`PARSING ERROR FOR TYPE ${field.type} in field: ${field.name} `, e)
        }
    }
}
