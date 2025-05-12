import { InputDataTypes } from '@core/framework/common/common.input.data.types'

import { isBooleanNullOrUndefined } from '@core/framework/utility/is-boolean-null-or-undefined'
import { TParser } from '../value-manager.types'

export const booleanParser: TParser<boolean | null> = (
    value: Partial<InputDataTypes>
): boolean | null =>
    !isBooleanNullOrUndefined(value as boolean | undefined | null) ? (value ? true : false) : null
