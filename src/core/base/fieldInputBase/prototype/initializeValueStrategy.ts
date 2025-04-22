import {
    BooleanParserStrategy,
    DateOrTimeParserStrategy,
    NumericValueParserStrategy,
    StringParserStrategy
} from '../../valueStrategy/parsers.strategy'
import { ValueStrategy } from '../../valueStrategy/ValueStrategy'
import { setParser } from '../../valueStrategy/valueStrategy.types'
import { booleanTypes, dateTypes, IFieldInput, numberTypes, stringTypes } from '../fieldInput.types'

export const initializeValueStrategy = function (this: IFieldInput) {
    this.valueStrategy = new ValueStrategy(
        setParser('DateOrTimeParserStrategy', dateTypes, DateOrTimeParserStrategy),
        setParser('NumericValueParserStrategy', numberTypes, NumericValueParserStrategy),
        setParser('StringParserStrategy', stringTypes, StringParserStrategy),
        setParser('BooleanParserStrategy', booleanTypes, BooleanParserStrategy)
    )
}
