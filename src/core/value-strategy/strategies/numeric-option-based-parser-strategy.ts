import { optionBaseedNumericTypes } from '../../field-input/field-input.types'
import { numericParser } from '../parsers/numeric-parser'
import { setParserStrategy } from '../value-strategy.types'

export const numericOptionBasedParserStrategy = setParserStrategy(
    'NumericOptionBasedParserStrategy',
    optionBaseedNumericTypes,
    'selectedOptionId',
    numericParser
)
