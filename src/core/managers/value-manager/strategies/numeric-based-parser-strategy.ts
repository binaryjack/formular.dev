import { numberTypes } from '@core/framework/common/common.field.types'
import { numericParser } from '../parsers/numeric-parser'
import { setParserStrategy } from '../value-manager.types'

export const numericParserStrategy = setParserStrategy(
    'NumericParserStrategy',
    numberTypes,
    'value',
    numericParser
)
