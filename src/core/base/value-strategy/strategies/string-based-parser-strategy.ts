import { stringTypes } from '../../field-input-base/field-input.types'
import { stringParser } from '../parsers/string-parser'
import { setParserStrategy } from '../value-strategy.types'

export const stringParserStrategy = setParserStrategy(
    'StringParserStrategy',
    stringTypes,
    'value',
    stringParser
)
