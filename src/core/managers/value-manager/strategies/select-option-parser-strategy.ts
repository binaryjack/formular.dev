import { optionBaseedNumericTypes } from '@core/framework/common/common.input.types'

import { selectGetter, selectSetter } from '../parsers/select-option-io'
import { setParserStrategy } from '../value-manager.types'

export const numericOptionParserStrategy = setParserStrategy(
    'SelectOptionParserStrategy',
    optionBaseedNumericTypes,
    'selectedOptionId',
    selectSetter,
    selectGetter
)
