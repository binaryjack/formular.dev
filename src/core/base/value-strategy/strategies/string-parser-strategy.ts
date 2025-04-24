import { FieldValuesTypes } from '../../../../dependency/schema/descriptor/field.data.types'
import { isNullEmptyOrUndefined } from '../../field-input-base/utils/is-null-empty-or-undefined'
import { TParserStrategy } from '../value-strategy.types'

export const stringParserStrategy: TParserStrategy<string | null> = (
    value: Partial<FieldValuesTypes>
): string | null => {
    return !isNullEmptyOrUndefined(value as string | null | undefined) && typeof value !== 'object'
        ? (value as string)
        : null
}
