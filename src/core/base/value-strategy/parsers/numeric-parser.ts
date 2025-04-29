import { FieldValuesTypes } from '../../../../dependency/schema/descriptor/field.data.types'
import { isNotNumericNullOrUndefined } from '../../field-input/utils/is-not-numeric-null-or-undefined'
import { TParser } from '../value-strategy.types'

export const numericParser: TParser<number | null> = (
    value: Partial<FieldValuesTypes>
): number | null =>
    !isNotNumericNullOrUndefined(value as number | null | undefined) ? Number(value) : null
