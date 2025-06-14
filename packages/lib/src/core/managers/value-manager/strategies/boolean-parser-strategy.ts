import { booleanTypes } from '@core/framework/common/common.input.types'
import { booleanGetter, booleanSetter } from '../parsers/boolean-io'
import { setParserStrategy } from '../value-manager.types'

export const booleanParserStrategy = setParserStrategy(
    'BooleanParserStrategy',
    booleanTypes,
    'checked',
    booleanSetter,
    booleanGetter
)
