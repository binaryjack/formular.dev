import {
    BooleanParserStrategy,
    DateOrTimeParserStrategy,
    NumericValueParserStrategy,
    StringParserStrategy
} from '../../value-strategy/parsers.strategy'
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
        setParser('DateOrTimeParserStrategy', dateTypes, DateOrTimeParserStrategy),
        setParser('NumericValueParserStrategy', numberTypes, NumericValueParserStrategy),
        setParser('StringParserStrategy', stringTypes, StringParserStrategy),
        setParser('BooleanParserStrategy', booleanTypes, BooleanParserStrategy)
    )
}
