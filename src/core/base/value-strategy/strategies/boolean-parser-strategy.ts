import { FieldValuesTypes } from '../../../../dependency/schema/descriptor/field.data.types'
import { isBooleanNullOrUndefined } from '../../field-input-base/utils/is-boolean-null-or-undefined'
import { TParserStrategy } from '../value-strategy.types'

export const booleanParserStrategy: TParserStrategy<boolean | null> = (
    value: Partial<FieldValuesTypes>
): boolean | null =>
    !isBooleanNullOrUndefined(value as boolean | undefined | null) ? (value ? true : false) : null
