import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { acceptValueStrategies } from './prototype/accept-value-strategies'
import { addValueStrategies } from './prototype/add-value-strategies'
import { getValue } from './prototype/get-value'
import { IValueStrategy } from './value-strategy.types'

/*
        booleanParserStrategy,
        stringParserStrategy,
        numericParserStrategy,
        dateOrTimeParserStrategy,
        numericOptionBasedParserStrategy,
*/

export const ValueStrategy = function (this: IValueStrategy, field: IFieldInput) {
    this.field = field
    this.valueStrategies = []
} as any as IValueStrategy

Object.assign(ValueStrategy.prototype, {
    acceptValueStrategies,
    addValueStrategies,
    getValue
})
