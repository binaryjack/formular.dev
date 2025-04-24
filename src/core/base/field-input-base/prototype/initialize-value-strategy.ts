import { booleanParserStrategy } from '../../value-strategy/strategies/boolean-parser-strategy'
import { dateOrTimeParserStrategy } from '../../value-strategy/strategies/date-or-time-parser-strategy'
import { numericValueParserStrategy } from '../../value-strategy/strategies/numeric-value-parser-strategy'
import { stringParserStrategy } from '../../value-strategy/strategies/string-parser-strategy'
import { ValueStrategy } from '../../value-strategy/value-strategy'
import { setParser } from '../../value-strategy/value-strategy.types'
import {
    booleanTypes,
    dateTypes,
    IFieldInput,
    numberTypes,
    stringTypes
} from '../field-input.types'

export const initializeValueStrategy = function (this: IFieldInput) {
    this.valueStrategy = new ValueStrategy(
        setParser('DateOrTimeParserStrategy', dateTypes, dateOrTimeParserStrategy),
        setParser('NumericValueParserStrategy', numberTypes, numericValueParserStrategy),
        setParser('StringParserStrategy', stringTypes, stringParserStrategy),
        setParser('BooleanParserStrategy', booleanTypes, booleanParserStrategy)
    )
}
