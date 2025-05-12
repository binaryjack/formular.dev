import { stringTypes } from '@core/framework/common/common.input.types'
import { stringParser } from '../parsers/string-parser'
import { setParserStrategy } from '../value-manager.types'

export const stringParserStrategy = setParserStrategy(
    'StringParserStrategy',
    stringTypes,
    'value',
    stringParser
)
