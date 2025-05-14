import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager } from '../value-manager.types'

/**
 * Retrieves the value of a field based on the strategies defined in the ValueStrategy instance.
 * @param field - The field input base instance to retrieve the value from.
 * @returns The value of the field or null if no strategy matches.
 */
export function getValue(this: IValueManager, field: IExtendedInput): unknown | null {
    const strategy = this.valueStrategies.find((s) => s.concernedTypes.includes(this.input.type))

    if (!strategy) {
        console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${field.input.type} `)
        return
    }
    try {
        /** Factory */

        return strategy.getter(field)

        // switch (strategy.fieldValueProperty) {
        //     case 'id':
        //         return strategy.getter(field)
        //     case 'selectedOptionId':
        //         return strategy.getter(field)
        //     case 'value':
        //     default:
        //         return strategy.getter(field)
        // }
    } catch (e) {
        console.error(`PARSING ERROR FOR TYPE ${this.input.type} in field: ${this.input.name} `, e)
    }
}
