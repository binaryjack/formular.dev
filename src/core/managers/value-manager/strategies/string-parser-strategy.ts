import { stringTypes } from '@core/framework/common/common.input.types'
import { stringGetter, stringSetter } from '../parsers/string-io'
import { setParserStrategy } from '../value-manager.types'

export const stringParserStrategy = setParserStrategy(
    'StringParserStrategy',
    stringTypes,
    'value',
    stringSetter,
    stringGetter
)
