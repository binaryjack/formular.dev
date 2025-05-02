import { FieldValuesTypes } from '@dependency/schema/descriptor/field.data.types'
import { IFieldInput } from '../../fields/field-base-input/field-input-base-types'

import { IValueStrategy } from '../value-strategy.types'

/**
 * Retrieves the value of a field based on the strategies defined in the ValueStrategy instance.
 * @param field - The field input base instance to retrieve the value from.
 * @returns The value of the field or null if no strategy matches.
 */
export function getValue(this: IValueStrategy, field: IFieldInput): unknown | null {
    const strategy = this.valueStrategies.find((s) => s.concernedTypes.includes(field.type))

    if (!strategy) {
        console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${field.type} `)
        return
    }
    try {
        /** Factory */
        switch (strategy.fieldValueProperty) {
            case 'id':
                return strategy.method(field.id as FieldValuesTypes)
            case 'selectedOptionId':
                return strategy.method(field?.selectedOptionId as FieldValuesTypes)
            case 'value':
            default:
                return strategy.method(field.value as FieldValuesTypes)
        }
    } catch (e) {
        console.error(`PARSING ERROR FOR TYPE ${field.type} in field: ${field.name} `, e)
    }
}
