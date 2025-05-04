import { optionBaseedNumericTypes } from '@core/common.types'
import { numericParser } from '../parsers/numeric-parser'
import { setParserStrategy } from '../value-strategy.types'

export const numericOptionBasedParserStrategy = setParserStrategy(
    'NumericOptionBasedParserStrategy',
    optionBaseedNumericTypes,
    'selectedOptionId',
    numericParser
)
