import { numberTypes } from '@core/framework/common/common.input.types'
import { numericGetter, numericSetter } from '../parsers/numeric-io'
import { setParserStrategy } from '../value-manager.types'

export const numericParserStrategy = setParserStrategy(
    'NumericParserStrategy',
    numberTypes,
    'value',
    numericSetter,
    numericGetter
)
