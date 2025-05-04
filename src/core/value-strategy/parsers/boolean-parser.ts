import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { isBooleanNullOrUndefined } from '../../framework/utility/is-boolean-null-or-undefined'
import { TParser } from '../value-strategy.types'

export const booleanParser: TParser<boolean | null> = (
    value: Partial<FieldDataTypes>
): boolean | null =>
    !isBooleanNullOrUndefined(value as boolean | undefined | null) ? (value ? true : false) : null
