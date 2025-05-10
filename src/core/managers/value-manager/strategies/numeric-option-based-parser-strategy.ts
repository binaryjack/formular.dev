import { optionBaseedNumericTypes } from '@core/framework/common/common.field.types'
import { numericParser } from '../parsers/numeric-parser'
import { setParserStrategy } from '../value-manager.types'

export const numericOptionBasedParserStrategy = setParserStrategy(
    'NumericOptionBasedParserStrategy',
    optionBaseedNumericTypes,
    'selectedOptionId',
    numericParser
)
