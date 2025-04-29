import { FieldValuesTypes } from '../../../../dependency/schema/descriptor/field.data.types'
import { isBooleanNullOrUndefined } from '../../field-input/utils/is-boolean-null-or-undefined'
import { TParser } from '../value-strategy.types'

export const booleanParser: TParser<boolean | null> = (
    value: Partial<FieldValuesTypes>
): boolean | null =>
    !isBooleanNullOrUndefined(value as boolean | undefined | null) ? (value ? true : false) : null
