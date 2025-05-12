import { InputDataTypes } from '@core/framework/common/common.input.data.types'

import { isNotNumericNullOrUndefined } from '@core/framework/utility/is-not-numeric-null-or-undefined'
import { TParser } from '../value-manager.types'

export const numericParser: TParser<number | null> = (
    value: Partial<InputDataTypes>
): number | null =>
    !isNotNumericNullOrUndefined(value as number | null | undefined) ? Number(value) : null
