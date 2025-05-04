import { acceptValueStrategies } from './prototype/accept-value-strategies'
import { addValueStrategies } from './prototype/add-value-strategies'
import { IValueStrategy } from './value-strategy.types'

/*
        booleanParserStrategy,
        stringParserStrategy,
        numericParserStrategy,
        dateOrTimeParserStrategy,
        numericOptionBasedParserStrategy,
*/

export const ValueStrategy = function (this: IValueStrategy) {
    this.valueStrategies = []
} as any as IValueStrategy

Object.assign(ValueStrategy.prototype, {
    acceptValueStrategies,
    addValueStrategies
})
