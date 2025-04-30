import { FieldValuesTypes } from '@dependency/schema/descriptor/field.data.types'
import { isNullEmptyOrUndefined } from '../../utility/is-null-empty-or-undefined'
import { TParser } from '../value-strategy.types'

export const stringParser: TParser<string | null> = (
    value: Partial<FieldValuesTypes>
): string | null => {
    return !isNullEmptyOrUndefined(value as string | null | undefined) && typeof value !== 'object'
        ? (value as string)
        : null
}
