import { numberTypes } from '@core/common.types'
import { numericParser } from '../parsers/numeric-parser'
import { setParserStrategy } from '../value-strategy.types'

export const numericParserStrategy = setParserStrategy(
    'NumericParserStrategy',
    numberTypes,
    'value',
    numericParser
)
