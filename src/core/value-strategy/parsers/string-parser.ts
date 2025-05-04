import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { isNullEmptyOrUndefined } from '../../framework/utility/is-null-empty-or-undefined'
import { TParser } from '../value-strategy.types'

export const stringParser: TParser<string | null> = (
    value: Partial<FieldDataTypes>
): string | null => {
    return !isNullEmptyOrUndefined(value as string | null | undefined) && typeof value !== 'object'
        ? (value as unknown as string)
        : null
}
