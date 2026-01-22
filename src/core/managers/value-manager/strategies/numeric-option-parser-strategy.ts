import { optionBaseedNumericTypes } from '@core/framework/common/common.input.types'

import { optionGetter, optionSetter } from '../parsers/options-io'
import { setParserStrategy } from '../value-manager.types'

export const numericOptionParserStrategy = setParserStrategy(
    'NumericOptionParserStrategy',
    optionBaseedNumericTypes,
    'selectedOptionId',
    optionSetter,
    optionGetter
)
