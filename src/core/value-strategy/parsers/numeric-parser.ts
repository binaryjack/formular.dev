import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { isNotNumericNullOrUndefined } from '../../framework/utility/is-not-numeric-null-or-undefined'
import { TParser } from '../value-strategy.types'

export const numericParser: TParser<number | null> = (
    value: Partial<FieldDataTypes>
): number | null =>
    !isNotNumericNullOrUndefined(value as number | null | undefined) ? Number(value) : null
