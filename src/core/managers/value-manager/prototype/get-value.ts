import { InputDataTypes } from '@core/framework/common/common.input.data.types'

import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager } from '../value-manager.types'

/**
 * Retrieves the value of a field based on the strategies defined in the ValueStrategy instance.
 * @param field - The field input base instance to retrieve the value from.
 * @returns The value of the field or null if no strategy matches.
 */
export function getValue(this: IValueManager, field: IInput): unknown | null {
    const strategy = this.valueStrategies.find((s) => s.concernedTypes.includes(field.type))

    if (!strategy) {
        console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${field.type} `)
        return
    }
    try {
        /** Factory */
        switch (strategy.fieldValueProperty) {
            case 'id':
                return strategy.method(field.id as InputDataTypes)
            case 'selectedOptionId':
                return strategy.method(field?.selectedOptionId as InputDataTypes)
            case 'value':
            default:
                return strategy.method(field.value as InputDataTypes)
        }
    } catch (e) {
        console.error(`PARSING ERROR FOR TYPE ${field.type} in field: ${field.name} `, e)
    }
}
