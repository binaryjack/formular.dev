import { FieldValuesTypes } from '../../../../dependency/schema/descriptor/field.data.types'
import { isNotNumericNullOrUndefined } from '../../field-input-base/utils/is-not-numeric-null-or-undefined'
import { TParserStrategy } from '../value-strategy.types'

export const numericValueParserStrategy: TParserStrategy<number | null> = (
    value: Partial<FieldValuesTypes>
): number | null =>
    !isNotNumericNullOrUndefined(value as number | null | undefined) ? Number(value) : null
