import { stringTypes } from '@core/framework/common/common.field.types'
import { stringParser } from '../parsers/string-parser'
import { setParserStrategy } from '../value-strategy.types'

export const stringParserStrategy = setParserStrategy(
    'StringParserStrategy',
    stringTypes,
    'value',
    stringParser
)
